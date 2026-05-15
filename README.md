# Love you. | Glowing Heart Experience

Premium dark romantic landing page built with `Next.js`, `React`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, and a custom high-density `Canvas API` particle renderer.

## Stack

- `Next.js` app router
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- custom `Canvas API` animation engine
- static export compatible with GitHub Pages

## Features

- cinematic black-stage landing scene
- intro fade sequence with loading curtain
- giant glowing heart assembled from repeated `I love you` text particles
- adaptive quality mode for desktop, tablet, and mobile
- subtle grain, vignette, bloom aura, chromatic text treatment
- cursor parallax and touch ripple interaction
- reduced motion support
- SEO basics, metadata, manifest, favicon

## Project structure

```text
app/
  globals.css
  icon.svg
  layout.tsx
  page.tsx
components/
  ambient-overlays.tsx
  heart-canvas.tsx
  intro-copy.tsx
  landing-experience.tsx
  loading-curtain.tsx
hooks/
  use-device-tier.ts
  use-pointer-parallax.ts
lib/
  cn.ts
  heart-math.ts
  heart-scene.ts
public/
  og-image.svg
  site.webmanifest
.github/workflows/
  deploy.yml
```

## Local development

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Production build

```bash
npm run build
```

Static files will be generated in `out/`.

## GitHub Pages deploy

The repo already includes `.github/workflows/deploy.yml`.

### What to do

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main`.

### Base path behavior

`next.config.ts` automatically enables `basePath` and `assetPrefix` in GitHub Actions for project pages repos such as:

```text
https://username.github.io/repository-name/
```

For a user/organization pages repo like `username.github.io`, it keeps the root path clean.

## Notes

- The landing is fully frontend-only and safe for static export.
- No backend, SSR-only dependency, or runtime server logic is required.
- If you want to fine-tune density or performance, adjust `QUALITY_MAP` inside `lib/heart-scene.ts`.
