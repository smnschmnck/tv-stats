import type { TFunction } from "i18next";
import { renderToString } from "solid-js/web";
import { render } from "takumi-js";
import { cached, DAY } from "../../../../db/cachingRedis";
import type { TVShowDetails } from "../../../../types/tmdbApi/tvShowDetails";
import { tmdbFetch } from "../../../../utils/tmdbFetch";
import { Clapperboard } from "lucide-solid";

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
    <div tw="w-full h-full flex flex-col justify-center px-12 gap-12">
      <div tw="flex w-fit items-center gap-3 font-bold">
        <Clapperboard size={48} />
        <span tw="text-5xl">TV Stats</span>
      </div>
      <div tw="flex gap-8 bg-zinc-50 p-8 rounded-xl">
        <img
          tw="rounded-xl"
          src={`https://image.tmdb.org/t/p/w200/${showDetails!.poster_path}`}
          alt={`${showDetails!.name} poster`}
        />
        <div>
          <span tw="text-6xl font-bold">{showDetails?.name ?? error}</span>
        </div>
      </div>
    </div>
  ));

  return render(html, { width: 1200, height: 630 });
};
