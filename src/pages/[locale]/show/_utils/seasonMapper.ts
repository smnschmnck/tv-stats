import type { Ratings } from "../../../../db/redis";

export const getIsDividedByYears = (ratings: Ratings | undefined) => {
  const date = new Date();

  const spansYears =
    Number(ratings?.startYear ?? "0") <
    Number(ratings?.endYear ?? date.getFullYear());

  const multipleSeaons = ratings?.episodes.some((ep) => {
    if (!ep.seasonNumber) {
      return false;
    }

    return ep.seasonNumber > 1;
  });

  return spansYears && !multipleSeaons;
};
