import { Suspense } from "react";
import FullScreenSpinner from "../loading";
import { Ratings } from "./ratings";
import { ShowDetails } from "./showDetails";

export const ShowInfo = async ({ showId }: { showId: string }) => {
  return (
    <div className="px-12 pb-8 flex gap-8 w-full">
      <div className="flex flex-col gap-2 w-72 min-w-72 min-h-128 bg-zinc-50 p-8 rounded-xl border-zinc-100 border h-fit">
        <Suspense fallback={<FullScreenSpinner />}>
          <ShowDetails showId={showId} />
        </Suspense>
      </div>
      <Suspense fallback={<FullScreenSpinner />}>
        <Ratings showId={showId} />
      </Suspense>
    </div>
  );
};
