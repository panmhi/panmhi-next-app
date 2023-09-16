'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

const ThemeButton = () => {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();
  const [mountTheme, setMountTheme] = useState(false);

  useEffect(() => {
    setMountTheme(true);
  }, []);

  if (!mountTheme) return null;

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center justify-center rounded-full border border-foreground p-2'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className='h-5 w-5 text-orange-300' />
      ) : (
        <MoonIcon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  );
};

export default ThemeButton;
