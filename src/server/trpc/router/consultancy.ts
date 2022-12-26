import { z } from "zod";
import { Role } from "@prisma/client";

import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  bookingsSchema,
  createBookingReturnTypeSchema
} from "../../../types/OpenAPI";

// enum Role {
//   ADMIN = "ADMIN",
//   ADMIN_CLIENT = "ADMIN_CLIENT",
//   USER = "USER"
// }

export const consultancyRouter = router({
  createBooking: publicProcedure
    .meta({ openapi: { method: "POST", path: "/create-booking" } })
    .input(
      z.object({
        name: z.string(),
        date: z.string(),
        doctor: z.string(),
        phone: z.string()
      })
    )
    .output(createBookingReturnTypeSchema)
    .mutation(async ({ input, ctx }) => {
      // check is user role is either ADMIN or ADMIN_CLIENT
      const currentUserId = ctx.session?.user?.id;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: currentUserId
        }
      });

      if (!user) {
        return {
          error: "Forbidden"
        };
      }

      if (user.role !== Role.ADMIN && user.role !== Role.ADMIN_CLIENT) {
        return {
          error: "Forbidden"
        };
      }

      // check if patient exits with given phone number
      const patientExisting = await ctx.prisma.patient.findUnique({
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
                phone: input.phone
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
        });
      }
    }),
  getBookings: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/bookings" } })
    .input(
      z.object({
        doctor: z.string().optional(),
        date: z.string().optional()
      })
    )
    .output(bookingsSchema)
    .query(async ({ input, ctx }) => {
      // check is user role is either ADMIN or ADMIN_CLIENT
      const currentUserId = ctx.session?.user?.id;
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: currentUserId
        }
      });

      if (
        !user ||
        (user.role !== Role.ADMIN && user.role !== Role.ADMIN_CLIENT)
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not allowed to access this api"
        });
      }

      if (input.doctor && input.date) {
        console.log("doc and date");
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
        console.log("only date");
        const res = await ctx.prisma.consultancy.findMany({
          where: {
            date: input.date
          },
          include: {
            doctor: true,
            patient: true
          }
        });
        return res;
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
  updateBookings: protectedProcedure
    .meta({ openapi: { method: "PATCH", path: "/update-booking" } })
    .input(
      z.object({
        type: z.string(),
        id: z.number(),
        data: z.object({}).optional()
      })
    )
    .output(z.boolean())
    .mutation(async ({ ctx, input }) => {
      if (input.type === "MARK_DONE") {
        await ctx.prisma.consultancy.update({
          where: {
            id: input.id
          },
          data: {
            complete: true
          },
          select: {
            id: true,
            date: true
          }
        });
        return true;
      }
      return false;
    })
});
