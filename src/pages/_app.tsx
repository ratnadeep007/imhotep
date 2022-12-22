import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { type NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  session: Session | null;
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);

  return <SessionProvider session={session}>{layout}</SessionProvider>;
}

export default trpc.withTRPC(MyApp);
