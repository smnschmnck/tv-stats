import { Suspense } from "react";
import FullScreenSpinner from "../loading";
import { Ratings } from "./ratings";
import { ShowDetails } from "./showDetails";
import { getTranslations } from "next-intl/server";

export const ShowInfo = async ({ showId }: { showId: string }) => {
  const t = await getTranslations("show.ratings");

  return (
    <div className="flex w-full flex-col gap-8 px-8 pb-8 md:flex-row md:px-12">
      <div className="flex h-fit min-h-128 w-full min-w-72 flex-col gap-2 rounded-xl border border-zinc-100 bg-zinc-50 p-4 md:w-72 md:p-8">
        <Suspense fallback={<FullScreenSpinner />}>
          <ShowDetails showId={showId} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col gap-4 overflow-x-auto rounded-xl border border-zinc-100 bg-zinc-50 p-4 md:w-fit md:p-8">
        <h2 className="text-lg font-bold">{t("header")}</h2>
        <Suspense fallback={<FullScreenSpinner />}>
          <Ratings showId={showId} />
        </Suspense>
      </div>
    </div>
  );
};
