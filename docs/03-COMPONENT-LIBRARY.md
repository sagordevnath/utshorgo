# COMPONENT LIBRARY & DESIGN TOKENS
## Complete UI Component Specifications

---

## SECTION 1: BUTTON COMPONENT (All States)

### Primary Button

**Rest State:**
- Background: Electric blue #0084FF
- Text: White
- Padding: 12px 28px
- Border-radius: 12px
- Font: Inter, 16px, semi-bold
- Box-shadow: 0 4px 12px rgba(0, 132, 255, 0.3)

**Hover State:**
- Background: Brighter blue #0098FF (lighten 8%)
- Shadow: 0 8px 20px rgba(0, 132, 255, 0.5)
- Transform: scale(1.02), translateY(-2px)
- Animation: 200ms ease-out

**Active State:**
- Background: Darker blue #006ACC (darken 15%)
- Transform: scale(0.98), translateY(0)
- Shadow: 0 2px 8px rgba(0, 132, 255, 0.3)

**Disabled State:**
- Background: #CCCCCC
- Text: #999999
- Cursor: not-allowed
- Opacity: 0.6

### Secondary Button

- Rest: Transparent bg, electric blue text, 2px blue border
- Hover: Light blue bg (rgba(0, 132, 255, 0.1)), transform scale(1.02)
- Active: Darker bg (rgba(0, 132, 255, 0.2))
- Disabled: Grayed out

### Text Link Button

- Rest: Electric blue text, no underline
- Hover: Underline, text-decoration-thickness 2px
- Active: Darker blue

### Icon Button (Circular)

