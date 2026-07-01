# SUSAN GRACE — Website Development Report

## SDLC (Software Development Life Cycle) Documentation

**Project:** susangrace.com — Personal Brand & Media Kit Website  
**Platform:** Single-page React application (Vite + TypeScript + Tailwind CSS v4)  
**Date:** June 2026  

---

## 1. PLANNING & REQUIREMENTS GATHERING

### 1.1 Stakeholder & Brand Analysis
- **Client:** Susan Grace — Kenyan media personality, podcast host, and women's empowerment movement leader
- **Audience:** Women aged 20–35 across Africa
- **Manifesto:** *"Women of Purpose. Bold Faith. Unapologetic Self-Worth."*
- **Tone:** Premium, cinematic, emotionally bold — never templated or generic

### 1.2 Project Scope (7 Content Sections)
| Section | Description |
|---|---|
| Hero | Full-bleed title + portrait with "Into the Light" animations |
| What Susan Believes | Declarative faith statements + oversized pull-quote card |
| The Movement | 5 Word-Morph transformation pairs + stats block |
| The Ripple Effect | Floating community voice wall with 28 comment cards |
| The Stories | Women Building The Future — teaser content |
| Work With Susan | Partnership opportunities grid |
| About Susan | Biography + philosophy teaser |
| Final / Community Join | Video coverflow carousel + social links + email capture |
| Contact Form | 5-field inquiry form with custom subject dropdown |

### 1.3 Core Creative Concept
- **"Into the Light":** Every section behaves like something is being illuminated
- 5 reusable motion patterns defined: Line-Build Reveal, Word-Morph, Floating Fade, Count-Up, Glow Pulse

### 1.4 Technology Stack Selection
| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6.3 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) v12 |
| Forms | Formspree (serverless form handling) |
| Icons | Lucide React |
| UI Components | Radix UI primitives + shadcn/ui |
| Diagrams/Charts | Recharts |
| Package Manager | pnpm |
| Fonts | Google Fonts (Inter, Archivo initially; finalized to Inter) |

---

## 2. SYSTEM DESIGN & ARCHITECTURE

### 2.1 Application Architecture
```
├── index.html                        # Entry HTML
├── src/
│   ├── main.tsx                      # React DOM mount + style imports
│   ├── app/
│   │   ├── App.tsx                   # Root component (Layout wrapper)
│   │   ├── components/
│   │   │   ├── Layout.tsx            # Page layout shell (Nav + Main + Footer)
│   │   │   ├── Nav.tsx               # Fixed navigation with desktop/mobile variants
│   │   │   ├── Footer.tsx            # Branded footer
│   │   │   ├── CustomCursor.tsx      # Custom cursor with magnetic follow effect
│   │   │   ├── MagneticButton.tsx    # Button with spring-magnetic hover effect
│   │   │   ├── RevealText.tsx        # Word-by-word spring reveal animation
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx  # Error-handling image component
│   │   │   └── ui/                   # 50+ shadcn/ui primitives
│   │   └── pages/
│   │       └── Home.tsx              # Single-page application main content
│   └── styles/
│       ├── fonts.css                 # Google Fonts import
│       ├── tailwind.css              # Tailwind CSS v4 init
│       ├── theme.css                 # Brand design tokens & CSS variables
│       └── index.css                 # Style cascade entry point
├── public/
│   ├── *.png / *.jfif                # 9 hero/brand images (removebg processed)
│   ├── comments/ (1–28.png)          # 28 community voice screenshot placeholders
│   ├── videos/ (1–11.mp4)            # 11 background video clips for coverflow
│   └── favicon_io/                   # Favicon & manifest files
├── vite.config.ts                    # Vite + React + Tailwind plugin config
├── package.json                      # 60+ dependencies managed
└── postcss.config.mjs                # PostCSS config
```

