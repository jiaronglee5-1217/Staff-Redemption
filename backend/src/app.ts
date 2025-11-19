import express from 'express';
import cors from 'cors';
import redemptionController from './controllers/redemptionController';

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api', redemptionController);

export default app;
