#!/usr/bin/env node

/**
 * Extract design tokens from luma.com/style-guide
 * This script captures colors, typography, spacing, shadows, and animations
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function extractLumaDesignTokens() {
  console.log('🚀 Starting Luma Design Token Extraction\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('📡 Navigating to https://luma.com/style-guide...');
  
  try {
    await page.goto('https://luma.com/style-guide', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });
    
    console.log('✅ Page loaded successfully\n');
  } catch (error) {
    console.log('⚠️  Trying main luma.com site as fallback...');
    await page.goto('https://luma.com', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });
  }
  
  console.log('🔍 Extracting design tokens...');
  
  const designTokens = await page.evaluate(() => {
    const tokens = {
      metadata: {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        title: document.title
      },
      colors: {
        extracted: [],
        cssVariables: {}
      },
      typography: {
        fontFamilies: new Set(),
        fontSizes: new Set(),
        fontWeights: new Set(),
        lineHeights: new Set(),
        letterSpacings: new Set(),
        elements: []
      },
      spacing: {
        margins: new Set(),
        paddings: new Set(),
        gaps: new Set(),
        elements: []
      },
      shadows: {
        boxShadows: new Set(),
        textShadows: new Set()
      },
      borderRadius: new Set(),
      animations: {
        transitions: new Set(),
        animationDurations: new Set(),
        animationTimingFunctions: new Set(),
        elements: []
      },
      components: []
    };
    
    // Extract CSS custom properties from :root
    const rootStyles = getComputedStyle(document.documentElement);
    const allStyles = Array.from(document.styleSheets)
      .flatMap(sheet => {
        try {
          return Array.from(sheet.cssRules || []);
        } catch (e) {
          return [];
        }
      });
    
    // Get CSS variables
    allStyles.forEach(rule => {
      if (rule.style) {
        Array.from(rule.style).forEach(prop => {
          if (prop.startsWith('--')) {
            const value = rootStyles.getPropertyValue(prop).trim();
            if (value) {
              tokens.colors.cssVariables[prop] = value;
            }
          }
        });
      }
    });
    
    // Extract from all visible elements
    const allElements = Array.from(document.querySelectorAll('*'));
    
    allElements.forEach((el, index) => {
      // Skip hidden elements
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return;
      
      const computed = window.getComputedStyle(el);
      const tagName = el.tagName.toLowerCase();
      const classes = Array.from(el.classList);
      
      // Extract colors
      ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
          tokens.colors.extracted.push({
            property: prop,
            value: value,
            element: tagName,
            classes: classes
          });
        }
      });
      
      // Extract typography
      if (computed.fontSize && parseFloat(computed.fontSize) > 0) {
        tokens.typography.fontFamilies.add(computed.fontFamily);
        tokens.typography.fontSizes.add(computed.fontSize);
        tokens.typography.fontWeights.add(computed.fontWeight);
        tokens.typography.lineHeights.add(computed.lineHeight);
        tokens.typography.letterSpacings.add(computed.letterSpacing);
        
        // Sample some text elements for detail
        if (index % 50 === 0 && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button'].includes(tagName)) {
          tokens.typography.elements.push({
            element: tagName,
            classes: classes,
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            lineHeight: computed.lineHeight,
            letterSpacing: computed.letterSpacing,
            textTransform: computed.textTransform
          });
        }
      }
      
      // Extract spacing
      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== '0px') {
          tokens.spacing.margins.add(value);
        }
      });
      
      ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== '0px') {
          tokens.spacing.paddings.add(value);
        }
      });
      
      ['gap', 'rowGap', 'columnGap'].forEach(prop => {
        const value = computed[prop];
        if (value && value !== '0px' && value !== 'normal') {
          tokens.spacing.gaps.add(value);
        }
      });
      
      // Sample spacing elements
      if (index % 100 === 0) {
        tokens.spacing.elements.push({
          element: tagName,
          classes: classes,
          margin: computed.margin,
          padding: computed.padding,
          gap: computed.gap
        });
      }
      
      // Extract shadows
      if (computed.boxShadow && computed.boxShadow !== 'none') {
        tokens.shadows.boxShadows.add(computed.boxShadow);
      }
      if (computed.textShadow && computed.textShadow !== 'none') {
        tokens.shadows.textShadows.add(computed.textShadow);
      }
      
      // Extract border radius
      if (computed.borderRadius && computed.borderRadius !== '0px') {
        tokens.borderRadius.add(computed.borderRadius);
      }
      
      // Extract animations
      if (computed.transition && computed.transition !== 'all 0s ease 0s' && computed.transition !== 'none') {
        tokens.animations.transitions.add(computed.transition);
      }
      if (computed.animationDuration && computed.animationDuration !== '0s') {
        tokens.animations.animationDurations.add(computed.animationDuration);
      }
      if (computed.animationTimingFunction && computed.animationTimingFunction !== 'ease') {
        tokens.animations.animationTimingFunctions.add(computed.animationTimingFunction);
      }
      
      // Sample animation elements
      if ((computed.transition && computed.transition !== 'all 0s ease 0s' && computed.transition !== 'none') || 
          (computed.animationName && computed.animationName !== 'none')) {
        tokens.animations.elements.push({
          element: tagName,
          classes: classes,
          transition: computed.transition,
          animationName: computed.animationName,
          animationDuration: computed.animationDuration,
          animationTimingFunction: computed.animationTimingFunction
        });
      }
      
      // Extract component patterns (buttons, inputs, cards, etc.)
      const componentPatterns = ['button', 'input', 'card', 'modal', 'dialog', 'select', 'dropdown', 'checkbox', 'radio', 'switch', 'slider', 'tab', 'accordion', 'tooltip', 'popover', 'alert', 'badge', 'avatar'];
      const classStr = classes.join(' ').toLowerCase();
      
      if (componentPatterns.some(pattern => classStr.includes(pattern) || tagName === pattern)) {
        tokens.components.push({
          type: tagName,
          classes: classes,
          innerHTML: el.innerHTML.substring(0, 200), // Sample only
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
            height: rect.height
          }
        });
      }
    });
    
    // Convert Sets to Arrays for JSON serialization
    tokens.typography.fontFamilies = Array.from(tokens.typography.fontFamilies);
    tokens.typography.fontSizes = Array.from(tokens.typography.fontSizes).sort((a, b) => parseFloat(a) - parseFloat(b));
    tokens.typography.fontWeights = Array.from(tokens.typography.fontWeights).sort((a, b) => parseInt(a) - parseInt(b));
    tokens.typography.lineHeights = Array.from(tokens.typography.lineHeights);
    tokens.typography.letterSpacings = Array.from(tokens.typography.letterSpacings);
    
    tokens.spacing.margins = Array.from(tokens.spacing.margins).sort((a, b) => parseFloat(a) - parseFloat(b));
    tokens.spacing.paddings = Array.from(tokens.spacing.paddings).sort((a, b) => parseFloat(a) - parseFloat(b));
    tokens.spacing.gaps = Array.from(tokens.spacing.gaps).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    tokens.shadows.boxShadows = Array.from(tokens.shadows.boxShadows);
    tokens.shadows.textShadows = Array.from(tokens.shadows.textShadows);
    
    tokens.borderRadius = Array.from(tokens.borderRadius).sort((a, b) => parseFloat(a) - parseFloat(b));
    
    tokens.animations.transitions = Array.from(tokens.animations.transitions);
    tokens.animations.animationDurations = Array.from(tokens.animations.animationDurations).sort((a, b) => parseFloat(a) - parseFloat(b));
    tokens.animations.animationTimingFunctions = Array.from(tokens.animations.animationTimingFunctions);
    
    return tokens;
  });
  
  console.log('✅ Extraction complete!\n');
  
  // Summary
  console.log('📊 Summary:');
  console.log(`  Colors extracted: ${designTokens.colors.extracted.length}`);
  console.log(`  CSS variables: ${Object.keys(designTokens.colors.cssVariables).length}`);
  console.log(`  Font families: ${designTokens.typography.fontFamilies.length}`);
  console.log(`  Font sizes: ${designTokens.typography.fontSizes.length}`);
  console.log(`  Spacing values: ${designTokens.spacing.margins.length + designTokens.spacing.paddings.length + designTokens.spacing.gaps.length}`);
  console.log(`  Box shadows: ${designTokens.shadows.boxShadows.length}`);
  console.log(`  Border radius values: ${designTokens.borderRadius.length}`);
  console.log(`  Components found: ${designTokens.components.length}`);
  console.log('');
  
  // Save to file
  const outputPath = join(__dirname, 'luma-extracted-data.json');
  writeFileSync(outputPath, JSON.stringify(designTokens, null, 2));
  
  console.log(`💾 Saved to: ${outputPath}\n`);
  
  await browser.close();
  
  return designTokens;
}

// Run the extraction
extractLumaDesignTokens()
  .then(() => {
    console.log('🎉 Extraction completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Extraction failed:', error);
    process.exit(1);
  });

