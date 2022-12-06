import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const scheduleRouter = router({
    addSchedule: publicProcedure
        .input(z.object({
            doctor: z.string(),
            days: z.array(z.string()),
            timing: z.array(z.string())
        }))
        .mutation(async ({ input, ctx}) => {
            return await ctx.prisma.schedule.create({
                data: {
                    days: input.days.join(","),
                    timing: input.timing.join(","),
                    doctor: {
                        connect: {
                            id: input.doctor
                        }
                    }
                }
            })
        })
});