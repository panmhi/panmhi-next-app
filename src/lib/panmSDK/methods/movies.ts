import { getMoviesByGenreFetcher } from '../fetchers/movies-fetchers';

export const getMoviesByGenre = async (genre: string) => {
  try {
    return await getMoviesByGenreFetcher(genre);
    return;
  } catch (error) {
    throw error;
  }
};
