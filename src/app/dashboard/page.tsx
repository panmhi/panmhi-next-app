import { columns } from '@/features/dashboard/components/userTable/columns';
import { DataTable } from '@/features/dashboard/components/userTable/data-table';
import { getUsers } from '@/lib/panmSDK/methods/get-uesrs';

export default async function DashboardPage() {
  const users = await getUsers();

  return (
    <div className='container overflow-y-auto py-10'>
      <h1 className='mb-6 text-3xl font-bold'>All Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
