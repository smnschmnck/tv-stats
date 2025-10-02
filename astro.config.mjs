// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  srcDir: "src",
  output: "server",
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: "manual",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
