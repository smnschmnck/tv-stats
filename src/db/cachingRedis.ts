import { RATINGS_REDIS_URL } from "astro:env/server";
import Redis from "ioredis";

const redis = new Redis(RATINGS_REDIS_URL);

export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const cached = async <T>({
  cacheKey,
  queryFn,
  ttl = 3 * DAY,
}: {
  cacheKey: string;
  queryFn: () => Promise<T>;
  ttl?: number;
}) => {
  const cachedVal = await redis.get(cacheKey);
  if (cachedVal) {
    try {
      return JSON.parse(cachedVal) as unknown as T;
    } catch (e) {
      console.error(e);
    }
  }

  const res = await queryFn();

  await redis.set(cacheKey, JSON.stringify(res), "EX", ttl);

  return res;
};
