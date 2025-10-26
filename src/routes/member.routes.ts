import { Router } from "express";
import {
  createMember,
  getMember,
  listMembers,
  updateMember,
  deleteMember,
} from "../controllers/member.controller.js";
import { validateBody } from "../middlewares/validate.js";
import { memberCreateSchema, memberUpdateSchema } from "../schemas/member.schema.js";

const r = Router();

r.get("/", listMembers);
r.get("/:id", getMember);
r.post("/", validateBody(memberCreateSchema), createMember);   // 👈 validate
r.put("/:id", validateBody(memberUpdateSchema), updateMember); // 👈 validate
r.delete("/:id", deleteMember);

export default r;
