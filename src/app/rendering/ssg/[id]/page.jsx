import { getPublicTodoById, getPublicTodos } from '@/lib/panmSDK/fetchers/todos-fetchers';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { todos } = await getPublicTodos();
  return todos.map((todo) => ({ id: todo.id.toString() }));
}

const Page = async ({ params }) => {
  const todo = await getPublicTodoById(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <section className='py-20'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Static (SSG)</h1>
        <p className='mt-6 border p-4 text-lg font-medium'>{todo?.todo}</p>
      </div>
    </section>
  );
};

export default Page;
