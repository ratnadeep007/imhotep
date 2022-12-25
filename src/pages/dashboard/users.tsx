import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import DashBoardLayout from "../components/DashboardLayout";
import { type NextPageWithLayout } from "../_app";

const AdminUser: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const users = trpc.admin.getUsers.useQuery();
  const updateRole = trpc.admin.updateRole.useMutation({
    onSuccess: () => users.refetch()
  });

  const updateRoleLocal = async (role: Role) => {
    if (sessionData?.user) {
      updateRole.mutate({ userId: sessionData?.user?.id, role });
    }
  };

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center  gap-3 bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="flex w-1/2 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          {users.isLoading && (
            <div className="text-center text-white">Loading...</div>
          )}
          {users.data?.map((user) => (
            <div
              key={user.id.toString()}
              className="flex flex-row justify-between items-center"
            >
              <div className="text-white">{user.name}</div>
              {/* <div>{Object.keys(Role)}</div> */}
              <select
                onChange={(e) =>
                  updateRoleLocal(Role[e.target.value as keyof typeof Role])
                }
                className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {Object.keys(Role).map((role) => (
                  <option
                    key={role}
                    value={role}
                    className="text-black"
                    selected={user.role === role}
                  >
                    {role}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

AdminUser.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default AdminUser;
