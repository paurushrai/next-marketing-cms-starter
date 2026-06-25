# Theming

The design system is **two-tier** so themes scale without touching components.

```
Primitive ramps (--neutral-*, --brand-*)   ← raw OKLCH, theme-agnostic
        │  mapped per theme
        ▼
Semantic roles (--background, --primary, …) ← redefined in :root and .dark
        │  bridged via @theme inline
        ▼
Tailwind utilities (bg-background, text-primary, border-border, …)
```

All tokens live in [`src/app/globals.css`](../src/app/globals.css). **Components reference only semantic tokens** — never a raw color or a `--brand-*` value directly.

## Re-skin the brand

Change the `--brand-*` ramp in `:root`. Because `--primary` and `--ring` map to it, the entire app re-skins. No component edits.

```css
:root {
  --brand-600: oklch(0.55 0.22 145); /* swap hue → green brand */
}
```

## Add a new theme

next-themes drives theming via a class on `<html>`. To add e.g. a high-contrast theme:

1. Add a selector block in `globals.css` redefining the semantic roles:
   ```css
   .theme-contrast {
     --background: oklch(1 0 0);
     --foreground: oklch(0 0 0);
     /* …override the roles you need… */
   }
   ```
2. Pass it through next-themes in `src/app/layout.tsx`:
   ```tsx
   <ThemeProvider attribute="class" themes={["light", "dark", "theme-contrast"]}>
   ```

## Typography

Font roles are CSS variables wired from `next/font` in
[`src/app/fonts.ts`](../src/app/fonts.ts): `--font-sans`, `--font-mono`, and a
`--font-display` slot (defaults to sans). Swap a face there to re-type the app.

## Radius

One base token `--radius` drives the `sm`/`md`/`lg`/`xl` scale. Change it once
to adjust corner roundness everywhere.

## Color space

Colors are authored in **OKLCH** — perceptually uniform (predictable
lightness/contrast when generating ramps) and wide-gamut ready. Supported in
all current evergreen browsers.
