import AppNav from '@/features/global/components/AppNav';
import ThemeButton from '@/features/global/components/ThemeButton';
import Image from 'next/image';
import Link from 'next/link';

const AppSideBar = () => {
  return (
    <header className='flex flex-col justify-between border-r'>
      <div>
        <Link className='flex flex-col items-center border-b p-4' href='/'>
          <span className='sr-only'>Pan&apos;s playground</span>
          <Image src='/mountain.svg' width={40} height={40} alt='Pan logo' />
          <span className='hidden text-sm sm:inline-block'>Pan&apos;s</span>
        </Link>
        <AppNav />
      </div>
      <div className='flex h-20 items-center justify-center'>
        <ThemeButton />
      </div>
    </header>
  );
};

export default AppSideBar;
