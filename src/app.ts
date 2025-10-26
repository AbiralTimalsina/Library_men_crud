import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'library-crud-men-ts' }));
app.get('/', (req, res) => res.send('Welcome to the Library CRUD API'));

app.use('/api', api);
app.use(errorHandler);

export default app;