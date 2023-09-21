'use client';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface SidebarLinkProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  href: string;
  title: string;
  alias?: string;
  icon?: ReactNode;
}

const NavLink = ({ vertical = false, href, title, alias, icon }: SidebarLinkProps) => {
  const pathname = usePathname();

  const navLinkDefaultStyles =
    'flex w-28 justify-start items-center transition-colors text-foreground/60 hover:text-foreground/80';

  return (
    <Link
      key={href}
      href={href}
      className={cn(
        navLinkDefaultStyles,
        pathname.startsWith(href) ? 'bg-secondary text-primary' : '',
        vertical ? 'flex-col p-4' : 'flex-row px-4 py-2'
      )}
    >
      {icon && <div className='flex h-8 w-8 scale-125 items-center justify-center'>{icon}</div>}
      <span className=' text-center text-sm'>{title}</span>
    </Link>
  );
};

export default NavLink;
