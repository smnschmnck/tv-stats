import { Popover } from "@kobalte/core/popover";
import { Settings } from "lucide-solid";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const SettingsDropdown = () => (
  <Popover placement="bottom-end">
    <Popover.Trigger
      class="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label="Settings"
    >
      <Settings size={20} />
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content class="z-50 rounded-lg border border-zinc-200 bg-white p-1 shadow-md outline-none dark:border-zinc-700 dark:bg-zinc-800">
        <div class="flex items-center justify-between gap-6 px-2 py-0.5">
          <span class="text-sm text-zinc-500 dark:text-zinc-400">Language</span>
          <LanguageSwitcher />
        </div>
        <div class="flex items-center justify-between gap-6 px-2 py-0.5">
          <span class="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
          <ThemeSwitcher />
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover>
);
