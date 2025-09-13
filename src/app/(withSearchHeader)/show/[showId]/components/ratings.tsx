"use cache";

import { db } from "@/db/drizzle";
import { episodes, ratings } from "@/db/schema";
import { env } from "@/env";
import { ExternalIds } from "@/types/tmdbApi/tvShow";
import { asc, eq } from "drizzle-orm";
import { Season } from "./season";
import { unstable_cacheLife as cacheLife } from "next/cache";

export const Ratings = async ({ showId }: { showId: string }) => {
  cacheLife("hours");

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

  const eps = await db
    .select({
      season: episodes.seasonNumber,
      episode: episodes.episodeNumber,
      tconst: episodes.tconst,
      rating: ratings.averageRating,
    })
    .from(episodes)
    .innerJoin(ratings, eq(episodes.tconst, ratings.tconst))
    .where(eq(episodes.parentTconst, imdbId))
    .orderBy(asc(episodes.seasonNumber), asc(episodes.episodeNumber));

  const seasonsMap = Map.groupBy(eps, (e) => e.season);
  const seasons = Array.from(seasonsMap.entries());

  return (
    <div className="flex gap-4 w-full overflow-x-auto">
      {seasons.map(
        ([seasonNumber, episodes]) =>
          seasonNumber && (
            <Season
              key={seasonNumber}
              seasonNumber={seasonNumber}
              episodes={episodes}
            />
          )
      )}
    </div>
  );
};
