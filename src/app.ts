import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'library-crud-men-ts' }));
app.get('/', (req, res) => res.send('Welcome to the Library CRUD API'));

export default app;
