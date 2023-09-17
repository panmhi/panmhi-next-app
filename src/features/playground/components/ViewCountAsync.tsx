import { wait } from '@/features/global/helpers/utility';

const ViewCountAsync = async () => {
  // fetch page view counts from db
  // const viewCount = await fetchViewCount(slug);
  await wait(3000);
  return <div>View count: 100</div>;
};

export default ViewCountAsync;
