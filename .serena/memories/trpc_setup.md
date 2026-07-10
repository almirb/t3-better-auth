# tRPC (v11)

## Server (`src/lib/server/api/`)
- `trpc.ts`:
  - `createTRPCContext({ headers })` → resolve a sessão via `auth.api.getSession({ headers })`
    e retorna `{ db, session, ...opts }`.
  - `t = initTRPC.context().create({ transformer: superjson, errorFormatter ... })`.
  - `createTRPCRouter`, `createCallerFactory`.
  - `timingMiddleware` (loga duração; adiciona delay artificial em dev).
  - **`publicProcedure`** = `t.procedure.use(timingMiddleware)`.
  - **`protectedProcedure`** = publicProcedure + checa `ctx.session?.user`, senão
    `TRPCError({ code: "UNAUTHORIZED" })`; reinfere `session.user` como não-nulo.
- `root.ts`: `appRouter = createTRPCRouter({ post: postRouter, ... })`; exporta `AppRouter`.
- Routers por domínio em `routers/` usam `publicProcedure`/`protectedProcedure` e `ctx.db`.

## Handler HTTP
- `src/app/api/trpc/[trpc]/route.ts` → `fetchRequestHandler` (GET/POST).

## Client
- `src/trpc/react.tsx` (`"use client"`): `createTRPCReact<AppRouter>()`, `TRPCReactProvider`
  com `httpBatchLink`/`httpSubscriptionLink` via `splitLink`, transformer superjson.
  **Importa `AppRouter` com `import type`** (evita vazar server no bundle client).
- `src/trpc/server.ts`: caller RSC (`createCaller`) + `HydrateClient` + `api` para
  Server Components; `query-client.ts` = factory do QueryClient.

## Ao adicionar endpoint
1. Criar/editar router em `src/lib/server/api/routers/`.
2. Registrar em `root.ts`.
3. Consumir: client via `api.<router>.<proc>.useQuery/useMutation`; RSC via `api` de `~/trpc/server`.