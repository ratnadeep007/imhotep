import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const patientRouter = router({
    getPatients: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.patient.findMany();
        })
});