import { SearchBar } from "@/components/searchBar";
import { FullScreenSpinner } from "@/components/ui/spinner";
import { Suspense } from "react";
import { SearchResults } from "./components/searchResults";

export const experimental_ppr = true;

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  const query = params.q;

  return (
    <div className="px-8 md:px-20 w-full h-full flex flex-col gap-20 items-center pt-4">
      <div className="w-full lg:px-36 md:px-18 sm:px-8 xs:px-4">
        <SearchBar defaultValue={query} />
      </div>
      <Suspense fallback={<FullScreenSpinner />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
};

export default Page;
