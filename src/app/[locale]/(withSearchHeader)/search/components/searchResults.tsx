import { TvShowLink } from "@/components/tvShowLink";
import { TvShowListResponse } from "@/types/tmdbApi/tvShow";
import { getLocale } from "@/utils/i18n";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { getTranslations } from "next-intl/server";
import { unstable_cacheLife as cacheLife } from "next/cache";

const getSearchResults = async ({
  query,
  locale,
}: {
  query: string | undefined;
  locale: string;
}) => {
  "use cache";
  cacheLife("hours");

  const res = await tmdbFetch(`/search/tv?query=${query}&include_adult=true`, {
    locale,
    page: "1",
  });

  if (!res.ok) {
    return;
  }

  return (await res.json()) as TvShowListResponse;
};

export const SearchResults = async ({
  query,
}: {
  query: string | undefined;
}) => {
  const locale = await getLocale();
  const t = await getTranslations();

  if (!query) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">{t("search.noQueryProvided")}</h1>
      </div>
    );
  }

  const shows = await getSearchResults({ query, locale });

  if (!shows) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">{t("common.somethingWentWrong")}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">
          {t("search.resultsFor", { query })}
        </h1>
        <p className="font-medium">
          {t("search.showsFound", { count: shows.total_results })}
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-8">
        {shows.total_results <= 0 && (
          <p className="pt-32 text-xl font-bold">
            {t("search.noResults", { query })}
          </p>
        )}
        {shows.results.map((show) => (
          <TvShowLink key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};
