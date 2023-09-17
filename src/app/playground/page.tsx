import ViewCountAsync from '@/features/playground/components/ViewCountAsync';
import { Suspense } from 'react';

export default function PlaygroundPage() {
  return (
    <div className='py-12'>
      <div className='container'>
        <section className='space-y-2 rounded bg-foreground/10 p-8'>
          <p className='text-sm'>{`Demo 1: Loading effect with <Suspense>: wrap Suspend component around a component that performs async
          task (can only be used in a server component because of async). See Movies page.`}</p>
          <div className='rounded bg-background p-4 text-destructive'>
            <Suspense fallback={<div>Loading view count...</div>}>
              <ViewCountAsync />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}
