import { getTodoById } from '@/lib/panmSDK/fetchers/todos-fetchers';
import { notFound } from 'next/navigation';

export const revalidate = 10;
// export const dynamicParams = false

const Page = async ({ params }) => {
  const { todo } = await getTodoById(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <section className='py-20'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>ISR (revalidate)</h1>
        <p className='mt-6 border p-4 text-lg font-medium'>{todo?.title}</p>
      </div>
    </section>
  );
};

export default Page;
