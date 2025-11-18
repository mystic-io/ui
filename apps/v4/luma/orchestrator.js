#!/usr/bin/env node

/**
 * LUMA STYLE GUIDE REVERSE ENGINEERING - AUTONOMOUS ORCHESTRATOR
 * 
 * This script provides the execution framework for Claude Code to autonomously
 * reverse engineer the Luma style guide with zero human intervention.
 * 
 * Usage: node orchestrator.js
 */

import { execSync } from 'child_process';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  TARGET_URL: 'https://luma.com/style-guide',
  PROJECT_NAME: 'luma-design-system',
  TOLERANCE: 0, // Zero tolerance for pixel differences
  REQUIRED_ACCURACY: 100, // 100% match required
  
  TECH_STACK: {
    framework: 'React 19',
    typescript: true,
    uiLibrary: 'shadcn/ui',
    primitives: '@radix-ui',
    styling: 'Tailwind CSS',
    buildTool: 'Vite',
    storybook: 'Storybook 8',
    testing: ['Vitest', 'Playwright', 'Chromatic'],
    packageManager: 'pnpm'
  },
  
  PHASES: [
    'reconnaissance',
    'foundation',
    'construction',
    'storybook',
    'testing',
    'comparison',
    'documentation'
  ]
};

// ============================================================================
// UTILITIES
// ============================================================================

class Logger {
  static phase(name) {
    console.log('\n' + '='.repeat(80));
    console.log(`🚀 PHASE: ${name.toUpperCase()}`);
    console.log('='.repeat(80) + '\n');
  }
  
  static step(message) {
    console.log(`📍 ${message}`);
  }
  
  static success(message) {
    console.log(`✅ ${message}`);
  }
  
  static error(message) {
    console.error(`❌ ${message}`);
  }
  
  static warning(message) {
    console.warn(`⚠️ ${message}`);
  }
  
  static info(message) {
    console.log(`ℹ️ ${message}`);
  }
}

class Executor {
  static run(command, description) {
    Logger.step(description);
    try {
      const output = execSync(command, { 
        encoding: 'utf-8',
        stdio: 'pipe'
      });
      Logger.success(`Completed: ${description}`);
      return { success: true, output };
    } catch (error) {
      Logger.error(`Failed: ${description}`);
      Logger.error(error.message);
      return { success: false, error: error.message };
    }
  }
  
  static async runAsync(fn, description) {
    Logger.step(description);
    try {
      const result = await fn();
      Logger.success(`Completed: ${description}`);
      return { success: true, result };
    } catch (error) {
      Logger.error(`Failed: ${description}`);
      Logger.error(error.message);
      return { success: false, error: error.message };
    }
  }
}

// ============================================================================
// PHASE 1: RECONNAISSANCE & EXTRACTION
// ============================================================================

class ReconnaissancePhase {
  static async execute() {
    Logger.phase('Reconnaissance & Extraction');
    
    const results = {
      phase: 'reconnaissance',
      steps: [],
      success: true
    };
    
    // Step 1: Set up extraction environment
    results.steps.push(
      Executor.run(
        'npm install -g playwright puppeteer pixelmatch pngjs',
        'Installing extraction tools'
      )
    );
    
    // Step 2: Install browser for Playwright
    results.steps.push(
      Executor.run(
        'npx playwright install chromium',
        'Installing Chromium browser'
      )
    );
    
    // Step 3: Create extraction script
    const extractionScript = this.generateExtractionScript();
    writeFileSync('extract-luma-styles.js', extractionScript);
    Logger.success('Created extraction script');
    
    // Step 4: Run extraction
    results.steps.push(
      Executor.run(
        'node extract-luma-styles.js',
        'Extracting Luma style guide data'
      )
    );
    
    // Step 5: Create screenshot matrix
    mkdirSync('screenshots/luma', { recursive: true });
    results.steps.push(
      Executor.run(
        'node capture-screenshots.js',
        'Capturing baseline screenshots'
      )
    );
    
    results.success = results.steps.every(step => step.success);
    return results;
  }
  
