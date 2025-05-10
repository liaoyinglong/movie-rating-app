import type { pageSearchMoviesSchema } from '@/server-actions/page-search-movies';
import z from 'zod';
import { MovieGrid } from './components/movie-grid';
import { SearchInput } from './components/search-input';

export default async function Home(props: {
  searchParams: Promise<z.infer<typeof pageSearchMoviesSchema>>;
}) {
  const searchParams = await props.searchParams;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
        电影推荐
      </h1>
      <SearchInput></SearchInput>

      <MovieGrid
        pageIndex={searchParams.pageIndex}
        q={searchParams.q}
        pageSize={searchParams.pageSize}
      ></MovieGrid>
    </main>
  );
}
