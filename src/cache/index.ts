import { Redis } from "@upstash/redis";

// constants
export const COMMIT_SHA = process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown";
export const REDIS_PREFIX = `website:${COMMIT_SHA.slice(0, 7)}:`;

// initialize redis
export const redis = Redis.fromEnv();

export type CacheOptions<T extends unknown[]> = {
  // unique identifier for the cache entry 
  cacheKey: string | ((...params: T) => string | false);
  // interval between revalidations
  staleTime: number;
  // number before even the stale data will expire
  expireTime: number;
}

// helper function that can wrap functions to cache them
export function cache<T extends unknown[], R>(
  func: (...params: T) => Promise<R>,
  cacheOpts: CacheOptions<T>
) {
  return async (...params: T): Promise<R> => {
    // constants
    const cacheKey = typeof cacheOpts.cacheKey === "function" ? cacheOpts.cacheKey(...params) : cacheOpts.cacheKey;
    if (cacheKey === false) return await func(...params);

    const REDIS_KEY_DATA_REFRESHED = `${REDIS_PREFIX}${cacheKey}:refreshed`;
    const REDIS_KEY_DATA = `${REDIS_PREFIX}${cacheKey}:data`;

    // if the refreshed key has expired, it is time to revalidate the data
    const needsRevalidation = !(await redis.get(REDIS_KEY_DATA_REFRESHED));
    // grab the old data
    const cachedData = await redis.get(REDIS_KEY_DATA) as R | undefined;

    if (needsRevalidation || !cachedData) {
      // if there is no data, fetch it.
      const data = cachedData ?? await func(...params);

      // do this stuff asynconously
      void (async () => {
        // refetch the data if we didn't do it already
        const newData = cachedData
          ? await func(...params)
          : data;

        // readd the data in the cache
        void redis.set(REDIS_KEY_DATA, JSON.stringify(newData), {
          ex: cacheOpts.expireTime
        });

        // set the refresh time
        void redis.set(REDIS_KEY_DATA_REFRESHED, true, {
          ex: cacheOpts.staleTime
        });
      })();

      // return the data
      return data;
    }

    // otherwise return the cached data
    return cachedData;
  }
}