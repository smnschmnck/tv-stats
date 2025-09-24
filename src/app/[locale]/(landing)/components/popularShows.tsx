import { TvShowLink } from "@/components/tvShowLink";
import { TvShowListResponse } from "@/types/tmdbApi/tvShow";
import { getLocale } from "@/utils/i18n";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { getTranslations } from "next-intl/server";
import { unstable_cacheLife as cacheLife } from "next/cache";

const getPopularShows = async ({ locale }: { locale: string }) => {
  "use cache";
  cacheLife("hours");

  const res = await tmdbFetch("/tv/popular", { locale, page: "1" });

  if (!res.ok) {
    console.error(await res.text());
    return;
  }

  return (await res.json()) as TvShowListResponse;
};

export const PopularShows = async () => {
  const t = await getTranslations();
  const locale = await getLocale();

  const shows = await getPopularShows({ locale });

  if (!shows) {
    return <p>{t("common.somethingWentWrong")}</p>;
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-8 bg-zinc-50 px-8 md:px-20">
      {shows.results.map((show) => (
        <TvShowLink key={show.id} show={show} />
      ))}
    </div>
  );
};
