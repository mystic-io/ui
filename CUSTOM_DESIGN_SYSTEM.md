# Custom shadcn Component Library - Design System

This is a custom implementation of shadcn components based on a comprehensive design system with custom spacing, colors, border radii, and typography.

## Overview

The custom design system has been integrated into the shadcn component library with the following features:

- **Custom Widths**: Three container widths (820px, 960px, 1080px)
- **Custom Border Radius**: Four sizes from small (0.25rem) to large (1rem) with squircle support
- **Comprehensive Color System**: 10-step color scales for grayscale and all semantic colors
- **Responsive Spacing**: Custom padding and margin values for cards, modals, lists, and inputs
- **Typography Scale**: 9 font sizes from xxxs to xxxl with custom line heights
- **Shadow System**: 5 shadow levels optimized for light and dark themes
- **Transition System**: Custom timing functions and durations

## File Structure

```
apps/v4/styles/
├── custom-theme.css        # All CSS custom properties and design tokens
├── custom-utilities.css    # Utility classes for the design system
└── globals.css            # Main entry point with imports and base styles
```

## Design Tokens

### Layout & Spacing

#### Container Widths
```css
--max-width: 820px
--max-width-wide-page: 960px
--max-width-extra-wide-page: 1080px
```

Usage:
```jsx
<div className="max-w-custom">Standard width content</div>
<div className="max-w-custom-wide">Wide page content</div>
<div className="max-w-custom-extra-wide">Extra wide content</div>
```

#### Border Radius
```css
--small-border-radius: 0.25rem
--border-radius: 0.5rem
--card-border-radius: 0.75rem
--large-border-radius: 1rem
--modal-border-radius: 1rem
```

Usage:
```jsx
<div className="rounded-custom-sm">Small radius</div>
<div className="rounded-custom">Default radius</div>
<div className="rounded-custom-card">Card radius</div>
<div className="rounded-custom-lg">Large radius</div>
<div className="rounded-squircle">Squircle (with fallback)</div>
```

#### Padding Presets
```css
--content-card-horizontal-padding: 1.125rem
--content-card-vertical-padding: 1rem
--base-list-row-horizontal-padding: 1rem
--base-list-row-vertical-padding: 0.75rem
--modal-horizontal-padding: 1.25rem
--modal-vertical-padding: 1rem
```

Usage:
```jsx
<div className="p-card">Card padding</div>
<div className="p-list-row">List row padding</div>
<div className="p-modal">Modal padding</div>
<div className="p-modal-header">Modal header/footer padding</div>
```

### Color System

#### Grayscale (10-step scale)
```css
--gray-10: #f7f8f9  (lightest)
--gray-20: #ebeced
--gray-30: #dee0e2
--gray-40: #d2d4d7
--gray-50: #b3b5b7
--gray-60: #939597
--gray-70: #737577
--gray-80: #535557
--gray-90: #333537
--gray-100: #212325 (darkest)
--white: #fff
--black: rgb(19, 21, 23)
```

Usage:
```jsx
<div className="bg-gray-10 text-gray-90">Light background, dark text</div>
<div className="bg-gray-100 text-gray-10">Dark background, light text</div>
```

#### Brand Colors (Cranberry)
```css
--cranberry-5 through --cranberry-90
--brand-color: var(--cranberry-50)  /* Light theme */
--brand-color: var(--cranberry-30)  /* Dark theme */
```

Usage:
```jsx
<button className="bg-brand text-brand-on-bg">Brand Button</button>
<div className="text-brand">Brand colored text</div>
```

#### Semantic Colors
Each semantic color has a 10-step scale (5-90):

- **Success**: Green scale
- **Error**: Red scale
- **Warning**: Yellow scale
- **Blue**: Blue scale
- **Purple**: Purple scale
- **Orange**: Orange scale
- **Barney**: Purple/magenta scale

Usage:
```jsx
<div className="bg-success text-white">Success message</div>
<div className="bg-error-pale text-error">Error with pale background</div>
<div className="bg-warning text-white">Warning</div>
```

