import { createNextApiHandler } from "@trpc/server/adapters/next";
import type { NextApiRequest, NextApiResponse } from "next";
import cors from "nextjs-cors";

import { env } from "../../env/server.mjs";
import { createContext } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";

// export API handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  return createNextApiHandler({
    router: appRouter,
    createContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path}: ${error}`);
          }
        : undefined,
  })(req, res);
}
export default handler;