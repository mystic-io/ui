import puppeteer from 'puppeteer'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface ComponentData {
  name: string
  html: string
  computedStyles: Record<string, any>
  cssText: string
  interactions: string[]
  boundingBox: {
    width: number
    height: number
  }
  screenshot: string
}

interface ExtractedData {
  cssVariables: Record<string, string>
  components: ComponentData[]
  globalStyles: string
  fonts: string[]
  metadata: {
    extractedAt: string
    url: string
  }
}

async function extractLumaStyleGuide() {
  console.log('🚀 Starting Luma Style Guide extraction...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })

  console.log('📄 Navigating to Luma style guide...')
  await page.goto('https://luma.com/style-guide', {
    waitUntil: 'networkidle2',
    timeout: 60000
  })

  // Wait for content to load
  await page.waitForTimeout(3000)

  console.log('🔍 Extracting data from page...')

  // Extract all data using page.evaluate
  const extractedData = await page.evaluate(() => {
    const data: ExtractedData = {
      cssVariables: {},
      components: [],
      globalStyles: '',
      fonts: [],
      metadata: {
        extractedAt: new Date().toISOString(),
        url: window.location.href
      }
    }

    // Extract CSS Variables from :root and computed styles
    const rootStyles = getComputedStyle(document.documentElement)
    const bodyStyles = getComputedStyle(document.body)

    // Get all CSS variables
    for (let i = 0; i < rootStyles.length; i++) {
      const prop = rootStyles[i]
      if (prop.startsWith('--')) {
        data.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim()
      }
    }

    // Also check body for CSS variables
    for (let i = 0; i < bodyStyles.length; i++) {
      const prop = bodyStyles[i]
      if (prop.startsWith('--') && !data.cssVariables[prop]) {
        data.cssVariables[prop] = bodyStyles.getPropertyValue(prop).trim()
      }
    }

    // Extract all stylesheets text
    const styleSheets = Array.from(document.styleSheets)
    let allCssText = ''

    styleSheets.forEach(sheet => {
      try {
        if (sheet.cssRules) {
          Array.from(sheet.cssRules).forEach(rule => {
            allCssText += rule.cssText + '\n'
          })
        }
      } catch (e) {
        // CORS blocked stylesheet
        console.log('Could not access stylesheet:', sheet.href)
      }
    })

    data.globalStyles = allCssText

    // Extract fonts from CSS
    const fontFaceRegex = /@font-face\s*{[^}]+}/g
    const fontMatches = allCssText.match(fontFaceRegex) || []
    data.fonts = fontMatches

    // Find all component sections
    // Luma's style guide typically has sections or components in the DOM
    // We'll look for main content areas and extract each distinct component

    const mainContent = document.querySelector('main') || document.body

    // Get all direct children or sections
    const sections = Array.from(mainContent.querySelectorAll('section, [class*="component"], [class*="section"], [class*="demo"], [data-component]'))

    // If no sections found, try to find divs with specific patterns
    if (sections.length === 0) {
      sections.push(...Array.from(mainContent.querySelectorAll('div[class]')).filter(el => {
        const rect = el.getBoundingClientRect()
        return rect.height > 50 && rect.width > 100
      }))
    }

    // Also get all unique component types by looking for repeated patterns
    const allElements = Array.from(mainContent.querySelectorAll('*'))
    const componentTypes = new Set<string>()

    // Look for buttons, inputs, cards, etc.
    const selectors = [
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '[role="dialog"]',
      '[role="menu"]',
      '[role="tooltip"]',
      '[class*="btn"]',
      '[class*="button"]',
      '[class*="input"]',
      '[class*="card"]',
      '[class*="modal"]',
      '[class*="dropdown"]',
      '[class*="tooltip"]',
      '[class*="badge"]',
      '[class*="tag"]',
      '[class*="alert"]',
      '[class*="banner"]',
      '[class*="nav"]',
      'form',
      '[class*="form"]'
    ]

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(el => {
        if (!el.closest('[data-extracted]')) {
          el.setAttribute('data-extracted', 'true')
          componentTypes.add(selector)
        }
      })
    })

    // Extract each unique element/component
    const extractedComponents = new Map<string, HTMLElement>()

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector)
      if (elements.length > 0) {
        const firstElement = elements[0] as HTMLElement
        const componentKey = `${selector}-${firstElement.className}`
        if (!extractedComponents.has(componentKey)) {
          extractedComponents.set(componentKey, firstElement)
        }

        // Also get variations (different states/classes)
        elements.forEach((el, idx) => {
          if (idx < 10) { // Limit to first 10 variations
            const key = `${selector}-${idx}-${el.className}`
            if (!extractedComponents.has(key)) {
              extractedComponents.set(key, el as HTMLElement)
            }
          }
        })
      }
    })

    // Extract data for each component
    extractedComponents.forEach((element, key) => {
      const computedStyles = getComputedStyle(element)
      const rect = element.getBoundingClientRect()

      // Get all computed style properties
      const styles: Record<string, string> = {}
      const relevantProps = [
        'color', 'background', 'backgroundColor', 'backgroundImage',
        'border', 'borderRadius', 'borderColor', 'borderWidth',
        'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
        'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
        'fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing',
        'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight',
        'display', 'position', 'top', 'right', 'bottom', 'left',
        'boxShadow', 'textShadow', 'opacity', 'transform', 'transition',
        'cursor', 'zIndex', 'overflow', 'textAlign', 'textDecoration',
        'flexDirection', 'justifyContent', 'alignItems', 'gap',
        'gridTemplateColumns', 'gridTemplateRows', 'gridGap'
      ]

      relevantProps.forEach(prop => {
        styles[prop] = computedStyles.getPropertyValue(prop) || computedStyles[prop as any]
      })

      // Get all CSS custom properties used
      for (let i = 0; i < computedStyles.length; i++) {
        const prop = computedStyles[i]
        if (prop.startsWith('--')) {
          styles[prop] = computedStyles.getPropertyValue(prop)
        }
      }

      // Extract event listeners (approximate)
      const interactions: string[] = []
      const attributes = Array.from(element.attributes)
      attributes.forEach(attr => {
        if (attr.name.startsWith('on')) {
          interactions.push(attr.name)
        }
      })

      // Check for common interaction classes
      const interactionClasses = ['hover', 'active', 'focus', 'disabled', 'selected']
      interactionClasses.forEach(className => {
        if (element.className.includes(className)) {
          interactions.push(className)
        }
      })

      const componentData: ComponentData = {
        name: key,
        html: element.outerHTML,
        computedStyles: styles,
        cssText: '',
        interactions,
        boundingBox: {
          width: rect.width,
          height: rect.height
        },
        screenshot: ''
      }

      data.components.push(componentData)
    })

    return data
  })

  console.log(`✅ Extracted ${extractedData.components.length} components`)
  console.log(`✅ Extracted ${Object.keys(extractedData.cssVariables).length} CSS variables`)

  // Take screenshots of each component
  console.log('📸 Taking screenshots of components...')
  for (let i = 0; i < extractedData.components.length; i++) {
    const component = extractedData.components[i]
    try {
      // Try to find and screenshot the element
      const selector = component.name.split('-')[0]
      const element = await page.$(selector)

      if (element) {
        const screenshot = await element.screenshot({ encoding: 'base64' })
        component.screenshot = screenshot as string
      }
    } catch (e) {
      console.log(`Could not screenshot component ${component.name}`)
    }
  }

  // Take full page screenshot
  console.log('📸 Taking full page screenshot...')
  const fullScreenshot = await page.screenshot({
    fullPage: true,
    encoding: 'base64'
  })

  await browser.close()

  // Save extracted data
  const outputDir = join(process.cwd(), 'luma-extracted')
  mkdirSync(outputDir, { recursive: true })

  console.log('💾 Saving extracted data...')

  // Save main data file
  writeFileSync(
    join(outputDir, 'extracted-data.json'),
    JSON.stringify(extractedData, null, 2)
  )

  // Save full page screenshot
  writeFileSync(
    join(outputDir, 'full-page.png'),
    Buffer.from(fullScreenshot as string, 'base64')
  )

  // Save CSS variables separately
  writeFileSync(
    join(outputDir, 'css-variables.json'),
    JSON.stringify(extractedData.cssVariables, null, 2)
  )

  // Save global styles
  writeFileSync(
    join(outputDir, 'global-styles.css'),
    extractedData.globalStyles
  )

  // Save fonts
  writeFileSync(
    join(outputDir, 'fonts.json'),
    JSON.stringify(extractedData.fonts, null, 2)
  )

  // Save individual component files
  const componentsDir = join(outputDir, 'components')
  mkdirSync(componentsDir, { recursive: true })

  extractedData.components.forEach((component, idx) => {
    const componentDir = join(componentsDir, `component-${idx}`)
    mkdirSync(componentDir, { recursive: true })

    writeFileSync(
      join(componentDir, 'data.json'),
      JSON.stringify(component, null, 2)
    )

    writeFileSync(
      join(componentDir, 'markup.html'),
      component.html
    )

    if (component.screenshot) {
      writeFileSync(
        join(componentDir, 'screenshot.png'),
        Buffer.from(component.screenshot, 'base64')
      )
    }
  })

  console.log('✨ Extraction complete!')
  console.log(`📁 Data saved to: ${outputDir}`)
  console.log(`📊 Total components extracted: ${extractedData.components.length}`)
  console.log(`🎨 CSS variables: ${Object.keys(extractedData.cssVariables).length}`)

  return extractedData
}

// Run extraction
extractLumaStyleGuide()
  .then(() => {
    console.log('🎉 All done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
