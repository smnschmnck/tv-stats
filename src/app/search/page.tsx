const SearchResults = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const params = await searchParams;
  const query = params.q;

  if (!query) {
    return <div>No search query provided</div>;
  }

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {/* Add your search results logic here */}
      <p>Searching for: {query}</p>
    </div>
  );
};

export default SearchResults;
