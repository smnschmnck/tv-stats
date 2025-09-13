import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_SECRET_ACCESS_KEY: z.string().min(1),
    TURSO_DATABASE_URL: z.url(),
    TURSO_AUTH_TOKEN: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    TMDB_SECRET_ACCESS_KEY: process.env.TMDB_SECRET_ACCESS_KEY,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },
});
