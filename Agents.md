# Project Context: Blog and Portfolio
- Think in English, interact with the user in Japanese.

## 1. Project Overview
This is a personal blog and portfolio website named **"Fract-Blog"**.
It is built using **Next.js 15 (App Router)** and leverages **Fumadocs** for content management.
The project incorporates 3D elements using **React Three Fiber** and aims for a modern, high-performance user experience.

## 2. Tech Stack & Key Libraries
- **Framework**: [Next.js 15.5.2](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4.0.0](https://tailwindcss.com/)
  - Configured via `@import 'tailwindcss';` in `app/globals.css`.
  - Uses `@tailwindcss/postcss`.
- **Content Engine**: [Fumadocs](https://fumadocs.vercel.app/)
  - `fumadocs-core`, `fumadocs-mdx`, `fumadocs-ui`.
  - Content source: `content/docs`.
- **Animation & 3D**:
  - `framer-motion` for UI animations.
  - `@react-three/fiber`, `@react-three/drei`, `three` for 3D scenes.
- **Linting & Formatting**: [Biome](https://biomejs.dev/) (`@biomejs/biome`).
- **Icons**: `lucide-react`.
- **Theming**: `next-themes`.

## 3. Project Structure
```
/
├── app/                  # Next.js App Router source
│   ├── (Home)/           # Route group for landing page
│   ├── aboutme/          # /aboutme page
│   ├── blog/             # /blog page
│   ├── posts/            # /posts page (likely blog listing)
│   ├── api/              # API routes
│   ├── layout.tsx        # Root layout
│   ├── layout.config.tsx # Fumadocs shared layout config
│   └── globals.css       # Global styles (Tailwind + Fumadocs presets)
├── content/              # MDX Content Source
│   └── docs/             # Documentation/Post files
├── public/               # Static assets
├── lib/                  # Shared utilities
├── source.config.ts      # Fumadocs source configuration
├── next.config.mjs       # Next.js config (with Fumadocs plugin)
├── biome.json            # Biome configuration
└── package.json          # Dependencies and scripts
```

## 4. Coding Conventions & Standards

### Styling
- **Tailwind CSS**: Use utility classes for styling.
- **v4 Syntax**: Be aware of Tailwind v4 features (CSS variables, `@theme` blocks if used).
- **Fumadocs UI**: Use Fumadocs UI components where applicable for content rendering.

### Components
- **Functional Components**: Use React functional components with TypeScript interfaces.
- **Client vs Server**: Default to Server Components. Use `'use client'` directive only when necessary (state, effects, event listeners).
- **3D Components**: Isolate heavy 3D components and consider lazy loading if they impact initial render.

### Content
- **MDX**: Content is written in MDX in the `content/` directory.
- **Frontmatter**: Ensure correct frontmatter is used as defined in `source.config.ts`.

### Linting
- **Biome**: Use `npm run lint` to check for issues.
- **Strictness**: Adhere to Biome's rules. Do not introduce unused variables or imports.

## 5. Development Workflow
- **Start Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Post-install**: `npm run postinstall` (runs `fumadocs-mdx` to generate types/indices).

## 6. Agent Instructions
- **Modifying Content**: When adding/editing content, check `content/docs` and `source.config.ts`.
- **Modifying Layout**: `app/layout.config.tsx` controls the main navigation and footer structure.
- **Adding Dependencies**: Use `npm install`.
- **Refactoring**: Run `npm run lint` after significant changes to ensure code quality.
