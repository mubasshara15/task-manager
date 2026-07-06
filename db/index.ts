import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | undefined;

function getDb(): Db {
  if (!_db) {
    const sql = neon(process.env.DATABASE_URL!);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

// Constructing the Neon client validates DATABASE_URL immediately, which
// crashes `next build`'s page-data collection step if it runs without a real
// DATABASE_URL (e.g. a Docker build stage that intentionally excludes env
// secrets). Deferring construction until first use keeps the build
// environment-agnostic without needing build-time DB credentials.
export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance as object, prop, instance);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
