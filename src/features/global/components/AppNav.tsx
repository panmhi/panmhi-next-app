import { DashboardIcon, ColorWheelIcon, VideoIcon, RocketIcon } from '@radix-ui/react-icons';
import NavLink from '@/features/global/components/NavLink';

const AppNav = () => {
  const sideNavFeatures = [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: <DashboardIcon />
    },
    {
      href: '/tailwind',
      title: 'Tailwind',
      icon: <ColorWheelIcon />
    },
    {
      href: '/movies',
      title: 'Movies',
      icon: <VideoIcon />
    },
    {
      href: '/playground',
      title: 'Playground',
      icon: <RocketIcon />
    }
  ];

  return (
    <nav className='flex flex-col'>
      {sideNavFeatures.map((feature) => (
        <NavLink key={feature.title} {...feature} vertical />
      ))}
    </nav>
  );
};

export default AppNav;
