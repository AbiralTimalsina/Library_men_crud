import { model, Schema } from 'mongoose';
const memberSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String }
}, { timestamps: true });
export type MemberDoc = { _id: string; fullName: string; email: string; phone?: string };
export default model('Member', memberSchema);
