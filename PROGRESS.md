# kolawoles.com — Progress Log

## What This Is

Gateway/hub landing page for `kolawoles.com`. A single, minimal yet captivating page that routes visitors to two sub-verticals:

- **data.kolawoles.com** — BI & Analytics work
- **appdev.kolawoles.com** — Engineering & Dev work

No scrolling. No nav. Just identity, two portals, and atmosphere.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, `next/font`, Vercel-native |
| Animation | Framer Motion 11 | Spring physics, layout animations, cursor |
| 3D / Particles | React Three Fiber + Three.js | Particle field background |
| Styling | Tailwind CSS + inline styles | Utility classes + component-level precision |
| Typography | Syne (display) + DM Sans (body) | via `next/font/google` — no layout shift |
| Language | TypeScript | Strict mode |
| Target Deploy | Vercel | Zero-config for Next.js |

---

## Work Completed

### Project Scaffold
- Next.js 14 App Router structure (`src/app`, `src/components`)
- TypeScript configured with strict mode
- Tailwind CSS with PostCSS
- Custom CSS variables for color tokens (`--color-data`, `--color-dev`, etc.)
- `.gitignore` set up

### Fonts
- `Syne` (800 weight) — display/headings
- `DM Sans` (300, 400, italic) — body and labels
- Loaded via `next/font/google`, exposed as CSS variables `--font-syne` and `--font-dm-sans`

### Components Built

**`GridBackground.tsx`**
- Canvas-based animated grid
- Slow diagonal drift via `requestAnimationFrame`
- Resizes on window resize
- Pointer-events none, fixed to viewport

**`AmbientOrbs.tsx`**
- Two large blurred color orbs — blue (Data, top-left) and orange (Dev, bottom-right)
- Framer Motion animates opacity and scale on hover state change
- 1.2s ease transition for smooth color mood shift

**`Background.tsx`**
- React Three Fiber canvas with 1,200-point particle field
- Particles slowly rotate on X and Y axes
- Particle color lerps toward blue or orange based on active hover portal
- Dynamically imported in `page.tsx` with `ssr: false` (Three.js is browser-only)

**`Cursor.tsx`**
- Custom cursor replaces native (hidden via `cursor: none` in globals)
- Two layers: a fast dot and a slower trailing ring
- Both driven by Framer Motion `useSpring` with different damping configs

**`Portal.tsx`**
- Reusable card for Data and Dev portals
- Framer Motion `whileHover` lift effect
- Animated gradient overlay on hover (color-matched per type)
- Stack tags rendered as small pill badges
- Animated arrow on hover
- Opens subdomain in new tab

**`page.tsx`**
- Orchestrates all components
- Manages `hoverState: "data" | "dev" | "none"` passed down to orbs and particle field
- Staggered `fadeUp` entrance animations (eyebrow → name → tagline → portals → footer)
- Footer with location, email (mailto link with hover), and entity name

### Design Decisions
- Color palette: `#080808` background, `#f0ede6` foreground (warm off-white)
- Data accent: `#1a6cf5` (blue) / Dev accent: `#f07040` (orange)
- Typography scale: `clamp(56px, 10vw, 104px)` for the main name — responsive without breakpoints
- `KOLA` solid, `WOLES` faded — name treated as a logotype
- Tagline: *"where data meets product"* — italic, muted

---

## What's Left (for you to continue)

- [ ] Add `favicon.ico` and `apple-touch-icon.png` to `/public`
- [ ] Add `og-image.png` (1200×630) for social sharing
- [ ] Build out `data.kolawoles.com` content
- [ ] Build out `appdev.kolawoles.com` content
- [ ] Consider a subtle mobile layout adjustment (portals stack vertically on small screens)
- [ ] Optional: add keyboard navigation / focus styles for accessibility
- [ ] Connect domain on Vercel and set env if needed