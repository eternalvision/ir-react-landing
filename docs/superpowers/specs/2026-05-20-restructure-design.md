# Restructure construction-site to match lvu-react-landing

**Date:** 2026-05-20  
**Status:** Approved

## Goal

Align `construction-site` folder structure, imports, exports, and TypeScript configuration with `lvu-react-landing` as reference. Tailwind configuration is explicitly excluded from changes.

---

## 1. Folder Structure

### Target tree

```
construction-site/
├── components/
│   ├── About/        About.tsx
│   ├── Contact/      Contact.tsx
│   ├── FAQ/          FAQ.tsx
│   ├── Footer/       Footer.tsx
│   ├── Header/       Header.tsx
│   ├── Hero/         Hero.tsx
│   ├── Portfolio/    Portfolio.tsx
│   ├── Services/     Services.tsx
│   └── Testimonials/ Testimonials.tsx
├── constants/
│   └── constants.ts
├── lib/
│   ├── config.ts
│   └── resend.ts
├── pages/
│   ├── api/          contact.ts, hello.ts
│   ├── _app.tsx
│   ├── _document.tsx
│   └── index.tsx
├── public/           (unchanged)
├── styles/
│   └── globals.css   (unchanged)
├── ui/               ← shadcn components + Logo (merged from components/ui/ and ui/)
│   ├── accordion.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── carousel.tsx
│   ├── dropdown-menu.tsx
│   ├── Logo.tsx
│   └── sonner.tsx
└── utils/
    └── cn.ts
```

### Directories to remove

- `components/layout/` — content moves to `components/Header/` and `components/Footer/`
- `components/sections/` — content moves to `components/<Name>/<Name>.tsx`
- `components/ui/` — content moves to `ui/`
- Old directories from previous partial migration: `components/About/`, `components/Services/`, `components/Portfolio/`, `components/Testimonials/` — these contain incomplete copies; the canonical implementations are in `components/layout/` (Header, Footer) and `components/sections/` (all other sections). During execution, verify content before deleting.

### Files to delete

- `lib/utils.ts` — duplicate of `utils/cn.ts`

---

## 2. Import Aliases

### tsconfig.json paths — remove `@/*`, keep only named aliases

```json
"baseUrl": "./",
"paths": {
  "@components/*": ["components/*"],
  "@constants/*":  ["constants/*"],
  "@lib/*":        ["lib/*"],
  "@pages/*":      ["pages/*"],
  "@ui/*":         ["ui/*"],
  "@utils/*":      ["utils/*"]
}
```

### Import migration map

| Old import | New import |
|---|---|
| `@/components/ui/button` | `@ui/button` |
| `@/components/ui/accordion` | `@ui/accordion` |
| `@/components/ui/badge` | `@ui/badge` |
| `@/components/ui/card` | `@ui/card` |
| `@/components/ui/carousel` | `@ui/carousel` |
| `@/components/ui/dropdown-menu` | `@ui/dropdown-menu` |
| `@/components/ui/sonner` | `@ui/sonner` |
| `@/components/layout/Header` | `@components/Header/Header` |
| `@/components/layout/Footer` | `@components/Footer/Footer` |
| `@/components/sections/Hero` | `@components/Hero/Hero` |
| `@/components/sections/About` | `@components/About/About` |
| `@/components/sections/Services` | `@components/Services/Services` |
| `@/components/sections/Portfolio` | `@components/Portfolio/Portfolio` |
| `@/components/sections/Testimonials` | `@components/Testimonials/Testimonials` |
| `@/components/sections/FAQ` | `@components/FAQ/FAQ` |
| `@/components/sections/Contact` | `@components/Contact/Contact` |
| `@/lib/config` | `@lib/config` |
| `@/lib/resend` | `@lib/resend` |
| `@/lib/utils` | `@utils/cn` |
| `@/styles/globals.css` | `'../styles/globals.css'` (relative import in `pages/_app.tsx`) |

Also: inside `ui/` components, `cn` import changes from `@/lib/utils` to `@utils/cn`.

---

## 3. Export Style

All components converted to **named exports** with `.displayName`:

```ts
// Before
export default function Hero() { ... }

// After
export const Hero = () => { ... }
Hero.displayName = 'Hero'
```

This applies to all files under `components/` and `ui/`.

Pages in `pages/` keep their default exports (Next.js requirement).

---

## 4. TypeScript — Strict Mode

`tsconfig.json` is updated to match lvu-react-landing:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],

    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "jsx": "preserve",
    "jsxImportSource": "react",

    "baseUrl": "./",
    "paths": {
      "@components/*": ["components/*"],
      "@constants/*":  ["constants/*"],
      "@lib/*":        ["lib/*"],
      "@pages/*":      ["pages/*"],
      "@ui/*":         ["ui/*"],
      "@utils/*":      ["utils/*"]
    },

    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitOverride": true,
    "useUnknownInCatchVariables": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,

    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "allowJs": false,
    "checkJs": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,

    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "incremental": true,
    "noEmit": true,

    "types": ["node"],
    "typeRoots": ["./node_modules/@types"],
    "plugins": [{ "name": "next" }]
  }
}
```

A `my-env.d.ts` file is added at root to type `process.env` variables used in the project.

### Expected code fixes from stricter TS

- `noUncheckedIndexedAccess`: array/record accesses need null guards
- `noUnusedLocals` / `noUnusedParameters`: remove or prefix with `_`
- `exactOptionalPropertyTypes`: avoid assigning `undefined` to optional props
- `useUnknownInCatchVariables`: catch clauses use `unknown` instead of `any`
- `allowJs: false`: no `.js` files (currently none)

---

## 5. components.json (shadcn)

Update `components.json` to point shadcn CLI at `ui/` instead of `components/ui/`:

```json
{
  "aliases": {
    "components": "@components",
    "utils": "@utils/cn",
    "ui": "@ui",
    "lib": "@lib",
    "hooks": "@lib/hooks"
  }
}
```

---

## 6. Out of scope

- Tailwind config — not changed
- `public/` assets — not changed
- `styles/globals.css` — not changed
- `pages/` content logic — not changed (only imports updated)
- `next.config.ts`, `next-i18next.config.ts`, `postcss.config.mjs` — not changed
- `.env.local` — not changed
