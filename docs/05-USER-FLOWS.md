# USER FLOW DIAGRAMS & JOURNEY MAPS
## Complete User Journey Specifications

---

## FLOW 1: Buyer's Complete Purchase Journey

```
START (New/Returning Buyer)
  ↓
┌─────────────────────────────────────┐
│     HOMEPAGE - DISCOVERY             │
└─────────────────────────────────────┘
  ├─→ [Search] Enter keyword
  ├─→ [Browse Category] Select from 4 main categories
  ├─→ [Featured Resellers] Click reseller card
  ├─→ [Trending Now] Click trending product
  └─→ [AI Recommended] Click personalized item
  ↓
┌─────────────────────────────────────┐
│  PRODUCT DETAIL PAGE                │
│  (3D Viewer, Reviews, Seller Info)   │
└─────────────────────────────────────┘
  ├─→ [3D Product Viewer] Rotate/zoom product
  ├─→ [Read Reviews] See customer feedback
  ├─→ [Check Seller] View seller profile & badge
  └─→ [View Similar] Browse related products
  ↓
┌─────────────────────────────────────┐
│  CUSTOMIZE & ADD TO CART             │
└─────────────────────────────────────┘
  ├─→ [Select Size] Choose from available sizes
  ├─→ [Choose Color] Pick color variant
  ├─→ [Set Quantity] Adjust quantity (- | + buttons)
  └─→ [Add to Cart] OR [Buy Now] decision:
      │
      ├→ [Add to Cart] → Continue Shopping
      │   ├─→ [Continue Shopping] ← Browse more products
      │   ├─→ [View Cart] → Cart Page
      │   └─→ [Proceed to Checkout]
      │
      └→ [Buy Now] → Checkout (Skip Cart)
  ↓
┌─────────────────────────────────────┐
│  CHECKOUT PROCESS (3 Steps)          │
└─────────────────────────────────────┘

STEP 1: SHIPPING ADDRESS
  ├─→ [Select Saved Address] (if exists)
  ├─→ OR [Add New Address]:
  │   ├─→ Enter: Name, Email, Phone
  │   ├─→ Enter: Street, City, State, ZIP
  │   ├─→ [Validate Address]
  │   └─→ Address confirmed ✓
  ├─→ [Choose Shipping Method]:
  │   ├─→ Standard (3-5 days) - $5
  │   ├─→ Express (1-2 days) - $12 ← Recommended
  │   └─→ Overnight - $25
  └─→ [Continue to Payment]
        ↓

STEP 2: PAYMENT METHOD
  ├─→ [Select Payment Tab]:
  │   ├─→ Credit/Debit Card (default)
  │   ├─→ Digital Wallet (Apple Pay, Google Pay)
  │   ├─→ Bank Transfer
  │   └─→ Buy Now, Pay Later
  ├─→ [Enter Payment Info]:
  │   ├─→ Cardholder Name
  │   ├─→ Card Number (auto-detects brand)
  │   ├─→ Exp Date & CVV
  │   ├─→ Billing Address
  │   └─→ [Save for future] (checkbox)
  ├─→ [Review Shipping]:
  │   └─→ Address preview in sidebar
  └─→ [Review Order]
        ↓

STEP 3: ORDER REVIEW & CONFIRMATION
  ├─→ [Review Items]:
  │   ├─→ Product image, name, quantity, price
  │   ├─→ Seller info (avatar, name, badge)
  │   └─→ Repeat for each item
  ├─→ [Review Costs]:
  │   ├─→ Subtotal: $X.XX
  │   ├─→ Shipping: $X.XX
  │   ├─→ Tax: $X.XX (if applicable)
  │   └─→ TOTAL: $XXX.XX (animated counter)
  ├─→ [Review Payment & Shipping]:
  │   ├─→ Shipping to: [Address]
  │   ├─→ Paying with: [Card type ending in XXXX]
  │   └─→ [Edit] options available
  ├─→ [Accept Terms]:
  │   └─→ [✓] Agree to Terms & Returns
  └─→ [PLACE ORDER] (glowing button)
        ↓

┌─────────────────────────────────────┐
│  ORDER CONFIRMATION (Success!)      │
│  🎉 Product spins + Confetti        │
└─────────────────────────────────────┘
  ├─→ [Display]:
  │   ├─→ "Order Confirmed!" message
  │   ├─→ Order Number: #UTH-2024-001234
  │   ├─→ Order Date & Time
  │   └─→ Tracking link provided
  ├─→ [Next Steps Shown]:
  │   ├─→ "Confirmation email sent"
  │   ├─→ "Seller preparing order (24h)"
  │   └─→ "Tracking info via SMS/Email"
  └─→ [Options]:
      ├─→ [Continue Shopping]
      ├─→ [View Order Details]
      └─→ [Share on Social]
        ↓

┌─────────────────────────────────────┐
│  POST-PURCHASE JOURNEY              │
└─────────────────────────────────────┘
  ├─→ [Track Order] Real-time tracking updates
  ├─→ [Message Seller] Ask questions about product
  ├─→ [Receive Product] Delivery notification
  ├─→ [Unbox] Take photos/video
  ├─→ [Review Product] Rate & write review
  ├─→ [Share Review] Post on social
  └─→ [Repeat Purchase] OR [Exit]

END
```

