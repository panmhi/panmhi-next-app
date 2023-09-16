import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const AppToolBar = () => {
  return (
    <div className='flex h-12 border-b px-2'>
      <div className='flex flex-1 items-center justify-end'>
        <Link href='https://www.linkedin.com/in/mingyi-pan' target='_blank'>
          <div className='flex h-9 w-9 items-center justify-center rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground'>
            <LinkedInLogoIcon className='scale-125' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AppToolBar;
