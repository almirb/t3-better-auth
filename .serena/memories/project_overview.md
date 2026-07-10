# Visão geral do projeto

Template **T3 Stack + BetterAuth** (App Router). O dono usa este repositório como
**template/boilerplate para novos projetos**, então o código deve permanecer
genérico e reutilizável — evitar lógica de domínio/tabelas específicas de um
produto.

- Fork: `github.com/almirb/t3-better-auth` (upstream é de outro autor; melhorias
  voltam via PR).
- Gerado por `create-t3-app` (ver `ct3aMetadata` no `package.json`).

## Stack resumida
- **Next.js 16.2** (App Router, **Turbopack** como bundler padrão) + **React 19.2**
- **TypeScript** estrito
- **tRPC 11** (client + `@trpc/react-query` + server) — ver `mem:trpc_setup`
- **Drizzle ORM** + driver **postgres.js** (PostgreSQL) — ver `mem:database_and_drizzle`
- **BetterAuth** (Google OAuth + email/senha) — ver `mem:auth_setup`
- **Tailwind CSS v4** (config em CSS) + **shadcn/ui** (new-york, base neutral, ícones lucide)
- **Zod v4**, **react-hook-form**, **TanStack Query**
- Gerenciador: **pnpm**

Detalhes específicos do Next 16/Turbopack (armadilhas de migração) em
`mem:nextjs16_turbopack_notes`. Estrutura em `mem:project_structure`,
convenções em `mem:code_style_conventions`, comandos em `mem:suggested_commands`.