---

## FLOW 2: Reseller Onboarding & First Sale

```
START (New Reseller Signs Up)
  ↓
┌─────────────────────────────────────┐
│  SIGN UP                             │
└─────────────────────────────────────┘
  ├─→ [Email/Social Login]
  │   ├─→ Sign up with Email OR
  │   ├─→ Sign up with Google/Facebook
  │   └─→ Create Password
  ├─→ [Verify Email]
  │   └─→ Click email verification link
  └─→ [Choose Account Type]:
      ├─→ [Buyer] - Just shopping
      └─→ [Reseller] - Sell on platform ← SELECTED
        ↓

┌─────────────────────────────────────┐
│  RESELLER ONBOARDING WIZARD          │
│  (Step-by-step setup)                │
└─────────────────────────────────────┘

STEP 1: BUSINESS INFO
  ├─→ [Business Name] "Jordan's Fashion Corner"
  ├─→ [Business Type]:
  │   ├─→ Physical Goods
  │   ├─→ Services
  │   ├─→ Digital Products
  │   └─→ Resale/Second-Hand ← Selected
  ├─→ [Niche/Category] "Fashion & Accessories"
  ├─→ [Business Goals] (Multiple select):
  │   ├─→ Part-time income ✓
  │   ├─→ Full-time business
  │   ├─→ Brand building ✓
  │   └─→ Quick cash
  └─→ [Next →]
        ↓

STEP 2: STOREFRONT SETUP
  ├─→ [Choose Template]:
  │   ├─→ Modern Minimalist ← Selected
  │   ├─→ Bold & Colorful
  │   ├─→ Luxury
  │   ├─→ Eco-Friendly
  │   └─→ [Preview template]
  ├─→ [Customize Brand]:
  │   ├─→ [Upload Logo] Image
  │   ├─→ [Brand Colors] Select 3 accent colors
  │   ├─→ [Store Description] "Curated fashion for everyone"
  │   ├─→ [Profile Photo] Avatar image
  │   └─→ [Live Preview] See changes in real-time
  └─→ [Next →]
        ↓

STEP 3: ADD FIRST PRODUCTS (5 required)
  ├─→ [Product 1: Upload]:
  │   ├─→ [Product Images] Upload 3-5 photos
  │   ├─→ [Product Title] "Vintage Leather Jacket"
  │   ├─→ [Description] Write product story
  │   ├─→ [Price] $45.00
  │   ├─→ [Category] Women's Fashion → Jackets
  │   ├─→ [Variants] Size (XS-XXL), Color (Black, Brown)
  │   ├─→ [Shipping] Cost & weight
  │   └─→ [Save Product]
  │
  ├─→ [Product 2-5: Repeat] (4 more products needed)
  │
  └─→ [All 5 added ✓] → [Next →]
        ↓

STEP 4: PAYMENT & BANK SETUP
  ├─→ [Payment Methods (Buyer → Reseller)]:
  │   ├─→ Accept Credit Cards ✓
  │   ├─→ Accept Wallets ✓
  │   ├─→ Accept Bank Transfer ✓
  │   └─→ Accept Installments ✓
  ├─→ [Bank Account (Payout)]:
  │   ├─→ [Bank Name] Select bank
  │   ├─→ [Account Number] XXXXXXXXX
  │   ├─→ [Routing Number] XXXXXXXXX
  │   ├─→ [Account Holder Name] Jordan Smith
  │   └─→ [Verify Account] ✓
  └─→ [Next →]
        ↓

STEP 5: VERIFICATION
  ├─→ [Platform Reviews Products]
  │   ├─→ Check image quality
  │   ├─→ Verify descriptions
  │   ├─→ Check pricing (not suspiciously low)
  │   └─→ Status: "Pending Verification..."
  ├─→ [Platform Verifies Identity]
  │   ├─→ Email verified ✓
  │   ├─→ Bank account verified ✓
  │   └─→ Seller agreement signed ✓
  └─→ [Approved!] ← "Verified Reseller" Badge ✓
        ↓

┌─────────────────────────────────────┐
│  STOREFRONT GOES LIVE!              │
└─────────────────────────────────────┘
  ├─→ [Storefront Published]:
  │   └─→ URL: utshorgo.com/stores/jordansfashion
  ├─→ [Share Storefront]:
  │   ├─→ Copy link
  │   ├─→ Share on Instagram
  │   ├─→ Share on TikTok
  │   ├─→ Share on Facebook
  │   └─→ Email to contacts
  ├─→ [First Impressions]:
  │   ├─→ View count: 1,234 (dashboard)
  │   ├─→ Follower count: 23
  │   └─→ Wishlist adds: 5
  └─→ [Dashboard Walkthrough]:
      ├─→ Show sales chart
      ├─→ Show analytics
      └─→ Show growth tips
        ↓

┌─────────────────────────────────────┐
│  FIRST SALE PROCESS                 │
└─────────────────────────────────────┘

BUYER PURCHASES:
  ├─→ [Buyer Discovers] Jordan's storefront
  ├─→ [Buyer Browses] Products & reviews
  ├─→ [Buyer Selects] "Vintage Leather Jacket"
  ├─→ [Buyer Customizes] Size: L, Color: Black
  ├─→ [Buyer Checks Out] Complete payment
  └─→ [Order Confirmation Sent]
        ↓

RESELLER FULFILLS:
  ├─→ [Notification] "New Order! #UTH-001"
  │   └─→ Dashboard shows new order
  ├─→ [Reseller Views] Order details
  │   ├─→ Buyer name & address
  │   ├─→ Product ordered
  │   ├─→ Shipping method
  │   └─→ Payment received: $45.00
  ├─→ [Reseller Fulfills]:
  │   ├─→ Pick product from inventory
  │   ├─→ Pack item carefully
  │   ├─→ Print shipping label
  │   ├─→ Drop at carrier (USPS/UPS/FedEx)
  │   └─→ Mark "Shipped" in dashboard
  ├─→ [Tracking Sent]:
  │   └─→ Buyer receives tracking number via SMS/Email
  └─→ [Buyer Receives Product]:
      ├─→ Delivery confirmed
      └─→ "Please leave a review!" prompt
        ↓

RESELLER DASHBOARD UPDATES:
  ├─→ [Revenue]: +$45.00
  │   └─→ Platform fee (-$4.50): Net $40.50
  ├─→ [Order Count]: +1
  ├─→ [Rating]: Awaiting review from buyer
  ├─→ [Growth Tips]:
  │   ├─→ "Great first sale! 🎉"
  │   ├─→ "Add 5 more products to unlock Growth Badge"
  │   ├─→ "Your response time: <2h (Excellent!)"
  │   └─→ "Share your storefront to get more views"
  └─→ [Buyer Leaves Review]:
      └─→ ★★★★★ "Perfect! Exactly as described. Fast shipping!"
        ↓

┌─────────────────────────────────────┐
│  RESELLER GROWTH PATH               │
└─────────────────────────────────────┘
  ├─→ [Add More Products] Scale to 10, 20, 50+ items
  ├─→ [Find Suppliers]:
  │   ├─→ Browse Supplier Marketplace
  │   ├─→ Get wholesale pricing
  │   └─→ Negotiate bulk discounts
  ├─→ [Optimize Pricing]:
  │   ├─→ Use AI Pricing Tool
  │   ├─→ Monitor competitor prices
  │   └─→ Adjust for profit margin
  ├─→ [Launch Marketing]:
  │   ├─→ Create social media templates
  │   ├─→ Share product posts daily
  │   ├─→ Run email campaigns
  │   └─→ Track conversion rates
  ├─→ [Engage Customers]:
  │   ├─→ Message buyers quickly (<2h)
  │   ├─→ Handle returns/issues professionally
  │   ├─→ Collect 5-star reviews
  │   └─→ Build loyalty
  ├─→ [Unlock Badges & Growth]:
  │   ├─→ "New Reseller" (starting)
  │   ├─→ "Verified Reseller" (after first sale)
  │   ├─→ "Rising Star" (100+ sales in 30 days)
  │   ├─→ "Premium Reseller" (1000+ sales lifetime)
  │   └─→ "Certified Expert" (Top 5% rating)
  └─→ [Scale Business]:
      ├─→ Hire help for order fulfillment
      ├─→ Expand to multiple niches
      ├─→ Consider dropshipping
      ├─→ Launch wholesale B2B
      └─→ Potential full-time income ✓

END (Successful Reseller)
```

