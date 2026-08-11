import { cached, DAY } from "../../db/cachingRedis";
import type { ExternalIds } from "../../types/tmdbApi/tvShow";
import { tmdbFetch } from "../tmdbFetch";

export const getImdbId = (showId: string | undefined) => {
  return cached({
    cacheKey: `imdb-id-${showId}`,
    ttl: 30 * DAY,
    queryFn: async () => {
      const externalIdRes = await tmdbFetch(`/tv/${showId}/external_ids`);

      if (!externalIdRes.ok) {
        return;
      }

      const externalIds = (await externalIdRes.json()) as ExternalIds;
      const imdbId = externalIds.imdb_id;

      return imdbId;
    },
  });
};