  static generateExtractionScript() {
    return `
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Luma style guide...');
  await page.goto('${CONFIG.TARGET_URL}', { 
    waitUntil: 'networkidle',
    timeout: 60000 
  });
  
  console.log('Extracting design data...');
  const extractedData = await page.evaluate(() => {
    const data = {
      colors: new Map(),
      typography: [],
      spacing: [],
      components: [],
      animations: [],
      cssVariables: {}
    };
    
    // Extract all computed styles
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(el => {
      const computed = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      
      // Extract colors
      ['color', 'backgroundColor', 'borderColor', 'fill', 'stroke'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
          const key = `${prop}-${value}`;
          if (!data.colors.has(key)) {
            data.colors.set(key, {
              property: prop,
              value: value,
              elements: []
            });
          }
          data.colors.get(key).elements.push({
            tag: el.tagName,
            classes: Array.from(el.classList)
          });
        }
      });
      
      // Extract typography
      if (computed.fontSize && parseFloat(computed.fontSize) > 0) {
        data.typography.push({
          element: el.tagName,
          classes: Array.from(el.classList),
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          textTransform: computed.textTransform
        });
      }
      
      // Extract spacing
      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft',
       'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
       'gap', 'rowGap', 'columnGap'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== '0px') {
          data.spacing.push({
            element: el.tagName,
            classes: Array.from(el.classList),
            property: prop,
            value: value
          });
        }
      });
      
      // Extract potential components
      const classes = Array.from(el.classList).join(' ');
      if (classes.match(/button|input|card|modal|dropdown|select|checkbox|radio/i)) {
        data.components.push({
          type: el.tagName,
          classes: Array.from(el.classList),
          html: el.outerHTML.substring(0, 500), // First 500 chars
          styles: {
            display: computed.display,
            position: computed.position,
            width: computed.width,
            height: computed.height,
            padding: computed.padding,
            margin: computed.margin,
            border: computed.border,
            borderRadius: computed.borderRadius,
            backgroundColor: computed.backgroundColor,
            color: computed.color,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            boxShadow: computed.boxShadow,
            transition: computed.transition,
            transform: computed.transform
          },
          dimensions: {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            left: rect.left
          }
        });
      }
      
      // Extract animations
      if (computed.animationName && computed.animationName !== 'none') {
        data.animations.push({
          element: el.tagName,
          classes: Array.from(el.classList),
          animationName: computed.animationName,
          animationDuration: computed.animationDuration,
          animationTimingFunction: computed.animationTimingFunction,
          animationDelay: computed.animationDelay,
          animationIterationCount: computed.animationIterationCount,
          animationDirection: computed.animationDirection,
          animationFillMode: computed.animationFillMode
        });
      }
    });
    
    // Extract CSS custom properties
    const rootStyles = getComputedStyle(document.documentElement);
    const sheets = Array.from(document.styleSheets);
    
    sheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        rules.forEach(rule => {
          if (rule.style) {
            Array.from(rule.style).forEach(prop => {
              if (prop.startsWith('--')) {
                data.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim();
              }
            });
          }
        });
      } catch (e) {
        // CORS or access issues
      }
    });
    
    // Convert Map to Object for JSON serialization
    const colorsObj = {};
    data.colors.forEach((value, key) => {
      colorsObj[key] = value;
    });
    data.colors = colorsObj;
    
    return data;
  });
  
  console.log('Saving extracted data...');
  fs.writeFileSync(
    'luma-extracted-data.json',
    JSON.stringify(extractedData, null, 2)
  );
  
  console.log('Extraction complete!');
  console.log(\`Colors extracted: \${Object.keys(extractedData.colors).length}`);
  console.log(\`Typography styles: \${extractedData.typography.length}`);
  console.log(\`Spacing values: \${extractedData.spacing.length}`);
  console.log(\`Components found: \${extractedData.components.length}`);
  console.log(\`CSS variables: \${Object.keys(extractedData.cssVariables).length}`);
  
