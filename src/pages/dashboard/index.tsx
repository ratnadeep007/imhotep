import React, { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { type NextPageWithLayout } from "../_app";
import DashBoardLayout from "../components/DashboardLayout";

const Index: NextPageWithLayout = () => {
  const doctors = trpc.doctor.doctors.useQuery();
  const consultancy = trpc.consultancy.getBookings.useQuery({});

  return (
    <>
      <main className="flex min-h-screen flex-row gap-3 items-center justify-center  bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="flex flex-row gap-3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-3">
            <div className="text-base uppercase text-white text-center">Doctors Today</div>
            {doctors.isLoading ? (
              <div className="text-white text-center w-full">Loading...</div>
            ) : (
              <div className="text-white text-2xl font-bold text-center">
                {doctors.data?.length}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex flex-col gap-3">
            <div className="text-base uppercase text-white text-center">Consultancies Today</div>
            {consultancy.isLoading ? (
              <div className="text-white text-center w-full">Loading...</div>
            ) : (
              <div className="text-white text-2xl font-bold text-center">
                {consultancy.data?.length}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default Index;
