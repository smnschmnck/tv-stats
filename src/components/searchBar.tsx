import { searchAction } from "@/app/[locale]/actions";
import { Search } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const SearchBar = async ({
  defaultValue,
}: {
  defaultValue?: string;
}) => {
  const t = await getTranslations("components.searchBar");

  return (
    <form
      action={searchAction}
      className="flex h-16 w-full items-center justify-between rounded-full border border-zinc-200 bg-zinc-100 px-3 shadow-zinc-100 ring-blue-500 transition focus-within:ring-2 hover:shadow-lg"
    >
      <div className="flex h-full w-full items-center gap-2 px-4">
        <div className="text-zinc-500">
          <Search size={20} />
        </div>
        <input
          name="q"
          autoComplete="off"
          className="h-full w-full font-medium outline-none placeholder:text-zinc-500"
          placeholder={t("placeholder")}
          defaultValue={defaultValue}
        />
      </div>
      <button
        type="submit"
        className="h-11 rounded-full bg-black px-8 font-medium text-white transition hover:bg-zinc-700"
      >
        {t("button")}
      </button>
    </form>
  );
};
