import express, { Router } from 'express';
import { staffRedeem } from '../services/redemptionService';

const controller = Router();

controller.post('/upload-csv', express.raw({ type: 'text/csv', limit: '50mb' }), async (req, res) => {
  const csvBuffer = req.body;
  const csvString = csvBuffer.toString('utf-8');

  const response = await staffRedeem(csvString)
  res.json({ result: response });
});

export default controller;