- Rest: 48px diameter, transparent bg, dark charcoal icon (#1F1F1F)
- Hover: 16px circular shadow, icon color → electric blue #0084FF
- Active: Bg light blue (rgba(0, 132, 255, 0.1))
- Sizes: 32px (small), 48px (medium), 64px (large)

### Button with Icon + Text

- Icon: 20px, left of text
- Icon + text spacing: 8px
- Styling: Follow primary button styling
- Mobile: Icon-only (tooltip on hover)

---

## SECTION 2: CARD COMPONENT

### Product Card (Grid)

- Container: 240px width, aspect-ratio 1 / 1.3
- **Image Area** (top 60%):
  - Background: Light gray #F5F7FF
  - Image: Covers area, center crop
  - Overlay on hover: Dark overlay (opacity 0.2), "View" CTA appears (fade in)
- **Content Area** (bottom 40%):
  - Padding: 12px
  - Product name: 14px, semi-bold, 2-line max, text-overflow ellipsis
  - Price: 16px, bold, electric blue #0084FF
  - Reseller avatar + name: 10px text, small avatar (24px)
  - Rating: ★★★★★ (4.8) | 120 reviews (10px text, gray)
- **Hover State**:
  - Card: Lift effect (transform: translateY(-8px), shadow increases)
  - Image: Slight zoom (scale 1.05)
  - Duration: 300ms ease-out
- **States**:
  - Wishlist icon (top-right): Heart outline → filled (pink #FF006E) on click
  - Sale badge (top-left): Red #FF4757 "- 20%" pill

### Reseller Card (Storefront Preview)

- Container: 280px width, rounded corners 20px, shadow 0 8px 24px
- **Header Image** (top): 280x160px, cover
- **Avatar**: 80px circular, positioned -40px from top (overlaps header)
- **Content**:
  - Reseller name: 18px, bold, centered
  - Badge: "Verified" or "Rising Star"
  - Rating: ★★★★★ (4.8) | 1,200 reviews
  - Bio: 12px, gray, 2 lines max
  - Stats: 3 columns (Products | Followers | Sales)
  - CTA: "Visit Storefront" button (full width)
- Hover: Card tilts 3D (rotateY 5°, rotateX -5°), shadow deepens

### Info Card (Seller/Shop Info)

- Container: Rounded 16px, background: light gradient (white to #F5F7FF)
- Padding: 16px
- Avatar: 64px circular
- Name + badge: 16px bold + small pill badge
- Rating: ★★★★★ with count
- Description: 13px, gray, 2 lines
- CTAs: "Message" button + "Visit Storefront" link
- Border: Subtle 1px border (rgba(0, 0, 0, 0.1))

### Stat Card (Dashboard)

- Container: 200px square, rounded 16px, background gradient
- Icon (top): 40px, colored
- Label: 12px, semi-bold, gray
- Value: 32px, bold, dark
- Trend indicator: Small arrow (↑ green or ↓ red) + percentage
- Background: Gradient (color-based: blue for revenue, green for orders)
- Hover: Slight lift, shadow increases

---

## SECTION 3: FORM ELEMENTS

### Input Field

- Container: Rounded 8px, background: white, border: 1px #E0E0E0
- Padding: 12px 16px
- Font: 14px, line-height 1.4
- Label (above): 12px, semi-bold, dark charcoal
- Placeholder: 14px, gray #999999
- **Focus State**:
  - Border: 2px electric blue #0084FF
  - Background: rgba(0, 132, 255, 0.02)
  - Box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.1)
  - Duration: 200ms ease-out
- **Disabled State**:
  - Background: #F5F5F5
  - Text color: #999999
  - Cursor: not-allowed
- **Error State**:
  - Border: 2px #FF4757 (red)
  - Error message below (12px, red, icon)
  - Icon: ✕ in red
- **Success State**:
  - Border: 2px #00D084 (green)
  - Icon: ✓ in green
- Sizes: Small (32px height) | Medium (40px) | Large (48px)

### Dropdown/Select

- Same styling as input
- Arrow icon (right): Rotating chevron
- **Dropdown Menu**:
  - Background: white
  - Shadow: 0 8px 24px rgba(0, 0, 0, 0.15)
  - Border-radius: 8px
  - Option padding: 12px 16px
  - Option hover: Background #F5F7FF
  - Option selected: Blue bg, checkmark icon

### Checkbox

- Container: 20px × 20px
- Unchecked: Border 2px #CCCCCC, background white
- Checked: Background electric blue #0084FF, checkmark white
- Focus: Blue box-shadow outline
- Label: 14px text, linked to input (for attribute)
- Hover: Border color → darker

### Radio Button

- Container: 20px circular
- Unchecked: Border 2px #CCCCCC, background white
- Checked: Blue border, white center circle with 8px blue dot
- Focus: Blue box-shadow outline
- Label: 14px text, linked

### Textarea

- Same styling as input but taller (minimum 120px)
- Resize: Vertical only (resize: vertical)
- Character count: Below textarea (12px gray, "120/500 characters")

---

## SECTION 4: BADGE & PILL COMPONENTS

### Verification Badge

- Shape: Pill (rounded 20px)
- Background: Electric blue #0084FF
- Text: White, 12px, bold
- Padding: 4px 12px
- Icon: Checkmark (✓)
- Types: "Verified" | "Rising Star" | "Premium" | "Certified"

### Status Badge

- Pill shape, different colors per status:
  - Processing: Blue #0084FF
  - Shipped: Green #00D084
  - Delivered: Gray #CCCCCC
  - Returned: Red #FF4757
  - Pending: Orange #FFA500
- Padding: 6px 12px
- Font: 12px, semi-bold

### Sale Badge

- Pill or ribbon shape
- Background: Red #FF4757
- Text: White "-20%" or "SALE"
- Position: Top-left corner of product cards

---

## SECTION 5: NAVIGATION COMPONENTS

### Top Navigation Bar

- Height: 80px
- Background: White, subtle shadow (0 2px 8px rgba(0, 0, 0, 0.1))
- Sticky: position fixed, z-index high
- Left: Logo (40px height, maintains aspect ratio)
- Center: Search bar (400px wide max, rounded 24px, light gray background)
- Right: Icons (Notifications bell | Messages | Account avatar) + Menu toggle (mobile)
- Responsive: On mobile, center search moves below top bar

### Sidebar Navigation (Reseller Dashboard)

- Width: 240px (desktop), collapses to 64px (icon-only)
- Background: Dark charcoal #1F1F1F
- Items:
  - Icon (24px) + label (14px text)
  - Padding: 16px
  - Text color: Light gray #CCCCCC
  - Hover: Background slightly lighter (rgba(255, 255, 255, 0.1)), text → white
  - Active: Electric blue bg + blue left border, text white
- Scrollable if items overflow
- Collapsible on mobile (hamburger → collapse)

### Breadcrumb Navigation

- Format: Home / Category / Subcategory / Current Page
- Separator: "/"
- Links: Styled like text links (blue, hover underline)
- Current page: Bold, not clickable
- Font: 12px

---

## SECTION 6: MODAL & OVERLAY COMPONENTS

### Modal Container

- Overlay: Semi-transparent dark (rgba(0, 0, 0, 0.5)), full screen
- Modal box: Rounded 16px, white background, centered on screen
- Max width: 600px (desktop), 90% (mobile)
- Animation: Scale from 0.9 → 1.0 + fade in (300ms ease-out)
- Close button (X): Top-right, 24px icon button

### Alert/Notification

- Container: Rounded 8px, padding 16px
- Types (color-coded):
  - Success: Green #00D084 bg, dark text
  - Error: Red #FF4757 bg, white text
  - Warning: Orange #FFA500 bg, dark text
  - Info: Blue #0084FF bg, white text
- Icon: 20px left of text
- Text: 14px
- Action button (optional): Right side
- Position: Toast (bottom-right) or inline
- Animation: Slide in from bottom/right (300ms ease-out)
- Auto-dismiss: 4 seconds (if notification type)

### Tooltip

- Background: Dark charcoal #1F1F1F, white text
- Padding: 8px 12px
- Border-radius: 6px
- Font: 12px
- Arrow: Positioned toward trigger element
- Show on: Hover (desktop) / Tap (mobile)
- Animation: Fade in (200ms)
- Max width: 200px, text wraps

---

## DESIGN TOKENS

### Color Tokens

```json
{
  "colors": {
    "primary": {
      "dark": "#2D1B69",      // Deep Space Purple
      "main": "#0084FF",      // Electric Blue
      "light": "#0098FF",
      "lighter": "#E8F2FF"
    },
    "accent": {
      "main": "#FF006E",      // Neon Magenta
      "light": "#FF3385",
      "dark": "#CC0052"
    },
    "success": "#00D084",     // Mint Green
    "error": "#FF4757",       // Coral Red
    "warning": "#FFA500",     // Orange
    "info": "#00D4FF",        // Cool Cyan
    "gold": "#FFB81C",        // Warm Gold
    "text": {
      "primary": "#1F1F1F",   // Dark Charcoal
      "secondary": "#666666",
      "light": "#999999",
      "lightest": "#CCCCCC"
    },
    "background": {
      "white": "#FFFFFF",
      "light": "#F5F7FF",     // Soft White
      "lighter": "#F0F0F0",
      "gray": "#CCCCCC"
    }
  }
}
```

### Typography Tokens

```json
{
  "typography": {
    "heading1": {
      "fontSize": "48px",
      "fontWeight": "700",
      "lineHeight": "1.2",
      "letterSpacing": "-1px"
    },
    "heading2": {
      "fontSize": "32px",
      "fontWeight": "600",
      "lineHeight": "1.3",
      "letterSpacing": "-0.5px"
    },
    "heading3": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "1.4"
    },
    "body": {
      "fontSize": "16px",
      "fontWeight": "400",
      "lineHeight": "1.6"
    },
    "small": {
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": "1.5"
    },
    "tiny": {
      "fontSize": "12px",
      "fontWeight": "400",
      "lineHeight": "1.4"
    }
  }
}
```

### Spacing Tokens

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px"
  }
}
```

### Shadow Tokens

```json
{
  "shadows": {
    "sm": "0 2px 8px rgba(0, 0, 0, 0.1)",
    "md": "0 8px 24px rgba(0, 0, 0, 0.15)",
    "lg": "0 16px 40px rgba(0, 0, 0, 0.2)",
    "glow-blue": "0 0 16px rgba(0, 132, 255, 0.4)",
    "glow-magenta": "0 0 16px rgba(255, 0, 110, 0.4)"
  }
}
```

### Border Radius Tokens

```json
{
  "borderRadius": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px",
    "2xl": "20px",
    "full": "50%"
  }
}
```

---

## RESPONSIVE BREAKPOINTS

- **Mobile**: 375px - 767px (default 375px)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

### Grid System:
- Mobile: 1 column (100% - 16px margin)
- Tablet: 2 columns
- Desktop: 3-4 columns
- Large Desktop: 4-6 columns

### Font Scaling:
- Mobile: -2px smaller than desktop scale
- Tablet: -1px smaller
- Desktop: Full scale
- Large Desktop: Maintain or +1px

---

**Status**: ✅ Component Library Complete | Production-Ready
