import DashBoardLayout from "../components/DashboardLayout";
import { type NextPageWithLayout } from "../_app";

const Schedules: NextPageWithLayout = () => {
  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center gap-3  overflow-y-scroll bg-gray-50 px-2 dark:bg-gray-900 xl:px-0"></main>
    </>
  );
};

Schedules.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default Schedules;
