import { nativeFetcher } from '../utility/fetch-handling-utility';

export const getMoviesByGenreFetcher = async (genre: string, page: number) => {
  const baseURL = 'https://api.themoviedb.org/3/discover';
  let queryURL = `${baseURL}/movie?`;
  const urlQueryParams = {
    api_key: process.env.TMDB_API_KEY, // if not a server action, this will be undefined when called on client side
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

// this can possibily be replaced by a server action function which can run on both server and client
export const getMoviesByGenreFetcherOnClient = async (genre: string, page: number) => {
  // an api route is created where api_key is used to fecth data on server
  // this function send a request to that api endpoint and get the data
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
