"use client";

import { searchAction } from "@/app/[locale]/actions";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export const SearchBarSmall = () => {
  const t = useTranslations("components.searchBarSmall");
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  return (
    <form
      action={searchAction}
      className="flex h-11 w-full items-center justify-between rounded-full border border-zinc-200 bg-white px-1.5 ring-blue-500 focus-within:ring-2"
    >
      <div className="flex h-full w-full items-center gap-2 px-3">
        <input
          name="q"
          autoComplete="off"
          className="h-full w-full font-medium outline-none placeholder:text-zinc-500"
          placeholder={t("placeholder")}
          defaultValue={query ?? ""}
        />
      </div>
      <button
        type="submit"
        className="flex max-h-8 min-h-8 max-w-8 min-w-8 items-center justify-center rounded-full bg-black font-medium text-white transition hover:bg-zinc-700"
      >
        <Search size={16} strokeWidth={2} />
      </button>
    </form>
  );
};