  await browser.close();
})();
    `.trim();
  }
}

// ============================================================================
// PHASE 2: FOUNDATION
// ============================================================================

class FoundationPhase {
  static async execute() {
    Logger.phase('Design System Foundation');
    
    const results = {
      phase: 'foundation',
      steps: [],
      success: true
    };
    
    // Step 1: Create project
    results.steps.push(
      Executor.run(
        `pnpm create vite@latest ${CONFIG.PROJECT_NAME} --template react-ts`,
        'Creating Vite + React + TypeScript project'
      )
    );
    
    // Change to project directory
    process.chdir(CONFIG.PROJECT_NAME);
    
    // Step 2: Install dependencies
    const dependencies = [
      // Radix UI primitives
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      // Utilities
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      // Radix colors
      '@radix-ui/colors'
    ].join(' ');
    
    results.steps.push(
      Executor.run(
        `pnpm add ${dependencies}`,
        'Installing Radix UI and utilities'
      )
    );
    
    // Step 3: Install dev dependencies
    const devDependencies = [
      'tailwindcss',
      'postcss',
      'autoprefixer',
      '@types/node',
      'vitest',
      '@vitest/ui',
      '@playwright/test',
      'storybook',
      '@storybook/react-vite',
      '@storybook/addon-essentials',
      '@storybook/addon-interactions',
      '@storybook/addon-a11y',
      '@chromatic-com/storybook'
    ].join(' ');
    
    results.steps.push(
      Executor.run(
        `pnpm add -D ${devDependencies}`,
        'Installing dev dependencies'
      )
    );
    
    // Step 4: Initialize shadcn/ui
    results.steps.push(
      Executor.run(
        'pnpm dlx shadcn@latest init -y',
        'Initializing shadcn/ui'
      )
    );
    
    // Step 5: Initialize Tailwind
    results.steps.push(
      Executor.run(
        'pnpm dlx tailwindcss init -p',
        'Initializing Tailwind CSS'
      )
    );
    
    // Step 6: Initialize Storybook
    results.steps.push(
      Executor.run(
        'pnpm dlx storybook@latest init --type react_vite --yes',
        'Initializing Storybook'
      )
    );
    
    // Step 7: Create design tokens from extracted data
    results.steps.push(
      await Executor.runAsync(
        () => this.createDesignTokens(),
        'Creating design tokens from Luma data'
      )
    );
    
    results.success = results.steps.every(step => step.success);
    return results;
  }
  
  static async createDesignTokens() {
    // Read extracted data
    const extractedData = JSON.parse(
      readFileSync('../luma-extracted-data.json', 'utf-8')
    );
    
    // Create tokens directory
    mkdirSync('src/tokens', { recursive: true });
    
    // Generate color tokens
    const colorTokens = this.generateColorTokens(extractedData.colors);
    writeFileSync('src/tokens/colors.ts', colorTokens);
    
    // Generate typography tokens
    const typographyTokens = this.generateTypographyTokens(extractedData.typography);
    writeFileSync('src/tokens/typography.ts', typographyTokens);
    
    // Generate spacing tokens
    const spacingTokens = this.generateSpacingTokens(extractedData.spacing);
    writeFileSync('src/tokens/spacing.ts', spacingTokens);
    
    // Generate CSS variables
    const cssVariables = this.generateCSSVariables(extractedData.cssVariables);
    writeFileSync('src/styles/tokens.css', cssVariables);
    
    return true;
  }
  
  static generateColorTokens(colors) {
    // Analyze and organize colors
    const organized = {
      primary: [],
      secondary: [],
      neutral: [],
      semantic: {}
    };
    
    // Extract unique colors and organize them
    const uniqueColors = new Set();
    Object.values(colors).forEach(colorData => {
      uniqueColors.add(colorData.value);
    });
    
    return `
