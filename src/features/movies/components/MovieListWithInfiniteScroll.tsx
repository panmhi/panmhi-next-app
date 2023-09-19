'use client';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useEffect, useCallback, useRef, useState, use } from 'react';
import { getMoviesByGenreFetcherOnClient } from '@/lib/panmSDK/fetchers/movies-fetchers';

type MoiveListWithInfiniteScroll = {
  genre: string;
};

const MoiveListWithInfiniteScroll = ({ genre }: MoiveListWithInfiniteScroll) => {
  //   const { moviesDispatch, scroll, setScroll } = useContext(moviesContext);

  // useRef to make the observer persistent across renders,
  // because we need to stop observing after new data is fetched,
  // and attach the same observer to the newly last movie node.
  const observer = useRef<IntersectionObserver | null>(null);
  const [movies, setMovies] = useState([] as Record<string, any>[]);
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreMovies = useCallback(async () => {
    const next = page + 1;
    setIsloading(true);
    const moreMovies = await getMoviesByGenreFetcherOnClient(genre, next);
    if (movies?.length) {
      setPage(next);
      setMovies((prev) => {
        const updatedMovies = [...prev, ...moreMovies.results];
        return updatedMovies;
      });
    }
    setIsloading(false);
  }, [page, genre, movies]);

  useEffect(() => {
    // fetch initial set of movies
    async function fetchMovies() {
      const movies = await getMoviesByGenreFetcherOnClient(genre, 1);
      setMovies(movies.results);
    }
    fetchMovies();
  }, [genre]);

  // useCallback will fire everytime it attaches to a node's ref
  const lastMovie = useCallback(
    (node: HTMLLIElement) => {
      // to prevent from firing when ref is detached
      if (!node) return;
      if (isLoading) return;
      // stop observing old node
      if (observer.current) {
        observer.current.disconnect();
      }
      // attach to newly last node
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting) {
          await loadMoreMovies();
        }
      });
      observer.current.observe(node);
    },
    [isLoading, loadMoreMovies]
  );

  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
    >
      {movies?.map((movie, index) => (
        <li key={index} className='relative' ref={index === movies.length - 1 ? lastMovie : null}>
          <div className='group aspect-square h-auto w-fit overflow-hidden rounded-lg bg-gray-100'>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=''
              className='object-cover group-hover:opacity-75'
              width={300}
              height={300}
            />
          </div>
          <p className='mt-2 block truncate font-medium'>{movie.title}</p>
          <p className='block text-sm font-medium text-gray-500'>
            {dayjs(movie.release_date).format('MM/DD/YYYY')}
          </p>
          <p className='block text-sm font-medium text-gray-500'>Score: {movie.vote_average}</p>
        </li>
      ))}
    </ul>
  );
};

export default MoiveListWithInfiniteScroll;
