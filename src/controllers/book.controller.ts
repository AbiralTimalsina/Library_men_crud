import { Request, Response } from "express";
import Book from "../models/Book.js";
import { ApiError, asyncHandler } from "../utils/http.js";

// List all books
export const listBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await Book.find().sort({ createdAt: -1 });
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
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

// Update a book by ID
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
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