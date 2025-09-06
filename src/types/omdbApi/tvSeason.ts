export type Episode = {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
};

export type SeasonData = {
  Title: string;
  Season: string;
  totalSeasons: string;
  Episodes: Episode[];
  Response: "True" | "False";
};
