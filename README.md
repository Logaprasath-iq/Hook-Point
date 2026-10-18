# HookPoint — Premium Fishing Tackle & Bait Shop Website

> “Gear Up. Cast Out. Reel In.”

**HookPoint** is a complete, cinematic, fully responsive multi-page e-commerce website for a premier **Fishing Tackle & Bait Shop**, built using **HTML5**, **Tailwind CSS**, and **Vanilla JavaScript** (strictly zero frontend frameworks: no React, JSX, Vue, or Angular).

Designed with a grand Deep Ocean aesthetic, cinematic outdoor angling photography, dynamic SVG wave contours, ambient underwater lighting, and smooth staggered scroll-reveal animations.

---

## 🌟 Key Features

### 1. Dedicated E-Commerce Retail Store
- **Strictly Retail Fishing Equipment**: Designed exclusively for selling fishing rods, reels, braided lines, terminal hooks, artificial lures, preserved bait, tackle storage, and marine accessories.
- **Zero Coaching / Academy Clutter**: Completely free of training courses, instructor profiles, coach credentials, or booking services.
- **Individual Product Pricing Tiers & Combos**: Detailed price breakdown across Best-Value (<₹1,000), Mid-Range (₹1,000–₹5,000), and Premium Pro (>₹5,000), plus curated combo bundles and volume discounts for angling clubs and charter fleets.

### 2. Dual Storefront Layouts (Home 1 & Home 2)
- **Home 1 (`index.html`) — Cinematic Storefront**: Grand full-bleed hero, 8 tackle categories, best sellers grid with quick-add, curated combo packages, retail guarantees, live coastal telemetry, and verified angler reviews.
- **Home 2 (`home-2.html`) — Equipment Showcase**: Distinct split-screen hero ("Find the Right Gear for Every Cast"), 6 featured collections, 6 new arrivals with "NEW" badges, 4 shop-by-fishing-need cards, promotional discounts (up to 24% off), product spotlight with technical specs, and essential gear checklist.
- **Sticky Home Dropdown**: Accessible on both desktop (hover with subtle dropdown delay) and mobile (accordion toggle) across all 11 pages.

### 3. Staggered Scroll-Reveal Animation Engine (`js/animations.js`)
- **Card-by-Card Cascades**: Product cards, collection cards, and report tiles smoothly glide into view as the user scrolls.
- **Responsive Stagger Calculation**: Dynamically computes grid columns (1 mobile, 2 tablet, 3 laptop, 4 desktop) and staggers elements by `120ms` per column index via CSS custom properties (`--reveal-delay`).
- **Heading & Text Reveal**: Section titles and subtitles reveal sequentially with a `100ms` staggered interval.
- **Motion Accessibility**: Automatically respects `prefers-reduced-motion` with instant visibility fallback.

### 4. Strict Global Container & Responsive System
- **Unified Standard Container**: Every page, section, hero block, navbar, product grid, order form, and footer uses:
  ```html
  <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">...</div>
  ```
- **Zero Horizontal Misalignment**: Headings, cards, forms, and footers align on identical left/right margins across all viewports (320px to 1920px+).
- **Zero Horizontal Scroll**: Engineered with `overflow-x: clip` to completely eliminate horizontal scrolling bugs.

### 5. Deep Ocean Brand Identity
- **Color Palette**:
  - Deep Navy (`#061B2C`) — Main backgrounds & dark surfaces
  - Ocean Blue (`#087EAB`) — Action buttons, category pills, badges
  - Aqua (`#42C6E8`) — Highlights, glow effects, active links
  - Metallic Gold (`#D6A928`) — Prices, primary CTAs, discount badges
  - White (`#FFFFFF`) — High-contrast typography on dark themes
  - Soft White (`#F4FAFC`) — Light-mode backgrounds
  - Muted Blue (`#7894A8`) — Subtitles, secondary text, metadata
- **Official Brand Mark**: Authentic HookPoint leaping fish and gold hook logo embedded in headers, footers, favicons, and drawers.
- **Chennai Outpost**: Configurable store outpost based in Chennai, Tamil Nadu, India (`13.0827° N, 80.2707° E`), with Google Maps embed and live coastal telemetry.

### 6. Interactive Tackle Box & Cart System (`js/cart.js`)
- Full `localStorage` persistence under `'hookpoint_cart'`.
- Slide-out Tackle Box drawer with item count, unit quantity stepper, line-item removal, and live subtotal calculation.
- Animated gold cart badge in header reflecting active quantities.
- Free Express Shipping progress bar (Unlocked on orders above ₹2,999).
- Floating auto-dismissing toast notification alerts with timer progress bars.

