import { useEffect, useState } from "react";
import { selectedEpisode } from "../store";
import { Drawer } from "vaul";

export const EpisodeInfoDrawer = () => {
  const [ep, setEp] = useState(selectedEpisode.get());

  useEffect(() => {
    selectedEpisode.subscribe((v) => setEp(v));
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      selectedEpisode.set(null);
    }
  };

  return (
    <Drawer.Root open={!!ep} onOpenChange={handleOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-10 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-20 h-fit bg-gray-100 outline-none">
          <div className="bg-white p-4">{JSON.stringify(ep, null, 2)}</div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
