# Tech stack (versões e bibliotecas)

## Núcleo
- `next` ^16.2 (App Router, Turbopack padrão)
- `react` / `react-dom` 19.2
- `typescript` 5.9 (strict, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `checkJs`)
- `@t3-oss/env-nextjs` + `zod` v4 → validação de env em `src/env.js`

## API / dados
- `@trpc/server`, `@trpc/client`, `@trpc/react-query` (v11)
- `@tanstack/react-query` v5
- `superjson` (transformer do tRPC)
- `drizzle-orm` (driver `drizzle-orm/postgres-js`) + `postgres` (postgres.js)
- `drizzle-kit` (migrations/studio)

## Auth
- `better-auth` (server em `src/lib/auth.ts`, client em `src/lib/auth-client.ts`)
- adapter: `better-auth/adapters/drizzle` com `provider: "pg"` (dialeto, não driver)
- plugin `nextCookies()`

## UI
- `tailwindcss` v4 + `@tailwindcss/postcss` + `tw-animate-css` (config via CSS em `src/styles/globals.css`; NÃO existe `tailwind.config.ts`)
- shadcn/ui: primitivos `@radix-ui/*`, `class-variance-authority`, `clsx`, `tailwind-merge`, ícones `lucide-react`
- `react-hook-form` + `@hookform/resolvers`, `next-themes`, `sonner`, `cmdk`, `recharts`, `vaul`, etc.

## Tooling
- ESLint 9 (flat config) + `typescript-eslint` + `eslint-config-next` (flat nativo) + `eslint-plugin-drizzle`
- Prettier + `prettier-plugin-tailwindcss`
- pnpm (`packageManager` fixado no `package.json`)

Nota de manutenção: há majors pendentes que exigem cuidado individual quando
forem atualizados — `recharts` 2→3, `typescript` 5→7, `lucide-react` 0→1,
`eslint` 9→10, `react-day-picker` 9→10, `react-resizable-panels` 3→4.