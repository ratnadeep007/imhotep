import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const doctorRouter = router({
    doctors: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.prisma.doctor.findMany();
        }),
    addDoctor: publicProcedure
        .input(z.object({
            name: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            console.log('input', input);
            const doctor = await ctx.prisma.doctor.create({
                data: {
                    name: input.name
                },
                select: {
                    id: true,
                    name: true
                }
            });
            return doctor;
        })
});