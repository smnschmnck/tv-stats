import { fallbackLanguage } from "./constants";

export const getLocaleLink = (locale: string | undefined, path: string) => {
  return `/${locale ?? fallbackLanguage}${path}`;
};

const locales = {
  de: "de-DE",
  en: "en-US",
};

export const getLocale = (locale: string | undefined) => {
  const localeMap = new Map(Object.entries(locales));

  const localeString = localeMap.get(locale ?? fallbackLanguage);

  if (!localeString) {
    return locales[fallbackLanguage];
  }

  return localeString;
};
