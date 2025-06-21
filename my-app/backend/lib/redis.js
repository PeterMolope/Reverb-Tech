import Redis from "ioredis";
import dotenv from "dotenv";

// Redis is a type of key-value store
dotenv.config();

export const redis = new Redis(process.env.REDIS_URL);
