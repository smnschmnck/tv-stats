import { TvShow } from "@/types/tmdbApi/tvShow";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const TvShowLink = ({ show }: { show: TvShow }) => {
  return (
    <div className="h-76 overflow-hidden">
      <Link
        href={`/show/${show.id}`}
        key={show.id}
        className="group flex h-fit flex-col items-center gap-2"
      >
        {!!show.poster_path && (
          <img
            className="w-32 rounded-xl transition group-hover:opacity-60"
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={`${show.name} poster`}
          />
        )}
        {!show.poster_path && (
          <div className="flex aspect-2/3 w-32 items-center justify-center rounded-xl bg-zinc-700 text-zinc-500 transition group-hover:bg-zinc-600">
            <Clapperboard />
          </div>
        )}
        <p className="line-clamp-3 w-32 text-center font-medium">{show.name}</p>
      </Link>
    </div>
  );
};
