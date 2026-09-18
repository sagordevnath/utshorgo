# UTSHORGO DESIGN & WIREFRAMES - PHASE 2
## High-Fidelity Screen Mockups & Complete Specifications

**Status**: Phase 2 Complete  
**Date**: August 29, 2026  
**Scope**: 5 High-Fidelity Screens + Component Library + 3D Motion Specs + User Flows + Design System

---

## SECTION 1: HIGH-FIDELITY SCREEN MOCKUPS

### SCREEN 1: HOMEPAGE (Discovery Feed with 3D Hero)

#### Structure:
- **Header**: Sticky navigation bar (120px height, z-index high)
- **Hero Section**: 100vh viewport height, two-column layout
  - Left (60%): 3D Product Carousel viewport
  - Right (40%): Reseller Spotlight info card
- **Main Feed**: Vertical scroll sections below hero

#### 3D Hero - Reseller Spotlight Component:

**Visual Specs:**
- **Background**: Deep gradient (deep space purple #2D1B69 → dark charcoal #1F1F1F)
- **3D Product Model**: 
  - Centered, rotates continuously (360° in 8 seconds, smooth ease-in-out)
  - Parallax effect based on scroll position
  - Soft key light from top-left, specular highlights on product
  - Lighting model: Point light at (100, 100, 200), intensity 1.0

**Right Column Info Card:**
- **Reseller Avatar**: 120px circular, subtle 3D shadow drop
- **Reseller Name**: H2, semi-bold, 32px
- **Badge**: "Rising Star Reseller" - small pill, glow effect (magenta #FF006E)
- **Rating**: ★★★★★ (5.0) | 2,400 reviews
- **Tagline**: "Curated Fashion | Fast Shipping | 98% Satisfaction"
- **Primary CTA**: "Explore Storefront" (electric blue #0084FF, 48px height, glow on hover)
- **Secondary**: "View Similar Resellers" (text link)
- **Animation**: Card slides in from right (600ms ease-out)

#### Main Feed Below Hero:

**Row 1: "Trending Resellers"** (Horizontal Scroll)
- 6 reseller cards, 240px wide each
- **Card Elements**: Image (reseller photo), name, rating, badge, follower count
- **Hover State**: Card tilts 3D (10° rotation), shadow deepens, "View" CTA appears
- **Animation**: Staggered entrance (100ms between each)

**Row 2: "Browse Categories"** (4 Category Cards)
- Physical Goods | Services | Digital Products | Resale & Second-Hand
- **Each Card**: Category icon (3D rendered), title, item count
- **Card Background**: Gradient (unique color per category)
- **Animation**: Icons rotate on hover, card scales 1.05x

**Row 3: "New Arrivals"** (8-item Masonry Grid)
- **Product Card**: Thumbnail, title, price, reseller avatar, rating
- **Animation**: Fade + slide-up on scroll (staggered 50ms)

**Row 4: "AI Recommended For You"** (6-item Personalized Grid)
- Same layout as New Arrivals
- Text: "Based on your browsing history"

#### Mobile Adaptation (< 768px):
- Stack hero vertically (100% width each)
- Single-column product grids
- Font sizes: H2 28px, P 14px
- Horizontal scroll for carousels maintained

#### Accessibility:
- Color contrast: AA+ standard minimum
- Focus states: 2px visible outline on interactive elements
- Keyboard navigation: Tab through resellers, categories, products
- Screen reader: ARIA labels on 3D elements ("Rotating 3D product display")
- Alt text: All images have descriptive alternatives

#### Implementation Notes:
- **3D Viewer**: Three.js or Babylon.js
- **Parallax**: CSS `transform: translateZ()` or scroll-triggered JS
- **Timing**: 800-1200ms ease-out/ease-in-out
- **Loading**: Skeleton screens while 3D models load

---

### SCREEN 2: PRODUCT DETAIL PAGE (360° Viewer + Social Proof)

#### Hero Section Layout:
- **Left (55%)**: 3D Product Viewer
- **Right (45%)**: Product Info Sidebar

#### 3D Product Viewer (Left Side):

**Visual Specs:**
- **Background**: Soft gradient (light gray #F5F7FF → white)
- **Product**: Center-stage, 3D rendered or 360° carousel
- **Lighting**: Studio lighting (key light top-left, fill light bottom-right)
- **Interactivity**:
  - Click + drag to rotate (smooth momentum scroll)
  - Scroll to zoom (0.5x to 2x)
  - Tap color swatches → product changes color in real-time
  - Hover on details → magnifying glass zooms in (2x), light shifts
- **Animation**: Auto-rotate slowly (idle state, 12 second rotation)
- **Size Comparison**: Slider at bottom shows product size vs real objects

**Controls Overlay:**
- **Color Swatches** (top-left): 4-5 color options, click to swap
- **View Toggle** (top-right): 360° | Gallery | Video | AR Try-On
- **Zoom Controls** (bottom-right): +/- buttons OR pinch on mobile

#### Product Info Sidebar (Right Side):

**Header Section:**
- **Product Title**: H1, 28px, semi-bold
- **Rating Display**: ★★★★★ 4.8 (2,340 reviews) | "In Stock" badge (green #00D084)
- **Price**: Large, 48px, bold (electric blue #0084FF)
  - Original price crossed out if on sale
  - Discount percentage badge (red #FF4757, -20%)

**Variant Selection:**
- Size dropdown (with size chart link)
- Color selector (visual swatches, clickable)
- Quantity selector (- | [number] | +)

**Add to Cart Section:**
- **Primary CTA**: "Add to Cart" (electric blue, 56px height, full width, cart icon)
- **Secondary CTA**: "Buy Now" (text link)
- **Wishlist**: Heart icon button (toggles filled/empty)
- **Share**: Social media icons (Instagram, Pinterest, Twitter)

**Seller Quick Info (Compact Card):**
- Seller avatar (60px circular)
- Seller name + "Verified Reseller" badge
- Rating: 4.9★ | 1,200 reviews
- Response time: "Usually responds in 2 hours"
- Buttons: "Message Seller" (text link) | "Visit Storefront" (button)

**Shipping & Returns Info (Accordion):**
- Shipping: "Ships from [City] | Arrives in 3-5 days | $5 shipping"
- Returns: "30-day returns accepted, free return shipping"
- Guarantee: "Buyer Protection Guarantee" (trust badge)

**Animation:**
- Sidebar slides in from right (600ms ease-out)
- Price updates smoothly when variant changes
- Cart button "pulse" hover effect (grows + glows)

#### Product Info Tabs Section:

**DESCRIPTION Tab:**
- Rich text with images
- Product story (2-3 paragraphs)
- Key benefits (bullet points)
- Video demo (embedded, thumbnail with play button)

**SPECIFICATIONS Tab:**
- Table format: Attribute | Value
- Material, dimensions, weight, color, SKU, warranty, etc.
- Comparison: "How does this compare?" (link to comparison chart)

**REVIEWS Tab:**
- Filter controls: Sort by (Newest | Most Helpful | Rating)
- Star filter: Show only 5★ | 4★ | 3★ | 2★ | 1★
- Verified purchase checkbox
- Review cards:
  - Avatar + Name + "Verified Purchase" badge
  - Rating (stars)
  - Review title + date
  - Review text (truncated at 200 chars, "Read More" expands)
  - 3-4 review photos/carousel
  - "Helpful?" buttons (👍 count | 👎 count)
  - Seller response (if present, in blue callout)
- Pagination: Show 10 per page

**Q&A Tab:**
- Questions listed with answers
- "Ask a Question" button (modal form)
- Seller answers highlighted in blue
- Vote on most helpful answers

#### Bottom Section: Related Products:
- 6-item grid carousel: "Similar from This Seller" | "Frequently Bought Together" | "Recommended by AI"

#### Mobile Adaptation:
- Stack hero vertically: Carousel (100% width) over info sidebar
- Tabs full-width, swipeable
- Font sizes: H1 24px, prices 36px
- Buttons: Full width, larger touch targets (56px min)

#### Accessibility:
- 3D viewer: ARIA description for screen readers
- Color contrast: 7:1 on prices and CTAs
- Focus: Visible outlines on all buttons
- Alt text: All images have descriptive alt text
- Keyboard: Tab through variants, buttons, expand accordions

#### Implementation Notes:
- **3D Viewer**: Three.js with OrbitControls
- **Image Gallery**: Lazy-load, use WebP format
- **Transitions**: 300ms ease-out for interactive elements
- **Video**: iframe with title, allow fullscreen

---

### SCREEN 3: RESELLER STOREFRONT CUSTOMIZATION (No-Code Builder)

#### Layout: Three-pane interface
- **Left (20%)**: Component Library (vertical scrollable panel)
- **Center (60%)**: Canvas/Live Preview (WYSIWYG editor)
- **Right (20%)**: Design Settings (properties panel)

#### Left Panel: Component Library

**Section: Headers & Hero**
- "Gradient Hero" (component card)
- "Image Hero" (component card)
- "Text + CTA Hero" (component card)
- Each card shows thumbnail, drag handle (:::), hover shows "Add" button

**Section: Product Cards**
- "Grid Card (3-column)" 
- "List Card (full-width)"
- "Carousel Card (horizontal scroll)"

**Section: Content**
- "Text Block"
- "Image Block"
- "Image Gallery"
- "Video Embed"
- "Social Feed"

**Section: Forms & CTAs**
- "Contact Form"
- "Newsletter Signup"
- "CTA Button"
- "Text Link"

**Section: Navigation**
- "Top Menu"
- "Sticky Header"
- "Footer"

**Section: Collections**
- "Featured Collection"
- "All Products Grid"
- "Category Showcase"

#### Center Panel: Canvas (WYSIWYG Editor)

**Visual**: Grid background (light gray #F0F0F0, 8px grid visible)

**Example Template**: "Modern Minimalist"
- Hero: Dark purple gradient background, white text "Welcome to [Store Name]", large CTA button
- Product section: "New Arrivals" grid (3 columns on desktop)
- Footer: Links, social icons, newsletter signup

**Interactions:**
- Click component → Highlights in blue, shows selection handles (resize corners + rotation handle)
- Drag component → Move anywhere on canvas
- Double-click → Opens properties panel to edit content
- Right-click → Context menu (Edit | Duplicate | Delete | Layer)

**Live Preview Toggle:**
- Desktop view (default)
- Tablet view (800px width)
- Mobile view (375px width)
- Real-time responsive preview updates

#### Right Panel: Design Settings

**Component Properties (when selected):**
- Component properties (name, type)
- **Content Section**:
  - Text fields (Title, description, CTA text)
  - Image upload (drag-drop zone)
  - Link destination
- **Style Section**:
  - Size: Width (%, px, auto), Height, Padding, Margin
  - Color: Bg color (color picker), Text color
  - Typography: Font, Size, Weight, Line-height
  - Border: Style, width, color, radius
  - Shadow: Enable, blur, spread, color
- **Animation Section**:
  - Effect dropdown (None | Fade | Slide | Zoom | Tilt)
  - Duration (300ms, 600ms, 1000ms)
  - Delay (0ms, 100ms, 200ms, etc.)
  - Preview animation button

**Template Presets** (Top of right panel):
- Dropdown: "Modern Minimalist" (selected) | "Bold & Colorful" | "Luxury" | "Eco-Friendly" | "Create Custom"
- Clicking changes color scheme + component styles globally

#### Top Toolbar:
- Logo/brand name input: "My Storefront" (editable)
- Save button (primary, green #00D084): "Save Storefront"
- Preview in full browser button
- Undo | Redo buttons
- Mobile | Tablet | Desktop view toggle
- Help & tutorials icon

#### Bottom Right: Action Buttons:
- "Preview" (eye icon, opens full storefront in new tab)
- "Settings" (gear icon, opens general storefront settings)
- "SEO" (globe icon, opens SEO optimization panel)
- "Analytics" (chart icon, if storefront published, shows stats)

#### Mobile Adaptation:
- Single column layout on mobile editing (layers panel, canvas, properties stack vertically)
- Bottom tab bar instead of side panels (Components | Canvas | Settings)
- Touch interactions: Long-press to select, swipe to resize

#### Accessibility:
- All buttons keyboard accessible
- ARIA labels on icon buttons
- Focus indicators on all interactive elements
- Keyboard shortcuts (Ctrl+S to save, Ctrl+Z to undo)

#### Implementation Notes:
- **Builder**: React Craft or custom React components
- **Canvas**: Use HTML/CSS for actual storefront preview
- **Drag-and-drop**: React-DnD or react-beautiful-dnd
- **Color Picker**: Chakra Color Picker or react-color
- **Save**: Auto-save every 30 seconds + manual save button
- **Undo/Redo**: Implement command pattern with history stack

---

### SCREEN 4: RESELLER DASHBOARD (Analytics & Management Hub)

#### Layout: Dashboard grid (4-column responsive)

#### Header Section:
- Logo/branding on left
- Welcome message: "Hello, Jordan! 👋" (personalized)
- **Quick Stat Badges** (horizontal, 4 items):
  - Revenue (MTD): "$3,240" (large, green #00D084) | Trend arrow ↑ 12%
  - Orders (This Month): "156" | Trend arrow ↑ 8%
  - Products Sold: "324" | Trend arrow ↑ 3%
  - Avg Rating: "4.9★" | Badge: "Excellent"

#### Left Sidebar (Persistent):
- Dashboard icon (currently selected, highlighted blue)
- Storefront icon
- Products icon (with notification badge "3 need review")
- Orders icon (with notification badge "2 pending")
- Analytics icon
- Supplier Marketplace icon
- Community icon
- Settings icon
- Logout link

#### Main Content Area:

**Section 1: Sales Overview (Full-width chart)**
- Title: "Sales Performance"
- Chart type: Line graph (sales $ over last 30 days)
- Y-axis: Revenue ($0 to max)
- X-axis: Days of month
- Animated on load: Line draws from left to right (2s, smooth)
- Hover: Shows tooltip (Date | Revenue | Orders)
- Color: Gradient line (electric blue #0084FF to neon magenta #FF006E)
- Background: Subtle grid pattern
- Below chart: Key metrics
  - Total Revenue: $3,240
  - Avg Daily: $108
  - Peak Day: March 15 ($280)

**Section 2: Top Products (2 columns)**
- **Left Column**: "Top Performers"
  - Table: Product image | Name | Sales | Revenue | Margin
  - 5 rows, scrollable
  - Row hover: Highlight, shows actions (View | Edit | View Reviews)
  - Sorted by revenue descending
- **Right Column**: "Recent Orders"
  - List: Order #, Customer name, Items, Total, Status, Date
  - 5 items, scrollable
  - Status badges: Processing (blue) | Shipped (green) | Delivered (gray) | Returned (red)
  - Click order to see details

**Section 3: Customer Insights (2 columns)**
- **Left**: "Traffic Sources"
  - Pie chart: Direct | Organic | Social | Ads | Referral
  - Animated on load: Slices animate in (300ms stagger)
- **Right**: "Customer Demographics"
  - Simple stats:
    - New customers (MTD): 23
    - Repeat customers: 67%
    - Avg customer lifetime value: $847

**Section 4: Growth Recommendations (Full-width card, elevated shadow)**
- Title: "✨ Growth Tips (AI-Powered)"
- 3 recommendation cards (horizontal):
  1. "Your bestsellers are selling out fast! Consider increasing inventory of [Product Name]"
     - CTA: "View Supplier Options"
  2. "You haven't posted content in 7 days. Share product photos to boost engagement"
     - CTA: "Create Post"
  3. "Your response time is slower than 80% of resellers. Aim for <2 hours to rank higher"
     - CTA: "Update Settings"
- Card animation: Slide in from bottom on page load (600ms stagger)

#### Bottom Section: Quick Actions:
- Large buttons (full width on mobile, 2 per row on desktop):
  - "Add New Product" (blue, icon: +)
  - "Create Collection" (blue, icon: folder)
  - "Launch Marketing" (pink, icon: megaphone)
  - "View Analytics" (purple, icon: chart)

#### Mobile Adaptation:
- Header stats stack vertically
- Sidebar collapses to icon-only
- Charts become full-width, scrollable
- Two-column sections stack vertically

#### Responsive Behavior:
- 1-col on mobile (375px)
- 2-col on tablet (768px)
- 3-col on medium desktop (1024px)
- 4-col on large desktop (1440px)

#### Accessibility:
- Color contrast: 7:1 on all text
- Chart labels: ARIA descriptions for screen readers
- Focus: Visible outlines on buttons
- Keyboard: Tab through sections, Enter to interact

#### 3D/Motion Integration:
- Animated counters: Numbers count up on page load (0 → final value in 1.5s)
- Chart animations: Lines/bars draw on page load
- Staggered card animations: 100ms delay between items
- Hover states: Card lift (subtle 3D translate), shadow deepens

#### Implementation Notes:
- **Charts**: Chart.js or Recharts (React)
- **Animations**: Framer Motion for React or CSS animations
- **Icons**: Feather icons or custom SVGs
- **Responsive**: CSS Grid + media queries or Chakra UI
- **Real-time Updates**: WebSocket connection for live stats

---

### SCREEN 5: CHECKOUT FLOW (3-Step Trust-Building Experience)

#### Checkout Header:
- **Progress Indicator** (visual steps):
  - Step 1: Shipping (currently selected, blue highlight)
  - Connector line (animated fill as user progresses)
  - Step 2: Payment
  - Connector line
  - Step 3: Review & Confirm
- "Back" link, "Save & Exit" link

#### Step 1: Shipping Address

**Container**: Form card with soft shadow
- **Form Title**: "Where should we send your order?"
- **Saved Addresses** (if any):
  - Checkbox grid: Show 2-3 saved addresses as selectable cards
  - Each card: Address preview, "Edit" button, "Delete" button (on hover)
  - Click to select (blue border highlight)
- **OR "Add New Address"** section:
  - Form fields (slide in with animation):
    - First Name | Last Name (2 cols)
    - Email (full width)
    - Phone (full width)
    - Street Address (full width)
    - City | State | ZIP (3 cols)
    - Country (dropdown)
  - Field animations: Slide up + fade in (100ms stagger between fields)
  - Focus states: Blue underline, label moves up
  - Validation: Real-time feedback (green checkmark on valid, red X on invalid)

- **Shipping Method Selector**:
  - "Standard (3-5 days)" - $5
  - "Express (1-2 days)" - $12 ← (Recommended badge, glowing)
  - "Overnight" - $25
  - Click to select (highlighted, radio button)

**Action Buttons** (sticky at bottom):
- "Continue to Payment" (primary, electric blue, 48px) - right side
- "Save for later" (text link) - left side

**Animation**: Form slides in from bottom (500ms ease-out)

#### Step 2: Payment Method

**Container**: Form card (same styling as Step 1)
- **Title**: "How would you like to pay?"
- **Shipping Summary** (collapsed sidebar on right):
  - Shows selected address (compressed text)
  - "Edit" button

**Payment Method Tabs** (horizontal):
- Credit/Debit Card (selected by default)
- Digital Wallet (Apple Pay, Google Pay)
- Bank Transfer
- Buy Now, Pay Later (Klarna, Afterpay)

**Credit Card Form:**
- Saved cards (if any):
  - Card display: Last 4 digits, exp date, cardholder name
  - Click to select (blue border)
- New card fields:
  - Cardholder name (full width)
  - Card number (animated input, shows card brand icon)
  - Exp date | CVV (2 cols)
  - Billing address (checkbox: "Same as shipping")
  - Save card for future (checkbox)

**Action Buttons:**
- "Review Order" (primary, electric blue, 48px)
- "Back to Shipping" (text link)

**Animation**: Form slides in from bottom (500ms ease-out), previous step compresses to sidebar

#### Step 3: Order Review & Confirmation

**Container**: Order review card (elevated 3D shadow effect)
- **Title**: "Review Your Order"
- **Order Summary Section**:
  - Product image + name (thumbnail)
  - Quantity
  - Price per item
  - Total item price
  - (Repeats for each item in cart)
- **Order Calculations**:
  - Subtotal: $X.XX
  - Shipping: $X.XX
  - Tax: $X.XX (if applicable)
  - **Final Total: $XXX.XX** (large, 48px, bold, electric blue #0084FF)

**Seller Info** (compact):
- Seller avatar + name + badge + rating
- "Message seller" link

**Shipping & Payment Review** (compact):
- Shipping to: [Address]
- Paying with: [Card ending in XXXX]
- "Edit" links on each

**Important Notices** (below, light background):
- ✓ "Secure checkout (HTTPS encrypted)"
- ✓ "You can cancel within 24 hours"
- ✓ "Buyer protection guarantee"

**Terms Checkbox** (required):
- [ ] "I agree to the Terms of Service and Return Policy"

**Action Buttons** (sticky at bottom):
- "Place Order" (primary, large, 56px height, glowing effect on hover)
  - Hover: Button grows 5%, glows with electric blue, shadow intensifies
- "Back to Payment" (text link)

**Animation:**
- Order summary items slide in (50ms stagger)
- Calculations count up: Subtotal → Shipping → Tax → Total (smooth animation, 1.5s total)
- Final total glows on page load (pulse effect, 2s loop)

#### Confirmation Screen (Post-Order)

**Full-screen Overlay** (modal, centered):
- Success animation: Product spins (360° rotation) with confetti particle effect (2s)
- Celebration message: "🎉 Order Confirmed!"
- **Order Details**:
  - Order number: #UTH-2024-001234 (copy to clipboard button)
  - Order date & time
  - "Track your order" button (opens tracking page)
- **What's Next**:
  - "You'll receive a confirmation email"
  - "Seller will prepare your order within 24 hours"
  - "Tracking info will be sent via SMS/Email"
- **Buttons**:
  - "Continue Shopping" (blue)
  - "View Order Details" (secondary)
  - "Share on Social" (gray, social icons)

**Animation:**
- Confetti particles fall (2s, physics-based)
- Product spin: 1.5s ease-out
- Text fades in with staggered timing
- Background dims with semi-transparent overlay

#### Mobile Adaptation:
- Single-column layout throughout
- Progress indicator: Simplified (Step X of 3)
- Form fields: Full width
- Buttons: Full width, larger touch targets (56px min)
- Checkout header sticky at top
- Summary sidebar removed on mobile (info integrated into steps)

#### Accessibility:
- Form labels linked to inputs (for attribute)
- Required field indicators (*)
- Error messages in red with icon
- Focus states: Clear 2px outline
- Screen reader: ARIA descriptions for card entry, step progress
- Keyboard navigation: Tab through fields, Enter to submit

#### 3D/Motion Integration:
- Checkout steps container: Perspective 3D effect
  - Previous step: Compressed to left (scaleX 0.8, opacity 0.5, translateZ -100px)
  - Current step: Full size, center
  - Next step: Scaled down to right (hidden, ready to slide in)
  - Animation: 600ms ease-in-out when switching steps
- Order total: Animated counter (0 → final value in 1.5s)
- Confirmation: Confetti particles with 3D physics (gravity, bounce)
- Final button: Glowing effect (neon glow blur, animated pulse)

#### Implementation Notes:
- Form validation: Real-time with Yup or Zod
- Payment integration: Stripe.js or similar
- Animations: Framer Motion for React
- Particles: Canvas library (tsparticles or Proton)
- Progress indicator: Custom SVG or React component
- Mobile: Test on iOS/Android with real devices

---

## SUMMARY

All 5 high-fidelity screens are fully specified with:
- Detailed layout structures
- Visual specifications (colors, fonts, spacing)
- Interactive behaviors & animations
- Responsive adaptations (mobile/tablet/desktop)
- Accessibility requirements
- Implementation technical notes

See companion files for:
- **02-COMPONENT-LIBRARY.md** - Complete UI component specs
- **03-MOTION-SPECIFICATIONS.md** - 3D animation & timing details
- **04-USER-FLOWS.md** - Flow diagrams for all major journeys
- **05-DESIGN-SYSTEM.md** - Complete design tokens & system

---

**Status**: ✅ Phase 2 - Screens Complete | Ready for implementation
