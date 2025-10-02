// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  srcDir: "src",
  output: "server",
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: "manual",
  },
});
