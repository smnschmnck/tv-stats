// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

export default defineConfig({
  srcDir: "src",
  output: "server",

  env: {
    schema: {
      TMDB_SECRET_ACCESS_KEY: envField.string({
        context: "server",
        access: "secret",
        min: 2,
      }),
      TURSO_DATABASE_URL: envField.string({
        context: "server",
        access: "secret",
        url: true,
      }),
      TURSO_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret",
        min: 2,
      }),
    },
  },

  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: "manual",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
  integrations: [react()],
});
