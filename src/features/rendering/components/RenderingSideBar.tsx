import NavLink from '@/features/global/components/NavLink';

const RenderingSideBar = () => {
  const sideNavItems = [
    {
      href: '/rendering/ssr',
      title: 'SSR'
    },
    {
      href: '/rendering/ssg',
      title: 'SSG'
    },
    {
      href: '/rendering/isr',
      title: 'ISR'
    }
  ];

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

export default RenderingSideBar;
