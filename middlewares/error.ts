import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/http.js";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
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