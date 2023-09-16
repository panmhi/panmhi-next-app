import MoviesSideBar from '@/features/movies/components/MoviesSideBar';

export default function MoviesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MoviesSideBar />
      <main className='grow overflow-y-auto'>{children}</main>
    </>
  );
}
