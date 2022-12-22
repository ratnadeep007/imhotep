import { type NextPage } from "next";
import Head from "next/head";

import HeroImage from "../../public/doctor-g98c36410f_640.png";

import Hero from "./components/Hero";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-2 xl:px-0 bg-gray-50 dark:bg-gray-900">
        <Hero 
          primaryText="Book Doctor Appointment Online"
          secondaryText="No need to stand in long queue to book appointment with doctor."
          ctaPrimayText="Book now"
          heroImage={HeroImage}
          primaryHref="/booking"
        />
      </main>
    </>
  );
};

export default Home;
