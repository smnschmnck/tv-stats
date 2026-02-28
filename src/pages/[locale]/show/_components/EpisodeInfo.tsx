import { createSignal, onCleanup, onMount, Show } from "solid-js";
import { EpisodeInfoDialog } from "./EpisodeInfoDialog";
import { EpisodeInfoDrawer } from "./EpisodeInfoDrawer";

export const EpisodeInfo = ({ locale }: { locale: string }) => {
  const [isDesktop, setIsDesktop] = createSignal(false);

  onMount(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    onCleanup(() => mq.removeEventListener("change", handler));
  });

  return (
    <Show when={isDesktop()} fallback={<EpisodeInfoDrawer locale={locale} />}>
      <EpisodeInfoDialog locale={locale} />
    </Show>
  );
};
