# Project Guidelines

## Code Style
- Think in English, respond in Japanese. [Agents.md](Agents.md#L1-L2)
- Formatting/linting enforced by Biome (tabs, double quotes, noConsoleLog info). [biome.json](biome.json#L1-L35)
- Tailwind v4 and Fumadocs UI styles are imported in global CSS. [app/globals.css](app/globals.css#L1-L5)

## Architecture
- Next.js App Router; root layout wraps `RootProvider` for theme/search and sets `lang="ja"`. [app/layout.tsx](app/layout.tsx#L1-L33)
- Shared nav/footer config via `baseOptions`. [app/layout.config.tsx](app/layout.config.tsx#L1-L39)
- Fumadocs source and loader define `/posts` base URL. [lib/source.ts](lib/source.ts#L1-L7)

## Build and Test
- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run postinstall`. [package.json](package.json#L1-L40)

## Project Conventions
- MDX content lives under `content/docs` via Fumadocs config. [source.config.ts](source.config.ts#L1-L11)
- MDX support wired into Next via `createMDX`. [next.config.mjs](next.config.mjs#L1-L10)
- Use path aliases `@/*` and `@/.source` for imports. [tsconfig.json](tsconfig.json#L1-L33)

## Integration Points
- Tailwind uses `@tailwindcss/postcss`. [postcss.config.mjs](postcss.config.mjs#L1-L8)
- Fumadocs MDX processing is part of install via `postinstall`. [package.json](package.json#L5-L10)
