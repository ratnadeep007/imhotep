import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import Head from "next/head";
import Hero from "./components/Hero";

import HeroImage from "../../public/doctor-g98c36410f_640.png";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Admin: NextPage = () => {
  const { data: sesssionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sesssionData) {
      router.push('/dashboard');
    }
  });

  const login = () => {
    signIn('auth0');
  }

  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-2 xl:px-0 bg-gray-50 dark:bg-gray-900 w-full">
          {!sesssionData && <Hero
            primaryText="Login to manage as admin"
            ctaPrimayText="Login"
            heroImage={HeroImage}
            primaryCta={login}
          />}
          {sesssionData && <Hero 
            primaryText="Login to manage as admin"
            ctaPrimayText="Dashboard"
            heroImage={HeroImage}
            primaryHref="/dashboard"
          />}
      </main>
    </>
  );
};

export default Admin;
