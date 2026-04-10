import { createClient, RedisClientType } from "redis";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL not set");
}

let client: RedisClientType | null = null;
let connectPromise: Promise<RedisClientType> | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!client) {
    client = createClient({ url: REDIS_URL });
    client.on("error", (err) => console.error("Redis client error:", err));
  }

  if (!client.isOpen) {
    if (!connectPromise) {
      connectPromise = client.connect().then(() => client as RedisClientType);
      connectPromise.finally(() => {
        connectPromise = null;
      });
    }
    await connectPromise;
  }

  return client;
}