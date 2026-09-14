import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createProjectInquiry } from "./db";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(64).optional().or(z.literal("")),
  company: z.string().trim().max(180).optional().or(z.literal("")),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  timeline: z.string().trim().max(80).optional().or(z.literal("")),
  description: z.string().trim().min(15).max(5000),
  reference: z.string().trim().url().max(500).optional().or(z.literal("")),
  preferredContact: z.string().trim().min(2).max(40),
  website: z.string().max(120).optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  inquiries: router({
    create: publicProcedure.input(inquirySchema).mutation(async ({ input }) => {
      if (input.website) return { success: true } as const;
      const { website: _website, ...payload } = input;
      await createProjectInquiry(payload);
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
