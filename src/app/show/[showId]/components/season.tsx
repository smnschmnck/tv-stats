"use cache";

import { env } from "@/env";
import { SeasonData } from "@/types/omdbApi/tvSeason";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { twMerge } from "tailwind-merge";

const BaseRating = ({
  rating,
  className,
}: {
  rating: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "h-10 w-10 rounded-md bg-zinc-100 text-white flex justify-center items-center font-medium",
        className
      )}
    >
      <span>{rating}</span>
    </div>
  );
};

const Rating = ({ rating }: { rating: string }) => {
  if (rating === "N/A") {
    return <BaseRating rating="?" className="text-black" />;
  }

  const numRating = parseFloat(rating);

  if (numRating >= 9) {
    return <BaseRating rating={rating} className="bg-green-700" />;
  }
  if (numRating >= 8) {
    return <BaseRating rating={rating} className="bg-green-400" />;
  }
  if (numRating >= 7) {
    return <BaseRating rating={rating} className="bg-yellow-400" />;
  }
  if (numRating >= 6) {
    return <BaseRating rating={rating} className="bg-red-400" />;
  }
  if (numRating >= 5) {
    return <BaseRating rating={rating} className="bg-red-600" />;
  }
  if (numRating >= 4) {
    return <BaseRating rating={rating} className="bg-pink-600" />;
  }
  if (numRating >= 3) {
    return <BaseRating rating={rating} className="bg-fuchsia-600" />;
  }
  if (numRating >= 2) {
    return <BaseRating rating={rating} className="bg-violet-500" />;
  }
  if (numRating >= 1) {
    return <BaseRating rating={rating} className="bg-blue-500" />;
  }
  if (numRating >= 0) {
    return <BaseRating rating={rating} className="bg-blue-600" />;
  }
};

export const Season = async ({
  seasonNumber,
  imdbId,
}: {
  imdbId: string;
  seasonNumber: number;
}) => {
  cacheLife("hours");

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
        <Rating key={episode.imdbID} rating={episode.imdbRating} />
      ))}
    </div>
  );
};
