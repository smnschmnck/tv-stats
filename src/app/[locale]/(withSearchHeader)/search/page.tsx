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
    <div className="h-full w-full px-8 pt-4 md:px-16">
      <Suspense fallback={<FullScreenSpinner />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
};

export default Page;
