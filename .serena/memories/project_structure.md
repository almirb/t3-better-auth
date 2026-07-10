# Estrutura do projeto

Alias de path: **`~/*` → `./src/*`** (definido no `tsconfig.json`).

```
src/
  app/                      # App Router (Next 16)
    layout.tsx              # root layout (providers: TRPCReactProvider, theme, sonner)
    page.tsx                # home (server component; usa auth.api.getSession + tRPC)
    api/
      auth/[...all]/route.ts   # handler do BetterAuth (toNextJsHandler)
      trpc/[trpc]/route.ts     # handler do tRPC (fetchRequestHandler)
    auth/
      (authorized)/...      # rotas que exigem sessão (ex.: delete)
      (unauthorized)/...    # signin, signup, reset
    _components/            # componentes específicos de páginas
      forms/auth/...        # formulários de auth (react-hook-form + zod)
  components/ui/            # shadcn/ui (código-fonte copiado; ver mem:code_style_conventions)
  hooks/                   # hooks reutilizáveis (ex.: use-mobile.ts)
  lib/
    auth.ts                # config server do BetterAuth
    auth-client.ts         # client do BetterAuth (createAuthClient)
    utils.ts               # cn() etc.
    server/
      db.ts                # conexão Drizzle + postgres.js (ver mem:database_and_drizzle)
      api/
        root.ts            # appRouter (agrega routers)
        trpc.ts            # init tRPC, context, procedures
        routers/           # routers por domínio (ex.: post.ts)
  db/
    schema.ts              # schema Drizzle da aplicação
    auth-schema.ts         # schema das tabelas do BetterAuth
  trpc/
    react.tsx              # provider client + createTRPCReact
    server.ts              # caller server-side + HydrateClient + api (RSC)
    query-client.ts        # factory do QueryClient
  styles/globals.css       # Tailwind v4 (@theme, tokens) — não há tailwind.config.ts
  env.js                   # validação de env (@t3-oss/env-nextjs)
```

Raiz: `next.config.js`, `eslint.config.js`, `prettier.config.js`,
`postcss.config.js`, `drizzle.config.ts`, `components.json` (config shadcn),
`.env.example`.

## Onde colocar coisas
- Novo endpoint de API → novo router em `src/lib/server/api/routers/`, registrado em `root.ts`.
- Componente de UI base (shadcn) → `src/components/ui/` (via CLI shadcn).
- Componente de página/feature → `src/app/_components/`.
- Tabela nova → `src/db/schema.ts` + `pnpm db:generate`/`db:push`.