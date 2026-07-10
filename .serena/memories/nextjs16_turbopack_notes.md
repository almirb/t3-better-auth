# Next.js 16 + Turbopack — armadilhas e regras

Este projeto está no Next 16.2 com **Turbopack como bundler padrão** (dev e build).
Lições da migração 15→16 (aplicáveis a novos projetos derivados deste template):

## 1. Driver de banco pg → postgres.js
`node-postgres` (`pg`) não empacota sob Turbopack. Usar `postgres.js`
(`drizzle-orm/postgres-js`). Ver `mem:database_and_drizzle`.

## 2. Vazamento server→client: usar `import type` de nível de declaração
Módulos client (`"use client"`) que importam tipos do server (ex.: `AppRouter`) devem usar
`import type { X }` — NÃO `import { type X }` inline. Sob Turbopack o inline não é apagado
e arrasta o grafo do server (e o `postgres`, com `tls`/`net`) para o bundle client,
quebrando o build. Ex.: `src/trpc/react.tsx`.

## 3. serverExternalPackages
`next.config.js` inclui `serverExternalPackages: ["postgres"]` (evita empacotar o driver
no server).

## 4. next lint removido → eslint direto
`next lint` não existe mais no Next 16. Scripts usam `eslint .`. A config migrou para
flat config nativo: `import nextCoreWebVitals from "eslint-config-next/core-web-vitals"`
(o antigo `FlatCompat.extends("next/core-web-vitals")` quebra com erro de estrutura
circular). Ver `mem:code_style_conventions`.

## 5. Scripts sem `--turbo`
Turbopack é default; `dev` é só `next dev` (sem flag `--turbo`/`--turbopack`).

## 6. tsconfig
O Next reconfigura automaticamente (`jsx: "react-jsx"`) e usa `.next/dev/types/**/*.ts`
(além de `.next/types`). Ambos estão no `include`.

## 7. Regras de lint mais estritas (react-hooks 7.1+)
A regra `react-hooks/set-state-in-effect` passou a acusar `setState` síncrono em effect.
Ex.: `use-mobile.ts` foi reescrito com `useSyncExternalStore` (SSR-safe) em vez de
`useState + useEffect`.

## 8. APIs assíncronas (já aplicado)
`cookies()`, `headers()`, `params`, `searchParams` são **assíncronos** — sempre `await`.

## Requisitos
Node.js 20.9+. React 19.2+.

## Não aplicável a este template (mas checar em projetos maiores)
`middleware.ts` → renomeado para `proxy.ts`; AMP removido; `revalidateTag` exige 2º arg;
`next/legacy/image` removido; `images.domains` → `images.remotePatterns`.