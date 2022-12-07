import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
// import { ChangeEvent, InputHTMLAttributes, MouseEventHandler, useState } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const schedule = trpc.consultancy.getBookings.useQuery({});

  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="bg-white flex mb-3 px-4 py-2">
          <div className="cursor-pointer">
            <Link href="/">Home</Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
        {
          schedule.isLoading ? <div>Loading...</div>
          : schedule.data?.map(s => <div className="flex flex-col bg-white p-4 rounded-lg">
            <div>Doctor: Dr.{s.doctor.name}</div>
            <div>Patient: {s.patient.name}</div>
            <div>on: {s.date.toDateString()}</div>
          </div>)
        }
        </div>
      </main>
    </>
  );
}

export default Dashboard;