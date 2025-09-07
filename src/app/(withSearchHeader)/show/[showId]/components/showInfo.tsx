"use cache";

import { Suspense } from "react";
import FullScreenSpinner from "../loading";
import { Ratings } from "./ratings";
import { ShowDetails } from "./showDetails";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export const ShowInfo = async ({ showId }: { showId: string }) => {
  cacheLife("hours");

  return (
    <div className="px-12 pb-8 flex gap-8 w-full flex-col md:flex-row">
      <div className="flex flex-col gap-2 w-full md:w-72 min-w-72 min-h-128 bg-zinc-50 p-8 rounded-xl border-zinc-100 border h-fit">
        <Suspense fallback={<FullScreenSpinner />}>
          <ShowDetails showId={showId} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">Ratings</h2>
        <Suspense fallback={<FullScreenSpinner />}>
          <Ratings showId={showId} />
        </Suspense>
      </div>
    </div>
  );
};
