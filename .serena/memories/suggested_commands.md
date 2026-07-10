# Comandos (pnpm) — Windows/PowerShell

## Desenvolvimento
- `pnpm dev` — dev server (Turbopack) em http://localhost:3000
- `pnpm build` — build de produção (Turbopack)
- `pnpm preview` — `build` + `start`
- `pnpm start` — servidor de produção

## Qualidade (rodar antes de concluir tarefa)
- `pnpm check` — `eslint . && tsc --noEmit` (lint + typecheck)
- `pnpm lint` / `pnpm lint:fix` — `eslint .` (o `next lint` NÃO existe mais)
- `pnpm typecheck` — `tsc --noEmit`
- `pnpm format:write` / `pnpm format:check` — Prettier

## Banco (Drizzle)
- `pnpm db:generate` — gera migrations a partir do schema (roda também no postinstall)
- `pnpm db:migrate` — aplica migrations
- `pnpm db:push` — sincroniza schema direto (útil para criar tabelas em dev)
- `pnpm db:studio` — Drizzle Studio (inspecionar/editar dados)

## Setup pós-clone
1. `pnpm install`
2. Copiar `.env.example` → `.env` e preencher (`DATABASE_URL` com `?sslmode=disable`
   local, `BETTER_AUTH_SECRET` com 32+ chars, credenciais Google).
3. `pnpm db:push` para criar as tabelas.
4. `pnpm dev`.

## Notas Windows
- Shell do usuário é PowerShell: usar `Remove-Item`, `$env:VAR`, paths com `\`.
- Gerar `BETTER_AUTH_SECRET`: `npx @better-auth/cli secret` ou `openssl rand -base64 32`.