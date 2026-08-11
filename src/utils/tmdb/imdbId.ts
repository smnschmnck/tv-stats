import { cached, DAY } from "../../db/cachingRedis";
import type { ExternalIds } from "../../types/tmdbApi/tvShow";
import { tmdbFetch } from "../tmdbFetch";

export const getImdbId = (
  id: string | undefined,
  mediaType: "tv" | "movie" = "tv",
) => {
  return cached({
    cacheKey: `imdb-id-${mediaType}-${id}`,
    ttl: 30 * DAY,
    queryFn: async () => {
      if (!id) {
        return;
      }

      const externalIdRes = await tmdbFetch(`/${mediaType}/${id}/external_ids`);

      if (!externalIdRes.ok) {
        return;
      }

      const externalIds = (await externalIdRes.json()) as ExternalIds;
      const imdbId = externalIds.imdb_id;

      return imdbId;
    },
  });
};
