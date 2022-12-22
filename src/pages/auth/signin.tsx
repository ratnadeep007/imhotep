import { type GetServerSideProps, type NextPage } from "next";
import { getCsrfToken, getProviders, signIn } from "next-auth/react";
import { type AppProvider } from "next-auth/providers";
import Head from "next/head";
import { useState } from "react";
import { AtSymbolIcon } from "@heroicons/react/24/solid";

interface Props {
  providers: AppProvider[];
  csrfToken: string;
}

const SignIn: NextPage<Props> = ({ providers, csrfToken }) => {
  return (
    <>
      <Head>
        <title>Imhotep Admin Login</title>
        <meta name="description" content="Hospital Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-2 dark:bg-gray-900 xl:px-0">
        <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              {provider.name !== "Email" ? (
                <button
                  className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </button>
              ) : (
                <EmailSignIn csrfToken={csrfToken} provider={provider} />
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default SignIn;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return {
    props: { providers, csrfToken }
  };
};

interface FCProps {
  csrfToken: string;
  provider: AppProvider;
}

const EmailSignIn: React.FC<FCProps> = ({ csrfToken, provider }) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <form
        method="post"
        action={provider.signinUrl}
        className="flex w-full flex-col gap-3"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="flex flex-row">
            <AtSymbolIcon className="w-9 rounded-l-lg border-l border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" />
            <input
              type="email"
              name="email"
              id="email"
              className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-r-lg border-r border-t border-b border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              placeholder="johndoe@example.com"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-white focus:ring-4"
          type="submit"
        >
          Sign In with Email
        </button>
      </form>
    </>
  );
};
