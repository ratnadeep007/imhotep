import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Hero from "./components/Hero";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "gg" });

  return (
    <>
      <Head>
        <title>Imhotep</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center px-2 xl:px-0 bg-gray-50 dark:bg-gray-900">
        <div className="p-3 rounded-lg text-gray-900 font-bold text-lg cursor-pointer">
          {/* <Link href="/booking">Book Now</Link> */}
        </div>
        {/* <AuthShowcase /> */}
        <Hero />
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn(undefined, { callbackUrl: '/dashboard' })}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
