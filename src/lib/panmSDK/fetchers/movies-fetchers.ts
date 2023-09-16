export const getMoviesByGenreFetcher = async (genre: string) => {
  const baseURL = 'https://api.themoviedb.org/3/discover';
  let queryURL = `${baseURL}/movie?`;
  const urlQueryParams = {
    api_key: process.env.TMDB_API_KEY,
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc',
    with_genres: 'action'
  };
  const qs: URLSearchParams = new URLSearchParams(urlQueryParams as unknown as URLSearchParams);
  queryURL = queryURL + qs;
  return await fetch(queryURL).then((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
