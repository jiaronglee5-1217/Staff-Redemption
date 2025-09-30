import { Router } from 'express';
import Url from '../models/Url';
import { generateShortCode } from '../services/urlConversionService';

const controller = Router();

controller.post('/convert', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'originalUrl is required' });
  }

  const shortCode = generateShortCode();

  const url = await Url.create({ originalUrl, shortCode });

  res.json({ shortUrl: `http://localhost:4000/${url.shortCode}` });
});

controller.post('/revert', async (req, res) => {
  const { shortCode } = req.body;

  if (!shortCode) {
    return res.status(400).json({ error: 'shortCode is required' });
  }

  const url = await Url.findOne({ where: { shortCode }})
  res.json({ revertedUrl: url?.originalUrl });
});

controller.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ where: { shortCode } });

  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(url.originalUrl);
});

export default controller;