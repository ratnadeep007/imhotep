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
      <main className="flex h-screen flex-row bg-gray-50 px-2 dark:bg-gray-900 xl:px-0 w-full gap-10">
        <div className="w-1/6 h-full bg-green-300">
          <Sidebar />
        </div>
        <div className="flex-1">
          {childern}
        </div>
      </main>
    </>
  );
}
