import { getMoviesByGenre } from '@/lib/panmSDK/methods/movies';
import dummyMovies from '@/lib/panmSDK/mocks/dummyMovies.json';
import MoiveList from '@/features/movies/components/MovieList';
import MovieListSkeleton from '@/features/movies/components/MovieListSkeleton';
import { Suspense } from 'react';
import { wait } from '@/features/global/helpers/utility';
import Await from '@/features/global/components/Await';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import MoiveListWithInfiniteScroll from '@/features/movies/components/MovieListWithInfiniteScroll';

async function getMovies({ genre, page = 1 }: { genre: string; page?: number }) {
  // const movies = await getMoviesByGenre(genre);
  const movies = dummyMovies;
  if (!movies) {
    throw new Error('Failed to fetch data');
  }
  await wait(3000);
  return movies;
}

type MovieGenrePageProps = {
  params: { genreId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

/* 
  A page will be opted as a dynamic rendered page if
  a) it uses dynamic functions such as headers and cookies
  b) it uses searchParams 
  c) it has data that is not static
*/
/* 
  Suspense boundary is not working by default not because it needs to be dynamically renderd,
  but becuase of the Router Cache behavior in Next.js. 
  We fix this by adding a key attribute to the Page component, 
  the updated key forces Next.js to send request to get an updated page each time,
  which in turns calls the Suspense and shows the loading effect.

  For Caching in Next.js: https://nextjs.org/docs/app/building-your-application/caching
*/

// This is a dynamic page by default since searchParams is used
const MoivesGenrePage = async ({ params, searchParams }: MovieGenrePageProps) => {
  const genre = params.genreId;
  const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;

  const promise = getMovies({ genre, page });

  return (
    <section className='py-10' key={Math.random()}>
      {genre === 'top_rated' && (
        <div className='container'>
          <div className='mb-12 flex items-center justify-between gap-x-16'>
            <h1 className='text-3xl font-bold'>{params.genreId} Movies</h1>

            <div className='flex space-x-6'>
              <Link
                href={{
                  pathname: `/movies/genre/${genre}`,
                  query: {
                    page: page > 1 ? page - 1 : 1
                  }
                }}
                className={cn(
                  'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                  page <= 1 && 'pointer-events-none opacity-50'
                )}
              >
                Previous
              </Link>
              <Link
                href={{
                  pathname: `/movies/genre/${genre}`,
                  query: {
                    page: page + 1
                  }
                }}
                className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
              >
                Next
              </Link>
            </div>
          </div>

          <Suspense fallback={<MovieListSkeleton />}>
            <Await promise={promise}>{(movies) => <MoiveList movies={movies.results} />}</Await>
          </Suspense>
        </div>
      )}
      {genre === 'action' && <MoiveListWithInfiniteScroll genre={genre} />}
    </section>
  );
};

export default MoivesGenrePage;
