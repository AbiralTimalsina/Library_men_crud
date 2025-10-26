import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.string({ required_error: "Title is required" })
           .trim().min(1, "Title is required"),
  author: z.string({ required_error: "Author is required" })
            .trim().min(1, "Author is required"),
  isbn: z.string({ required_error: "ISBN is required" })
          .trim()
          .regex(/^(97(8|9))?\d{9}(\d|X)$/, "ISBN must be valid (ISBN-10 or ISBN-13)"),
  category: z.string().trim().min(1, "Category cannot be empty").optional().default("General"),
  copies: z.number({ invalid_type_error: "Copies must be a number" })
           .int("Copies must be an integer")
           .min(1, "Copies must be at least 1")
           .default(1),
});

export const bookUpdateSchema = bookCreateSchema.partial();
export type BookCreateDto = z.infer<typeof bookCreateSchema>;
export type BookUpdateDto = z.infer<typeof bookUpdateSchema>;