### 2.2 Design System Architecture
- **CSS Variable Token System:** 50+ design tokens mapped in `theme.css`
  - Colors: Charcoal Black (#15171B), Studio Grey-White (#F2F0EE), Pure White (#FFFFFF), Blush Tint (#FBEAEE), Live Red (#FF2E45), Raspberry Rose (#C51C48), Indigo Night (#0A0F2F), Magenta Pulse (#C02C6B)
  - Typography: Inter (body), Archivo (headlines — later replaced), Barlow Condensed (labels — later replaced)
  - Semantic tokens: `--primary`, `--background`, `--accent`, etc.
  - Dark mode support via `.dark` class variant
- **Tailwind v4 Theme:** `@theme inline` block mapping CSS vars to Tailwind utility classes

---

## 3. UI/UX DESIGN

### 3.1 Brand Identity Implementation
- **Color Palette:** 8 custom hex colors applied across all components
- **Vibrant Glow:** Radial/diagonal gradient (Indigo Night → Magenta Pulse) used as lighting effect — never flat backgrounds
- **Typography:** Inter as primary typeface (finalized after testing Archivo/Playfair)

### 3.2 Animation System (5 Core Patterns)
| Pattern | Implementation | Usage |
|---|---|---|
| Line-Build Reveal | Staggered `opacity` + `translateY` via `setTimeout` chains | Hero headline (3 lines) |
| Word-Morph | Transformation pair rows with `translateX` + transition delays | "Dreaming → Doing" etc. |
| Floating Fade | `useEffect` with `setInterval` cycling visible elements + random rotation | Community voice wall |
| Count-Up | `requestAnimationFrame` with cubic ease-out interpolation | Stats (170K+ community members) |
| Glow Pulse | CSS `@keyframes glowPulse` on radial gradient overlays | Behind hero photos, voice wall |

### 3.3 Responsive Design Strategy
- **Mobile-first** CSS with `clamp()` for fluid typography
- Breakpoints: `sm: 640px, md: 768px, lg: 1024px`
- Navigation: Desktop inline links → Mobile full-screen overlay
- Grid layouts: Single column (mobile) → 2-column (lg) for hero, beliefs, movement, stories
- Floating wall: 3–4 elements (desktop) → 2 elements (mobile)
- Touch targets: Minimum 44px tap targets

### 3.4 Interactive Components
| Component | Behavior |
|---|---|
| Custom Cursor | Spring-animated follower dot; `mix-blend-mode: difference`; scales on hover over links/buttons |
| MagneticButton | Mouse-position-tracking spring movement (30% distance from center); 1.05× scale on hover |
| RevealText | Word-by-word spring animation triggered on scroll intersection |
| MagicImage | Cycles between images on scroll-out-of-view using IntersectionObserver |
| VideoCoverflow | 11 videos in a coverflow carousel, auto-rotating every 3 seconds |
| Contact Form | Custom dropdown with 4 subject options; Formspree submission; animated success state with multi-phase reveal |

---

## 4. IMPLEMENTATION & DEVELOPMENT

### 4.1 Environment Setup
- [x] Initialize Vite + React + TypeScript project
- [x] Configure Tailwind CSS v4 with `@tailwindcss/vite` plugin
- [x] Set up pnpm workspace with architecture support flags
- [x] Configure path alias (`@` → `./src`)
- [x] Import & configure Google Fonts (Inter)
- [x] Install core dependencies: `motion`, `lucide-react`, `@formspree/react`, `recharts`, `@radix-ui/*` primitives
- [x] Install 50+ shadcn/ui components for potential reuse

### 4.2 Design System Implementation
- [x] Define brand color tokens as CSS custom properties
- [x] Create `@theme inline` Tailwind mapping block
- [x] Set up typography hierarchy (h1–h6, body, labels, buttons)
- [x] Configure scrollbar styling (thin, Raspberry Rose thumb)
- [x] Implement custom scrollbar with brand colors
- [x] Implement dark mode CSS variables

### 4.3 Core Component Development
- [x] **Layout** — Shell with Nav + `<main>` + Footer
- [x] **Nav** — Fixed position, scroll-aware background transition, desktop links + mobile full-screen overlay with hamburger toggle, "Partner With Susan" CTA button
- [x] **Footer** — Wordmark, copyright, partner CTA button
- [x] **CustomCursor** — Hidden default cursor, spring-animated follower, hover state detection, `mix-blend-difference`
- [x] **MagneticButton** — Reusable wrapper with mouse-position spring tracking, scale animation, anchor/button support
- [x] **RevealText** — Word-by-word spring reveal using `useInView` + `motion` variants
- [x] **ImageWithFallback** — Error-state SVG placeholder

### 4.4 Page Section Development (Home)
- [x] **Hero Section**
  - Line-Build Reveal for 3-line headline
  - Off-center portrait with glow pulse behind
  - CTA buttons: [Meet The Women], [Partner With Susan]
  - Supporting statement grid (6 items)
  - Scroll indicator with bounce animation
  - MagicImage cycling between 2 hero photos

- [x] **What Susan Believes Section**
  - Declarative faith statements with reveal animation
  - Oversized pull-quote card ("What happened to your imagination?")
  - Suspended quotation mark SVG watermark
  - Speaker attribution with avatar

- [x] **The Movement Section**
  - 5 Word-Morph transformation pairs with staggered slide-in animation
  - Animated circular arrow dividers with pulse glow
  - Stats block with Count-Up animation (4 columns)
  - MagicImage with hover scale effect
  - Supporting copy explaining the movement

- [x] **The Ripple Effect (Community Voices)**
  - 28 comment card images in floating fade pattern
  - Cards randomly appear/disappear every 2.8s at 12 positions
  - Soft random rotation (1–3°) for pinned-board aesthetic
  - Center anchor image of Susan
  - "THE WOMEN" watermark text with blur

- [x] **Stories Teaser**
  - Headline "Women Building The Future"
  - 8 category pills (Founders, CEOs, Creators, etc.)
  - Parallax scrolling image with hover zoom
  - Two CTAs: [Nominate A Woman], [Become A Guest]

- [x] **Work With Susan Teaser**
  - 8 partnership opportunities in 2×4 grid
  - Staggered card fade-in on view
  - Hover state color transitions
  - [Partner With Susan] CTA link

- [x] **About Susan Teaser**
  - Glow-behind-portrait layout
  - 3-paragraph bio with "Meet Susan Grace" headline
  - MagicImage cycling between 2 portraits

- [x] **Final Section — Join Community**
  - VideoCoverflow carousel (11 mp4 clips, auto-rotating)
  - 5 social media links (Instagram, TikTok, YouTube, LinkedIn, Email)
  - Manifesto closing stamp

- [x] **Contact Section**
  - 5-field form (First Name, Last Name, Email, Subject dropdown, Message)
  - Custom dropdown component with 4 options
  - Formspree integration for serverless submission
  - Multi-phase animated success state (tracing lines → bloom ripple → checkmark reveal)
  - Auto-reload after 8 seconds on success

### 4.5 Animation & Interaction Polish
- [x] IntersectionObserver-based scroll-triggered animations for all sections
- [x] Scroll-aware navigation background transition
- [x] Parallax image movement via `useScroll` / `useTransform` (hero, stories)
- [x] Staggered entrance delays for grid items
- [x] CSS glow pulse keyframes
- [x] Custom dropdown open/close rotation transition
- [x] YouTube-like success animation sequence
- [x] Hover glow shadows on primary buttons
- [x] Full-screen mobile menu with staggered link animation

### 4.6 Asset Management
- [x] Place 9 processed brand images (removebg PNGs) in public/
- [x] Place 28 community comment screenshots in public/comments/
- [x] Place 11 branded video clips in public/videos/
- [x] Configure favicon set (PNG + ICO + webmanifest)
- [x] Create SVG TikTok icon (custom, not platform brand default)
- [x] Preload links for MagicImage cycling

### 4.7 Utility Scripts
- [x] `apply_font.cjs` — Batch font replacement (Archivo → Playfair Display, Barlow Condensed → Inter) in source files
- [x] `apply_theme.cjs` — Batch theme migration script (dark → light theme across components)
- [x] `to_inter.cjs` — Final font normalization (Playfair Display → Inter everywhere)
- [x] `script.cjs` — Bulk CSS class additions (rounded corners, animation classes, ref bindings)

### 4.8 Theme Evolution (3 Major Iterations)

**Iteration 1 — Default Caramel Dark:**
- Dark charcoal (#15171B) backgrounds throughout
- White text, caramel accents (#C51C48)
- Dark moody aesthetic

**Iteration 2 — Light Editorial:**
- `apply_theme.cjs` batch-converted to warm editorial light theme
- Backgrounds → #FAF9F6 / #F3E8E3
- Dark text on light backgrounds
- Archivo + Barlow Condensed typography

**Iteration 3 — Final Polished (Inter-only):**
- `to_inter.cjs` normalized all typography to Inter
- Refined spacing, color values, and animation timing
- Current production state

---

## 5. TESTING

### 5.1 Animation Testing
- [x] Line-Build Reveal timing verified (300ms / 700ms / 1100ms delays)
- [x] Word-Morph row stagger delays confirmed per transform pair
- [x] Floating Fade 2.8s cycle interval validated
- [x] Count-Up easing curve (cubic ease-out over 2000ms) tested
- [x] Glow Pulse 4s infinite loop verified
- [x] VideoCoverflow auto-rotation interval (3s) tested
- [x] MagicImage cycling on scroll-out-of-view confirmed

### 5.2 Form Functionality
- [x] Formspree endpoint integration verified
- [x] Subject dropdown open/close behavior tested
- [x] Form validation (required fields) confirmed
- [x] Success animation sequence (3 phases) validated
- [x] Auto-reload timer (8s) confirmed

### 5.3 Responsive Behavior
- [x] Mobile navigation full-screen overlay tested
- [x] Hero layout: text stacks above photo on mobile
- [x] Grid layouts collapse to single column on small screens
- [x] Floating voice wall caps at 2 elements on mobile
- [x] Touch targets confirmed ≥ 44px

### 5.4 Cross-Component Integration
- [x] Nav scroll-aware color transition verified
- [x] Anchor links (`#hero`, `#movement`, `#ripple-effect`, etc.) functional
- [x] Custom cursor: hover detection on all interactive elements
- [x] MagneticButton: spring behavior on all CTA instances
- [x] Layout composition (Nav + main + Footer) rendering correct order

### 5.5 Image & Asset Loading
- [x] All 9 hero/brand images rendering without error
- [x] 28 community comment cards loading in floating wall
- [x] 11 videos playing in coverflow carousel
- [x] ImageWithFallback error state placeholder functional
- [x] Favicon set displaying correctly across browsers

---

## 6. DEPLOYMENT & MAINTENANCE

### 6.1 Build Configuration
- **Build Command:** `vite build`
- **Output Directory:** `dist/`
- **Static asset hashing:** Vite default

### 6.2 Hosting
- Static site ready for deployment to any static host (Netlify, Vercel, Cloudflare Pages, etc.)

### 6.3 Maintenance Notes
- Font loading: Google Fonts (Inter) — ensure CDN availability
- Form submissions: Managed via Formspree (free tier)
- Image replacement: Swap `public/*.png` files for real photography when available
- Video replacement: Swap `public/videos/*.mp4` files when final content is ready
- Community comments: Replace `public/comments/*.png` with real screenshots
- Logo strip: Placeholder only — add real partner logos when available
- PDF Media Kit: Placeholder "Download Media Kit (PDF)" button — link to actual PDF when created
- Analytics: No analytics yet — consider adding Google Analytics or Plausible

### 6.4 Version Control
- Git initialized with single initial commit containing full project
- Branch: `main`

---

## APPENDIX A: Dependency Inventory

**60+ Packages Installed:**

| Category | Packages |
|---|---|
| Core | react, react-dom, react-router |
| Build | vite, @vitejs/plugin-react, typescript |
| Styling | tailwindcss, @tailwindcss/vite, tw-animate-css, postcss |
| UI Primitives (Radix) | @radix-ui/react-accordion, -alert-dialog, -avatar, -checkbox, -dialog, -dropdown-menu, -hover-card, -label, -menubar, -navigation-menu, -popover, -progress, -radio-group, -scroll-area, -select, -separator, -slider, -switch, -tabs, -toggle, -tooltip, -collapsible, -context-menu, etc. |
| UI Libraries | @mui/material, @mui/icons-material, @emotion/react, @emotion/styled |
| Animation | motion, react-slick, embla-carousel-react |
| Forms | react-hook-form, @formspree/react, input-otp |
| Charts | recharts |
| Utilities | clsx, class-variance-authority, tailwind-merge, lucide-react, sonner, date-fns, cmdk, vaul, canvas-confetti, react-dnd, react-dnd-html5-backend, react-resizable-panels, react-responsive-masonry, react-player, react-popper, @popperjs/core, react-day-picker |
| Dev | mammoth |

---

## APPENDIX B: Design Tokens Summary

```
Charcoal Black    #15171B   → Dark sections, primary text
Studio Grey-White #F2F0EE   → Content background
Pure White        #FFFFFF   → Card backgrounds
Blush Tint        #FBEAEE   → Transitional sections
Live Red          #FF2E45   → Tags, highlights
Raspberry Rose    #C51C48   → Primary CTA color
Indigo Night      #0A0F2F   → Gradient start
Magenta Pulse     #C02C6B   → Gradient end
```

---

*Report generated June 2026 — SDLC documentation for susangrace.com*
