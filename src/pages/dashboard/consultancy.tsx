import { useState } from "react";
import { trpc } from "../../utils/trpc";
import ConsultancyListItem from "../components/ConsultancyListItem";
import DashBoardLayout from "../components/DashboardLayout";
import { type NextPageWithLayout } from "../_app";
import useStore from "../../store";

const Consultancy: NextPageWithLayout = () => {
  const [today, setToday] = useState(new Date());
  const { newConsultancyList } = useStore();

  const consultancies = trpc.consultancy.getBookings.useQuery(
    {
      date: today
    },
    {
      onSuccess: (data) => {
        newConsultancyList(data);
        return data;
      }
    }
  );

  return (
    <>
      <main className="flex min-h-screen w-full flex-col items-center justify-center  gap-3 bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="flex w-1/2 flex-col gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h1 className="flex w-full flex-row justify-between items-center text-3xl text-white">
            <div className="">Consultancies Today</div>
            <div className="self-end text-white placeholder:text-white">
              <input
                type="date"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Select date"
                onChange={e => setToday(new Date(e.target.value))}
              />
            </div>
          </h1>
          {consultancies.isLoading ? (
            <div className="w-full text-center text-white">Loading...</div>
          ) : consultancies.data?.length ? (
            <div className="w-full text-white">
              {consultancies.data?.map((con) => (
                <ConsultancyListItem
                  key={con.id.toString()}
                  consultancy={con}
                />
              ))}
            </div>
          ) : (
            <div className="text-white text-center">
              No Consultancies registered online for {today.toLocaleDateString()}.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

Consultancy.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default Consultancy;
