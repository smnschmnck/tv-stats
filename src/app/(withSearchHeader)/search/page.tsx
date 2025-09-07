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
    <div className="px-8 md:px-16 pt-4 h-full w-full">
      <Suspense fallback={<FullScreenSpinner />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
};

export default Page;
