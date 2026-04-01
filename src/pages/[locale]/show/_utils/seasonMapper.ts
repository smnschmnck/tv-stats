import type { Ratings } from "../../../../db/redis";

export const getIsDividedByYears = (ratings: Ratings | undefined) => {
  const hasSeasonThree = ratings?.episodes.some((ep) => {
    if (!ep.seasonNumber) {
      return false;
    }

    return ep.seasonNumber >= 3;
  });

  if (hasSeasonThree) {
    return false;
  }

  const date = new Date();

  const spansYears =
    Number(ratings?.startYear ?? "0") <
    Number(ratings?.endYear ?? date.getFullYear());

  const seasonOneEpisodeCount =
    ratings?.episodes.filter((ep) => ep.seasonNumber === 1).length ?? 0;

  return spansYears && seasonOneEpisodeCount > 100;
};
