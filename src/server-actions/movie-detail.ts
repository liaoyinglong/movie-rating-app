'use server';
import { database } from '@/database/data';
import 'server-only';
export async function getMovieDetail(id: string) {
  const movie = await database.movies.get(id);
  return movie;
}
