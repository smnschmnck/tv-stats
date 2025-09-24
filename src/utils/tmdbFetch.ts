import { env } from "@/env";

type FetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export const tmdbFetch = (endpoint: string, options: FetchOptions = {}) => {
  const url = `https://api.themoviedb.org/3${endpoint}`;

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
