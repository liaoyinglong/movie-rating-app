import { database } from '@/database/data';
import { basePageSearchSchema } from '@/utils/base-page-search-schema';
import { successResponse } from '@/utils/response';
import z from 'zod';

export const pageSearchMoviesSchema = basePageSearchSchema.extend({
  q: z.string().catch('').default(''),
  pageSize: z.number().min(1).catch(12).default(12),
});

export async function pageSearchMovies(
  params: z.infer<typeof pageSearchMoviesSchema>,
) {
  const { pageIndex, q, pageSize } = pageSearchMoviesSchema.parse(params);

  const start = (pageIndex - 1) * pageSize;
  const end = start + pageSize;

  const movies = await database.movies.getAll();

  const filteredMovies = (() => {
    let r = movies;
    if (q) {
      r = r.filter((movie) => movie.title.includes(q));
    }
    return r;
  })();

  const pageMovies = filteredMovies.slice(start, end);
  const total = filteredMovies.length;

  return successResponse({
    movies: pageMovies,
    total,
    pageSize,
    pageIndex,
  });
}
