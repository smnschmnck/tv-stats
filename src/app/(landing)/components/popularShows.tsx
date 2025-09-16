"use cache";
import { TvShowLink } from "@/components/tvShowLink";
import { env } from "@/env";
import { TvShowListResponse } from "@/types/tmdbApi/tvShow";
import { unstable_cacheLife as cacheLife } from "next/cache";

export const PopularShows = async () => {
  cacheLife("hours");

  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
      },
    },
  );

  if (!res.ok) {
    return <p>something went wrong</p>;
  }

  const shows = (await res.json()) as TvShowListResponse;

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-8 bg-zinc-50 px-8 md:px-20">
      {shows.results.map((show) => (
        <TvShowLink key={show.id} show={show} />
      ))}
    </div>
  );
};
