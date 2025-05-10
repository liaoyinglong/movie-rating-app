import { Redis } from 'ioredis';
import type { Movie, Rating, User } from './types';

const redis = new Redis(process.env.REDIS_URL as string);

export const database = {
  users: createMockDB<User>('users'),
  movies: createMockDB<Movie>('movies'),
  ratings: createMockDB<Rating>('ratings'),
};

function createMockDB<T>(name: 'users' | 'movies' | 'ratings') {
  return {
    async get(id: string) {
      const data = await redis.get(`${name}:${id}`);
      return safeParse<T>(data);
    },
    set(id: string, data: T) {
      return redis.set(`${name}:${id}`, JSON.stringify(data));
    },
    async getAll() {
      const keys = await redis.keys(`${name}:*`);
      const data = await redis.mget(keys);
      return data.map((v) => safeParse(v)).filter(Boolean) as T[];
    },
  };
}

function safeParse<T>(data: unknown): T | null {
  try {
    return JSON.parse(data as string);
  } catch {
    return null;
  }
}