#### Background Colors
```css
/* Light Theme */
--primary-bg-color: var(--white)
--secondary-bg-color: var(--gray-10)
--tertiary-bg-color: var(--gray-20)
--quaternary-bg-color: var(--gray-30)

/* Dark Theme */
--primary-bg-color: var(--black)
--secondary-bg-color: var(--gray-100)
--tertiary-bg-color: var(--gray-90)
--quaternary-bg-color: var(--gray-80)
```

Usage:
```jsx
<div className="bg-primary-custom">Primary background</div>
<div className="bg-secondary-custom">Secondary background</div>
<div className="bg-elevated-primary">Elevated surface</div>
<div className="bg-page">Page background</div>
```

#### Text Colors
```css
--primary-color: var(--black)      /* Light */
--primary-color: var(--white)      /* Dark */
--secondary-color: var(--gray-70)  /* Light */
--secondary-color: var(--gray-40)  /* Dark */
--tertiary-color: var(--gray-50)
```

Usage:
```jsx
<p className="text-primary-custom">Primary text</p>
<p className="text-secondary-custom">Secondary text</p>
<p className="text-tertiary-custom">Tertiary text</p>
```

### Typography

#### Font Families
```css
--font: -apple-system, BlinkMacSystemFont, Inter, Roboto, ...
--mono-font: "SF Mono", menlo, monaco, consolas, ...
```

Usage:
```jsx
<div className="font-custom">System font</div>
<code className="font-mono-custom">Monospace code</code>
```

#### Font Sizes
```css
--font-size-xxxl: 1.5rem
--font-size-xxl: 1.375rem
--font-size-xl: 1.25rem
--font-size-lg: 1.125rem
--font-size-md: 1rem
--font-size-sm: 0.875rem
--font-size-xs: 0.8125rem
--font-size-xxs: 0.75rem
--font-size-xxxs: 0.625rem
```

Usage:
```jsx
<h1 className="text-xxxl">Extra large heading</h1>
<h2 className="text-xxl">Large heading</h2>
<p className="text-md-custom">Body text</p>
<small className="text-sm-custom">Small text</small>
<span className="text-xs-custom">Extra small text</span>
```

#### Font Weights
```css
--font-weight-light: 300
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 600
```

Usage:
```jsx
<p className="font-light-custom">Light</p>
<p className="font-regular-custom">Regular</p>
<p className="font-medium-custom">Medium</p>
<p className="font-bold-custom">Bold</p>
```

#### Line Heights
```css
--default-line-height: 1.5
--reduced-line-height: 1.3
--title-line-height: 1.2
```

Usage:
```jsx
<p className="line-height-default">Body text</p>
<h2 className="line-height-title">Heading</h2>
```

### Shadows

#### Light Theme
```css
--shadow-xs: 0 1px 4px rgba(0, 0, 0, 0.1)
--shadow-sm: Multi-layer subtle shadow
--shadow: Default shadow
--shadow-lg: Large shadow
--shadow-xl: Extra large shadow
--shadow-modal: Modal specific shadow with border
```

#### Dark Theme
Automatically switches to darker, more prominent shadows.

Usage:
```jsx
<div className="shadow-custom-xs">Extra small shadow</div>
<div className="shadow-custom-sm">Small shadow</div>
<div className="shadow-custom">Default shadow</div>
<div className="shadow-custom-lg">Large shadow</div>
<div className="shadow-modal-custom">Modal</div>
```

### Transitions

```css
--transition-duration: 0.3s
--fast-transition-duration: 0.2s
--slow-transition-duration: 0.6s
--transition-fn: cubic-bezier(0.4, 0, 0.2, 1)
--bounce-transition-fn: cubic-bezier(0.54, 1.12, 0.38, 1.11)
```

Usage:
```jsx
<div className="transition-custom">Default transition</div>
<div className="transition-fast">Fast transition</div>
<div className="transition-slow">Slow transition</div>
<div className="transition-bounce">Bounce effect</div>
```

### Input & Button Sizes

#### Regular (Default)
```css
--input-padding: 0.625rem 0.875rem
--input-font-size: 1rem
--input-height: calc(2.25rem + 2px)
```

