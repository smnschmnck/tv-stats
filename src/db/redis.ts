import { REDIS_URL } from "astro:env/server";
import Redis from "ioredis";
import { Packr } from "msgpackr";

const packr = new Packr();

const redis = new Redis(REDIS_URL);

type EpisodeSmallFormat = {
  t: string;
  s: number | null;
  e: number | null;
  ar: number | null;
  nv: number | null;
};

type ShowSmallFormat = {
  ar: number | null;
  nv: number | null;
  eps: EpisodeSmallFormat[];
};

const normalizeEpisode = (ep: EpisodeSmallFormat) => {
  return {
    tconst: ep.t,
    averageRating: ep.ar ? ep.ar / 10 : null,
    numVotes: ep.nv,
    seasonNumber: ep.s,
    episodeNumber: ep.e,
  };
};

const normalizeShow = (show: ShowSmallFormat) => {
  return {
    averageRating: show.ar ? show.ar / 10 : null,
    numVotes: show.nv,
    episodes: show.eps.map(normalizeEpisode),
  };
};

export const getRatings = async (tconst: string | undefined) => {
  if (!tconst) {
    return;
  }

  const res = await redis.getBuffer(tconst);
  if (!res) {
    return;
  }

  const show = packr.unpack(res) as ShowSmallFormat;

  const normalized = normalizeShow(show);

  return normalized;
};
