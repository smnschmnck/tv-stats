import type { MiddlewareHandler } from "astro";
import { addTranslations } from "./i18n/middleware";

export const onRequest: MiddlewareHandler = async (context, next) => {
  addTranslations(context);

  return next();
};
