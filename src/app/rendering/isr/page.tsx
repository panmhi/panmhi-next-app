import Link from 'next/link';
import { getTodosPaginated } from '@/lib/panmSDK/fetchers/todos-fetchers';
import NewTodoForm from '@/features/rendering/components/NewTodoForm';
import { cn } from '@/lib/utils';

export const revalidate = 10;

type RenderingISRPageProps = {
  params: { genreId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const RenderingISRPage = async ({ searchParams }: RenderingISRPageProps) => {
  const currentPage = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;
  const { todos, page, previousPage, nextPage } = await getTodosPaginated(currentPage);

  return (
    <section className='py-20'>
      <div className='container'>
        <h1 className='mb-4 w-fit bg-emerald-100 px-2 text-3xl font-bold text-emerald-800'>
          ISR — Revalidate
        </h1>
        <p className='mb-8 text-sm'>
          Use server API /api/todos endpoint (with pagination) to fetch todos data
        </p>

        <NewTodoForm />

        <div className='mb-6 flex items-center justify-between gap-x-16 border-b'>
          <h2 className='mt-10 pb-2 text-xl font-semibold'>Todos</h2>
          <div className='flex space-x-6'>
            <Link
              href={{
                pathname: `/rendering/isr`,
                query: {
                  page: previousPage
                }
              }}
              className={cn(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                !previousPage && 'pointer-events-none opacity-50'
              )}
            >
              Previous
            </Link>
            <span className='rounded border px-3 py-1 text-sm text-gray-800'>{page}</span>
            <Link
              href={{
                pathname: `/rendering/isr`,
                query: {
                  page: nextPage
                }
              }}
              className={cn(
                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                !nextPage && 'pointer-events-none opacity-50'
              )}
            >
              Next
            </Link>
          </div>
        </div>

        <ul className='flex flex-col gap-1'>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <Link href={`/rendering/isr/${todo.id}`}>{todo.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RenderingISRPage;
