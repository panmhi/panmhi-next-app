import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // relative path is used to solve the preload link issue, for details see https://github.com/vercel/next.js/discussions/49607
import AppSideBar from '@/features/global/components/AppSideBar';
import ThemeProvider from '@/features/global/contexts/ThemeContext';
import AppToolBar from '@/features/global/components/AppToolBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pan's",
  description: 'A next demo app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' enableSystem defaultTheme='system'>
          <div className='flex h-screen w-screen overflow-hidden'>
            <AppSideBar />
            <div className='flex grow flex-col overflow-hidden'>
              <AppToolBar />
              <main className='flex grow overflow-hidden'>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
