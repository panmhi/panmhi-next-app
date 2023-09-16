'use client';
import NavLink from '@/features/global/components/NavLink';
import React, { useMemo } from 'react';

const MoviesSideBar = () => {
  const sideNavItems = useMemo(() => {
    return [
      {
        href: '/movies/genre/top_rated',
        title: 'Top Rated'
      },
      {
        href: '/movies/genre/action',
        title: 'Action'
      },
      {
        href: '/movies/genre/comedy',
        title: 'Comedy'
      }
    ];
  }, []);

  return (
    <aside className='border-r'>
      <nav>
        {sideNavItems.map((item) => (
          <NavLink key={item.title} {...item} />
        ))}
      </nav>
    </aside>
  );
};

export default MoviesSideBar;
