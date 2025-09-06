import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_SECRET_ACCESS_KEY: z.string().min(1),
    OMDB_SECRET_ACCESS_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    TMDB_SECRET_ACCESS_KEY: process.env.TMDB_SECRET_ACCESS_KEY,
    OMDB_SECRET_ACCESS_KEY: process.env.OMDB_SECRET_ACCESS_KEY,
  },
});
