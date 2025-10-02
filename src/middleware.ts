import type { MiddlewareHandler } from "astro";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import { LanguageDetector } from "i18next-http-middleware";
import { supportedLanguages } from "./constants/i18n";

await i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
    preload: supportedLanguages,
    interpolation: { escapeValue: false },
  });

export const onRequest: MiddlewareHandler = async (context, next) => {
  const lng = context.currentLocale ?? "en";

  const t = i18next.getFixedT(lng);

  context.locals.t = t;

  return next();
};
