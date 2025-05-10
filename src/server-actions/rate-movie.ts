'use server';
import { database } from '@/database/data';
import { errorResponse, ResponseCode, successResponse } from '@/utils/response';
import { revalidatePath } from 'next/cache';
import 'server-only';
import z from 'zod';
import { getUserInfo } from './get-user-info';

const rateMovieSchema = z.object({
  movieId: z.string({
    error: '电影ID不能为空',
  }),
  score: z
    .number({
      error: '评分不能为空',
    })
    .min(1, {
      error: '评分不能小于1',
    })
    .max(5, {
      error: '评分不能大于5',
    }),
  comment: z
    .string({
      error: '评论不能为空',
    })
    .min(1, {
      error: '评论不能少于1个字符',
    })
    .max(100, {
      error: '评论不能超过100个字符',
    }),
});

export async function rateMovie(params: z.infer<typeof rateMovieSchema>) {
  const user = await getUserInfo();
  if (!user) {
    return errorResponse('请登录后再试', ResponseCode.Unauthorized);
  }

  const result = rateMovieSchema.safeParse(params);
  if (!result.success) {
    return errorResponse(result.error);
  }

  const { movieId, score, comment } = result.data;

  const movie = await database.movies.get(movieId);
  if (!movie) {
    return errorResponse('电影不存在');
  }

  const ratingId = `${user.id}-${movie.id}`;

  const existRating = await database.ratings.get(ratingId);

  if (existRating) {
    revalidatePath(`/movie/${movieId}`);
    return errorResponse('您已经评价过这部电影');
  }

  // update db
  await database.ratings.set(ratingId, {
    id: ratingId,
    userId: user.id,
    movieId: movie.id,
    score,
    comment,
    timestamp: Date.now(),
  });

  movie.ratings.unshift(ratingId);
  movie.totalRating = (movie.totalRating ?? 0) + score;
  movie.ratingCount = (movie.ratingCount ?? 0) + 1;
  movie.averageRating = Math.floor(movie.totalRating / movie.ratingCount);
  await database.movies.set(movieId, movie);
  revalidatePath(`/movie/${movieId}`);
  return successResponse('评价成功');
}
