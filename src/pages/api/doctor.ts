import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const doctor = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "post") {
    const body = req.body;
    await prisma.doctor.createMany(body.data);
    return res.status(201).json({});
  }
  res.status(200).json({ "status": "ok" });
};

export default doctor;
