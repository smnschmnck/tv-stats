import { CACHING_REDIS_URL } from "astro:env/server";
import Redis from "ioredis";

const redis = new Redis(CACHING_REDIS_URL);

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
  try {
    const cachedVal = await redis.get(cacheKey);
    if (cachedVal !== null) {
      try {
        return JSON.parse(cachedVal) as T;
      } catch (error) {
        console.error(`Invalid cached value for ${cacheKey}`, error);
        await redis.del(cacheKey);
      }
    }
  } catch (error) {
    console.error(`Failed to read cache key ${cacheKey}`, error);
  }

  const res = await queryFn();

  let serialized: string | undefined;
  try {
    serialized = JSON.stringify(res);
  } catch (error) {
    console.error(`Failed to serialize cache value for ${cacheKey}`, error);
    return res;
  }

  if (serialized === undefined) {
    return res;
  }

  try {
    await redis.set(cacheKey, serialized, "EX", ttl);
  } catch (error) {
    console.error(`Failed to write cache key ${cacheKey}`, error);
  }

  return res;
};
