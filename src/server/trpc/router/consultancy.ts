import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const consultancyRouter = router({
  createBooking: publicProcedure
    .input(z.object({
      name: z.string(),
      date: z.date(),
      doctor: z.string(),
      phone: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      // check if patient exits with given phone number
      let patientExisting = await ctx.prisma.patient.findUnique({
        where: {
          phone: input.phone
        }
      });

      if (!patientExisting) {
        return await ctx.prisma.consultancy.create({
          data: {
            date: input.date,
            patient: {
              create: {
                name: input.name,
                phone: input.phone,
                doctor: {
                  connect: {
                    id: input.doctor
                  }
                }
              }
            },
            doctor: {
              connect: {
                id: input.doctor
              }
            }
          }
        });
      } else {
        return await ctx.prisma.consultancy.create({
          data: {
            date: input.date,
            patient: {
              connect: {
                id: patientExisting.id
              }
            },
            doctor: {
              connect: {
                id: input.doctor
              }
            }
          }
        })
      }
    }),
});