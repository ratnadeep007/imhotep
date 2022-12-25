import { type NextApiRequest, type NextApiResponse } from "next";
import { renderTrpcPanel } from "trpc-panel";
import { appRouter } from "../../server/trpc/router/_app";
import { env } from "../../env/server.mjs";

const trpcPanel = async (req: NextApiRequest, res: NextApiResponse) => {
  if (env.NODE_ENV === "production") {
    return res.status(401).send({ "message": "this api is not allowed in production"});
  }
  res.status(200).send(renderTrpcPanel(appRouter, { url: `${req.url}/trpc` }));
};

export default trpcPanel;
