import { atom } from "nanostores";

export type SelectedEpisode = {
  tvShowId: string;
  rating: number | null | undefined;
  seasonNumber: number;
  episodeNumber: number;
  tconst: string;
};

export const selectedEpisode = atom<SelectedEpisode | null>(null);
