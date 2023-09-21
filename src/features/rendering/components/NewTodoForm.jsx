'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { todoCreator } from '@/lib/panmSDK/creators/todos-creators';

const NewTodoForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title');

    if (!title) return;

    setIsFetching(true);

    await todoCreator({ title });

    form.reset();
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='mb-2 font-medium'>Create a New Todo</h2>
      <input type='text' name='title' className='rounded border border-emerald-400 px-2 py-0.5' />
      <button
        type='submit'
        disabled={isMutating}
        className='ml-2 rounded border border-emerald-400 bg-emerald-400 px-2 py-1 text-sm text-white disabled:bg-opacity-50'
      >
        Add Todo
      </button>
    </form>
  );
};

export default NewTodoForm;
