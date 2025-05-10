import { database } from '@/database/data';
import { basePageSearchSchema } from '@/utils/base-page-search-schema';
import { successResponse } from '@/utils/response';
import 'server-only';
import z from 'zod';

export const pageSearchMovieCommentsSchema = basePageSearchSchema.extend({
  id: z.string(),
});

export async function pageSearchMovieComments(
  params: z.infer<typeof pageSearchMovieCommentsSchema>,
) {
  const result = pageSearchMovieCommentsSchema.safeParse(params);
  const emptyResponse = successResponse({
    ratings: [],
    total: 0,
    pageSize: 10,
    pageIndex: 1,
  });
  if (!result.success) {
    return emptyResponse;
  }
  const { id, pageSize, pageIndex } = result.data;
  const movie = await database.movies.get(id);
  if (!movie) {
    return emptyResponse;
  }
  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;
  const ratingIds = movie.ratings?.slice(start, end) ?? [];

  const ratings = await Promise.all(
    ratingIds.map(async (id) => {
      const rating = await database.ratings.get(id);
      const userId = rating!.userId;
      const user = await database.users.get(userId);
      return {
        ...rating!,
        username: user!.username,
      };
    }),
  );
  return successResponse({
    ratings,
    total: movie.ratings?.length ?? 0,
    pageSize,
    pageIndex,
  });
}
