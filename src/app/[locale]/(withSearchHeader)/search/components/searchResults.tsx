import { TvShowLink } from "@/components/tvShowLink";
import { TvShowListResponse } from "@/types/tmdbApi/tvShow";
import { getLocale } from "@/utils/i18n";
import { tmdbFetch } from "@/utils/tmdbFetch";
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
  if (!query) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">No search query provided</h1>
      </div>
    );
  }

  const shows = await getSearchResults({ query, locale });

  if (!shows) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Search results for {`'${query}'`}</h1>
        <p className="font-medium">{shows.total_results} shows found</p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-8">
        {shows.total_results <= 0 && (
          <p className="pt-32 text-xl font-bold">
            No shows matching {`'${query}'`} found
          </p>
        )}
        {shows.results.map((show) => (
          <TvShowLink key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};
