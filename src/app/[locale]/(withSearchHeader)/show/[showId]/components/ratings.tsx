import { db } from "@/db/drizzle";
import { episodes, ratings } from "@/db/schema";
import { ExternalIds } from "@/types/tmdbApi/tvShow";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { asc, eq } from "drizzle-orm";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { Season } from "./season";
import { getTranslations } from "next-intl/server";

const getExternalId = async (showId: string) => {
  "use cache";
  cacheLife("hours");

  const res = await tmdbFetch(`/tv/${showId}/external_ids`);

  if (!res.ok) {
    return;
  }

  return (await res.json()) as ExternalIds;
};

const getEpisodeRatings = async (imdbId: string) => {
  "use cache";
  cacheLife("hours");

  return await db
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
};

export const Ratings = async ({ showId }: { showId: string }) => {
  const t = await getTranslations("show");
  const externalIds = await getExternalId(showId);

  if (!externalIds) {
    return <p>{t("notFound")}</p>;
  }

  const imdbId = externalIds.imdb_id;

  const eps = await getEpisodeRatings(imdbId);

  const seasonsMap = Map.groupBy(eps, (e) => e.season);
  const seasons = Array.from(seasonsMap.entries());

  return (
    <div className="flex w-full gap-4 overflow-x-auto">
      {seasons.map(
        ([seasonNumber, episodes]) =>
          seasonNumber && (
            <Season
              key={seasonNumber}
              seasonNumber={seasonNumber}
              episodes={episodes}
            />
          ),
      )}
    </div>
  );
};
