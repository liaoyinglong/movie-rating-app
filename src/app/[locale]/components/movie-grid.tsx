import { Pagination } from '@/components/pagination';
import { getServerI18n } from '@/i18n/server';
import {
  pageSearchMovies,
  type pageSearchMoviesSchema,
} from '@/server-actions/page-search-movies';
import { EmptyState, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { LuSearch } from 'react-icons/lu';
import type z from 'zod';
import MoviePoster from '../assets/movie-poster.png';
export async function MovieGrid(props: z.infer<typeof pageSearchMoviesSchema>) {
  const { data } = await pageSearchMovies(props);
  const { movies, total, pageSize, pageIndex } = data;

  const { t } = await getServerI18n('home');

  return (
    <>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-testid="movie-grid"
      >
        {movies.length ? (
          movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group flex flex-col overflow-hidden rounded-xl shadow transition-shadow duration-200 hover:shadow-xl dark:bg-gray-800"
            >
              <div className="overflow-hidden">
                <ViewTransition name={`movie-${movie.id}`} update={'none'}>
                  <Image
                    src={MoviePoster}
                    alt={movie.title}
                    className="h-64 w-full object-cover transition-all duration-200 group-hover:scale-105"
                  />
                </ViewTransition>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {movie.title}
                </h2>
                <div className="mb-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>{t('home:average-rating')}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {movie.averageRating ?? 0}
                  </span>
                  <span className="mx-1 text-gray-400 dark:text-gray-500">
                    /
                  </span>
                  <span>{t('home:rating-count')}</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    {movie.ratingCount ?? 0}
                  </span>
                </div>
                <p className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                  {movie.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <EmptyState.Root
            className={'col-span-full'}
            data-testid="empty-state"
          >
            <EmptyState.Content>
              <EmptyState.Indicator>
                <LuSearch />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>{t('home:no-movies-found')}</EmptyState.Title>
                <EmptyState.Description>
                  {t('home:try-again')}
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        )}
      </div>

      {!!total && (
        <Pagination total={total} pageSize={pageSize} page={pageIndex} />
      )}
    </>
  );
}
