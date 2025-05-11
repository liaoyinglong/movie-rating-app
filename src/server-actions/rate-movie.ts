'use server';
import { database } from '@/database/data';
import { getServerI18n } from '@/i18n/server';
import { errorResponse, ResponseCode, successResponse } from '@/utils/response';
import { revalidatePath } from 'next/cache';
import 'server-only';
import z from 'zod';
import { getUserInfo } from './get-user-info';

const t = (v: string) => v;
const rateMovieSchema = z.object({
  movieId: z.string({
    error: t('actions:rate-movie.movie-id-empty'),
  }),
  score: z
    .number({
      error: t('actions:rate-movie.score-empty'),
    })
    .min(1, {
      error: t('actions:rate-movie.score-min'),
    })
    .max(5, {
      error: t('actions:rate-movie.score-max'),
    }),
  comment: z
    .string({
      error: t('actions:rate-movie.comment-empty'),
    })
    .min(1, {
      error: t('actions:rate-movie.comment-min'),
    })
    .max(100, {
      error: t('actions:rate-movie.comment-max'),
    }),
});

export async function rateMovie(params: z.infer<typeof rateMovieSchema>) {
  const user = await getUserInfo();
  const { t } = await getServerI18n('actions');

  if (!user) {
    return errorResponse(
      t('actions:rate-movie.please-login-again'),
      ResponseCode.Unauthorized,
    );
  }

  const result = rateMovieSchema.safeParse(params);
  if (!result.success) {
    return errorResponse(t(result.error.issues[0].message));
  }

  const { movieId, score, comment } = result.data;

  const movie = await database.movies.get(movieId);
  if (!movie) {
    return errorResponse(t('actions:rate-movie.movie-not-found'));
  }

  const ratingId = `${user.id}-${movie.id}`;

  const existRating = await database.ratings.get(ratingId);

  if (existRating) {
    revalidatePath(`/movie/${movieId}`);
    return errorResponse(t('actions:rate-movie.already-rated'));
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
  return successResponse(t('actions:rate-movie.success'));
}
