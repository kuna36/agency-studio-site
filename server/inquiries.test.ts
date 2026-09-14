import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("inquiries.create", () => {
  it("silently accepts honeypot submissions without writing them", async () => {
    const caller = appRouter.createCaller(createContext());
    const result = await caller.inquiries.create({
      name: "Spam Bot",
      email: "bot@example.com",
      projectType: "Website",
      description: "This is a long enough spam message for validation.",
      preferredContact: "Email",
      website: "https://spam.example.com",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email input before reaching the database", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.inquiries.create({
      name: "A valid name",
      email: "not-an-email",
      projectType: "Website",
      description: "This is a long enough project description.",
      preferredContact: "Email",
    })).rejects.toThrow();
  });
});
