import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";

export const db = drizzle({
  connection: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
  schema,
});
