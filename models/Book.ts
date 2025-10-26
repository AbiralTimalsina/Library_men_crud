import { model, Schema } from 'mongoose';
const bookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, required: true, unique: true, index: true },
  category: { type: String, default: 'General' },
  copies: { type: Number, default: 1, min: 0 }
}, { timestamps: true });
export type BookDoc = { _id: string; title: string; author: string; isbn: string; category?: string; copies: number };
export default model('Book', bookSchema);
