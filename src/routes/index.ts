import { Router } from 'express';
import bookRoutes from './book.routes.js';
import memberRoutes from './member.routes.js';
const api = Router();
api.use('/books', bookRoutes);
api.use('/members', memberRoutes);
export default api;
