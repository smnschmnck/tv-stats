import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema";
import { DATABASE_URL } from "astro:env/server";

export const db = drizzle({
  connection: {
    url: DATABASE_URL,
  },
  schema,
});
