# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test suite is configured.

## Architecture

**Next.js 16 app with React 19** — uses the App Router (`src/app/`). All pages are server components by default; params are a `Promise` and must be awaited (see `src/app/catalog/[slug]/page.tsx`).

**Data layer** — all product data lives in `src/lib/products.ts` as a static array (`PRODUCTS`). There is no backend or database. The `Product` type is defined there and imported wherever needed.

**Styling** — SCSS/Sass with CSS custom properties. Each component has a co-located `.module.sass` file. Global tokens (colors, spacing, typography, radius) are defined in `src/styles/variables.sass` and loaded via `:root`. Mixins live in `src/styles/mixins.sass`. Both are available everywhere via the `loadPaths` config in `next.config.ts` — import them with `@use "variables"` or `@use "mixins"`.

Global button classes (`.btn`, `.btn-outline`) are defined in `src/app/globals.sass` and composed with module classes using the `classnames` (`cn`) utility.

**Component structure:**
- `src/components/layout/` — `Header` and `Footer`, rendered in `src/app/layout.tsx` around every page
- `src/components/ui/` — reusable UI components (`ProductCard`, `ProductCatalog`, `ProductGallery`, `WireBlock`, `ContactForm`, `ContactInfo`, `CustomSelect`)

**Routing:**
- `/` — home page with featured products
- `/catalog` — product listing with filter
- `/catalog/[slug]` — product detail (slug comes from `PRODUCTS[].slug`)
- `/about`, `/contacts`, `/cooperation`, `/delivery`, `/cart` — static content pages

**Font** — M PLUS 1p (Google Fonts) loaded via `next/font/google` in the root layout, applied as a className on `<html>`.
