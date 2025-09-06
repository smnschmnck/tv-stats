import { SeasonData } from "@/types/omdbApi/tvSeason";
import { env } from "process";

export const Season = async ({
  seasonNumber,
  imdbId,
}: {
  imdbId: string;
  seasonNumber: number;
}) => {
  const res = await fetch(
    `http://www.omdbapi.com/?i=${imdbId}&season=${seasonNumber}&apikey=${env.OMDB_SECRET_ACCESS_KEY}`
  );

  if (!res.ok) {
    return null;
  }

  const season = (await res.json()) as SeasonData;

  return (
    <div className="flex flex-col gap-2">
      {season.Episodes.map((episode) => (
        <div
          key={episode.imdbID}
          className="h-10 w-10 rounded-md bg-zinc-100 flex justify-center items-center font-medium"
        >
          <span>{episode.imdbRating}</span>
        </div>
      ))}
    </div>
  );
};
