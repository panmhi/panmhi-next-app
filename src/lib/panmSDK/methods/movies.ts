'use server';
import { getMoviesByGenreFetcher } from '../fetchers/movies-fetchers';

export const getMoviesByGenre = async (genre: string, page: number) => {
  try {
    return await getMoviesByGenreFetcher(genre, page);
  } catch (error) {
    throw error;
  }
};
