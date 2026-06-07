---
name: Eleczar Precision
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434656'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737688'
  outline-variant: '#c3c5d9'
  surface-tint: '#004dea'
  primary: '#0041c8'
  on-primary: '#ffffff'
  primary-container: '#0055ff'
  on-primary-container: '#e3e6ff'
  inverse-primary: '#b6c4ff'
  secondary: '#a33e00'
  on-secondary: '#ffffff'
  secondary-container: '#fe6500'
  on-secondary-container: '#541d00'
  tertiary: '#474f65'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f677e'
  on-tertiary-container: '#e0e7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7c2e00'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system is engineered for a premier electrical equipment distributor, blending industrial reliability with high-tech sophistication. The visual narrative centers on "The Power of Precision," targeting professional contractors, engineers, and industrial procurement officers. 

The style is **Corporate / Modern** with a technical edge. It leverages a high-contrast aesthetic to signify safety and efficiency. The interface should feel like a high-performance tool: authoritative, responsive, and meticulously organized. 

Key design drivers:
- **Clarity over Decoration:** Every element serves a functional purpose, mirroring the utility of electrical components.
- **Tech-Forward Reliability:** A seamless blend of clean whitespace and deep, slate-toned depth to evoke a modern SaaS-like experience in an industrial sector.
- **Circuitry Motifs:** Subtle use of 90-degree angles and technical line-work in backgrounds to reference the electrical trade without cluttering the UI.

## Colors

The palette is designed to balance professional trust with industrial urgency. 

- **Primary (Electric Blue):** Used for brand presence, primary navigation, and interactive states. It represents the "current" flowing through the system.
- **Secondary/CTA (Safety Orange):** Reserved strictly for high-impact actions, urgent statuses (low stock), and primary conversion points. It provides maximum contrast against the blue and slate.
- **Neutral/Surface:** A sophisticated range of cool grays. Light mode uses `#F8FAFC` for clarity, while Dark mode transitions to `#0F172A` (Deep Slate) to create a premium, developer-tool aesthetic.
- **Status Colors:** Success (Emerald), Warning (Amber), and Error (Crimson) follow standard industrial safety protocols.

## Typography

This design system utilizes **Inter** for its systematic, utilitarian nature. The typography scale is built on a tight 4px baseline grid to maintain technical alignment.

- **Headings:** High-contrast weights (Bold/SemiBold) are used to create a clear information hierarchy. Large displays use tighter letter-spacing to feel more "engineered."
- **Data Tables & Specs:** Body-sm and Label-sm are critical for technical specification sheets, ensuring legibility even at high density.
- **All-Caps Labels:** Used sparingly for categories or SKU prefixes to mimic industrial labeling systems.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the core content area, ensuring that complex technical data remains centered and readable on ultra-wide monitors.

- **Grid System:** A 12-column grid for desktop with 24px gutters. On mobile, this collapses to a 4-column grid with 16px margins.
- **Rhythm:** Spacing is strictly based on a 4px/8px incremental system. 
- **Mega-Menu:** The primary navigation uses a full-width mega-menu structure. Content within the menu is divided into logical "circuit" groups with clear icons for categories like "Transformers," "Switchgear," and "Automation."
- **Density:** Use "High Density" for technical product tables and "Comfortable Density" for marketing landing pages and blog content.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** and **Ambient Shadows**.

- **Surfaces:** Use subtle shifts in background color (e.g., White to Light Gray) to define content regions rather than heavy borders.
- **Shadows:** Shadows are highly diffused and use a slight tint of the Primary Blue (`rgba(0, 85, 255, 0.08)`) to maintain a "clean tech" feel. 
- **Depth Levels:**
  - **Level 0 (Base):** Background color.
  - **Level 1 (Cards):** Low-offset shadow (4px blur) used for product listings.
  - **Level 2 (Overlays):** Medium-offset shadow (12px blur) used for dropdowns and mega-menus.
  - **Level 3 (Modals):** Large-offset shadow (24px blur) to pull focus for critical configurations.

## Shapes

The design system employs a **Rounded** (0.5rem / 8px) corner strategy. 

- **Standard Radius:** 8px for buttons, input fields, and small cards. This offers a modern, professional look that isn't too "playful."
- **Large Radius:** 16px (rounded-lg) for main container sections and large product feature cards to create distinct visual blocks.
- **Pill Shapes:** Used exclusively for status tags (e.g., "In Stock," "New Arrival") to differentiate them from actionable buttons.

## Components

### Buttons
- **Primary:** Safety Orange background with White text. Used for "Add to Cart" or "Request Quote."
- **Secondary:** Electric Blue background or outline. Used for "View Details."
- **Ghost:** Transparent background with Slate text/outline for utility actions.

### Product Cards
- Cards feature a subtle 1px border (`#E2E8F0`) that disappears on hover, replaced by a Level 1 shadow.
- **Stock Status:** Must be clearly visible in the top-right corner using a pill shape (Green for "In Stock," Red for "Out of Order").

### Input Fields
- Use a light gray background (`#F1F5F9`) with a 1px bottom border as the default state.
- **Focus State:** 2px Electric Blue border with a soft blue outer glow to signify "active power."

### Mega-Menu
- Multi-column layout with category icons. Include a "Featured Products" section on the right side of the menu panel with high-quality photography.

### Dark Mode Toggle
- A custom switch icon transitioning from a "Sun" to a "Bolt" (representing electricity/power) when switching to dark mode.