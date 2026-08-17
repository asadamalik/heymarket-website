# Heymarket Website

A pixel-faithful, fully responsive build of the Heymarket 2026 landing page, implemented from Figma.

## Stack

- **[Astro](https://astro.build)** — static site, ships zero JS by default
- **[Tailwind CSS v4](https://tailwindcss.com)** — via the `@tailwindcss/vite` plugin; design tokens live in `src/styles/global.css`
- **SF Pro Display** — self-hosted, subsetted to Latin `.woff2` (see below)

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # -> dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
├── layouts/Base.astro       # <html> shell, meta, font preloads
├── pages/index.astro        # composes every section in order
├── components/              # one file per page section
│   ├── Announcement.astro   Nav.astro   Hero.astro   HeroChat.astro
│   ├── SharedInbox.astro    CustomerJourney.astro    Omnichannel.astro
│   ├── Integrations.astro   LifecycleTeam.astro      Security.astro
│   ├── EmailHere.astro      AiReach.astro            Compliance10DLC.astro
│   ├── Testimonials.astro   CtaBand.astro   Resources.astro   Footer.astro
└── styles/global.css        # design tokens (@theme) + @font-face
public/
├── fonts/                   # subsetted SF Pro Display .woff2 (5 weights)
└── assets/                  # section imagery, exported from the Figma design (.webp)
```

## Design decisions

- **Layout, type, buttons, nav, and the hero chat mockup** are hand-built in HTML/CSS so they stay crisp and reflow responsively.
- **Product-UI mockups, brand logos, integration icons, and photos** are exported from the Figma design as `.webp` (the graphical bits that can't be faithfully hand-coded).
- Fully responsive: verified at 375 / 768 / 1440. Multi-column grids stack, tab pills wrap, the announcement bar and nav collapse to a mobile menu.
- Motion stays on compositor-friendly properties (`transform`, `opacity`) and respects `prefers-reduced-motion`.

## Asset pipeline (`scripts/`)

These regenerate the fonts and imagery; they are dev-time tools, not part of the site runtime.

| Script | Purpose |
| --- | --- |
| `convert-fonts.mjs` | `fonts/*.otf` → subsetted `public/fonts/*.woff2` |
| `convert-images.mjs` | `public/assets/*.png` → optimized `.webp` |
| `slice.mjs` / `crop.mjs` | slice/crop the Figma render for reference & asset extraction |
| `shoot.mjs` | full-page Playwright screenshots for visual QA |

### Fonts

The licensed **SF Pro Display** `.otf` source files live in `fonts/` and are subsetted to
Latin `.woff2` by `scripts/convert-fonts.mjs` (≈35 KB per weight). Only the 400 and 800
weights are preloaded; the rest use `font-display: swap`.

## Performance

- **0 KB** application JS (one tiny inline script centers the testimonial carousel)
- ~7.5 KB gzipped CSS
- ~196 KB self-hosted fonts (5 weights, subsetted)
- ~200 KB imagery, all WebP and lazy-loaded below the fold