---

## FLOW 3: Service Provider (David) Books First Consultation

```
START (Service Provider Setup)
  ↓
┌─────────────────────────────────────┐
│  DAVID SETS UP SERVICE PROFILE      │
└─────────────────────────────────────┘
  ├─→ [Choose Account Type] → [Service Provider]
  ├─→ [List Service]:
  │   ├─→ Service Title: "UX Design Consultation"
  │   ├─→ Category: Design & Creative
  │   ├─→ Description: "1-on-1 UX/UI design feedback"
  │   └─→ [Next]
  ├─→ [Set Pricing]:
  │   ├─→ Rate: $150/hour
  │   ├─→ Duration: 60 minutes (standard session)
  │   ├─→ Min booking: 1 session
  │   └─→ [Next]
  ├─→ [Add Portfolio]:
  │   ├─→ Case study 1: "Redesigned E-commerce Platform"
  │   ├─→ Case study 2: "Mobile App UX Audit"
  │   ├─→ Testimonial: "David's feedback was transformative!"
  │   ├─→ Results: "Improved conversion by 23%"
  │   └─→ [Next]
  ├─→ [Verify Credentials]:
  │   ├─→ UX Certification: ✓
  │   ├─→ Years of experience: 8 years
  │   ├─→ Portfolio review: APPROVED
  │   └─→ "Verified Expert" Badge ✓
  ├─→ [Set Availability Calendar]:
  │   ├─→ Mon-Fri: 10am-6pm
  │   ├─→ Lunch break: 12-1pm (unavailable)
  │   ├─→ Holidays: Dec 25, Jan 1 (blocked)
  │   └─→ [Save schedule]
  ├─→ [Connect Payment]:
  │   ├─→ Bank account for payouts
  │   ├─→ Zoom account (for video calls)
  │   └─→ [Verify]
  └─→ [Publish Service] ✓ Service now live
        ↓

┌─────────────────────────────────────┐
│  MAYA (BUYER) DISCOVERS SERVICE      │
└─────────────────────────────────────┘
  ├─→ [Search] "UX Design Consultation"
  ├─→ [Browse Results]:
  │   ├─→ Filter: Budget, Rating, Experience
  │   └─→ Find: David's service
  ├─→ [View Service Profile]:
  │   ├─→ Service: "UX Design Consultation"
  │   ├─→ Price: $150/hour
  │   ├─→ David's Avatar + Name
  │   ├─→ Rating: ★★★★★ (4.9) | 145 reviews
  │   ├─→ Bio: "8 years UX experience, worked on 50+ products"
  │   ├─→ Badges: "Verified Expert" ✓
  │   ├─→ Portfolio samples (clickable)
  │   └─→ Client testimonials (scrollable)
  └─→ [Decision] "This looks perfect!" → [Book Now]
        ↓

┌─────────────────────────────────────┐
│  BOOKING PROCESS                    │
└─────────────────────────────────────┘
  ├─→ [Click "Book Consultation"]
  ├─→ [Select Date & Time]:
  │   ├─→ Calendar opens
  │   ├─→ Green = available slots
  │   ├─→ Red = booked
  │   ├─→ Gray = unavailable
  │   └─→ Maya selects: "Fri, Sept 15 @ 2:00pm"
  ├─→ [Review Booking Details]:
  │   ├─→ Service: "UX Design Consultation"
  │   ├─→ Provider: David
  │   ├─→ Date & Time: Fri, Sept 15, 2:00pm-3:00pm
  │   ├─→ Duration: 60 minutes
  │   ├─→ Price: $150
  │   └─→ Total: $150
  ├─→ [Add Special Instructions] (optional):
  │   └─→ "I'm redesigning a mobile app. Can we focus on user flows?"
  ├─→ [Checkout]:
  │   ├─→ Payment method (card, wallet)
  │   ├─→ Billing address
  │   └─→ [Pay & Book]
  ├─→ [Confirmation Email]:
  │   ├─→ Booking details
  │   ├─→ Zoom link: zoom.us/meeting/utshorgo-12345
  │   ├─→ Cancellation policy (24h notice)
  │   └─→ David's contact info
  └─→ [Notification to David]:
      └─→ "New booking from Maya - Fri Sept 15 @2pm"
        ↓

┌─────────────────────────────────────┐
│  PRE-CONSULTATION (24h before)       │
└─────────────────────────────────────┘
  ├─→ [Reminder to Maya]:
  │   ├─→ Email: "Your consultation is tomorrow"
  │   ├─→ SMS: "Heads up! 24h until your call with David"
  │   └─→ [Zoom link included]
  ├─→ [Reminder to David]:
  │   ├─→ Email: "You have a session tomorrow"
  │   ├─→ Dashboard: Booking highlighted
  │   └─→ [Client info]: Maya's profile, special instructions
  └─→ [David Prepares]:
      ├─→ Reviews Maya's portfolio link (if provided)
      ├─→ Prepares feedback notes
      ├─→ Tests Zoom setup
      └─→ Gathers relevant design resources
        ↓

┌─────────────────────────────────────┐
│  CONSULTATION DAY                   │
└─────────────────────────────────────┘
  ├─→ [1 Hour Before]:
  │   └─→ SMS to Maya: "Reminder: Your session with David starts in 1h"
  ├─→ [At Scheduled Time] (Fri, 2:00pm):
  │   ├─→ David joins Zoom: zoom.us/meeting/utshorgo-12345
  │   ├─→ Maya joins Zoom
  │   ├─→ 60-minute session begins
  │   └─→ Call recorded (with consent)
  ├─→ [Session Activities]:
  │   ├─→ Introduction & rapport (5 min)
  │   ├─→ Screen sharing: Maya shows mobile app mockups
  │   ├─→ David provides feedback: UX issues, improvements
  │   ├─→ Discussion: Best practices, design patterns
  │   ├─→ Action items: What Maya should focus on
  │   └─→ Next steps: Q&A
  └─→ [Session Ends] (3:00pm)
        ↓

┌─────────────────────────────────────┐
│  POST-CONSULTATION                  │
└─────────────────────────────────────┘
  ├─→ [Immediately After]:
  │   ├─→ David sends follow-up email:
  │   │   ├─→ Session summary
  │   │   ├─→ Key recommendations
  │   │   ├─→ Resources/articles referenced
  │   │   ├─→ Recording link (24h access)
  │   │   └─→ Offer for follow-up session (discount)
  │   └─→ Maya receives:
  │       ├─→ Video recording
  │       ├─→ David's detailed notes
  │       ├─→ Design templates
  │       └─→ Feedback document
  ├─→ [Payment Processing]:
  │   ├─→ Maya charged: $150
  │   ├─→ Platform fee (15%): -$22.50
  │   ├─→ David's payout: $127.50
  │   └─→ Transferred to David's bank (3-5 business days)
  ├─→ [Rating & Review]:
  │   ├─→ Maya rates experience:
  │   │   ├─→ Overall: ★★★★★ (5 stars)
  │   │   ├─→ Communication: ★★★★★
  │   │   ├─→ Expertise: ★★★★★
  │   │   └─→ Written review: "David was incredibly insightful. Highly recommend!"
  │   └─→ David replies with thank you note
  └─→ [Dashboard Updates]:
      ├─→ David's rating: 4.9★ → 4.91★
      ├─→ Total sessions: 145 → 146
      ├─→ Total earnings this month: +$127.50
      └─→ New testimonial added to profile ✓
        ↓

┌─────────────────────────────────────┐
│  DAVID'S GROWTH & SCALING            │
└─────────────────────────────────────┘
  ├─→ [Build Authority]:
  │   ├─→ More bookings → Higher rating
  │   ├─→ Positive reviews → More visibility
  │   └─→ Consistency → "Expert Badge" upgrade
  ├─→ [Increase Pricing]:
  │   ├─→ After 50 bookings: Raise to $175/hour
  │   ├─→ After 100 bookings: Raise to $200/hour
  │   └─→ Repeat bookings at higher rate
  ├─→ [Launch Subscription]:
  │   ├─→ Monthly coaching membership ($300/mo)
  │   ├─→ 2 sessions/month + async feedback
  │   └─→ Recurring revenue stream
  ├─→ [Offer Group Workshops]:
  │   ├─→ "UX Design Masterclass" (10 people, $99 each)
  │   ├─→ Recorded, sells indefinitely
  │   └─→ Passive income
  ├─→ [Build Course]:
  │   ├─→ "Complete UX Design System" (online course)
  │   ├─→ 10 modules, video-based
  │   ├─→ One-time purchase $299
  │   └─→ Recurring revenue + expert authority
  └─→ [Expert Directory]:
      ├─→ Listed as "Top UX Expert"
      ├─→ Featured in newsletter
      ├─→ Organic bookings increase
      └─→ Potential for 50+ bookings/month ✓

END (Successful Service Provider)
```

