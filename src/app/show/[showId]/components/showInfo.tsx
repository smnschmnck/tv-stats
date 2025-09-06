"use cache";

import { env } from "@/env";
import { MovieSeriesData } from "@/types/omdbApi/tvShow";
import { ExternalIds } from "@/types/tmdbApi/tvShow";
import { Suspense } from "react";
import { Season } from "./season";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { TVShowDetails } from "@/types/tmdbApi/tvShowDetails";

export const ShowInfo = async ({ showId }: { showId: string }) => {
  cacheLife("hours");

  const detailsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
      },
    }
  );

  if (!detailsRes.ok) {
    return <p>Show not found</p>;
  }

  const showDetails = (await detailsRes.json()) as TVShowDetails;

  const externalIdRes = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}/external_ids`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
      },
    }
  );

  if (!externalIdRes.ok) {
    return <p>Show not found</p>;
  }

  const externalIds = (await externalIdRes.json()) as ExternalIds;
  const imdbId = externalIds.imdb_id;

  const showRes = await fetch(
    `http://www.omdbapi.com/?i=${imdbId}&apikey=${env.OMDB_SECRET_ACCESS_KEY}`
  );

  if (!showRes.ok) {
    return <p>No ratings for show yet</p>;
  }

  const show = (await showRes.json()) as MovieSeriesData;

  const seasons = Array.from(
    { length: Number(show.totalSeasons) },
    (_, i) => i + 1
  );

  return (
    <div className="p-12 flex gap-12 w-full">
      <div className="flex flex-col gap-4">
        <h1 className="text-lg font-bold">{show.Title}</h1>
        {!!showDetails.poster_path && (
          <div>
            <img
              className="w-48 rounded-xl"
              src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
              alt="poster"
            />
          </div>
        )}
      </div>
      <div className="flex gap-4 w-full overflow-x-auto">
        {seasons.map((season) => (
          <Suspense key={season} fallback={<p>loading...</p>}>
            <Season seasonNumber={season} imdbId={imdbId} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};
