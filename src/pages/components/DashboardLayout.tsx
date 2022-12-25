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
      <main className="flex flex-row h-screen bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="h-screen sticky top-0 w-1/6 bg-green-300">
          <Sidebar />
        </div>
        <div className="w-5/6 overflow-y-scroll">
          {childern}
        </div>
      </main>
    </>
  );
}
