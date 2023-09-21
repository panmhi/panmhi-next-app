import RenderingSideBar from '@/features/rendering/components/RenderingSideBar';

export default function RenderingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RenderingSideBar />
      <main className='grow overflow-y-auto'>{children}</main>
    </>
  );
}
