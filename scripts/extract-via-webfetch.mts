/**
 * Since Puppeteer can't run, we'll use a multi-pass WebFetch approach
 * to extract everything from the Luma style guide
 */

export const extractionPlan = {
  passes: [
    {
      name: 'full-structure',
      prompt: `Extract the complete HTML structure of the page. Return:
1. Complete list of all component sections visible on the page
2. All navigation links and section titles
3. The overall page structure and layout
4. List all unique component types you can identify (buttons, inputs, cards, etc.)
Format as detailed JSON.`
    },
    {
      name: 'css-variables',
      prompt: `Extract ALL CSS custom properties (variables starting with --) from the page. For each variable provide:
1. Variable name
2. Variable value
3. Where it's defined (root, body, or other selector)
4. What it seems to control (color, spacing, font, etc.)
Return as JSON object with variable names as keys.`
    },
    {
      name: 'typography',
      prompt: `Extract all typography settings:
1. All font-family declarations
2. All font-size values used
3. All font-weight values
4. All line-height values
5. All letter-spacing values
6. Font loading (@font-face rules)
7. Text color variations
Return as detailed JSON with examples.`
    },
    {
      name: 'colors',
      prompt: `Extract the complete color system:
1. All color variables (hex, rgb, hsl)
2. Background colors used
3. Text colors used
4. Border colors used
5. Shadow colors
6. Color names/labels if visible
7. Dark mode vs light mode colors
Return as JSON with categorization.`
    },
    {
      name: 'spacing',
      prompt: `Extract all spacing values:
1. All padding values used
2. All margin values used
3. All gap values (for flex/grid)
4. Spacing scale/system if visible
5. Border radius values
Return as JSON.`
    },
    {
      name: 'components-buttons',
      prompt: `Extract all button components in extreme detail:
1. HTML structure for each button variant
2. All CSS classes used
3. All computed styles (colors, padding, border, etc.)
4. Different states (default, hover, active, disabled, focus)
5. Different sizes if available
6. Different variants (primary, secondary, outline, etc.)
7. Icon buttons if present
For EACH button variant, provide complete HTML and CSS.`
    },
    {
      name: 'components-inputs',
      prompt: `Extract all input/form components in extreme detail:
1. HTML structure for each input type
2. Text inputs, textareas, selects, checkboxes, radios
3. All CSS classes and computed styles
4. Different states (default, focus, error, disabled)
5. Labels and helper text styling
6. Validation states if visible
For EACH input variant, provide complete HTML and CSS.`
    },
    {
      name: 'components-other',
      prompt: `Extract all other UI components visible:
1. Cards/containers
2. Modals/dialogs/overlays
3. Dropdowns/menus
4. Tooltips
5. Badges/tags
6. Alerts/banners
7. Navigation elements
8. Tabs/accordions
9. Any other components
For EACH, provide complete HTML structure and CSS.`
    },
    {
      name: 'interactions',
      prompt: `Extract all interaction patterns:
1. Hover effects (transitions, color changes, etc.)
2. Focus styles
3. Active states
4. Transition/animation properties used
5. Transform properties
6. Cursor styles
Return as detailed JSON.`
    },
    {
      name: 'layout',
      prompt: `Extract layout system:
1. Container widths and max-widths
2. Grid systems used
3. Flexbox patterns
4. Responsive breakpoints if visible
5. z-index values used
6. Position values
Return as JSON.`
    }
  ]
}

console.log('Extraction plan created with', extractionPlan.passes.length, 'passes')
console.log('Run each pass manually using WebFetch tool')
