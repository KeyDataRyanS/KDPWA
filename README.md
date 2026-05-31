# KeyData PWA

Tablet-first progressive web app built on Next.js 16 + Tailwind v4 + shadcn/ui.

## Stack

| Layer | Package | Version |
|-------|---------|---------|
| Framework | `next` (App Router, Turbopack) | 16.2.6 |
| UI primitives | `react` / `react-dom` | 19.2.x |
| Language | TypeScript (`strict`) | 5.x |
| Styling | Tailwind CSS v4, OKLCH tokens | 4.3.x |
| Components | shadcn/ui (`base-nova` style, Base UI primitives) | 4.8.x |
| Icons | `lucide-react` | 1.17.x |
| Toasts | `sonner` | 2.x |
| Theming | `next-themes` | 0.4.x |
| PWA / SW | `@serwist/turbopack` + `serwist` | 9.5.x |
| Package manager | pnpm | 11.x |
| Linting | ESLint + `eslint-config-next` | 9.x / 16.x |
| Formatting | Prettier + `prettier-plugin-tailwindcss` | 3.x |

## Scripts

```bash
pnpm dev        # start dev server (Turbopack)
pnpm build      # production build
pnpm start      # serve production build
pnpm lint       # ESLint
```

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components land in `src/components/ui/`. Browse available components at [ui.shadcn.com](https://ui.shadcn.com/docs/components).

## PWA / Service Worker

The service worker is built on **`@serwist/turbopack`** — the Turbopack-native successor to `next-pwa`.

### How it works

1. **Entry file** — `src/app/sw.ts` declares the precache manifest injection point and runtime caching strategies via `serwist`.
2. **Route handler** — `src/app/serwist/[path]/route.ts` compiles `sw.ts` with esbuild at request time and serves the resulting `sw.js` to the browser.
3. **Provider** — `SerwistProvider` (in `src/components/providers.tsx`) registers the service worker at `/serwist/sw.js` on the client.

### Offline fallback

`src/app/~offline/page.tsx` is served for any navigation request when offline. It is declared in the service worker via the `fallbacks.entries` option.

### Development

In development the `defaultCache` from `@serwist/turbopack/worker` short-circuits to `NetworkOnly` for all routes, so you won't see stale cached responses during iteration.

## Theme

Colors are defined as **OKLCH** tokens in `src/app/globals.css`. The `@theme inline` block maps them to Tailwind utilities (e.g. `bg-primary`, `text-muted-foreground`). The `.dark` class (toggled by `next-themes`) swaps every token.

To add a new semantic color:

1. Add the CSS custom property in `:root` and `.dark` in `globals.css`.
2. Add the `--color-*` mapping in the `@theme inline` block.

## Responsive strategy

- **Base styles → tablet** (768–1024 px): sidebar rail, comfortable spacing.
- **`sm:` prefix → phone** (≥375 px): single column, collapsed navigation via Sheet drawer.
- **`xl:` prefix → desktop** (≥1280 px): wider grid (4 columns), expanded sidebar.

All interactive targets are ≥ 44 × 44 px. Safe-area insets (`env(safe-area-inset-*)`) are applied to the main content area.

## Adding feature pages

1. Create `src/app/<route>/page.tsx`.
2. Wrap content with `<AppShell>`.
3. Add a nav entry to the `navItems` array in `src/components/app-shell.tsx`.