### 7. Order Enquiry & Checkout (`order.html` & `js/forms.js`)
- **Frictionless Shopping**: Direct order submission without mandatory account registration.
- **Auto-Fill Query Support**: Reads `?productId=...` to instantly populate requested gear.
- **Full Form Validation**: Real-time validation for angler name, 10-digit phone, email, street address, and 6-digit postal PIN.
- **Demo Reference Number**: Generates verifiable order IDs (e.g. `HKP-2026-XXXXX`).
- **Confirmation Modal**: Order breakdown modal with 1-click WhatsApp order confirmation option.

### 8. Dual Theme & Bi-Directional Layout Engine
- **Dark / Light Theme** (`js/theme.js`): Deep Ocean dark theme vs Soft White light theme with `localStorage` persistence.
- **LTR / RTL Support** (`js/direction.js`): Bi-directional switcher toggle updating `dir="rtl"` with logical margin/padding utilities.

---

## 📂 11-Page Architecture

```
HookPoint/
│
├── index.html               # 1. Home 1 (Cinematic Storefront: hero, 8 categories, best sellers, 4 bundles, guarantees, fishing telemetry)
├── home-2.html              # 2. Home 2 (Equipment Showcase: split hero, 6 collections, 6 new arrivals, gear spotlight, offers)
├── about.html               # 3. About (Brand heritage, mission, 5 values, 2018-2026 timeline, 4 coastal theaters, 4 workshop bays, conservation pledge, 8 FAQs)
├── products.html            # 4. Products Catalogue (32 products, 10 categories, live search filter, price sorting, grid/list toggle)
├── product-details.html     # 5. Product Details (Dynamic URL parameter loader, image gallery thumbnails, specs, reviews, related gear)
├── pricing.html             # 6. Pricing & Packages (Zero images, 4 content-driven curated packages, 11-row technical comparison table, volume discounts, FAQs)
├── blog.html                # 7. Angler Journal / Blog (10 in-depth angler guides, search, 8 category tags, reading times)
├── blog-details.html        # 8. Blog Details (Dynamic guide article loader, reading progress bar, social share links, full article content)
├── fishing-reports.html     # 9. Local Fishing Reports (6 live coastal telemetry locations, tides/swells, recommended tackle, catch modal)
├── order.html               # 10. Order & Cart (2-column responsive layout, customer info, delivery address, live cart computation)
├── contact.html             # 11. Contact (Chennai Outpost details, Google Maps embed, operating hours, enquiry category form)
│
├── assets/
│   ├── images/
│   │   └── logo.png         # Official HookPoint fish and gold hook logo
│   └── icons/
│
├── css/
│   └── styles.css           # Global design system, CSS variables, staggered reveal-card animations, wave keyframes, nav dropdowns
│
└── js/
    ├── data.js              # Central retail data store: 32 products, 10 categories, bundles, 10 blog articles, telemetry reports
    ├── theme.js             # Dark / Light theme switcher with localStorage persistence
    ├── direction.js         # LTR / RTL direction toggle with localStorage persistence
    ├── cart.js              # Slide-out Tackle Box cart, quantity modifier, toast alerts, cart badges
    ├── animations.js        # Staggered IntersectionObserver scroll-reveal engine for cards and text
    ├── main.js              # Sticky navbar, mobile drawer, dropdown toggles, animated stat counters
    ├── products.js          # Product catalogue filtering, dynamic search, sorting, and detail page renderer
    ├── blog.js              # Blog article search, category filtering, and single blog post renderer
    ├── reports.js           # Fishing reports filtering and catch report modal logic
    └── forms.js             # Retail order validation, fee computation, reference generator, contact inquiry handler
```

---

## 🚀 How to Run the Website

### Option 1: Direct File Opening
Double-click `index.html` or open any `.html` file directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local HTTP Server (Recommended for query parameters & seamless navigation)
Using Python:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

Using Node.js:
```bash
npx serve .
```

---

## 🛡️ Retail Standards & Quality Assurance
- **Strictly E-Commerce Retail**: No coaching classes, teaching curriculums, or instructor credentials.
- **HTML5 Semantic Structure**: Clean header, main, nav, section, article, and footer semantics.
- **Tailwind CSS Utility Styling**: Clean, maintainable responsive utilities.
- **Zero Frontend Frameworks**: Pure Vanilla JavaScript without React, Vue, Angular, or external UI libraries.
- **Verified Link Integrity**: 100% of internal links resolve to valid, existing pages with 0 broken links.
- **Mobile First & Fully Responsive**: Tested across 320px, 360px, 375px, 414px, 768px, 1024px, 1280px, and 1440px breakpoints.
