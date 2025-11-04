type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

type CountryStreamingInfo = {
  link: string;
  flatrate?: Provider[];
  buy?: Provider[];
  rent?: Provider[];
};

export type WatchProvidersResponse = {
  id: number;
  results: Record<string, CountryStreamingInfo>;
};
