import Drawer from '@corvu/drawer';
import { createMemo } from 'solid-js';
import { getLocaleLink } from "../../../../i18n/utils";
import { selectedEpisode, setSelectedEpisode } from "../store";

export const EpisodeInfoDrawer = ({ locale }: { locale: string }) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedEpisode(null);
    }
  };

  const ep = createMemo(() => selectedEpisode());
  
  const infoLink = createMemo(() => {
    const episode = ep();
    if (!episode) return '';
    
    return getLocaleLink(
      locale,
      `/iFrame/episodeInfo/${episode.tvShowId}?season=${episode.seasonNumber}&episode=${episode.episodeNumber}&rating=${episode.rating}&tconst=${episode.tconst}`,
    );
  });

  return (
    <Drawer open={!!ep()} onOpenChange={handleOpenChange}>
      {(props) => (
        <Drawer.Portal>
          <Drawer.Overlay 
            class="fixed inset-0 z-10 data-transitioning:transition-colors data-transitioning:duration-500 data-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)]"
            style={{
              'background-color': `rgb(0 0 0 / ${0.4 * props.openPercentage})`
            }}
          />
          <Drawer.Content class="fixed right-0 bottom-0 left-0 z-20 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none data-transitioning:transition-transform data-transitioning:duration-500 data-transitioning:ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-zinc-800">
            <div class="flex-1 rounded-t-[10px] bg-white p-4 dark:bg-zinc-900">
              <div
                aria-hidden
                class="mx-auto mb-8 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 dark:bg-zinc-600"
              />
              <iframe src={infoLink()} class="h-[50vh] w-full" />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      )}
    </Drawer>
  );
};