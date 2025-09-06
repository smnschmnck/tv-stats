import { Suspense } from "react";
import { SearchResults } from "./components/searchResults";

export const experimental_ppr = true;

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="h-6 w-6 rounded-full border-black border-t-zinc-500 border-2 animate-spin"></div>
    </div>
  );
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  const query = params.q;

  return (
    <Suspense fallback={<Loader />}>
      <SearchResults query={query} />
    </Suspense>
  );
};

export default Page;
