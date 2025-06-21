import { Router } from 'express';
import type { Request, Response } from 'express';
import { redisClient } from '../index.js';

const router = Router();

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await redisClient.hGetAll('products');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await redisClient.hGet('products', req.params.id);
    if (product) {
      res.json(JSON.parse(product));
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
