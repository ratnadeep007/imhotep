import React, { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { type NextPageWithLayout } from "../_app";
import DashBoardLayout from "../components/DashboardLayout";
import BookingForm from "../components/BookingForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Index: NextPageWithLayout = () => {
  const [activeConsultancy, setActieConsultancy] = useState<Array<Record<string, unknown>>>();
  const router = useRouter();
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (!sessionData) {
      router.push('/admin');
    } 
  });

  const doctors = trpc.doctor.doctors.useQuery();
  const consultancy = trpc.consultancy.getBookings.useQuery({}, {
    onSuccess: (data) => {
      const activeConsultancy = data.filter(d => d.complete === true);
      setActieConsultancy(activeConsultancy);
      return data;
    }
  });
  const [newBooking, setNewBooking] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-3  bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        {!newBooking ? (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex flex-row gap-3">
              <div className="flex max-w-sm flex-row gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col gap-3">
                  <div className="text-center text-base uppercase text-white">
                    Doctors Today
                  </div>
                  {doctors.isLoading ? (
                    <div className="w-full text-center text-white">
                      Loading...
                    </div>
                  ) : (
                    <div className="text-center text-2xl font-bold text-white">
                      {doctors.data?.length}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex max-w-sm flex-row gap-3 rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="flex flex-col gap-3">
                  <div className="text-center text-base uppercase text-white">
                    Consultancies Today
                  </div>
                  {consultancy.isLoading ? (
                    <div className="sliding-tiles">
                    </div>
                  ) : (
                    <div className="w-full text-center text-2xl font-bold text-white">
                      <span>{activeConsultancy?.length}</span>/<span>{consultancy.data?.length}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={() => setNewBooking(true)}
                type="button"
                className="mr-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                New Booking
              </button>
              {/* <button>New D</button> */}
            </div>
          </div>
        ) : (
          <div className="w-full">
            <BookingForm showCancel={true} callbackFn={() => setNewBooking(false)} />
          </div>
        )}
      </main>
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default Index;
