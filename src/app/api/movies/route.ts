import { NextResponse } from 'next/server';
import { getMoviesByGenre } from '@/lib/panmSDK/methods/movies';
import dummyMovies from '@/lib/panmSDK/mocks/dummyMovies.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const page = typeof searchParams.get('page') === 'string' ? Number(searchParams.get('page')) : 1;
  // const res = await getMoviesByGenre(genre || '', page);

  const res = dummyMovies;
  return NextResponse.json(res);
}
