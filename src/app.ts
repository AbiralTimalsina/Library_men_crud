import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import api from './routes/index.js';
import { errorHandler } from './middlewares/error.js';

const swaggerPath = path.resolve(process.cwd(), 'docs/openapi.yaml');
const swaggerDocument = YAML.load(swaggerPath);

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/health', (req, res) => res.json({ status: 'ok', service: 'library-crud-men-ts' }));
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', api);
app.use(errorHandler);

export default app;
