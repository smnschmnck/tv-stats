import { env } from "@/env";
import { MovieSeriesData } from "@/types/omdbApi/tvShow";
import { ExternalIds } from "@/types/tmdbApi/tvShow";

const Page = async ({ params }: { params: Promise<{ showId: string }> }) => {
  const { showId } = await params;

  const externalIdRes = await fetch(
    `https://api.themoviedb.org/3/tv/${showId}/external_ids`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env.TMDB_SECRET_ACCESS_KEY}`,
      },
    }
  );

  if (!externalIdRes.ok) {
    return <p>Show not found</p>;
  }

  const externalIds = (await externalIdRes.json()) as ExternalIds;

  const showRes = await fetch(
    `http://www.omdbapi.com/?i=${externalIds.imdb_id}&apikey=${env.OMDB_SECRET_ACCESS_KEY}`
  );

  if (!showRes.ok) {
    return <p>No ratings for show yet</p>;
  }

  const show = (await showRes.json()) as MovieSeriesData;

  return <pre>My Show imdb: {JSON.stringify(show, null, 2)}</pre>;
};

export default Page;
