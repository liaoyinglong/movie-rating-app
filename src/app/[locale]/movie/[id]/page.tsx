import MoviePoster from '@/app/[locale]/assets/movie-poster.png';
import { Pagination } from '@/components/pagination';
import { getServerI18n } from '@/i18n/server';
import { checkUserIsRated } from '@/server-actions/check-user-is-rated';
import { getMovieDetail } from '@/server-actions/movie-detail';
import {
  pageSearchMovieComments,
  type pageSearchMovieCommentsSchema,
} from '@/server-actions/page-search-movie-comments';
import { Button, Card, IconButton, RatingGroup } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { unstable_ViewTransition as ViewTransition } from 'react';
import { MdArrowBack, MdCheck } from 'react-icons/md';
import type z from 'zod';
import { RatingTrigger } from './components/rating-trigger';

export default async function MoviePage(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<z.infer<typeof pageSearchMovieCommentsSchema>>;
}) {
  const { id } = await props.params;
  const movie = await getMovieDetail(id);

  if (!movie) {
    return redirect('/404');
  }

  const userIsRated = await checkUserIsRated(id);
  const { t, locale } = await getServerI18n('movie');

  return (
    <div className="min-h-screen transition-colors">
      <IconButton
        className="fixed top-16 left-4 hidden md:flex"
        variant={'ghost'}
        asChild
      >
        <Link href={`/${locale}`}>
          <MdArrowBack size={24} />
        </Link>
      </IconButton>
      <main className="mx-auto max-w-3xl p-4 pb-25">
        {/* 电影大图 */}
        <ViewTransition name={`movie-${movie.id}`} update={'none'}>
          <Image
            src={MoviePoster}
            alt={t('movie:poster-alt')}
            className={'w-full rounded'}
            priority
            loading="eager"
          />
        </ViewTransition>

        {/* 电影信息 */}
        <div className="mb-8 pt-2">
          <h2 className="mb-2 text-3xl font-bold" data-testid="movie-title">
            {movie.title}
          </h2>
          <div className="mb-1 flex flex-wrap gap-4 text-base text-gray-600 dark:text-gray-300">
            <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
              {t('movie:genre-label')}
              {movie.genre.join(' / ')}
            </span>
            <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
              {t('movie:release-date-label')}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </span>
            {!!movie.averageRating && (
              <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
                {t('movie:average-rating-label')}
                {movie.averageRating}
              </span>
            )}
            {!!movie.ratingCount && (
              <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-800">
                {t('movie:rating-count-label')}
                {movie.ratingCount}
              </span>
            )}
          </div>
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            {movie.description}
          </p>
        </div>
        {process.env.VITEST ? null : (
          <CommentSection id={id} searchParams={props.searchParams} />
        )}
      </main>

      {userIsRated ? (
        <Button
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
          rounded={'full'}
          size={'lg'}
          colorScheme="green"
          data-testid="user-rated-button"
        >
          <MdCheck size={20} />
          {t('movie:user-rated')}
        </Button>
      ) : (
        <RatingTrigger movieId={id} />
      )}
    </div>
  );
}

async function CommentSection(props: {
  id: string;
  searchParams: Promise<z.infer<typeof pageSearchMovieCommentsSchema>>;
}) {
  const searchParams = await props.searchParams;
  const result = await pageSearchMovieComments({
    ...searchParams,
    id: props.id,
  });

  const { ratings, total, pageSize, pageIndex } = result.data;
  const { t } = await getServerI18n('movie');
  return (
    <section className="mx-auto max-w-3xl">
      <h3 className="mb-4 text-2xl font-bold">{t('movie:user-comments')}</h3>
      {ratings.length ? (
        <div className="space-y-4">
          {ratings.map((item) => {
            return (
              <Card.Root size="sm" key={item.id}>
                <Card.Header>
                  <Card.Title className="flex items-center justify-between">
                    <span>{item.username}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                  </Card.Title>
                  <Card.Description as={'div'}>
                    <RatingGroup.Root
                      count={5}
                      defaultValue={item.score}
                      readOnly
                    >
                      <RatingGroup.HiddenInput />
                      <RatingGroup.Control />
                    </RatingGroup.Root>
                  </Card.Description>
                </Card.Header>
                <Card.Body>{item.comment}</Card.Body>
              </Card.Root>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">{t('movie:no-comments')}</p>
      )}

      {!!total && (
        <Pagination total={total} pageSize={pageSize} page={pageIndex} />
      )}
    </section>
  );
}
