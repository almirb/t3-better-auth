import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";

/**
 * HMR-safe singleton connection. In development every module reload would
 * otherwise spin up a new postgres client with its own pool, exhausting the
 * database's `max_connections`. Pinning the client on `globalThis` lets HMR
 * reuse it.
 *
 * SSL is driven by the `sslmode` parameter in `DATABASE_URL`
 * (e.g. `?sslmode=require` for managed databases, `?sslmode=disable` locally).
 * As a safeguard, production defaults to requiring TLS when `sslmode` is
 * omitted, so a missing parameter never silently downgrades to plaintext.
 */
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof postgres> | undefined;
};

const enforceProdSsl =
  env.NODE_ENV === "production" && !env.DATABASE_URL.includes("sslmode=");

const conn =
  globalForDb.conn ??
  postgres(env.DATABASE_URL, enforceProdSsl ? { ssl: "require" } : {});
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn);
