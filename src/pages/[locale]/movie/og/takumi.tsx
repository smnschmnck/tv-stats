import type { TFunction } from "i18next";
import { renderToString } from "solid-js/web";
import { render } from "takumi-js";
import { cached, DAY } from "../../../../db/cachingRedis";
import { getRatings } from "../../../../db/ratingsRedis";
import { getLocale } from "../../../../i18n/utils";
import type { MovieDetails } from "../../../../types/tmdbApi/movieDetails";
import { getImdbId } from "../../../../utils/tmdb/imdbId";
import { tmdbFetch } from "../../../../utils/tmdbFetch";
import { Clapperboard } from "lucide-solid";
import { twMerge } from "tailwind-merge";
import { getRatingClassName } from "../../show/_utils/getRatingClassName";

export const getOgImage = async ({
  movieId,
  t,
  currentLocale,
}: {
  movieId?: string;
  t: TFunction;
  currentLocale: string | undefined;
}) => {
  const imdbId = await getImdbId(movieId, "movie");
  const ratings = await getRatings(imdbId);

  const getMovieDetails = async () => {
    try {
      const movieDetails = await cached({
        cacheKey: `tmdb:movie:${movieId}:${currentLocale ?? "default"}`,
        ttl: DAY,
        queryFn: async () => {
          const res = await tmdbFetch(`/movie/${movieId}`, {
            locale: currentLocale,
          });

          if (!res.ok) {
            return;
          }

          return (await res.json()) as MovieDetails;
        },
      });

      if (!movieDetails) {
        return { error: t("movie.notFound"), movieDetails: undefined };
      }

      return { error: undefined, movieDetails };
    } catch (e) {
      return { error: t("movie.notFound"), movieDetails: undefined };
    }
  };

  const { movieDetails, error } = await getMovieDetails();
  const formatter = new Intl.NumberFormat(getLocale(currentLocale));
  const posterUrl = movieDetails?.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
    : undefined;
  const averageRating = ratings?.averageRating;

  const html = renderToString(() => (
    <div tw="flex h-full w-full flex-col bg-white px-14 py-12 text-zinc-950">
      <div tw="flex items-center gap-3 font-bold">
        <Clapperboard size={40} />
        <span tw="text-3xl">TV Stats</span>
      </div>
      <div tw="mt-8 h-px w-full bg-zinc-200" />

      <div tw="mt-10 flex flex-1 items-center gap-10">
        {posterUrl ? (
          <img
            tw="h-[390px] w-[260px] rounded-xl object-cover"
            src={posterUrl}
            alt={`${movieDetails?.title ?? "Movie"} poster`}
          />
        ) : (
          <div tw="flex h-[390px] w-[260px] items-center justify-center rounded-xl bg-zinc-100 text-zinc-400">
            <Clapperboard size={56} />
          </div>
        )}

        <div tw="flex min-w-0 flex-1 flex-col gap-5">
          <div tw="max-h-32 max-w-3xl overflow-hidden text-5xl font-bold leading-tight">
            {movieDetails?.title ?? error}
          </div>
          <div tw="flex w-fit items-center gap-4 rounded-xl bg-zinc-100 p-3">
            <div
              tw={twMerge(
                "flex h-[72px] min-w-[72px] items-center justify-center rounded-xl text-3xl font-bold text-white",
                averageRating === undefined
                  ? "bg-zinc-500"
                  : getRatingClassName(averageRating),
              )}
            >
              {averageRating ?? "—"}
            </div>
            <span tw="text-3xl text-zinc-600">
              {`(${formatter.format(ratings?.numVotes ?? 0)})`}
            </span>
          </div>
          {movieDetails?.overview && (
            <div tw="max-h-32 max-w-3xl overflow-hidden text-ellipsis text-[26px] leading-relaxed text-zinc-600">
              {movieDetails.overview}
            </div>
          )}
        </div>
      </div>
    </div>
  ));

  return render(html, { width: 1200, height: 630 });
};
