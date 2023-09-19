'use client';
import Image from 'next/image';
import dayjs from 'dayjs';
import { useEffect, useCallback, useRef, useState, use } from 'react';
import { getMoviesByGenreFetcherOnClient } from '@/lib/panmSDK/fetchers/movies-fetchers';
import { wait } from '@/features/global/helpers/utility';
import { getMoviesByGenre } from '@/lib/panmSDK/methods/movies';

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

    await wait(3000); // simulate loading

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
      // const movies = await getMoviesByGenreFetcherOnClient(genre, 1);

      // NextJS Server Action allows us to use server-side function directly
      // in this case getMoviesByGenre is a server-side fetch function that contains sensitive api_key info
      const movies = await getMoviesByGenre(genre, 1);
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
    <>
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
      {/* loading spinner */}
      {isLoading && (
        <div className='col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4'>
          <svg
            aria-hidden='true'
            className='h-10 w-10 animate-spin fill-sky-600 text-gray-200 dark:text-gray-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </>
  );
};

export default MoiveListWithInfiniteScroll;
