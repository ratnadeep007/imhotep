import Head from "next/head";
import Sidebar from "./Sidebar";

interface Props {
  childern: React.ReactNode;
}

export default function DashBoardLayout({ childern }: Props) {
  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid grid-cols-6 h-screen bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="h-full w-full bg-green-300">
          <Sidebar />
        </div>
        <div className="col-span-5 w-full">
          {childern}
        </div>
      </main>
    </>
  );
}
