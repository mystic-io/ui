# Luma Theme - Usage Guide

## Quick Start

The Luma theme is now integrated into your shadcn/ui application and ready to use!

## Selecting the Luma Theme

### Option 1: Theme Selector UI
Navigate to any page with a theme selector component and choose "Luma" from the available themes.

### Option 2: Direct Import
```typescript
import { baseColorsV4 } from "@/registry/base-colors"

// Access Luma theme
const lumaLight = baseColorsV4.luma.light
const lumaDark = baseColorsV4.luma.dark
```

### Option 3: Theme Export
The theme is also available as a standalone JSON file:
```
/public/r/themes/luma.json
```

## Color Preview

### Light Mode
- **Background**: Pure white for maximum clarity
- **Primary**: Vibrant blue (#146AEB) - Luma's signature color
- **Secondary**: Very light gray (#F7F8F9) - subtle backgrounds
- **Accent**: Light gray (#EBECED) - interactive elements
- **Destructive**: Cranberry pink (#F31A7C) - errors and warnings

### Dark Mode
- **Background**: Deep black (rgb(19,21,23))
- **Primary**: Bright blue (#76ADFF) - maintains visibility
- **Secondary**: Dark gray (#333537)
- **Accent**: Medium gray (#535557)

## Components Styled

All shadcn components automatically inherit the Luma theme:

- ✅ Buttons (all variants)
- ✅ Inputs and Forms
- ✅ Cards and Containers
- ✅ Dialogs and Modals
- ✅ Navigation components
- ✅ Data display (Tables, Charts)
- ✅ Sidebar components
- ✅ All other shadcn/ui components

## Typography

The theme uses **Inter** font family, which is already configured:
- Font Family: Inter (with system fallbacks)
- Base Size: 16px
- Weights: 400 (regular), 600 (semibold)

## Customizing the Theme

### Modifying Colors
Edit `apps/v4/registry/base-colors.ts`:

```typescript
// Find the luma entry in baseColorsV4
luma: {
  light: {
    primary: "oklch(0.548 0.644 273.55)", // Change this
    // ... other colors
  }
}
```

### Adding New Semantic Tokens
Follow the existing pattern in `baseColorsV4.luma`:

```typescript
"your-custom-token": "oklch(L C H)", // Light mode
```

Then add to dark mode as well.

## Examples

### Button with Luma Theme
```tsx
import { Button } from "@/components/ui/button"

export function LumaButton() {
  return (
    <Button variant="default">
      Styled with Luma Theme
    </Button>
  )
}
```

### Card with Luma Theme
```tsx
import { Card } from "@/components/ui/card"

export function LumaCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Luma Styled Card</h3>
      <p className="text-muted-foreground">
        Automatically uses Luma's color palette
      </p>
    </Card>
  )
}
```

## Accessibility

The Luma theme maintains WCAG AA compliance:
- ✅ Sufficient contrast ratios
- ✅ Focus indicators visible
- ✅ Color-blind friendly palette
- ✅ Dark mode support

## Comparison with Original

| Aspect | Luma Original | Theme Implementation |
|--------|---------------|---------------------|
| Primary Color | Blue (#146AEB) | ✅ Exact match |
| Gray Scale | 10 shades | ✅ Fully mapped |
| Border Radius | 8px | ✅ 0.5rem (8px) |
| Typography | Inter | ✅ Available |
| Dark Mode | Yes | ✅ Implemented |

## Troubleshooting

### Theme Not Appearing
1. Check that your app is using the theme provider
2. Verify theme selector is connected
3. Clear browser cache and rebuild

### Colors Look Wrong
1. Ensure you're viewing in the correct mode (light/dark)
2. Check if custom CSS is overriding theme variables
3. Verify no conflicting theme classes

### TypeScript Errors
Run type checking:
```bash
pnpm type-check
```

## Advanced Usage

### Accessing Theme Colors in Code
```typescript
import { useTheme } from "next-themes"

export function ThemedComponent() {
  const { theme } = useTheme()
  
  return (
    <div className="bg-background text-foreground">
      Current theme: {theme}
    </div>
  )
}
```

### Using CSS Variables
```css
.custom-element {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
```

## Resources

- **Theme Definition**: `apps/v4/registry/base-colors.ts`
- **Theme Export**: `apps/v4/public/r/themes/luma.json`
- **Extracted Data**: `apps/v4/luma/luma-extracted-data.json`
- **Implementation Details**: `apps/v4/luma/IMPLEMENTATION_SUMMARY.md`

## Support

For issues or questions:
1. Check the Implementation Summary for technical details
2. Review the extracted data for color values
3. Refer to shadcn/ui documentation for component usage

---

**Enjoy using the Luma theme! 🎨**


