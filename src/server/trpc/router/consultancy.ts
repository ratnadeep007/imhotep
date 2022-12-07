import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

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
  getBookings: protectedProcedure
    .input(z.object({
      doctor: z.string().optional(),
      date: z.date().optional()
    }))
    .query(async ({ input, ctx }) => {
      console.log("input", input);
      if (input.doctor && input.date) {
        return await ctx.prisma.consultancy.findMany({
          where: {
            doctorId: input.doctor,
            date: input.date
          },
          include: {
            doctor: true,
            patient: true
          }
        });
      } else if (input.date) {
        return await ctx.prisma.consultancy.findMany({
          where: {
            date: input.date
          },
          include: {
            doctor: true,
            patient: true
          }
        })
      } else if (input.doctor) {
        return await ctx.prisma.consultancy.findMany({
          where: {
            doctorId: input.doctor
          },
          include: {
            doctor: true,
            patient: true
          }
        });
      } else {
        return await ctx.prisma.consultancy.findMany({
          include: {
            doctor: true,
            patient: true
          }
        });
      }
    }),
});