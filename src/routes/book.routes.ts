import { Router } from "express";
import { createBook, deleteBook, getBook, listBooks, updateBook } from "../controllers/book.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { bookCreateSchema, bookUpdateSchema } from "../schemas/book.schema.js";

const r = Router();
r.get("/", listBooks);
r.get("/:id", getBook);
r.post("/", validateBody(bookCreateSchema), createBook);
r.put("/:id", validateBody(bookUpdateSchema), updateBook);
r.delete("/:id", deleteBook);
export default r;
