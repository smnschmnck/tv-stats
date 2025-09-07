import { Search } from "lucide-react";
import { redirect } from "next/navigation";

async function searchAction(formData: FormData) {
  "use server";

  const query = formData.get("q") as string;
  if (query?.trim()) {
    redirect(`/search?q=${encodeURIComponent(query.trim())}`);
  }
}

export const SearchBar = ({ defaultValue }: { defaultValue?: string }) => {
  return (
    <form
      action={searchAction}
      className="flex items-center justify-between px-3 h-16 bg-zinc-100 border border-zinc-200 rounded-full w-full focus-within:ring-2 ring-blue-500 hover:shadow-lg shadow-zinc-100 transition"
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
          defaultValue={defaultValue}
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white font-medium rounded-full h-11 px-8 hover:bg-zinc-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export const SearchBarSmall = () => {
  return (
    <form
      action={searchAction}
      className="flex items-center justify-between px-2 h-11 border bg-white border-zinc-200 rounded-full w-full focus-within:ring-2 ring-blue-500"
    >
      <div className="flex items-center w-full px-2 gap-2 h-full">
        <input
          name="q"
          autoComplete="off"
          className="w-full h-full font-medium placeholder:text-zinc-500 outline-none"
          placeholder="Search"
        />
      </div>
      <button
        type="submit"
        className="bg-black flex justify-center items-center text-white font-medium rounded-full min-h-8 min-w-8 max-h-8 max-w-8 hover:bg-zinc-700 transition"
      >
        <Search size={16} />
      </button>
    </form>
  );
};
