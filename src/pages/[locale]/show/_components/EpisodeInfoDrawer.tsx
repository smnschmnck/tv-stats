import { useEffect, useState } from "react";
import { selectedEpisode } from "../store";

export const MyBla = () => {
  const [ep, setEp] = useState(selectedEpisode.get());

  useEffect(() => {
    selectedEpisode.subscribe((v) => setEp(v));
  }, []);

  return <p className="h-8 min-w-64 bg-red-500">{JSON.stringify(ep)}</p>;
};
