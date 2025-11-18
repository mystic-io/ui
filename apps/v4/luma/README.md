# Luma Style Guide Reverse Engineering System

This repository contains a complete autonomous system for reverse engineering the [Luma](https://luma.com/style-guide) style guide and recreating it 1:1 using shadcn/ui components built on Radix UI primitives.

## 🎯 Mission Objective

Create a **pixel-perfect, zero-tolerance** recreation of Luma's design system with:
- ✅ 1:1 visual accuracy (0% tolerance)
- ✅ shadcn/ui + Radix UI primitives
- ✅ Complete Storybook documentation
- ✅ Comprehensive test coverage
- ✅ Automated validation

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Internet connection (for accessing Luma style guide)
- ~30GB disk space
- Claude Code (for autonomous execution)

## 🚀 Quick Start

### Option 1: Autonomous Execution (Recommended)

```bash
# Run the autonomous orchestrator
node orchestrator.js
```

The system will:
1. Extract all design data from Luma style guide
2. Set up project with React + TypeScript + shadcn/ui
3. Generate design tokens from extracted data
4. Build all components using Radix primitives
5. Create Storybook stories for every component
6. Run comprehensive tests (visual, interaction, a11y)
7. Compare pixel-by-pixel with Luma
8. Generate final validation report

### Option 2: Manual Execution with Claude Code

1. **Read the meta prompt:**
```bash
cat LUMA_REVERSE_ENGINEERING_PROMPT.md
```

2. **Use Claude Code:**
```bash
# In Claude Code, paste this prompt:
"Execute the Luma style guide reverse engineering following the complete protocol in LUMA_REVERSE_ENGINEERING_PROMPT.md. Operate autonomously with zero tolerance for divergence from the original. Use shadcn/ui and Radix UI primitives exclusively."
```

## 📁 Project Structure

After execution, you'll have:

```
luma-design-system/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── button.stories.tsx
│   │       ├── button.test.tsx
│   │       └── ... (all components)
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── animations.ts
│   │   └── shadows.ts
│   └── styles/
│       ├── globals.css
│       └── tokens.css
├── tests/
│   ├── visual/
│   ├── interaction/
│   ├── a11y/
│   └── unit/
├── comparison/
│   ├── screenshots/
│   │   ├── luma/
│   │   ├── ours/
│   │   └── diff/
│   └── reports/
│       ├── css-comparison.json
│       └── validation-results.json
└── REVERSE_ENGINEERING_REPORT.md
```

## 🧪 Running Tests

```bash
# Unit tests
pnpm test

# Visual regression tests
pnpm exec playwright test

# Accessibility tests
pnpm exec playwright test --grep @a11y

# Run all tests
pnpm test:all
```

## 📚 View Storybook

```bash
# Start Storybook
pnpm run storybook

# Build Storybook
pnpm run build-storybook
```

Open http://localhost:6006 to view components.

## 🔍 Validation & Comparison

### View Comparison Results

```bash
# Open comparison report
cat comparison-results.json

# View final report
cat REVERSE_ENGINEERING_REPORT.md
```

### Manual Comparison

```bash
# Run comparison script
node compare-with-luma.js
```

This generates:
- Pixel-by-pixel diff images
- CSS property comparisons
- Interaction behavior validation
- Accessibility audit comparison

## 📊 Success Criteria

Each component must achieve:

- ✅ **100% visual match** (pixel-perfect)
- ✅ **100% CSS match** (all properties identical)
- ✅ **100% interaction match** (hover, active, focus, disabled)
- ✅ **100% accessibility match** (ARIA, keyboard, screen reader)
- ✅ **Zero console errors**
- ✅ **Zero accessibility violations**

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **UI Primitives:** Radix UI
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS + CSS Variables
- **Build Tool:** Vite
- **Documentation:** Storybook 8
- **Testing:** Vitest + Playwright + Chromatic
- **Package Manager:** pnpm

## 📖 Component List

Components extracted and recreated:

### Inputs
- [ ] Button (all variants)
- [ ] Input (text, email, password, number, search)
- [ ] Textarea
- [ ] Select
- [ ] Checkbox
- [ ] Radio Group
- [ ] Switch
- [ ] Slider
- [ ] Label

### Feedback
- [ ] Alert / Toast
- [ ] Progress
- [ ] Spinner
- [ ] Badge
- [ ] Avatar

### Overlays
- [ ] Dialog / Modal
- [ ] Popover
- [ ] Tooltip
- [ ] Dropdown Menu
- [ ] Context Menu

### Layout
- [ ] Card
- [ ] Separator
- [ ] Accordion
- [ ] Tabs
- [ ] Collapsible

### Navigation
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Menu
- [ ] Sidebar

### Data Display
- [ ] Table
- [ ] List
- [ ] Calendar
- [ ] Date Picker
- [ ] Command Palette

## 🎨 Design Tokens

All tokens are extracted from Luma and available in:

```typescript
// Colors
import { colors } from '@/tokens/colors';

// Typography
import { typography } from '@/tokens/typography';

// Spacing
import { spacing } from '@/tokens/spacing';

// Animations
import { animations } from '@/tokens/animations';
```

## 🤖 Autonomous Execution Details

The orchestrator follows this flow:

1. **Reconnaissance** (5-10 min)
   - Fetches Luma style guide
   - Extracts all CSS, HTML, and design data
   - Captures baseline screenshots

2. **Foundation** (10-15 min)
   - Sets up project structure
   - Installs dependencies
   - Generates design tokens

3. **Construction** (2-4 hours)
   - Identifies all components
   - Builds each with Radix primitives
   - Creates stories and tests

4. **Storybook** (5-10 min)
   - Builds documentation
   - Starts development server

5. **Testing** (30-60 min)
   - Runs all test suites
   - Validates functionality

6. **Comparison** (15-30 min)
   - Pixel-by-pixel comparison
   - CSS property analysis
   - Generates diff images

7. **Documentation** (5 min)
   - Creates final report
   - Summarizes results

**Total estimated time:** 3-6 hours

## 🔧 Advanced Usage

### Custom Extraction

```bash
# Extract specific components only
node extract-luma-styles.js --components=button,input,card

# Extract with custom selectors
node extract-luma-styles.js --selectors='.btn,.input-field'
```

### Fine-tune Comparison

```javascript
// compare-config.js
module.exports = {
  threshold: 0, // 0 = zero tolerance
  maxDiffPixels: 0,
  compareCSS: true,
  compareInteractions: true,
  compareA11y: true
};
```

### Continuous Comparison

```bash
# Watch mode - compares on file change
pnpm run watch:compare
```

## 📝 Prompt for Claude Code

Use this exact prompt in Claude Code:

```
I need you to reverse engineer the Luma style guide at https://luma.com/style-guide and create a 1:1 pixel-perfect recreation using shadcn/ui components built on Radix UI primitives.

Follow the complete protocol in LUMA_REVERSE_ENGINEERING_PROMPT.md:

1. Execute autonomously without stopping
2. Zero tolerance for any visual divergence
3. Use only shadcn/ui and Radix primitives
4. Extract all components, tokens, and styles
5. Create comprehensive Storybook documentation
6. Run all tests (visual, interaction, a11y)
7. Generate pixel-by-pixel comparison report
8. Stop only when validation shows 100% match

Use the orchestrator.js script or execute phases manually. Report only completion status and validation results.
```

## 🐛 Troubleshooting

### Extraction fails
```bash
# Use alternative extraction method
node extract-luma-styles.js --method=puppeteer-stealth
```

### Comparison shows differences
```bash
# Generate detailed CSS diff
node compare-with-luma.js --detailed

# View diff images
open comparison/diff-*.png
```

### Tests failing
```bash
# Run specific test
pnpm test components/ui/button.test.tsx

# Debug mode
pnpm test --debug
```

## 📄 License

This is a reverse engineering project for educational and development purposes. Luma's original design remains their intellectual property.

## 🤝 Contributing

This is an autonomous system. Contributions should focus on:
- Improving extraction accuracy
- Enhancing comparison algorithms
- Adding new validation checks
- Optimizing performance

## 📞 Support

For issues or questions:
1. Check REVERSE_ENGINEERING_REPORT.md
2. Review comparison/reports/validation-results.json
3. Inspect diff images in comparison/screenshots/diff/

## 🎯 Success Metrics

Target metrics:
- **Visual Accuracy:** 100.00%
- **CSS Match:** 100.00%
- **Interaction Parity:** 100.00%
- **Accessibility:** 100.00%
- **Performance:** ≤110% of Luma's bundle size

Current status: See REVERSE_ENGINEERING_REPORT.md

---

**Built with ❤️ using Claude Code autonomous execution**
