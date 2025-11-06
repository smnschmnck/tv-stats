import { twMerge } from "tailwind-merge";
import { selectedEpisode } from "../store";

export const BaseRating = ({
  rating,
  tvShowId,
  tconst,
  seasonNumber,
  episodeNumber,
  className,
}: {
  rating: number | undefined;
  tvShowId: string | undefined;
  tconst?: string;
  seasonNumber?: number | null;
  episodeNumber?: number | null;
  className?: string;
}) => {
  const hasFullInfo =
    tvShowId && episodeNumber && seasonNumber && rating && tconst;

  return (
    <button
      onClick={() => {
        if (hasFullInfo) {
          selectedEpisode.set({
            seasonNumber,
            episodeNumber,
            tvShowId,
            tconst,
            rating,
          });
        }
      }}
      className={twMerge(
        "flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-md bg-zinc-100 font-medium text-white",
        hasFullInfo ? "transition hover:cursor-pointer hover:opacity-60" : "",
        className,
      )}
    >
      <span>{rating ?? "-"}</span>
    </button>
  );
};
