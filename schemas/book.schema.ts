import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  author: z.string({ required_error: "Author is required" }),
  isbn: z.string({ required_error: "ISBN is required" }),
  category: z.string().optional(),
  copies: z.number().default(1),
});

export type BookCreateDto = z.infer<typeof bookCreateSchema>;