#### Small
```css
--small-input-padding: 0.4375rem 0.625rem
--small-input-font-size: 0.875rem
--small-input-height: calc(1.75rem + 2px)
```

#### Large
```css
--large-input-padding: 0.75rem 1.125rem
--large-input-font-size: 1.125rem
--large-input-height: calc(2.625rem + 2px)
```

Usage:
```jsx
// Regular input (default)
<input className="input-height-custom" />

// Small input
<input className="input-height-small text-sm-custom" />

// Large input
<input className="input-height-large text-lg-custom" />

// Custom button classes
<button className="btn-custom">Default</button>
<button className="btn-small">Small</button>
<button className="btn-large">Large</button>
<button className="btn-icon-only">Icon Only</button>
```

### Backdrop Blur

```css
--backdrop-blur: blur(16px)
--high-legibility-backdrop-blur: blur(24px) contrast(50%) brightness(130%)
```

Usage:
```jsx
<div className="backdrop-blur-custom bg-modal">Modal background</div>
<div className="backdrop-blur-custom-legibility">High contrast blur</div>
```

### Z-Index

```css
--chat-z-index: 900
--overlay-z-index: 1000
```

Usage:
```jsx
<div className="z-chat">Chat interface</div>
<div className="z-overlay-custom">Overlay/Modal</div>
```

## Component Examples

### Button Component

```jsx
import { Button } from '@/components/ui/button'

// Using custom design system
<Button className="bg-brand text-brand-on-bg rounded-custom shadow-custom-sm">
  Brand Button
</Button>

<Button className="bg-success text-white rounded-custom-sm">
  Success Button
</Button>

<Button className="btn-small bg-secondary-custom text-primary-custom">
  Small Secondary
</Button>

<Button className="btn-large bg-error text-white rounded-custom-lg">
  Large Error Button
</Button>
```

### Card Component

```jsx
import { Card, CardContent, CardHeader } from '@/components/ui/card'

<Card className="rounded-custom-card shadow-custom bg-card-custom">
  <CardHeader className="p-card border-b border-primary-custom">
    <h3 className="text-xl-custom font-bold-custom">Card Title</h3>
  </CardHeader>
  <CardContent className="p-card">
    <p className="text-md-custom text-secondary-custom">
      Card content with custom padding and colors.
    </p>
  </CardContent>
</Card>
```

### Modal/Dialog Component

```jsx
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'

<Dialog>
  <DialogContent className="rounded-custom-modal bg-modal backdrop-blur-custom shadow-modal-custom">
    <DialogHeader className="p-modal-header border-b divider-color">
      <h2 className="text-xxl font-bold-custom">Modal Title</h2>
    </DialogHeader>
    <div className="p-modal">
      <p className="text-md-custom">Modal content</p>
    </div>
  </DialogContent>
</Dialog>
```

### Input Component

```jsx
import { Input } from '@/components/ui/input'

<div className="space-y-2">
  <label className="text-sm-custom font-medium-custom text-secondary-custom">
    Email Address
  </label>
  <Input
    className="input-height-custom rounded-custom border-primary-custom"
    placeholder="Enter email"
  />
</div>

// Small input
<Input
  className="input-height-small text-sm-custom rounded-custom-sm"
  placeholder="Small input"
/>

// Large input
<Input
  className="input-height-large text-lg-custom rounded-custom-lg"
  placeholder="Large input"
/>
```

### Container Layouts

```jsx
// Standard width container
<div className="max-w-custom mx-auto px-4">
  <h1 className="text-xxxl font-bold-custom">Page Title</h1>
  <p className="text-md-custom text-secondary-custom">Content</p>
</div>

// Wide container
<div className="max-w-custom-wide mx-auto px-4">
  Wide page content
</div>

// Extra wide container
<div className="max-w-custom-extra-wide mx-auto px-4">
  Dashboard or data-heavy content
</div>
```

### List Items

