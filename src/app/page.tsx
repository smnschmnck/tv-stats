import { Clapperboard, Search } from "lucide-react";
import Link from "next/link";

export const experimental_ppr = true;

export default function Home() {
  return (
    <div>
      <header className="h-24 px-12 flex items-center gap-2">
        <Clapperboard />
        <Link className="font-bold" href="/">
          TV Stats
        </Link>
      </header>
      <main className="w-full h-full flex items-center justify-center gap-6 flex-col pt-8">
        <div className="flex flex-col gap-8">
          <div className="text-center flex flex-col gap-2">
            <h1 className="font-bold text-5xl">
              Never Waste a Night on a Bad Show Again
            </h1>
            <p className="font-medium text-zinc-500">
              Check IMDb ratings at a glance and find the series worth your
              time.
            </p>
          </div>
          <div className="w-full px-20">
            <div className="flex items-center justify-between px-3 h-16 bg-zinc-100 border border-zinc-200 rounded-full w-full focus-within:ring ring-blue-500">
              <div className="flex items-center w-full px-4 gap-2 h-full">
                <div className="text-zinc-500">
                  <Search size={20} />
                </div>
                <input
                  className="w-full h-full placeholder:font-medium placeholder:text-zinc-500 outline-none"
                  placeholder="Breaking Bad"
                />
              </div>
              <button className="bg-black text-white font-medium rounded-full h-11 px-8">
                Search
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
