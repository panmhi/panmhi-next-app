import Image from 'next/image';
import dayjs from 'dayjs';

const MoiveList = ({ movies }: { movies: Record<string, any>[] }) => {
  return (
    <ul
      role='list'
      className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8'
    >
      {movies?.map((movie) => (
        <li key={movie.id.toString()} className='relative'>
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

export default MoiveList;
