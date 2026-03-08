import { eq } from "drizzle-orm";
import { db } from "../db/drizzle";
import { titleBasics, titleEpisode, titleRatings } from "../db/schema";

export type Ratings = {
  averageRating: number | null;
  numVotes: number | null;
  startYear: string | null;
  endYear: string | null;
  episodes: {
    tconst: string;
    averageRating: number | null;
    numVotes: number | null;
    seasonNumber: number | null;
    episodeNumber: number | null;
    startYear: string | null;
    endYear: string | null;
  }[];
};

export const getRatings = async (
  tconst: string | undefined,
): Promise<Ratings | undefined> => {
  if (!tconst) return;

  const showRating = await db
    .select({
      averageRating: titleRatings.averageRating,
      numVotes: titleRatings.numVotes,
    })
    .from(titleRatings)
    .where(eq(titleRatings.tconst, tconst))
    .limit(1);

  const showBasics = await db
    .select({
      startYear: titleBasics.startYear,
      endYear: titleBasics.endYear,
    })
    .from(titleBasics)
    .where(eq(titleBasics.tconst, tconst))
    .limit(1);

  if (showRating.length === 0 && showBasics.length === 0) return;

  const episodes = await db
    .select({
      tconst: titleEpisode.tconst,
      seasonNumber: titleEpisode.seasonNumber,
      episodeNumber: titleEpisode.episodeNumber,
      averageRating: titleRatings.averageRating,
      numVotes: titleRatings.numVotes,
      startYear: titleBasics.startYear,
      endYear: titleBasics.endYear,
    })
    .from(titleEpisode)
    .leftJoin(titleRatings, eq(titleEpisode.tconst, titleRatings.tconst))
    .leftJoin(titleBasics, eq(titleEpisode.tconst, titleBasics.tconst))
    .where(eq(titleEpisode.parentTconst, tconst));

  const rating = showRating[0];
  const basics = showBasics[0];

  return {
    averageRating: rating?.averageRating ? Number(rating.averageRating) : null,
    numVotes: rating?.numVotes ?? null,
    startYear: basics?.startYear?.toString() ?? null,
    endYear: basics?.endYear?.toString() ?? null,
    episodes: episodes.map((ep) => ({
      tconst: ep.tconst,
      averageRating: ep.averageRating ? Number(ep.averageRating) : null,
      numVotes: ep.numVotes ?? null,
      seasonNumber: ep.seasonNumber ?? null,
      episodeNumber: ep.episodeNumber ?? null,
      startYear: ep.startYear?.toString() ?? null,
      endYear: ep.endYear?.toString() ?? null,
    })),
  };
};
