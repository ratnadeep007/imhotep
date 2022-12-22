import React, { useEffect } from "react";
import { trpc } from "../../utils/trpc";
import { type NextPageWithLayout } from "../_app";
import DashBoardLayout from "../components/DashboardLayout";
import useStore from "../../store";

const Index: NextPageWithLayout = () => {

  const { consultancy: stateConsultancy, newConsultancyList, doctors: stateDoctors, newDoctorsList } = useStore();

  useEffect(() => {
    const schedule = trpc.consultancy.getBookings.useQuery({});
    const doctors = trpc.doctor.doctors.useQuery();
    const consultancy = trpc.consultancy.getBookings.useQuery({
      date: new Date()
    });

    if (consultancy.data) {
      newConsultancyList(consultancy.data);
    }
    if (doctors.data) {
      newDoctorsList(doctors.data);
    }
  });

  return (
    <>
      <main className="flex min-h-screen flex-col bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="text-white">Consultancies: {stateConsultancy.length}</div>
        <div className="text-white">Doctors: {stateConsultancy.length}</div>
      </main>
    </>
  );
};

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <DashBoardLayout childern={page} />;
};

export default Index;
