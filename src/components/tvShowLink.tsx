import { TvShow } from "@/types/tmdbApi/tvShow";
import { Clapperboard } from "lucide-react";

export const TvShowLink = ({ show }: { show: TvShow }) => {
  return (
    <a
      href="https://imdb.com"
      key={show.id}
      className="flex flex-col gap-1 items-start h-76 overflow-hidden px-8 py-5 rounded-2xl hover:bg-zinc-200 transition"
    >
      {!!show.poster_path && (
        <img
          className="w-32 rounded-xl"
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt={`${show.name} poster`}
        />
      )}
      {!show.poster_path && (
        <div className="flex justify-center items-center w-32 aspect-2/3 rounded-xl bg-zinc-700 text-zinc-500">
          <Clapperboard />
        </div>
      )}
      <p className="w-32 text-center font-medium line-clamp-3">{show.name}</p>
    </a>
  );
};