```jsx
<ul className="bg-card-custom rounded-custom shadow-custom divide-y divider-color">
  <li className="p-list-row hover-bg-custom transition-fast">
    <span className="text-md-custom font-medium-custom">Item 1</span>
  </li>
  <li className="p-list-row hover-bg-custom transition-fast">
    <span className="text-md-custom font-medium-custom">Item 2</span>
  </li>
  <li className="p-list-row hover-bg-custom transition-fast">
    <span className="text-md-custom font-medium-custom">Item 3</span>
  </li>
</ul>
```

### Pills/Badges

```jsx
<span className="pill-tiny bg-brand text-white rounded-custom inline-flex items-center">
  Tiny Pill
</span>

<span className="pill-small bg-success text-white rounded-custom inline-flex items-center">
  Small Pill
</span>

<span className="pill-medium bg-warning text-white rounded-custom inline-flex items-center">
  Medium Pill
</span>
```

## Dark Mode

The design system automatically adapts to dark mode using the `.dark` class:

```jsx
// Light mode: white background, black text
// Dark mode: black background, white text
<div className="bg-primary-custom text-primary-custom">
  Content that adapts to theme
</div>

// Colors automatically adjust
<button className="bg-brand text-white">
  Brand button (cranberry-50 in light, cranberry-30 in dark)
</button>
```

## Responsive Design

The design system includes responsive adjustments:

```css
@media (max-width: 450px) {
  --base-list-row-vertical-padding: 0.6875rem;
  --base-list-row-horizontal-padding: 0.875rem;
}
```

## Best Practices

### 1. Use Semantic Color Classes
```jsx
// Good
<div className="bg-success text-white">Success</div>
<div className="bg-error-pale text-error">Error with context</div>

// Avoid
<div className="bg-green-50 text-white">Success</div>
```

### 2. Combine Custom Utilities with Tailwind
```jsx
// Good - Mix custom and Tailwind utilities
<div className="max-w-custom mx-auto p-card rounded-custom-card shadow-custom">
  Content
</div>
```

### 3. Use Consistent Spacing
```jsx
// Good - Use preset padding
<div className="p-card">Card content</div>
<div className="p-modal">Modal content</div>
<li className="p-list-row">List item</li>

// Avoid arbitrary values when presets exist
<div className="p-[1.125rem]">Content</div>
```

### 4. Maintain Border Radius Consistency
```jsx
// Good - Use semantic radius classes
<button className="rounded-custom">Button</button>
<div className="rounded-custom-card">Card</div>
<dialog className="rounded-custom-modal">Modal</dialog>

// With squircle support
<div className="rounded-squircle-card">Modern card</div>
```

### 5. Typography Hierarchy
```jsx
// Good - Clear hierarchy
<h1 className="text-xxxl font-bold-custom line-height-title">Main Title</h1>
<h2 className="text-xxl font-bold-custom line-height-title">Subtitle</h2>
<p className="text-md-custom line-height-default">Body text</p>
<small className="text-sm-custom text-secondary-custom">Helper text</small>
```

## Migration from Standard shadcn

If you're migrating from standard shadcn:

1. **Radius**: `rounded-lg` → `rounded-custom` or `rounded-custom-card`
2. **Colors**: `bg-primary` → `bg-brand`, `text-destructive` → `text-error`
3. **Spacing**: `p-4` → `p-card`, `p-6` → `p-modal`
4. **Typography**: `text-xl` → `text-xl-custom`, `font-medium` → `font-medium-custom`
5. **Shadows**: `shadow-md` → `shadow-custom`, `shadow-lg` → `shadow-custom-lg`

## Troubleshooting

### CSS Variables Not Working
Make sure `custom-theme.css` and `custom-utilities.css` are imported in `globals.css`:

```css
@import "./custom-theme.css";
@import "./custom-utilities.css";
```

### Dark Mode Not Switching
Ensure your app has the `.dark` class toggling on the root element or body.

### Squircle Border Radius Not Showing
Squircle is only supported in Safari. Other browsers will fall back to regular border-radius.

## Additional Resources

- All CSS variables are defined in `apps/v4/styles/custom-theme.css`
- Utility classes are in `apps/v4/styles/custom-utilities.css`
- Integration with Tailwind is in `apps/v4/styles/globals.css`

For questions or issues, refer to the source CSS files or open an issue in the repository.
