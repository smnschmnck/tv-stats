import { TVShowDetails } from "@/types/tmdbApi/tvShowDetails";
import { getLocale } from "@/utils/i18n";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { getTranslations } from "next-intl/server";
import { unstable_cacheLife as cacheLife } from "next/cache";

const getShowDetails = async ({
  showId,
  locale,
}: {
  locale: string;
  showId: string;
}) => {
  "use cache";
  cacheLife("hours");

  const res = await tmdbFetch(`/tv/${showId}`, { locale });

  if (!res.ok) {
    return;
  }

  return (await res.json()) as TVShowDetails;
};

export const ShowDetails = async ({ showId }: { showId: string }) => {
  const t = await getTranslations("show");
  const locale = await getLocale();

  const showDetails = await getShowDetails({ showId, locale });

  if (!showDetails) {
    return <p>{t("notFound")}</p>;
  }

  return (
    <>
      <h1 className="text-lg font-bold">{showDetails.name}</h1>
      {!!showDetails.poster_path && (
        <div>
          <img
            className="w-72 rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
            alt="poster"
          />
        </div>
      )}
      <p>{showDetails.overview}</p>
    </>
  );
};
