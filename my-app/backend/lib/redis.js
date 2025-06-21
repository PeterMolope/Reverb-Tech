import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
// Redis is a type of key-value store

export const redis = new Redis(process.env.REDIS_URL);
//await client.connect()
await redis.set("foo", "bar");
