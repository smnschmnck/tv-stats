"use cache";
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
    }
  );

  if (!res.ok) {
    return <p>something went wrong</p>;
  }

  const shows = (await res.json()) as TvShowListResponse;

  return (
    <div className="flex flex-wrap items-center justify-center bg-zinc-50 w-full px-20">
      {shows.results.map((show) => (
        <a
          href="https://imdb.com"
          key={show.id}
          className="flex flex-col gap-1 items-start h-76 overflow-hidden px-8 py-5 rounded-2xl hover:bg-zinc-200 transition"
        >
          <img
            className="w-32 rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={`${show.name} poster`}
          />
          <p className="w-32 text-center font-medium line-clamp-3">
            {show.name}
          </p>
        </a>
      ))}
    </div>
  );
};