---

## FLOW 4: Admin Moderation - Product Verification

```
START (Product Uploaded by Reseller Jordan)
  ↓
┌─────────────────────────────────────┐
│  AI PRE-CHECK                        │
└─────────────────────────────────────┘
  ├─→ [AI Scans Product]:
  │   ├─→ Check for counterfeits (image recognition)
  │   ├─→ Check for policy violations (text analysis)
  │   ├─→ Check pricing (is it suspiciously low?)
  │   ├─→ Check image quality (min 300px × 300px)
  │   ├─→ Check description (min 50 chars, appropriate language)
  │   └─→ Check seller history (new seller? verified?)
  ├─→ [AI Scoring]:
  │   ├─→ Risk score: 2/10 (Low risk) ← APPROVED
  │   ├─→ OR Risk score: 7/10 (Medium risk) ← REVIEW
  │   └─→ OR Risk score: 9/10 (High risk) ← INVESTIGATE
  └─→ [Route Decision]:
      ├─→ Low risk (< 3) → Auto-publish
      ├─→ Medium risk (3-6) → Human review queue
      └─→ High risk (> 6) → Investigation queue
        ↓

IN THIS CASE: Medium Risk (5/10)
Reason: New seller + low price + no seller reviews
Route: Human review queue
        ↓

┌─────────────────────────────────────┐
│  ADMIN REVIEW                        │
└─────────────────────────────────────┘
  ├─→ [Admin Logs In]:
  │   └─→ Moderation Dashboard
  ├─→ [Reviews Flagged Product]:
  │   ├─→ Product: "Vintage Leather Jacket"
  │   ├─→ Price: $45
  │   ├─→ Seller: Jordan (New Reseller, Verified ✓)
  │   ├─→ Category: Women's Fashion → Jackets
  │   ├─→ Images: 4 photos (good quality) ✓
  │   └─→ Description: Detailed, professional ✓
  ├─→ [Detailed Checks]:
  │   ├─→ Image Verification:
  │   │   ├─→ Authenticity check: Genuine leather? Likely YES
  │   │   ├─→ Quality: Professional product photos ✓
  │   │   └─→ Multiple angles: Front, back, detail ✓
  │   ├─→ Description Accuracy:
  │   │   ├─→ Matches images: YES ✓
  │   │   ├─→ Size chart provided: YES ✓
  │   │   ├─→ Material description: YES ✓
  │   │   └─→ Care instructions: YES ✓
  │   ├─→ Pricing Analysis:
  │   │   ├─→ Comparable products: $60-$100 range
  │   │   ├─→ $45 is reasonable (not suspiciously low) ✓
  │   │   ├─→ Seller margin: Likely positive ✓
  │   │   └─→ Shipping cost: $5 (reasonable) ✓
  │   ├─→ Seller History:
  │   │   ├─→ Account age: 3 days (new)
  │   │   ├─→ Verification: Email ✓, Bank ✓, Identity ✓
  │   │   ├─→ Previous issues: None (clean record)
  │   │   └─→ Response time: Not yet tested
  │   └─→ Category Accuracy:
  │       ├─→ Correct category: YES ✓
  │       ├─→ Tags applied: fashion, vintage, leather ✓
  │       └─→ Searchable keywords: YES ✓
  ├─→ [Admin Decision]:
  │   └─→ ✓ [APPROVE] → Product goes live
  │   OR [ ] [REQUEST CHANGES] → Notify seller
  │   OR [ ] [REJECT] → Remove & explain
  └─→ ✓ APPROVED!
        ↓

┌─────────────────────────────────────┐
│  PRODUCT GOES LIVE                  │
└─────────────────────────────────────┘
  ├─→ [Product Listing Published]:
  │   ├─→ Searchable on Utshorgo
  │   ├─→ Visible in "New Arrivals"
  │   ├─→ Added to AI recommendations
  │   └─→ Shareable link: utshorgo.com/products/vintage-jacket-123
  ├─→ [Notification to Jordan (Seller)]:
  │   ├─→ Email: "Your product was approved! 🎉"
  │   ├─→ Dashboard: Shows as "Live" (green badge)
  │   ├─→ Recommendation: "Next: Add 4 more products to unlock Rising Star"
  │   └─→ First impressions tracking begins
  └─→ [Ongoing Monitoring]:
      ├─→ Admin tracks:
      │   ├─→ Sales velocity
      │   ├─→ Return rate
      │   ├─→ Customer complaints
      │   └─→ Reviews (for fraudulent feedback)
      └─→ Seller trust score: +5 points ✓
        ↓

┌─────────────────────────────────────┐
│  SCENARIO: ISSUE DISCOVERED LATER   │
│  (Buyer reports: "Not authentic")   │
└─────────────────────────────────────┘
  ├─→ [Buyer Files Report]:
  │   ├─→ Report reason: "Item quality not as described"
  │   ├─→ Claim: "Leather feels synthetic, not vintage"
  │   ├─→ Attachment: Photos showing discrepancy
  │   └─→ Request: Refund or replacement
  ├─→ [Case Created]:
  │   └─→ Dispute ID: #DSP-2024-5678
  ├─→ [Admin Investigates]:
  │   ├─→ Review buyer's evidence
  │   ├─→ Check seller's response
  │   ├─→ Request additional photos/inspection
  │   ├─→ Check seller's history (this issue before?)
  │   └─→ Consider: Is this isolated or pattern?
  ├─→ [Decision Options]:
  │   ├─→ [Side with Buyer]
  │   │   ├─→ Authorize refund (Jordan's account charged)
  │   │   ├─→ Buyer returns item OR keeps it
  │   │   ├─→ Issue resolved
  │   │   └─→ Jordan's trust score: -10 points
  │   ├─→ [Side with Seller]
  │   │   ├─→ If buyer acknowledged item as-is
  │   │   ├─→ No refund issued
  │   │   └─→ Case closed
  │   └─→ [Compromise]
  │       ├─→ Partial refund (50%)
  │       ├─→ Buyer keeps item
  │       └─→ Jordan's trust score: -5 points
  ├─→ [If Pattern Detected]:
  │   ├─→ Multiple complaints about Jordan
  │   ├─→ Admin escalates to higher level review
  │   ├─→ Warnings issued to seller
  │   ├─→ Potential suspension if continued
  │   └─→ Trust score: Downgraded from "Verified" to "Under Review"
  └─→ [Public Accountability]:
      ├─→ Verified badge may be removed
      ├─→ Transparency report: Admin publishes reason
      └─→ Marketplace integrity maintained ✓

END (Case resolved, trust maintained)
```

---

**Status**: ✅ User Flows Complete | Ready for Testing
