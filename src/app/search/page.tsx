const SearchResults = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="font-bold text-2xl">No search query provided</h1>
      </div>
    );
  }

  return <div></div>;
};

export default SearchResults;
