import { z } from "zod";

export const memberCreateSchema = z.object({
  fullName: z.string({ required_error: "Full name is required" }),
  email: z.string({ required_error: "Email is required" }),
  phone: z.string().optional(),
});

export type MemberCreateDto = z.infer<typeof memberCreateSchema>;
