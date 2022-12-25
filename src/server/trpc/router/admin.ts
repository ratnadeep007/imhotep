import { Role } from "@prisma/client";
import { z } from "zod";

import { router, adminProcedure } from "../trpc";

export const adminRouter = router({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    const allUsers = await ctx.prisma.user.findMany();
    return allUsers;
  }),
  updateRole: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        role: z.nativeEnum(Role)
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.userId
        },
        data: {
          role: input.role
        }
      });
    })
});
