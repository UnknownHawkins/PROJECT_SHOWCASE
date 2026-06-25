import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

export function getRedis() {
  if (redis) {
    return redis;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

export async function cached<T>(key: string, ttlSeconds: number, loader: () => Promise<T>) {
  const client = getRedis();

  if (!client) {
    return loader();
  }

  const hit = await client.get<T>(key);

  if (hit) {
    return hit;
  }

  const value = await loader();
  await client.set(key, value, { ex: ttlSeconds });
  return value;
}
