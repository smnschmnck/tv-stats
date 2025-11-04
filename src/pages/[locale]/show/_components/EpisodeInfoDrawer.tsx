import { useEffect, useState } from "react";
import { selectedEpisode } from "../store";
import { Drawer } from "vaul";
import { getLocaleLink } from "../../../../i18n/utils";

export const EpisodeInfoDrawer = ({ locale }: { locale: string }) => {
  const [ep, setEp] = useState(selectedEpisode.get());

  useEffect(() => {
    selectedEpisode.subscribe((v) => setEp(v));
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      selectedEpisode.set(null);
    }
  };

  const infoLink = getLocaleLink(
    locale,
    `/iFrame/episodeInfo/${ep?.tvShowId}?season=${ep?.seasonNumber}&episode=${ep?.episodeNumber}&rating=${ep?.rating}&tconst=${ep?.tconst}`,
  );

  return (
    <Drawer.Root open={!!ep} onOpenChange={handleOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-20 mt-24 flex h-fit flex-col rounded-t-[10px] bg-gray-100 outline-none">
          <div className="flex-1 rounded-t-[10px] bg-white p-4">
            <div
              aria-hidden
              className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300"
            />
            <iframe src={infoLink} className="h-[50vh] w-full" />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
