import { type NextPage } from "next";
import Head from "next/head";

const Error: NextPage = () => {
  return (
    <>
      <Head>
        <title>Imhotep Admin Login</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-2 xl:px-0 bg-gray-50 dark:bg-gray-900 w-full">
        <div className="text-white">Sign Out</div>
      </main>
    </>
  );
};

export default Error;
