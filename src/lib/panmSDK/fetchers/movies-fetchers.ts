import { nativeFetcher } from '../utility/fetch-handling-utility';

export const getMoviesByGenreFetcher = async (genre: string, page: number) => {
  const baseURL = 'https://api.themoviedb.org/3/discover';
  let queryURL = `${baseURL}/movie?`;
  const urlQueryParams = {
    api_key: process.env.TMDB_API_KEY,
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: page,
    sort_by: 'popularity.desc',
    with_genres: genre
  };
  const qs: URLSearchParams = new URLSearchParams(urlQueryParams as unknown as URLSearchParams);
  queryURL = queryURL + qs;
  return await nativeFetcher(queryURL);
};

export const getMoviesByGenreFetcherOnClient = async (genre: string, page: number) => {
  const baseURL = '/api/movies';
  let queryURL = `${baseURL}?`;
  const urlQueryParams = {
    page: page,
    genre: genre
  };
  const qs: URLSearchParams = new URLSearchParams(urlQueryParams as unknown as URLSearchParams);
  queryURL = queryURL + qs;
  return await nativeFetcher(queryURL);
};
