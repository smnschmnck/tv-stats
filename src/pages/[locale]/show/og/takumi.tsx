import type { TFunction } from "i18next";
import { renderToString } from "solid-js/web";
import { render } from "takumi-js";
import { cached, DAY } from "../../../../db/cachingRedis";
import type { TVShowDetails } from "../../../../types/tmdbApi/tvShowDetails";
import { tmdbFetch } from "../../../../utils/tmdbFetch";

export const getOgImage = async ({
  showId,
  t,
  currentLocale,
}: {
  showId?: string;
  t: TFunction;
  currentLocale: string | undefined;
}) => {
  const getShowDetails = async () => {
    try {
      const showDetails = await cached({
        cacheKey: `tmdb:show:${showId}:${currentLocale ?? "default"}`,
        ttl: DAY,
        queryFn: async () => {
          const res = await tmdbFetch(`/tv/${showId}`, {
            locale: currentLocale,
          });

          if (!res.ok) {
            return;
          }

          return (await res.json()) as TVShowDetails;
        },
      });

      if (!showDetails) {
        return { error: t("show.notFound"), showDetails: undefined };
      }

      return { error: undefined, showDetails };
    } catch (e) {
      return { error: t("show.notFound"), showDetails: undefined };
    }
  };

  const { showDetails, error } = await getShowDetails();

  const html = renderToString(() => (
    <div
      style={{
        "font-size": "72px",
        width: "100%",
        height: "100%",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      }}
    >
      {showDetails?.name ?? error}
    </div>
  ));

  return render(html, { width: 1200, height: 630 });
};
