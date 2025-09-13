import { twMerge } from "tailwind-merge";

const BaseRating = ({
  rating,
  className,
}: {
  rating: number;
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

const Rating = ({ rating }: { rating: number }) => {
  if (rating >= 9) {
    return <BaseRating rating={rating} className="bg-green-700" />;
  }
  if (rating >= 8) {
    return <BaseRating rating={rating} className="bg-green-400" />;
  }
  if (rating >= 7) {
    return <BaseRating rating={rating} className="bg-yellow-400" />;
  }
  if (rating >= 6) {
    return <BaseRating rating={rating} className="bg-red-400" />;
  }
  if (rating >= 5) {
    return <BaseRating rating={rating} className="bg-red-600" />;
  }
  if (rating >= 4) {
    return <BaseRating rating={rating} className="bg-pink-600" />;
  }
  if (rating >= 3) {
    return <BaseRating rating={rating} className="bg-fuchsia-600" />;
  }
  if (rating >= 2) {
    return <BaseRating rating={rating} className="bg-violet-500" />;
  }
  if (rating >= 1) {
    return <BaseRating rating={rating} className="bg-blue-500" />;
  }
  if (rating >= 0) {
    return <BaseRating rating={rating} className="bg-blue-600" />;
  }
};

type Episode = {
  tconst: string;
  episode: number | null;
  rating: number;
};

export const Season = async ({
  seasonNumber,
  episodes,
}: {
  seasonNumber: number;
  episodes: Episode[];
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h6 className="font-bold">{seasonNumber}</h6>
      {episodes.map((episode) => (
        <Rating key={episode.tconst} rating={episode.rating} />
      ))}
    </div>
  );
};
