import { database } from '@/database/data';
import 'server-only';
import { getUserInfo } from './get-user-info';

export async function checkUserIsRated(movieId: string) {
  const user = await getUserInfo();
  if (!user) {
    return false;
  }
  const movie = await database.movies.get(movieId);

  if (!movie) {
    return false;
  }

  return movie.ratings?.includes(`${user.id}-${movieId}`);
}
