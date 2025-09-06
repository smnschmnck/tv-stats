"use cache";

import { TvShowLink } from "@/components/tvShowLink";
import { env } from "@/env";
import { TvShowListResponse } from "@/types/tmdbApi/tvShow";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export const SearchResults = async ({
  query,
}: {
  query: string | undefined;
}) => {
  cacheLife("hours");

  if (!query) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-bold text-2xl">No search query provided</h1>
      </div>
    );
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
      },
    }
  );

  if (!res.ok) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-bold text-2xl">Something went wrong</h1>
      </div>
    );
  }

  const shows = (await res.json()) as TvShowListResponse;

  return (
    <div className="flex flex-wrap items-center w-full justify-center">
      {shows.total_results <= 0 && (
        <p className="font-bold text-xl pt-32">
          No shows matching {`'${query}'`} found
        </p>
      )}
      {shows.results.map((show) => (
        <TvShowLink key={show.id} show={show} />
      ))}
    </div>
  );
};
