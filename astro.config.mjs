// astro.config.mjs
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import node from "@astrojs/node";

import solidJs from "@astrojs/solid-js";

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
      REDIS_URL: envField.string({
        context: "server",
        access: "secret",
        url: true,
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

  adapter: node({
    mode: "standalone",
  }),
  integrations: [solidJs()],
});
