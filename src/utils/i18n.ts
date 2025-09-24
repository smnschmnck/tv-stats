import { getLocale as getLanguage } from "next-intl/server";

const locales = {
  de: "de-DE",
  en: "en-US",
};

export const getLocale = async () => {
  const language = await getLanguage();

  return locales[language];
};
