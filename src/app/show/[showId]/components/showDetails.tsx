"use cache";

import { env } from "@/env";
import { TVShowDetails } from "@/types/tmdbApi/tvShowDetails";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export const ShowDetails = async ({ showId }: { showId: string }) => {
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
  return (
    <>
      <h1 className="text-lg font-bold">{showDetails.name}</h1>
      {!!showDetails.poster_path && (
        <div>
          <img
            className="rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
            alt="poster"
          />
        </div>
      )}
      <p>{showDetails.overview}</p>
    </>
  );
};
