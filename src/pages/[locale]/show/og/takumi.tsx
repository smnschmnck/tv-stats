import type { TFunction } from "i18next";
import { renderToString } from "solid-js/web";
import { render } from "takumi-js";
import { cached, DAY } from "../../../../db/cachingRedis";
import type { TVShowDetails } from "../../../../types/tmdbApi/tvShowDetails";
import { tmdbFetch } from "../../../../utils/tmdbFetch";
import { Clapperboard } from "lucide-solid";
import { twMerge } from "tailwind-merge";
import { getRatingClassName } from "../_utils/getRatingClassName";

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
    <div tw="w-full h-full flex flex-col justify-center px-12 gap-10 bg-white">
      <div tw="flex w-fit items-center gap-3 font-bold">
        <Clapperboard size={48} />
        <span tw="text-4xl">TV Stats</span>
      </div>
      <div tw="flex bg-zinc-50 px-8 gap-8 rounded-xl h-fit justify-center items-center">
        <img
          tw="rounded-xl max-w-64 object-contain"
          src={`https://image.tmdb.org/t/p/w300/${showDetails!.poster_path}`}
          alt={`${showDetails!.name} poster`}
        />
        <div tw="flex flex-col gap-4">
          <div tw="min-w-80 w-fit flex gap-4 items-center bg-zinc-100 rounded-xl p-4">
            <div
              tw={twMerge(
                "min-w-18 min-h-18 max-w-18 max-h-18 rounded-xl text-3xl font-bold text-white flex justify-center items-center",
                getRatingClassName(8.2),
              )}
            >
              8.2
            </div>
            <span tw="text-3xl text-zinc-600">(323,312)</span>
          </div>
          <span tw="text-5xl font-bold">{showDetails?.name ?? error}</span>
          <span tw="text-ellipsis h-38 text-2xl">{showDetails?.overview}</span>
        </div>
      </div>
    </div>
  ));

  return render(html, { width: 1200, height: 630 });
};
