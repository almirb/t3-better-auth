# Convenções de código

## Idioma (IMPORTANTE)
- **Commits**: em **inglês**, seguindo **Conventional Commits** (`type(scope): description`).
  Tipos válidos: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert.
  Sem linha `Co-Authored-By` referenciando modelos de IA.
- **Código em inglês**: nomes de tabelas, campos/colunas, variáveis, funções, tipos —
  tudo em **inglês**.
- **Comentários** e **README.md**: podem ser em **português**.
- **Textos de UI** (qualquer coisa que aparece na tela para o usuário): em **português**.

## TypeScript
- `strict`, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`, `checkJs` ligados.
- Por causa de `verbatimModuleSyntax` + Turbopack, use **`import type { X }`** (nível de
  declaração) para imports só-de-tipo — NÃO `import { type X }` inline em módulos que
  cruzam a fronteira server/client (ver `mem:nextjs16_turbopack_notes`).
- Alias de import: `~/*` → `src/*`.

## Nomenclatura
- Arquivos de componentes e UI: kebab-case (`use-mobile.ts`, `signup-form.tsx`).
- Funções/variáveis: camelCase. Componentes/tipos: PascalCase.

## ESLint (flat config em `eslint.config.js`)
- `eslint-config-next/core-web-vitals` (flat nativo — NÃO usar FlatCompat), typescript-eslint
  (recommended + recommendedTypeChecked + stylisticTypeChecked) e `eslint-plugin-drizzle`.
- `src/components/ui/**` está no `ignores` (código shadcn não é lintado).
- `consistent-type-imports` com `fixStyle: "inline-type-imports"` (mas ver ressalva de
  Turbopack acima para módulos client/server).
- Regras drizzle: `enforce-delete-with-where` e `enforce-update-with-where` (evita
  DELETE/UPDATE sem WHERE em `db`/`ctx.db`).

## shadcn/ui
- Componentes em `src/components/ui/` são **código-fonte copiado**, não dependência.
  "Atualizar" = `npx shadcn@latest add <comp> --overwrite` (sobrescreve; nunca regenerar
  em massa). Config em `components.json` (style new-york, base neutral, ícones lucide).

## Formatação
- Prettier + `prettier-plugin-tailwindcss`. Rodar `pnpm format:write`.

## Escopo / disciplina
- Template reutilizável: manter genérico, sem lógica de domínio específica.
- Antes de concluir tarefa: ver `mem:task_completion_checklist`.