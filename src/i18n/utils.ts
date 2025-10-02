import { fallbackLanguage } from "./constants";

export const getLocaleLink = (locale: string | undefined, path: string) => {
  return `/${locale ?? fallbackLanguage}${path}`;
};
