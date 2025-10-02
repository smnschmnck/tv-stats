export type TvShowListResponse = {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
};

export type TvShow = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

export type ExternalIds = {
  id: number;
  imdb_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
};
