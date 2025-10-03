import { TMDB_SECRET_ACCESS_KEY } from "astro:env/server";
import { getLocale } from "../i18n/utils";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export const tmdbFetch = (
  endpoint: string,
  tmdbOpts?: { locale?: string; page?: string },
  options: FetchOptions = {},
) => {
  const url = new URL(`https://api.themoviedb.org/3${endpoint}`);

  const locale = getLocale(tmdbOpts?.locale);

  if (locale) {
    url.searchParams.set("language", locale);
  }

  if (tmdbOpts?.page) {
    url.searchParams.set("page", tmdbOpts.page);
  }

  const defaultOptions: FetchOptions = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_SECRET_ACCESS_KEY}`,
    },
  };

  const mergedOptions: FetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  return fetch(url, mergedOptions);
};
