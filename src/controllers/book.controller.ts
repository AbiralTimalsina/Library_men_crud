import { Request, Response } from "express";
import Book from "../models/Book.js";
import { ApiError, asyncHandler } from "../utils/http.js";

// List all books with optional ?q= search
export const listBooks = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query as { q?: string };
  const filter = q
    ? {
        $or: [
          { title: new RegExp(q, "i") },
          { author: new RegExp(q, "i") },
          { isbn: new RegExp(q, "i") },
        ],
      }
    : {};

  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json(books);
});

// Get book by ID
export const getBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new ApiError(404, "Book not found");
  res.json(book);
});

// Create a new book
export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const exists = await Book.findOne({ isbn: req.body.isbn });
  if (exists) throw new ApiError(409, "ISBN already exists");

  const book = await Book.create(req.body);
  res.status(201).json(book);
});

// Update a book by ID
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  if (req.body.isbn) {
    const other = await Book.findOne({
      isbn: req.body.isbn,
      _id: { $ne: req.params.id },
    });
    if (other) throw new ApiError(409, "ISBN already exists");
  }

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) throw new ApiError(404, "Book not found");
  res.json(book);
});

// Delete a book by ID
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw new ApiError(404, "Book not found");
  res.json({ message: "Book deleted successfully" });
});