export const colors = {
  // Extracted from Luma style guide
  // TODO: Organize these into semantic categories
  extracted: {
    ${Array.from(uniqueColors).map((color, i) => 
      `color${i}: "${color}"`
    ).join(',\n    ')}
  }
} as const;

export type ColorToken = keyof typeof colors.extracted;
    `.trim();
  }
  
  static generateTypographyTokens(typography) {
    // Find unique font families, sizes, weights
    const fontFamilies = new Set();
    const fontSizes = new Set();
    const fontWeights = new Set();
    
    typography.forEach(t => {
      if (t.fontFamily) fontFamilies.add(t.fontFamily);
      if (t.fontSize) fontSizes.add(t.fontSize);
      if (t.fontWeight) fontWeights.add(t.fontWeight);
    });
    
    return `
export const typography = {
  fontFamily: {
    sans: [${Array.from(fontFamilies).slice(0, 3).map(f => `"${f}"`).join(', ')}],
  },
  fontSize: {
    ${Array.from(fontSizes).map((size, i) => 
      `size${i}: "${size}"`
    ).join(',\n    ')}
  },
  fontWeight: {
    ${Array.from(fontWeights).map((weight, i) => 
      `weight${i}: "${weight}"`
    ).join(',\n    ')}
  }
} as const;
    `.trim();
  }
  
  static generateSpacingTokens(spacing) {
    const uniqueSpacing = new Set();
    spacing.forEach(s => uniqueSpacing.add(s.value));
    
    return `
export const spacing = {
  ${Array.from(uniqueSpacing).map((value, i) => 
    `space${i}: "${value}"`
  ).join(',\n  ')}
} as const;
    `.trim();
  }
  
  static generateCSSVariables(cssVars) {
    return `
