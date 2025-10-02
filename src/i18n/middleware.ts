import type { APIContext } from "astro";
import i18next from "i18next";
import { LanguageDetector } from "i18next-http-middleware";

import de from "../../locales/de/translation.json";
import en from "../../locales/en/translation.json";

await i18next.use(LanguageDetector).init({
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  interpolation: { escapeValue: false },
});

export const addTranslations = (context: APIContext) => {
  const lng = context.currentLocale ?? "en";

  const t = i18next.getFixedT(lng);

  context.locals.t = t;
};
