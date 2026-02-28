import { Dialog } from "@kobalte/core/dialog";
import { X } from "lucide-solid";
import { createMemo } from "solid-js";
import { getLocaleLink } from "../../../../i18n/utils";
import { selectedEpisode, setSelectedEpisode } from "../store";

export const EpisodeInfoDialog = ({ locale }: { locale: string }) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedEpisode(null);
    }
  };

  const ep = createMemo(() => selectedEpisode());

  const infoLink = createMemo(() => {
    const episode = ep();
    if (!episode) return "";

    return getLocaleLink(
      locale,
      `/iFrame/episodeInfo/${episode.tvShowId}?season=${episode.seasonNumber}&episode=${episode.episodeNumber}&rating=${episode.rating}&tconst=${episode.tconst}`,
    );
  });

  return (
    <Dialog open={!!ep()} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay class="fixed inset-0 z-10 bg-black/40 max-md:hidden" />
        <Dialog.Content class="fixed top-1/2 left-1/2 z-20 flex w-175 max-w-[90vw] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-xl bg-white p-4 shadow-xl outline-none max-md:hidden dark:bg-zinc-900">
          <div class="flex justify-end">
            <Dialog.CloseButton class="rounded-md p-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100">
              <X size={18} />
            </Dialog.CloseButton>
          </div>
          <iframe src={infoLink()} class="h-[40vh] w-full" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
