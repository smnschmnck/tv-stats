import { createSignal, onMount } from "solid-js";
import { Select } from "@kobalte/core/select";
import { Check } from "lucide-solid";
import { supportedLanguages, languageCookieKey } from "../i18n/constants";

const shortLabels = { en: "EN", de: "DE" } as const;
const fullLabels = { en: "English", de: "German" } as const;

export const LanguageSwitcher = () => {
  const [locale, setLocale] = createSignal("en");

  onMount(() => {
    const segment = window.location.pathname.split("/")[1];
    if (supportedLanguages.includes(segment as "en" | "de")) {
      setLocale(segment);
    }
  });

  const switchLanguage = (next: string | null) => {
    if (!next) return;
    document.cookie = `${languageCookieKey}=${next}; path=/; max-age=31536000`;

    const parts = window.location.pathname.split("/");
    parts[1] = next;
    window.location.pathname = parts.join("/");
  };

  return (
    <Select
      value={locale()}
      onChange={switchLanguage}
      options={supportedLanguages}
      itemComponent={(props) => (
        <Select.Item
          item={props.item}
          class="flex cursor-pointer items-center justify-between gap-2 rounded px-3 py-1.5 text-sm text-zinc-700 outline-none hover:bg-zinc-100 data-highlighted:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:data-highlighted:bg-zinc-700"
        >
          <Select.ItemLabel>
            {fullLabels[props.item.rawValue as keyof typeof fullLabels]}
          </Select.ItemLabel>
          <Select.ItemIndicator>
            <Check size={14} stroke-width={2.5} />
          </Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Select.Trigger
        class="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        aria-label="Switch language"
      >
        <Select.Value<string>>
          {(state) =>
            shortLabels[state.selectedOption() as keyof typeof shortLabels]
          }
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="z-50 overflow-hidden rounded-lg border border-zinc-200 bg-white p-1 shadow-md dark:border-zinc-700 dark:bg-zinc-800">
          <Select.Listbox />
        </Select.Content>
      </Select.Portal>
    </Select>
  );
};
