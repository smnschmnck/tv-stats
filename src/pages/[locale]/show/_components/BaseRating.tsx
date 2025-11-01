import { twMerge } from "tailwind-merge";
import { selectedEpisode } from "../store";

export const BaseRating = ({
  rating,
  tvShowId,
  seasonNumber,
  episodeNumber,
  className,
}: {
  rating: number | undefined;
  tvShowId: string | undefined;
  seasonNumber: number;
  episodeNumber: number | null;
  className?: string;
}) => {
  return (
    <button
      onClick={() => {
        if (tvShowId && episodeNumber) {
          selectedEpisode.set({ seasonNumber, episodeNumber, tvShowId });
        }
      }}
      className={twMerge(
        "flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 font-medium text-white",
        className,
      )}
    >
      <span>{rating ?? "-"}</span>
    </button>
  );
};
