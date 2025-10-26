import type { AnyZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/http.js";

export const validateBody =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Join all error messages into one string
      const message = result.error.issues.map(i => i.message).join(", ");
      throw new ApiError(400, message);
    }
    
    req.body = result.data;
    next();
  };



