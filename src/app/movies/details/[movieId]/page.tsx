const MoivePage = async ({ params }: { params: { movieId: string } }) => {
  return (
    <div>
      Movie id: {params.movieId}
      <div>details</div>
    </div>
  );
};

export default MoivePage;
