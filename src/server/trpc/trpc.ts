import { Role } from "@prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  }
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * Check user is admin
 */
export const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  console.log("session", ctx.session);

  if (ctx.session.user.role !== Role.ADMIN) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

/**
 * Admin only procedures
 */
export const adminProcedure = t.procedure.use(isAdmin);


/*
* Check user is client admin
*/
export const isAdminClient = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (ctx.session.user.role !== Role.ADMIN_CLIENT) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user }
    }
  });
});

/**
 * Admin Client only procedures
 */
export const adminClientProcedure = t.procedure.use(isAdminClient);