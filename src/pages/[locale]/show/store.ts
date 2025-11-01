import { atom } from "nanostores";

export type SelectedEpisode = {
  tvShowId: string;
  seasonNumber: number;
  episodeNumber: number;
};

export const selectedEpisode = atom<SelectedEpisode | null>(null);
