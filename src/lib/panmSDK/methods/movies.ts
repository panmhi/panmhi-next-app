import { getMoviesByGenreFetcher } from '../fetchers/movies-fetchers';

export const getMoviesByGenre = async (genre: string) => {
  try {
    return await getMoviesByGenreFetcher(genre);
  } catch (error) {
    throw error;
  }
};
