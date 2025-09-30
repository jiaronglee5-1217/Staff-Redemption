import express from 'express';
import cors from 'cors';
import urlController from './controllers/urlController';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', urlController);

export default app;
