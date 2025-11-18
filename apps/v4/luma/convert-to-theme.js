#!/usr/bin/env node

/**
 * Convert extracted Luma design tokens to OKLCH format
 * and map to shadcn semantic token structure
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to convert RGB to OKLCH
// Using a simplified conversion (for accurate conversion, we'd use a library like culori)
function rgbToOklch(r, g, b) {
  // Normalize RGB values to 0-1
  r /= 255;
  g /= 255;
  b /= 255;
  
  // Convert to linear RGB
  const toLinear = (c) => {
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  
  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);
  
  // Convert to XYZ
  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375;
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.0721750;
  const z = rLinear * 0.0193339 + gLinear * 0.1191920 + bLinear * 0.9503041;
  
  // Simplified OKLCH approximation
  // Lightness
  const l = Math.cbrt(y);
  
  // Chroma (simplified - actual calculation is more complex)
  const a = x - y;
  const bVal = y - z;
  const c = Math.sqrt(a * a + bVal * bVal);
  
  // Hue
  let h = Math.atan2(bVal, a) * 180 / Math.PI;
  if (h < 0) h += 360;
  
  return {
    l: Math.round(l * 1000) / 1000,
    c: Math.round(c * 1000) / 1000,
    h: Math.round(h * 100) / 100
  };
}

// Parse RGB color string
function parseRgb(rgbString) {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    };
  }
  return null;
}

// Parse HEX color string
function parseHex(hexString) {
  const hex = hexString.replace('#', '');
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16)
    };
  }
  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16)
  };
}

// Convert color string to OKLCH
function colorToOklch(colorString) {
  if (colorString.startsWith('rgb')) {
    const rgb = parseRgb(colorString);
    if (rgb) {
      return rgbToOklch(rgb.r, rgb.g, rgb.b);
    }
  } else if (colorString.startsWith('#')) {
    const rgb = parseHex(colorString);
    return rgbToOklch(rgb.r, rgb.g, rgb.b);
  }
  return null;
}

// Format OKLCH for CSS
function formatOklch(oklch) {
  return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`;
}

function convertLumaToTheme() {
  console.log('🔄 Converting Luma tokens to shadcn theme format\n');
  
  // Read extracted data
  const extractedData = JSON.parse(
    readFileSync(join(__dirname, 'luma-extracted-data.json'), 'utf-8')
  );
  
  const cssVars = extractedData.colors.cssVariables;
  
  // Extract key Luma colors
  console.log('📊 Analyzing Luma color system...');
  
  // Map Luma colors to shadcn semantic tokens
  // Based on Luma's design, we'll use:
  // - white/gray-10 for light backgrounds
  // - gray-100/black for dark backgrounds  
  // - blue as primary color
  // - gray scale for neutral colors
  
  const theme = {
    name: 'luma',
    label: 'Luma',
    cssVars: {
      light: {},
      dark: {}
    }
  };
  
  // Light mode mapping
  console.log('🌞 Creating light mode theme...');
  
  const white = colorToOklch(cssVars['--white']);
  const gray10 = colorToOklch(cssVars['--gray-10']);
  const gray20 = colorToOklch(cssVars['--gray-20']);
  const gray30 = colorToOklch(cssVars['--gray-30']);
  const gray50 = colorToOklch(cssVars['--gray-50']);
  const gray60 = colorToOklch(cssVars['--gray-60']);
  const gray80 = colorToOklch(cssVars['--gray-80']);
  const gray90 = colorToOklch(cssVars['--gray-90']);
  const gray100 = colorToOklch(cssVars['--gray-100']);
  const black = colorToOklch(cssVars['--black']);
  
  const blue50 = colorToOklch(cssVars['--blue-50']);
  const blue60 = colorToOklch(cssVars['--blue-60']);
  const blue30 = colorToOklch(cssVars['--blue-30']);
  
  const green50 = colorToOklch(cssVars['--green-50']);
  const cranberry50 = colorToOklch(cssVars['--cranberry-50']);
  
  // Light mode
  theme.cssVars.light = {
    background: `${white.l} ${white.c} ${white.h}`,
    foreground: `${black.l} ${black.c} ${black.h}`,
    card: `${white.l} ${white.c} ${white.h}`,
    'card-foreground': `${black.l} ${black.c} ${black.h}`,
    popover: `${white.l} ${white.c} ${white.h}`,
    'popover-foreground': `${black.l} ${black.c} ${black.h}`,
    primary: `${blue50.l} ${blue50.c} ${blue50.h}`,
    'primary-foreground': `${white.l} ${white.c} ${white.h}`,
    secondary: `${gray10.l} ${gray10.c} ${gray10.h}`,
    'secondary-foreground': `${gray100.l} ${gray100.c} ${gray100.h}`,
    muted: `${gray10.l} ${gray10.c} ${gray10.h}`,
    'muted-foreground': `${gray60.l} ${gray60.c} ${gray60.h}`,
    accent: `${gray20.l} ${gray20.c} ${gray20.h}`,
    'accent-foreground': `${gray100.l} ${gray100.c} ${gray100.h}`,
    destructive: `${cranberry50.l} ${cranberry50.c} ${cranberry50.h}`,
    'destructive-foreground': `${white.l} ${white.c} ${white.h}`,
    border: `${gray30.l} ${gray30.c} ${gray30.h}`,
    input: `${gray30.l} ${gray30.c} ${gray30.h}`,
    ring: `${blue50.l} ${blue50.c} ${blue50.h}`,
    radius: '0.5rem',
    'chart-1': `${blue30.l} ${blue30.c} ${blue30.h}`,
    'chart-2': `${green50.l} ${green50.c} ${green50.h}`,
    'chart-3': `${blue60.l} ${blue60.c} ${blue60.h}`,
    'chart-4': `${gray50.l} ${gray50.c} ${gray50.h}`,
    'chart-5': `${cranberry50.l} ${cranberry50.c} ${cranberry50.h}`
  };
  
  console.log('🌙 Creating dark mode theme...');
  
  // Dark mode
  theme.cssVars.dark = {
    background: `${black.l} ${black.c} ${black.h}`,
    foreground: `${white.l} ${white.c} ${white.h}`,
    card: `${gray100.l} ${gray100.c} ${gray100.h}`,
    'card-foreground': `${white.l} ${white.c} ${white.h}`,
    popover: `${gray90.l} ${gray90.c} ${gray90.h}`,
    'popover-foreground': `${white.l} ${white.c} ${white.h}`,
    primary: `${blue30.l} ${blue30.c} ${blue30.h}`,
    'primary-foreground': `${black.l} ${black.c} ${black.h}`,
    secondary: `${gray90.l} ${gray90.c} ${gray90.h}`,
    'secondary-foreground': `${white.l} ${white.c} ${white.h}`,
    muted: `${gray90.l} ${gray90.c} ${gray90.h}`,
    'muted-foreground': `${gray50.l} ${gray50.c} ${gray50.h}`,
    accent: `${gray80.l} ${gray80.c} ${gray80.h}`,
    'accent-foreground': `${white.l} ${white.c} ${white.h}`,
    destructive: `${cranberry50.l} ${cranberry50.c} ${cranberry50.h}`,
    'destructive-foreground': `${white.l} ${white.c} ${white.h}`,
    border: `${gray80.l} ${gray80.c} ${gray80.h}`,
    input: `${gray80.l} ${gray80.c} ${gray80.h}`,
    ring: `${blue30.l} ${blue30.c} ${blue30.h}`,
    'chart-1': `${blue30.l} ${blue30.c} ${blue30.h}`,
    'chart-2': `${green50.l} ${green50.c} ${green50.h}`,
    'chart-3': `${blue60.l} ${blue60.c} ${blue60.h}`,
    'chart-4': `${gray50.l} ${gray50.c} ${gray50.h}`,
    'chart-5': `${cranberry50.l} ${cranberry50.c} ${cranberry50.h}`
  };
  
  // Save theme
  const outputPath = join(__dirname, 'luma-theme.json');
  writeFileSync(outputPath, JSON.stringify(theme, null, 2));
  
  console.log(`\n✅ Theme conversion complete!`);
  console.log(`💾 Saved to: ${outputPath}\n`);
  
  // Also create the baseColorsV4 format
  const baseColorsV4Format = {
    luma: {
      light: theme.cssVars.light,
      dark: theme.cssVars.dark
    }
  };
  
  const baseColorsPath = join(__dirname, 'luma-base-colors.json');
  writeFileSync(baseColorsPath, JSON.stringify(baseColorsV4Format, null, 2));
  
  console.log(`📦 Also saved baseColorsV4 format to: ${baseColorsPath}\n`);
  
  return theme;
}

// Run the conversion
convertLumaToTheme()
  .then(() => {
    console.log('🎉 Conversion completed successfully!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  });


