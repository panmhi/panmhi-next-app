import { getMoviesByGenre } from '@/lib/panmSDK/methods/movies';
import dummyMovies from '@/lib/panmSDK/mocks/dummyMovies.json';
import MoiveList from '@/features/movies/components/MovieList';
import MovieListSkeleton from '@/features/movies/components/MovieListSkeleton';
import { Suspense } from 'react';
import { wait } from '@/features/global/helpers/utility';
import Await from '@/features/global/components/Await';

async function getMovies(genre: string) {
  // const movies = await getMoviesByGenre(genre);
  const movies = dummyMovies;
  if (!movies) {
    throw new Error('Failed to fetch data');
  }
  await wait(3000);
  return movies;
}

const MoivesGenrePage = async ({ params }: { params: { genreId: string } }) => {
  const promise = getMovies(params.genreId);

  return (
    <section className='py-10'>
      <div className='container'>
        <Suspense fallback={<MovieListSkeleton />}>
          <Await promise={promise}>{(movies) => <MoiveList movies={movies.results} />}</Await>
        </Suspense>
      </div>
    </section>
  );
};

export default MoivesGenrePage;
