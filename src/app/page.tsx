import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { PopularShows } from "./components/PopularShows";

export const experimental_ppr = true;

async function searchAction(formData: FormData) {
  "use server";

  const query = formData.get("q") as string;
  if (query?.trim()) {
    redirect(`/search?q=${encodeURIComponent(query.trim())}`);
  }
}

const Hero = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-bold text-4xl">
          Spend Every Night on a Great Show
        </h1>
        <p className="font-medium text-zinc-500">
          Check IMDb ratings at a glance and find the series worth your time.
        </p>
      </div>
      <div className="w-full px-8">
        <form
          action={searchAction}
          className="flex items-center justify-between px-3 h-16 bg-zinc-100 border border-zinc-200 rounded-full w-full focus-within:ring-2 ring-blue-500"
        >
          <div className="flex items-center w-full px-4 gap-2 h-full">
            <div className="text-zinc-500">
              <Search size={20} />
            </div>
            <input
              name="q"
              autoComplete="off"
              className="w-full h-full font-medium placeholder:text-zinc-500 outline-none"
              placeholder="Breaking Bad"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white font-medium rounded-full h-11 px-8"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <main className="w-full h-full flex items-center gap-16 flex-col pt-4">
      <Hero />
      <div className="w-full h-full bg-zinc-50 flex items-center py-10 flex-col gap-8 border-t border-t-zinc-100">
        <h2 className="font-bold text-xl">Popular TV Shows</h2>
        <Suspense fallback={<p>Loading...</p>}>
          <PopularShows />
        </Suspense>
      </div>
    </main>
  );
};

export default Page;
