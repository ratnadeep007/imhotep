import { type PrismaPromise } from "@prisma/client";
import { z } from "zod";

import { router, adminClientProcedure } from "../trpc";

export const scheduleRouter = router({
  getSchedules: adminClientProcedure
    .input(z.object({
      doctorId: z.string().optional()
    }))
    .query(async ({ ctx, input}) => {
      if (input.doctorId || input.doctorId === '') {
        return await ctx.prisma.schedule.findMany({
          where: {
            doctorId: input.doctorId
          }
        })
      }
      return await ctx.prisma.schedule.findMany();
    }),
  addSchedule: adminClientProcedure
    .input(
      z.object({
        doctor: z.string(),
        day_of_week: z.string(),
        start_time: z.string(),
        end_time: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.schedule.create({
        data: {
          day_of_week: input.day_of_week,
          start_time: input.start_time,
          end_time: input.end_time,
          doctorId: input.doctor
        }
      });
    }),
  addSchedules: adminClientProcedure
    .input(
      z.array(
        z.object({
          doctor: z.string(),
          day_of_week: z.string(),
          start_time: z.string(),
          end_time: z.string()
        })
      )
    )
    .mutation(async ({ input, ctx }) => {
      const batchList: PrismaPromise<unknown>[] = [];

      input.forEach(inp => batchList.push(
        ctx.prisma.schedule.create({
          data: {
            doctorId: inp.doctor,
            day_of_week: inp.day_of_week,
            end_time: new Date(inp.end_time),
            start_time: new Date(inp.start_time),
          }
        })
      ));

      return await ctx.prisma.$transaction(batchList);
    }),
  deleteSchedule: adminClientProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.schedule.delete({
        where: {
          id: Number(input)
        }
      });
    })
});
