import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/http.js";
import mongoose from "mongoose";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Handle duplicate key errors (MongoDB)
  if (err && err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      error: "Duplicate value",
      details: { fields, keyValue: err.keyValue },
    });
  }

  // Handle validation errors (Mongoose)
  if (err && err.name === "ValidationError" && err.errors) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [k, v] of Object.entries<any>(err.errors)) {
      fieldErrors[k] = [v.message];
    }
    return res.status(400).json({
      error: "Validation failed",
      details: { fieldErrors, formErrors: [] },
    });
  }

  // Handle CastError (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }

  // Handle ApiError instances
  if (err instanceof ApiError) {
    return res.status(err.status).json({ 
      error: err.message 
    });
  }

  // Handle generic errors
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({ error: message });
}