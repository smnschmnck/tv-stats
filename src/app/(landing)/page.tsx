import { SearchBar } from "@/components/searchBar";
import { Suspense } from "react";
import { PopularShows } from "./components/popularShows";
import { FullScreenSpinner } from "@/components/ui/spinner";

export const experimental_ppr = true;

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold">
          Spend Every Night on a Great Show
        </h1>
        <p className="font-medium text-zinc-500">
          Check IMDb ratings at a glance and find the series worth your time
        </p>
      </div>
      <div className="w-full sm:px-8">
        <SearchBar />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <main className="flex h-full w-full flex-col items-center gap-16 pt-4">
      <Hero />
      <div>
        <div className="min-h-12 w-full rounded-t-[100%] bg-zinc-50" />
        <div className="flex h-full w-full flex-col items-center gap-8 bg-zinc-50 pb-10">
          <h2 className="text-xl font-bold">Popular TV Shows</h2>
          <Suspense fallback={<FullScreenSpinner />}>
            <PopularShows />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
