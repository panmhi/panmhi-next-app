const MoivesPage = () => {
  return (
    <div className='container py-10'>
      <h1 className='mb-8 text-3xl font-bold'>Movies</h1>
      <div className='mb-4'>
        Top Rated: Server component pagination. Loading skeleton effect via Suspense.
      </div>
      <div className='mb-4'>
        Action: Infinite Scrolling. IntersectionObserver attached to last movie element via
        useCallback. Server Action is used to fetch data from TMDB API.
      </div>
    </div>
  );
};

export default MoivesPage;
