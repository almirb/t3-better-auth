# Banco de dados: Drizzle ORM + postgres.js

## Driver: postgres.js (NÃO node-postgres/pg)
`src/lib/server/db.ts` usa `drizzle-orm/postgres-js` + `postgres`. Motivo: o driver
`pg` (node-postgres) **não é compatível com o Turbopack** (padrão no Next 16); usar
postgres.js resolve. Ver `mem:nextjs16_turbopack_notes`.

## Padrão de conexão (importante replicar em novos projetos)
```ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "~/env";

// Singleton HMR-safe: sem isso, cada hot-reload do `next dev` cria um novo pool
// e esgota o max_connections do Postgres.
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof postgres> | undefined;
};

// SSL vem do `sslmode` da DATABASE_URL. Em produção, se `sslmode` for omitido,
// força `require` (nunca cai em texto puro por esquecimento).
const enforceProdSsl =
  env.NODE_ENV === "production" && !env.DATABASE_URL.includes("sslmode=");

const conn =
  globalForDb.conn ??
  postgres(env.DATABASE_URL, enforceProdSsl ? { ssl: "require" } : {});
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn);
```

## SSL — regra
Controlado pelo `?sslmode=` da `DATABASE_URL` (o postgres.js honra nativamente):
- Local: `?sslmode=disable` (sem TLS).
- Gerenciado (Neon/Supabase/RDS): `?sslmode=require`.
- NÃO passar `{ ssl: true }` explícito — sobrescreve o `sslmode` da URL e quebra o local.
- Prod sem `sslmode` → default `require` (safeguard anti-downgrade, no código acima).

## Retorno de `db.execute(sql`...`)`
Com postgres.js o retorno é **array direto** (`result[0]`, `result.length`), NÃO
`result.rows`. (Diferente do driver pg.)

## drizzle-kit
- Config em `drizzle.config.ts` (`dialect: "postgresql"`, `dbCredentials.url`, schema em
  `src/db/schema.ts` e `src/db/auth-schema.ts`, out `./drizzle`).
- `postinstall` roda `drizzle-kit generate` automaticamente.
- Comandos: ver `mem:suggested_commands`.

## BetterAuth adapter
`drizzleAdapter(db, { provider: "pg" })` — "pg" é dialeto, não driver; mantém-se com
postgres.js. Ver `mem:auth_setup`.