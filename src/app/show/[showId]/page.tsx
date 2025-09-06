import { env } from "@/env";
import { MovieSeriesData } from "@/types/omdbApi/tvShow";
import { ExternalIds } from "@/types/tmdbApi/tvShow";
import { Season } from "./components/season";
import { Suspense } from "react";

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
  const imdbId = externalIds.imdb_id;

  const showRes = await fetch(
    `http://www.omdbapi.com/?i=${imdbId}&apikey=${env.OMDB_SECRET_ACCESS_KEY}`
  );

  if (!showRes.ok) {
    return <p>No ratings for show yet</p>;
  }

  const show = (await showRes.json()) as MovieSeriesData;

  const seasons = Array.from(
    { length: Number(show.totalSeasons) },
    (_, i) => i + 1
  );

  return (
    <div className="flex p-12 gap-4">
      {seasons.map((season) => (
        <Suspense key={season} fallback={<p>loading...</p>}>
          <Season seasonNumber={season} imdbId={imdbId} />
        </Suspense>
      ))}
    </div>
  );
};

export default Page;
