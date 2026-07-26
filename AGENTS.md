## Commands

```
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run lint    # ESLint (flat config v9)
```

There is no `typecheck` script. TypeScript checking happens as part of `next build`.

## Architecture

Single-page Next.js App Router site. All source is in `app/`. No sub-routes or API routes.

- `app/layout.tsx` - root layout: Navbar, WaterfallBackground (Three.js), EnableWheelScroll, children
- `app/page.tsx` - single landing page with sections: HeroSection, MountainDivider, BlogsSection, ContactSection, AboutSection
- `app/WaterfallBackground.tsx` - large (~800 line) Three.js waterfall scene via `@react-three/fiber`; expensive GPU rendering
- `app/EnableWheelScroll.tsx` - intercepts wheel events globally so mousewheel scrolls the page over the Three.js canvas
- `generate_static/` - Python scripts that generated the noise/flow textures in `public/textures/`. Not part of the build.
- `reference/` - reference design image. Not part of the build.

## Conventions

- `"use client"` on any component using hooks, browser APIs, or event handlers. Server components are the default.
- `@/*` path alias resolves to the project **root** (not `app/` or `src/`). `import X from "@/app/Foo"` is valid.
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin; theme is configured in `app/globals.css` via `@theme inline`. No `tailwind.config.*` file.
- ESLint v9 flat config in `eslint.config.mjs`.
- Inline styles via `style={}` props are used heavily alongside Tailwind classes for colors and gradients.

## Gotchas

- Three.js waterfall runs persistently in the background; it can degrade performance in dev. If the page feels sluggish, this is expected.
- `body` has `overscroll-behavior-y: none` — this is intentional for the Three.js background.
- No test suite.
