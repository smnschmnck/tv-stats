import { createSignal } from "solid-js";

export type SelectedEpisode = {
  tvShowId: string;
  rating: number | null | undefined;
  seasonNumber: number;
  episodeNumber: number;
  tconst: string;
};

export const [selectedEpisode, setSelectedEpisode] =
  createSignal<SelectedEpisode | null>(null);
