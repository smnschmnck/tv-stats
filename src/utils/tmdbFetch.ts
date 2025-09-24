import { env } from "@/env";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export const tmdbFetch = (
  endpoint: string,
  tmdbOpts?: { locale?: string; page?: string },
  options: FetchOptions = {},
) => {
  const url = new URL(`https://api.themoviedb.org/3${endpoint}`);

  if (tmdbOpts?.locale) {
    url.searchParams.set("language", tmdbOpts.locale);
  }

  if (tmdbOpts?.page) {
    url.searchParams.set("page", tmdbOpts.page);
  }

  const defaultOptions: FetchOptions = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
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
