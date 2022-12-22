import { type NextPage } from "next";
import Head from "next/head";

interface VerifyRequestPageProps {
  url: URL
}


const VerifyRequest: NextPage<VerifyRequestPageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Imhotep Admin Login</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-2 xl:px-0 bg-gray-50 dark:bg-gray-900 w-full">
        <div className="flex flex-col gap-3 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <h1 className="text-white text-2xl">Check your email</h1>
          <p className="text-white mt-3">A sign in link has been sent to your email address.</p>
          <p>
            {JSON.stringify(props)}
            {/* <a className="text-white mt-3" href={props.url.host}>
              {props.url.host}
            </a> */}
          </p>
        </div>
      </main>
    </>
  );
};

export default VerifyRequest;
