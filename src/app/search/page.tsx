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
    <Suspense fallback={<p>Loading...</p>}>
      <SearchResults query={query} />
    </Suspense>
  );
};

export default Page;
