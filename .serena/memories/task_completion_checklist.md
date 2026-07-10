# Checklist ao concluir uma tarefa

1. **Qualidade**: rodar `pnpm check` (= `eslint . && tsc --noEmit`) — deve sair limpo
   (0 erros). Corrigir a causa raiz, nunca desabilitar regra/teste para "passar".
2. **Build** (quando a mudança afeta bundling/rotas/config): `pnpm build` deve compilar
   sob Turbopack sem erros.
3. **Formatação**: `pnpm format:write` se mexeu em vários arquivos.
4. **Banco**: se alterou schema em `src/db/`, rodar `pnpm db:generate` (e `db:push` em dev).
5. **Idioma** (ver `mem:code_style_conventions`): código/tabelas/campos/variáveis em
   inglês; UI em português; commits em inglês (Conventional Commits).
6. **Git**: trabalhar em feature branch; commits Conventional em inglês; NÃO commitar
   `.serena/`, `drizzle/` (gerado), `.env`. Só commitar quando o usuário pedir.
7. **Escopo**: manter o caráter de template genérico — sem lógica de domínio específica.