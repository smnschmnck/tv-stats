import { SearchBar } from "@/components/searchBar";
import { Suspense } from "react";
import { PopularShows } from "./components/popularShows";
import FullScreenSpinner from "./search/loading";

export const experimental_ppr = true;

const Hero = () => {
  return (
    <div className="flex flex-col gap-8 px-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-bold text-4xl">
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
    <main className="w-full h-full flex items-center gap-16 flex-col pt-4">
      <Hero />
      <div>
        <div className="min-h-12 w-full bg-zinc-50 rounded-t-[100%]" />
        <div className="w-full h-full bg-zinc-50 flex items-center pb-10 flex-col gap-8">
          <h2 className="font-bold text-xl">Popular TV Shows</h2>
          <Suspense fallback={<FullScreenSpinner />}>
            <PopularShows />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
