import { Request, Response } from "express";
import Member from "../models/Member.js";
import { ApiError, asyncHandler } from "../utils/http.js";

// List all members
export const listMembers = asyncHandler(
  async (_req: Request, res: Response) => {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members); // ← Return raw array
  }
);

// Get a member by ID
export const getMember = asyncHandler(async (req: Request, res: Response) => {
  const item = await Member.findById(req.params.id);
  if (!item) throw new ApiError(404, "Member not found");
  res.json(item); // ← Return raw object
});

// Create a new member
export const createMember = asyncHandler(
  async (req: Request, res: Response) => {
    const exists = await Member.findOne({ email: req.body.email });
    if (exists) throw new ApiError(409, "Email already exists");

    const item = await Member.create(req.body);
    res.status(201).json(item); // ← Return raw object
  }
);

// Update a member by ID
export const updateMember = asyncHandler(
  async (req: Request, res: Response) => {
    if (req.body.email) {
      const other = await Member.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });
      if (other) throw new ApiError(409, "Email already exists");
    }

    const item = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) throw new ApiError(404, "Member not found");

    res.json(item); // ← Return raw object
  }
);

// Delete a member by ID
export const deleteMember = asyncHandler(
  async (req: Request, res: Response) => {
    const item = await Member.findByIdAndDelete(req.params.id);
    if (!item) throw new ApiError(404, "Member not found");

    res.json({ message: "Member deleted successfully" });
  }
);