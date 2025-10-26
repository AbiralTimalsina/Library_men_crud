import { z } from "zod";

export const memberCreateSchema = z.object({
  fullName: z.string({ required_error: "Full name is required" })
              .trim()
              .min(1, "Full name is required"),
  email: z.string({ required_error: "Email is required" })
           .trim()
           .toLowerCase()
           .email("Invalid email address"),
  phone: z.string({ invalid_type_error: "Phone must be a string" })
           .trim()
           .min(7, "Phone number must be at least 7 characters")
           .max(20, "Phone number must be at most 20 characters")
           .optional(),
});

export const memberUpdateSchema = memberCreateSchema.partial();

export type MemberCreateDto = z.infer<typeof memberCreateSchema>;
export type MemberUpdateDto = z.infer<typeof memberUpdateSchema>;
