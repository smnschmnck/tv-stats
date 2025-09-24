import { TVShowDetails } from "@/types/tmdbApi/tvShowDetails";
import { tmdbFetch } from "@/utils/tmdbFetch";
import { unstable_cacheLife as cacheLife } from "next/cache";

const getShowDetails = async (showId: string) => {
  "use cache";
  cacheLife("hours");

  const res = await tmdbFetch(`/tv/${showId}?language=en-US`);

  if (!res.ok) {
    return;
  }

  return (await res.json()) as TVShowDetails;
};

export const ShowDetails = async ({ showId }: { showId: string }) => {
  const showDetails = await getShowDetails(showId);

  if (!showDetails) {
    return <p>Show not found</p>;
  }

  return (
    <>
      <h1 className="text-lg font-bold">{showDetails.name}</h1>
      {!!showDetails.poster_path && (
        <div>
          <img
            className="w-72 rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}
            alt="poster"
          />
        </div>
      )}
      <p>{showDetails.overview}</p>
    </>
  );
};
