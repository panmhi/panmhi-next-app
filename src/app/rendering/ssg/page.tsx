import Link from 'next/link';
import { getPublicTodos } from '@/lib/panmSDK/fetchers/todos-fetchers';
import NewTodoForm from '@/features/rendering/components/NewTodoForm';

// export const dynamic = 'auto'
// export const dynamic = 'force-static'
export const dynamic = 'error';

const RenderingSSGPage = async () => {
  const { todos } = await getPublicTodos();

  return (
    <section className='py-20'>
      <div className='container'>
        <h1 className='mb-4 w-fit bg-emerald-100 px-2 text-3xl font-bold text-emerald-800'>
          SSG — Static
        </h1>
        <p className='mb-8 text-sm'>Use dummyJSON public API to fetch todos data</p>

        <NewTodoForm />

        <div className='mb-6 flex items-center justify-between gap-x-16 border-b'>
          <h2 className='mt-10 pb-2 text-xl font-semibold'>Todos</h2>
        </div>

        <ul className='flex flex-col gap-1'>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <Link href={`/rendering/ssg/${todo.id}`}>{todo.todo}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RenderingSSGPage;
