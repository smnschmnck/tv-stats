"use client";

import { searchAction } from "@/app/actions";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const SearchBarSmall = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  return (
    <form
      action={searchAction}
      className="flex items-center justify-between px-1.5 h-11 border bg-white border-zinc-200 rounded-full w-full focus-within:ring-2 ring-blue-500"
    >
      <div className="flex items-center w-full px-3 gap-2 h-full">
        <input
          name="q"
          autoComplete="off"
          className="w-full h-full font-medium placeholder:text-zinc-500 outline-none"
          placeholder="Search"
          defaultValue={query ?? ""}
        />
      </div>
      <button
        type="submit"
        className="bg-black flex justify-center items-center text-white font-medium rounded-full min-h-8 min-w-8 max-h-8 max-w-8 hover:bg-zinc-700 transition"
      >
        <Search size={16} strokeWidth={2} />
      </button>
    </form>
  );
};
