# BetterAuth

## Server (`src/lib/auth.ts`)
- `auth = betterAuth({ ... })` com:
  - `database: drizzleAdapter(db, { provider: "pg", schema: authSchema })`
    — `provider: "pg"` é o **dialeto SQL** (postgres), NÃO o driver Node; permanece "pg"
    mesmo usando postgres.js.
  - `socialProviders.google` (usa `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`).
  - `emailAndPassword.enabled: true`.
  - `user.deleteUser.enabled: true` com hook `beforeDelete` (ponto para limpar recursos
    do usuário).
  - `plugins: [nextCookies()]`.
- Schema das tabelas de auth em `src/db/auth-schema.ts` (gerado/gerenciado pelo BetterAuth).

## Client (`src/lib/auth-client.ts`)
- `authClient = createAuthClient()`; reexporta `signIn`, `signUp`, `useSession`.

## Handler HTTP
- `src/app/api/auth/[...all]/route.ts` → `toNextJsHandler(auth.handler)` (GET/POST).

## Integração com tRPC
- `createTRPCContext` chama `auth.api.getSession({ headers })` e injeta `session` no ctx;
  `protectedProcedure` exige `session.user`.

## Env necessária
`BETTER_AUTH_SECRET` (32+ chars), `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`,
`GOOGLE_CLIENT_SECRET` (ver `src/env.js`).

## Fluxo de teste
Não há usuário/seed padrão — criar conta em `/auth/signup` (email+senha) ou via Google
(se as credenciais OAuth estiverem no `.env`). Tabelas precisam existir (`pnpm db:push`).