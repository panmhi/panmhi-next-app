import { DashboardIcon, ColorWheelIcon, VideoIcon } from '@radix-ui/react-icons';
import { useParams } from 'next/navigation';
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
