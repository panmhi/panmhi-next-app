import { getMoviesByGenre } from '@/lib/panmSDK/methods/movies';
import dummyMovies from '@/lib/panmSDK/mocks/dummyMovies.json';

async function getMovies(genre: string) {
  // const movies = await getMoviesByGenre(genre);
  const movies = dummyMovies;
  if (!movies) {
    throw new Error('Failed to fetch data');
  }

  return movies;
}

const MoivesGenrePage = async ({ params }: { params: { genreId: string } }) => {
  const movies = await getMovies(params.genreId);
  return (
    <>
      My Post: {params.genreId}
      <div>{JSON.stringify(movies.results)}</div>
    </>
  );
};

export default MoivesGenrePage;