@layer base {
  :root {
    ${Object.entries(cssVars).map(([key, value]) => 
      `${key}: ${value};`
    ).join('\n    ')}
  }
}
    `.trim();
  }
}

// ============================================================================
// PHASE 3: COMPONENT CONSTRUCTION
// ============================================================================

class ConstructionPhase {
  static async execute() {
    Logger.phase('Component Construction');
    
    const results = {
      phase: 'construction',
      components: [],
      success: true
    };
    
    // Read extracted components
    const extractedData = JSON.parse(
      readFileSync('../luma-extracted-data.json', 'utf-8')
    );
    
    // Identify unique components
    const components = this.identifyComponents(extractedData.components);
    
    Logger.info(\`Identified \${components.length} unique components\`);
    
    // Build each component
    for (const component of components) {
      Logger.step(\`Building component: \${component.name}`);
      
      const result = await this.buildComponent(component);
      results.components.push(result);
      
      if (result.success) {
        Logger.success(\`Built \${component.name}`);
      } else {
        Logger.error(\`Failed to build \${component.name}`);
      }
    }
    
    results.success = results.components.every(c => c.success);
    return results;
  }
  
  static identifyComponents(extractedComponents) {
    // Group similar components
    const componentMap = new Map();
    
    extractedComponents.forEach(comp => {
      // Identify component type from classes
      const type = this.inferComponentType(comp);
      
      if (!componentMap.has(type)) {
        componentMap.set(type, []);
      }
      
      componentMap.get(type).push(comp);
    });
    
    // Create component specs
    const components = [];
    componentMap.forEach((instances, type) => {
      components.push({
        name: type,
        instances: instances,
        variants: this.extractVariants(instances)
      });
    });
    
    return components;
  }
  
  static inferComponentType(comp) {
    const classes = comp.classes.join(' ').toLowerCase();
    
    if (classes.includes('button') || comp.type === 'BUTTON') return 'Button';
    if (classes.includes('input') || comp.type === 'INPUT') return 'Input';
    if (classes.includes('card')) return 'Card';
    if (classes.includes('modal') || classes.includes('dialog')) return 'Dialog';
    if (classes.includes('select') || classes.includes('dropdown')) return 'Select';
    if (classes.includes('checkbox')) return 'Checkbox';
    if (classes.includes('radio')) return 'Radio';
    if (classes.includes('switch') || classes.includes('toggle')) return 'Switch';
    if (classes.includes('slider')) return 'Slider';
    if (classes.includes('tab')) return 'Tabs';
    if (classes.includes('accordion')) return 'Accordion';
    if (classes.includes('tooltip')) return 'Tooltip';
    if (classes.includes('popover')) return 'Popover';
    if (classes.includes('alert')) return 'Alert';
    if (classes.includes('badge')) return 'Badge';
    if (classes.includes('avatar')) return 'Avatar';
    
    return 'UnknownComponent';
  }
  
  static extractVariants(instances) {
    // Analyze instances to find variants
    const variants = new Set();
    
    instances.forEach(inst => {
      inst.classes.forEach(cls => {
        // Look for variant patterns
        if (cls.includes('primary')) variants.add('primary');
        if (cls.includes('secondary')) variants.add('secondary');
        if (cls.includes('small') || cls.includes('sm')) variants.add('sm');
        if (cls.includes('medium') || cls.includes('md')) variants.add('md');
        if (cls.includes('large') || cls.includes('lg')) variants.add('lg');
        if (cls.includes('disabled')) variants.add('disabled');
        if (cls.includes('active')) variants.add('active');
      });
    });
    
    return Array.from(variants);
  }
  
  static async buildComponent(component) {
    // Create component directory
    mkdirSync(\`src/components/ui\`, { recursive: true });
    
    // Generate component code
    const componentCode = this.generateComponentCode(component);
    const componentPath = \`src/components/ui/\${component.name.toLowerCase()}.tsx\`;
    writeFileSync(componentPath, componentCode);
    
    // Generate story
    const storyCode = this.generateStoryCode(component);
    const storyPath = \`src/components/ui/\${component.name.toLowerCase()}.stories.tsx\`;
    writeFileSync(storyPath, storyCode);
    
    // Generate test
    const testCode = this.generateTestCode(component);
    const testPath = \`src/components/ui/\${component.name.toLowerCase()}.test.tsx\`;
    writeFileSync(testPath, testCode);
    
    return {
      name: component.name,
      success: true,
      files: [componentPath, storyPath, testPath]
    };
  }
  
  static generateComponentCode(component) {
    const radixImport = this.getRadixImport(component.name);
    
    return `
import * as React from "react";
${radixImport}
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ${component.name.toLowerCase()}Variants = cva(
  "base-classes-extracted-from-luma", // TODO: Extract actual classes
  {
    variants: {
      variant: {
        ${component.variants.filter(v => !['sm', 'md', 'lg'].includes(v))
          .map(v => `${v}: "${v}-classes"`).join(',\n        ')}
      },
      size: {
        ${component.variants.filter(v => ['sm', 'md', 'lg'].includes(v))
          .map(v => `${v}: "${v}-classes"`).join(',\n        ')}
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ${component.name}Props
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof ${component.name.toLowerCase()}Variants> {}

const ${component.name} = React.forwardRef<
  HTMLDivElement,
  ${component.name}Props
>(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(${component.name.toLowerCase()}Variants({ variant, size, className }))}
      {...props}
    />
  );
});

${component.name}.displayName = "${component.name}";

export { ${component.name}, ${component.name.toLowerCase()}Variants };
    `.trim();
  }
  
  static getRadixImport(componentName) {
    const radixMap = {
      'Button': '',
      'Input': '',
      'Dialog': 'import * as DialogPrimitive from "@radix-ui/react-dialog";',
      'Select': 'import * as SelectPrimitive from "@radix-ui/react-select";',
      'Checkbox': 'import * as CheckboxPrimitive from "@radix-ui/react-checkbox";',
      'Radio': 'import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";',
      'Switch': 'import * as SwitchPrimitive from "@radix-ui/react-switch";',
      'Tabs': 'import * as TabsPrimitive from "@radix-ui/react-tabs";',
      'Accordion': 'import * as AccordionPrimitive from "@radix-ui/react-accordion";',
      'Tooltip': 'import * as TooltipPrimitive from "@radix-ui/react-tooltip";',
      'Popover': 'import * as PopoverPrimitive from "@radix-ui/react-popover";',
    };
    
    return radixMap[componentName] || '';
  }
  
  static generateStoryCode(component) {
    return `
import type { Meta, StoryObj } from '@storybook/react';
import { ${component.name} } from './${component.name.toLowerCase()}';

const meta = {
  title: 'Components/${component.name}',
  component: ${component.name},
  parameters: {
    layout: 'centered',
    design: {
      type: 'link',
      url: '${CONFIG.TARGET_URL}',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${component.name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

${component.variants.map(variant => `
export const ${variant.charAt(0).toUpperCase() + variant.slice(1)}: Story = {
  args: {
    variant: '${variant}',
  },
};
`).join('\n')}
    `.trim();
  }
  
  static generateTestCode(component) {
    return `
import { render, screen } from '@testing-library/react';
import { ${component.name} } from './${component.name.toLowerCase()}';

describe('${component.name}', () => {
  it('renders without crashing', () => {
    render(<${component.name}>Test</${component.name}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  
  ${component.variants.map(variant => `
  it('renders with ${variant} variant', () => {
    render(<${component.name} variant="${variant}">Test</${component.name}>);
    // TODO: Add assertions for variant styles
  });
  `).join('\n')}
});
    `.trim();
  }
}

// ============================================================================
// PHASE 4: STORYBOOK
// ============================================================================

class StorybookPhase {
  static async execute() {
    Logger.phase('Storybook Documentation');
    
    const results = {
      phase: 'storybook',
      steps: [],
      success: true
    };
    
    // Build Storybook
    results.steps.push(
      Executor.run(
        'pnpm run build-storybook',
        'Building Storybook'
      )
    );
    
    // Start Storybook
    Logger.info('Starting Storybook on http://localhost:6006');
    results.steps.push(
      Executor.run(
        'pnpm run storybook &',
        'Starting Storybook server'
      )
    );
    
    results.success = results.steps.every(step => step.success);
    return results;
  }
}

// ============================================================================
// PHASE 5: TESTING
// ============================================================================

class TestingPhase {
  static async execute() {
    Logger.phase('Testing & Validation');
    
    const results = {
      phase: 'testing',
      tests: [],
      success: true
    };
    
    // Run unit tests
    results.tests.push(
      Executor.run(
        'pnpm run test',
        'Running unit tests'
      )
    );
    
    // Run visual tests
    results.tests.push(
      Executor.run(
        'pnpm exec playwright test',
        'Running visual regression tests'
      )
    );
    
    // Run accessibility tests
    results.tests.push(
      Executor.run(
        'pnpm exec playwright test --grep @a11y',
        'Running accessibility tests'
      )
    );
    
    results.success = results.tests.every(test => test.success);
    return results;
  }
}

// ============================================================================
// PHASE 6: COMPARISON
// ============================================================================

class ComparisonPhase {
  static async execute() {
    Logger.phase('Comparison & Validation');
    
    const results = {
      phase: 'comparison',
      comparisons: [],
      overallMatch: 0,
      success: false
    };
    
    // Create comparison script
    const comparisonScript = this.generateComparisonScript();
    writeFileSync('compare-with-luma.js', comparisonScript);
    
    // Run comparison
    const comparisonResult = Executor.run(
      'node compare-with-luma.js',
      'Running pixel-by-pixel comparison with Luma'
    );
    
    results.comparisons.push(comparisonResult);
    
    // Read comparison results
    if (existsSync('comparison-results.json')) {
      const comparisonData = JSON.parse(
        readFileSync('comparison-results.json', 'utf-8')
      );
      
      results.overallMatch = comparisonData.overallMatch;
      results.success = comparisonData.overallMatch >= CONFIG.REQUIRED_ACCURACY;
    }
    
    return results;
  }
  
  static generateComparisonScript() {
    return \`
const { chromium } = require('playwright');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');
const fs = require('fs');

async function compareComponents() {
  const browser = await chromium.launch();
  const results = {
    components: [],
    overallMatch: 0
  };
  
  // Get list of components
  const componentsList = fs.readdirSync('src/components/ui')
    .filter(f => f.endsWith('.tsx') && !f.includes('.stories') && !f.includes('.test'));
  
  let totalPixels = 0;
  let matchingPixels = 0;
  
  for (const componentFile of componentsList) {
    const componentName = componentFile.replace('.tsx', '');
    
    console.log(\`Comparing \${componentName}...\`);
    
    const page = await browser.newPage();
    
    // Screenshot from Luma
    await page.goto(\`${CONFIG.TARGET_URL}`);
    await page.waitForLoadState('networkidle');
    
    // Find component on page
    const lumaElement = await page.locator(\`[class*="\${componentName.toLowerCase()}"]\`).first();
    const lumaScreenshot = await lumaElement.screenshot();
    
    // Screenshot from Storybook
    await page.goto(\`http://localhost:6006/?path=/story/components-\${componentName.toLowerCase()}--default\`);
    await page.waitForLoadState('networkidle');
    
    const storyElement = await page.locator('iframe').contentFrame().locator('body > *').first();
    const ourScreenshot = await storyElement.screenshot();
    
    // Compare
    const lumaImg = PNG.sync.read(lumaScreenshot);
    const ourImg = PNG.sync.read(ourScreenshot);
    
    const { width, height } = lumaImg;
    const diff = new PNG({ width, height });
    
    const numDiffPixels = pixelmatch(
      lumaImg.data,
      ourImg.data,
      diff.data,
      width,
      height,
      { threshold: ${CONFIG.TOLERANCE} }
    );
    
    const totalComponentPixels = width * height;
    const matchingComponentPixels = totalComponentPixels - numDiffPixels;
    const matchPercentage = (matchingComponentPixels / totalComponentPixels) * 100;
    
    totalPixels += totalComponentPixels;
    matchingPixels += matchingComponentPixels;
    
    results.components.push({
      name: componentName,
      totalPixels: totalComponentPixels,
      matchingPixels: matchingComponentPixels,
      diffPixels: numDiffPixels,
      matchPercentage: matchPercentage
    });
    
    // Save diff image
    fs.writeFileSync(
      \`comparison/diff-\${componentName}.png\`,
      PNG.sync.write(diff)
    );
    
    console.log(\`  Match: \${matchPercentage.toFixed(2)}%\`);
  }
  
  results.overallMatch = (matchingPixels / totalPixels) * 100;
  
  fs.writeFileSync(
    'comparison-results.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log(\`\\nOverall Match: \${results.overallMatch.toFixed(2)}%\`);
  
  await browser.close();
  
  return results;
}

compareComponents();
    \`.trim();
  }
}

// ============================================================================
// PHASE 7: DOCUMENTATION
// ============================================================================

class DocumentationPhase {
  static async execute() {
    Logger.phase('Documentation & Reporting');
    
    const results = {
      phase: 'documentation',
      success: true
    };
    
    // Generate final report
    const report = this.generateFinalReport();
    writeFileSync('REVERSE_ENGINEERING_REPORT.md', report);
    
    Logger.success('Final report generated: REVERSE_ENGINEERING_REPORT.md');
    
    return results;
  }
  
  static generateFinalReport() {
    let report = '# Luma Design System Reverse Engineering - Final Report\\n\\n';
    
    // Read comparison results
    if (existsSync('comparison-results.json')) {
      const results = JSON.parse(
        readFileSync('comparison-results.json', 'utf-8')
      );
      
      report += '## Executive Summary\\n\\n';
      report += \`- Overall Accuracy: \${results.overallMatch.toFixed(2)}%\\n\`;
      report += \`- Total Components: \${results.components.length}\\n\\n\`;
      
      report += '## Component Comparison\\n\\n';
      report += '| Component | Match % | Status |\\n';
      report += '|-----------|---------|--------|\\n';
      
      results.components.forEach(comp => {
        const status = comp.matchPercentage >= 99.9 ? '✅ PASS' : '❌ FAIL';
        report += \`| \${comp.name} | \${comp.matchPercentage.toFixed(2)}% | \${status} |\\n\`;
      });
      
      report += '\\n## Next Steps\\n\\n';
      
      if (results.overallMatch >= CONFIG.REQUIRED_ACCURACY) {
        report += '🎉 **SUCCESS**: All components match Luma 1:1!\\n\\n';
        report += '- Deploy Storybook\\n';
        report += '- Publish npm package\\n';
        report += '- Create documentation site\\n';
      } else {
        report += '⚠️ **Action Required**: Components need refinement\\n\\n';
        
        const failing = results.components.filter(c => c.matchPercentage < 99.9);
        report += `${failing.length} components require adjustment:\\n\\n\`;
        
        failing.forEach(comp => {
          report += \`- **\${comp.name}**: \${comp.matchPercentage.toFixed(2)}% match\\n\`;
          report += \`  - \${comp.diffPixels} pixels different\\n\`;
        });
      }
    }
    
    return report;
  }
}

// ============================================================================
// MAIN ORCHESTRATOR
// ============================================================================

class Orchestrator {
  static async execute() {
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + ' '.repeat(78) + '║');
    console.log('║' + '  LUMA STYLE GUIDE REVERSE ENGINEERING - AUTONOMOUS EXECUTION'.padEnd(78) + '║');
    console.log('║' + ' '.repeat(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    console.log('');
    
    const startTime = Date.now();
    const results = {
      phases: [],
      success: false,
      duration: 0
    };
    
    try {
      // Execute all phases
      results.phases.push(await ReconnaissancePhase.execute());
      results.phases.push(await FoundationPhase.execute());
      results.phases.push(await ConstructionPhase.execute());
      results.phases.push(await StorybookPhase.execute());
      results.phases.push(await TestingPhase.execute());
      results.phases.push(await ComparisonPhase.execute());
      results.phases.push(await DocumentationPhase.execute());
      
      // Check overall success
      results.success = results.phases.every(phase => phase.success);
      results.duration = Date.now() - startTime;
      
      // Final summary
      console.log('\\n' + '='.repeat(80));
      console.log('EXECUTION COMPLETE');
      console.log('='.repeat(80));
      console.log(\`Duration: \${(results.duration / 1000 / 60).toFixed(2)} minutes\`);
      console.log(\`Status: \${results.success ? '✅ SUCCESS' : '❌ FAILED'}`);
      
      if (results.success) {
        console.log('\\n🏆 MISSION ACCOMPLISHED: 1:1 Recreation Achieved');
      } else {
        console.log('\\n⚠️ MISSION INCOMPLETE: Review logs for details');
      }
      
    } catch (error) {
      Logger.error('Critical error during execution:');
      Logger.error(error.message);
      console.error(error.stack);
      results.success = false;
    }
    
    return results;
  }
}

// ============================================================================
// START EXECUTION
// ============================================================================

if (require.main === module) {
  Orchestrator.execute()
    .then(results => {
      process.exit(results.success ? 0 : 1);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { Orchestrator };
