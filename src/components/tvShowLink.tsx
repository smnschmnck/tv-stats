import { TvShow } from "@/types/tmdbApi/tvShow";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

export const TvShowLink = ({ show }: { show: TvShow }) => {
  return (
    <Link
      href={`/show/${show.id}`}
      key={show.id}
      className="group flex flex-col gap-1 items-start h-76 overflow-hidden"
    >
      {!!show.poster_path && (
        <img
          className="w-32 rounded-xl transition group-hover:opacity-60"
          src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
          alt={`${show.name} poster`}
        />
      )}
      {!show.poster_path && (
        <div className="flex justify-center items-center w-32 aspect-2/3 rounded-xl bg-zinc-700 text-zinc-500 group-hover:bg-zinc-600 transition">
          <Clapperboard />
        </div>
      )}
      <p className="w-32 text-center font-medium line-clamp-3">{show.name}</p>
    </Link>
  );
};
