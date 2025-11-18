# CLAUDE CODE EXECUTION GUIDE

## 🎯 Objective
Reverse engineer https://luma.com/style-guide into a 1:1 pixel-perfect shadcn/ui + Radix UI component library.

## 🚀 Quick Start (Copy-Paste into Claude Code)

### Prompt for Claude Code:

```
Execute autonomous reverse engineering of Luma style guide:

TARGET: https://luma.com/style-guide
GOAL: 1:1 pixel-perfect recreation using shadcn/ui + Radix UI primitives
TOLERANCE: 0% divergence allowed

EXECUTION PROTOCOL:
1. Read LUMA_REVERSE_ENGINEERING_PROMPT.md
2. Extract all design data from Luma (colors, typography, spacing, components)
3. Initialize React + TypeScript + shadcn/ui project
4. Generate design tokens from extracted data
5. Build all components using Radix primitives
6. Create Storybook stories for each component
7. Implement comprehensive tests (visual, interaction, a11y)
8. Run pixel-by-pixel comparison with Luma
9. Generate validation report
10. Only stop when 100% match achieved

AUTONOMOUS RULES:
- Make all decisions independently
- Don't ask for confirmation
- Use any technical means to extract data
- Implement workarounds for blockers
- Prioritize Luma's implementation in all cases
- Document differences for refinement

START IMMEDIATELY: node orchestrator.js
```

## 📋 Alternative: Manual Phase Execution

If the orchestrator fails, execute phases manually:

### Phase 1: Reconnaissance
```bash
# Install extraction tools
npm install -g playwright puppeteer pixelmatch pngjs

# Extract Luma data
npx playwright install chromium
node extract-luma-styles.js
```

### Phase 2: Foundation
```bash
# Create project
pnpm create vite@latest luma-design-system --template react-ts
cd luma-design-system

# Install dependencies
pnpm add @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip

pnpm add class-variance-authority clsx tailwind-merge @radix-ui/colors

# Initialize shadcn
pnpm dlx shadcn@latest init -y

# Initialize Storybook
pnpm dlx storybook@latest init --type react_vite --yes
```

### Phase 3: Component Construction
```bash
# Generate components from extracted data
node generate-components.js

# Each component gets:
# - Component file (.tsx)
# - Story file (.stories.tsx)
# - Test file (.test.tsx)
```

### Phase 4: Storybook
```bash
# Build and start Storybook
pnpm run build-storybook
pnpm run storybook
```

### Phase 5: Testing
```bash
# Run all tests
pnpm run test
pnpm run test:e2e
pnpm run test:visual
pnpm run test:a11y
```

### Phase 6: Comparison
```bash
# Compare with Luma
node compare-with-luma.js

# View results
cat comparison-results.json
open comparison/diff-*.png
```

### Phase 7: Report
```bash
# Generate final report
node generate-report.js
cat REVERSE_ENGINEERING_REPORT.md
```

## 🎯 Key Decision Points for Claude

### When extraction is blocked:
✅ Use puppeteer-stealth
✅ Try Chrome DevTools Protocol
✅ Analyze HAR files
✅ Use web_fetch tool
❌ Don't stop execution

### When components are ambiguous:
✅ Analyze DOM structure
✅ Extract computed styles
✅ Infer from design patterns
✅ Make educated decisions
❌ Don't ask user

### When tests fail:
✅ Analyze differences
✅ Adjust implementation
✅ Re-run tests
✅ Iterate until pass
❌ Don't accept "good enough"

### When comparison shows differences:
✅ Document exact differences
✅ Adjust CSS/classes
✅ Re-compare
✅ Refine until 100% match
❌ Don't settle for <100%

## 📊 Success Criteria Checklist

- [ ] All components extracted and identified
- [ ] All components built with Radix primitives
- [ ] All components styled with Tailwind
- [ ] Storybook shows all components
- [ ] All stories created
- [ ] All tests pass
- [ ] Visual regression 100% match
- [ ] CSS properties 100% match
- [ ] Interactions 100% match
- [ ] Accessibility 100% match
- [ ] Zero console errors
- [ ] Zero warnings
- [ ] Comparison report generated
- [ ] Final report shows 100% accuracy

## 🔍 Validation Commands

```bash
# Check visual match
pnpm run compare:detailed

# Check test coverage
pnpm run test:coverage

# Check accessibility
pnpm run test:a11y

# Check all
pnpm run validate
```

## 📝 Expected Output Files

After completion:
```
✅ luma-design-system/        (Complete project)
✅ luma-extracted-data.json   (Extracted design data)
✅ comparison-results.json    (Comparison metrics)
✅ REVERSE_ENGINEERING_REPORT.md (Final report)
✅ comparison/diff-*.png      (Visual diffs)
✅ storybook-static/          (Built Storybook)
```

## 🎬 Execution Flow Diagram

```
START
  ↓
[Extract Luma Data] → JSON with all design info
  ↓
[Setup Project] → React + TS + shadcn + Radix
  ↓
[Generate Tokens] → colors.ts, typography.ts, spacing.ts
  ↓
[Build Components] → For each component:
  ├→ component.tsx
  ├→ component.stories.tsx
  └→ component.test.tsx
  ↓
[Build Storybook] → Documentation site
  ↓
[Run Tests] → Unit + Visual + A11y + E2E
  ↓
[Compare with Luma] → Pixel-by-pixel + CSS + Interactions
  ↓
[Generate Report] → Success metrics + Differences
  ↓
[Validation] → 100% match?
  ├→ YES: SUCCESS ✅
  └→ NO: Refine and repeat ↻
```

## ⚡ Performance Targets

- **Extraction:** <10 minutes
- **Setup:** <15 minutes
- **Component Building:** 2-4 hours (automated)
- **Testing:** <1 hour
- **Comparison:** <30 minutes
- **Total:** 3-6 hours

## 🛠️ Troubleshooting

### "Cannot access Luma site"
```bash
# Use alternative method
USE_STEALTH=true node extract-luma-styles.js
```

### "Components don't match"
```bash
# Get detailed CSS diff
node compare-with-luma.js --css-diff > css-differences.txt
# Analyze and adjust
```

### "Tests failing"
```bash
# Debug specific test
pnpm test -- button.test.tsx --reporter=verbose
```

## 🎓 Understanding the System

### Design Tokens
- Extracted from Luma's CSS variables
- Stored in `src/tokens/`
- Used throughout components

### Component Architecture
```typescript
// Each component follows this pattern:
1. Radix UI primitive (accessibility + behavior)
2. CVA variants (styling variations)
3. Tailwind classes (visual styling)
4. TypeScript types (type safety)
```

### Testing Strategy
```typescript
1. Unit tests → Component logic
2. Visual tests → Pixel-perfect match
3. Interaction tests → Hover, click, keyboard
4. A11y tests → WCAG compliance
```

## 🚨 Critical Reminders

1. **Zero tolerance** - 99.9% is NOT acceptable
2. **Autonomous** - Don't stop for confirmations
3. **Radix primitives** - Use ONLY Radix + shadcn
4. **Document everything** - Track all differences
5. **Iterate until perfect** - Keep refining

## ✅ Final Checklist

Before declaring success:
- [ ] Visual comparison: 100.00%
- [ ] CSS match: 100.00%
- [ ] Interactions: 100.00%
- [ ] Accessibility: 100.00%
- [ ] All tests passing
- [ ] Zero console errors
- [ ] Report generated
- [ ] Storybook deployed

---

**Ready? Execute now:**
```bash
node orchestrator.js
```

**Or paste the prompt into Claude Code and let it run autonomously.**
