import type { Ratings } from "../../../../db/redis";

export const getIsDividedByYears = (ratings: Ratings | undefined) => {
  const date = new Date();

  const spansYears =
    Number(ratings?.startYear ?? "0") <
    Number(ratings?.endYear ?? date.getFullYear());

  const multipleSeasons = ratings?.episodes.some((ep) => {
    if (!ep.seasonNumber || ep.seasonNumber <= 1) {
      return false;
    }

    return ep.averageRating !== null;
  });

  return spansYears && !multipleSeasons;
};
