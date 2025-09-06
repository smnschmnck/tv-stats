import { PopularTvShowListResponse } from "@/types/tmdbApi/popular";
import { Clapperboard, Search } from "lucide-react";
import Link from "next/link";

export const experimental_ppr = true;

const Hero = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-bold text-4xl">
          Never Waste a Night on a Bad Show Again
        </h1>
        <p className="font-medium text-zinc-500">
          Check IMDb ratings at a glance and find the series worth your time.
        </p>
      </div>
      <div className="w-full px-20">
        <form className="flex items-center justify-between px-3 h-16 bg-zinc-100 border border-zinc-200 rounded-full w-full focus-within:ring ring-blue-500">
          <div className="flex items-center w-full px-4 gap-2 h-full">
            <div className="text-zinc-500">
              <Search size={20} />
            </div>
            <input
              className="w-full h-full font-medium placeholder:text-zinc-500 outline-none"
              placeholder="Breaking Bad"
            />
          </div>
          <button className="bg-black text-white font-medium rounded-full h-11 px-8">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="min-h-24 w-full px-12 flex items-center gap-2">
      <Clapperboard />
      <Link className="font-bold" href="/">
        TV Stats
      </Link>
    </header>
  );
};

const PopularShows = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzUzODNhYjQ0NGI5Zjc2NjBkMjE5ZTY3NDMzZTQ0ZSIsIm5iZiI6MTc1NzE3NDI2Ny4wMzUsInN1YiI6IjY4YmM1OWZhNDUzZjI4OThhNjFiYzNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Z_j5TEwQO936r193z_trWfJT7y4TIZJDVcvzzYTVl9Y",
      },
    }
  );

  if (!res.ok) {
    return <p>something went wrong</p>;
  }

  const shows = (await res.json()) as PopularTvShowListResponse;

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center bg-zinc-50 w-full px-20">
      {shows.results.map((show) => (
        <div
          key={show.id}
          className="flex flex-col gap-1 items-start h-70 overflow-hidden"
        >
          <img
            className="w-32 rounded-xl"
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={`${show.name} poster`}
          />
          <p className="w-32 text-center font-medium line-clamp-3">
            {show.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <main className="w-full h-full flex items-center gap-16 flex-col pt-4">
        <Hero />
        <div className="w-full h-full bg-zinc-50 flex items-center p-10 flex-col gap-8">
          <h2 className="font-bold text-xl">Popular TV Shows</h2>
          <PopularShows />
        </div>
      </main>
    </div>
  );
}
