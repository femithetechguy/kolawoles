# kolawoles.com

Personal hub/gateway for [kolawoles.com](https://kolawoles.com) — minimal, captivating landing page routing to two verticals: Data and App Dev.

## Stack

- **Next.js 14** (App Router)
- **Framer Motion** — entrance animations, hover transitions, custom cursor
- **React Three Fiber + Three.js** — particle field background
- **Tailwind CSS** — utility styling
- **Syne + DM Sans** — via `next/font/google`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build
npm run start
```

Recommended: deploy on **Vercel** — zero config for Next.js.

## Structure

```
src/
  app/
    layout.tsx        # Root layout, fonts, metadata
    page.tsx          # Main landing page
    globals.css       # CSS variables, base styles
  components/
    Cursor.tsx        # Custom animated cursor
    Background.tsx    # R3F particle field (lazy loaded, no SSR)
    GridBackground.tsx  # Animated canvas grid
    AmbientOrbs.tsx   # Colored glow orbs (react to hover)
    Portal.tsx        # Portal card (Data / App Dev)
```

## Customization

- **Subdomains**: Update `href` in `page.tsx` portals if URLs change
- **Stack tags**: Edit `stack` arrays in `page.tsx`
- **Colors**: CSS variables in `globals.css` — `--color-data` and `--color-dev`
- **Particle count**: `count` in `Background.tsx` (default 1200)
- **Footer**: Update location, email, entity name in `page.tsx`

## Notes

- `Background.tsx` is dynamically imported with `ssr: false` (Three.js requires browser)
- Custom cursor hides the native cursor via `cursor: none` in `globals.css`
- Fonts are loaded via `next/font/google` — no external `@import` needed
