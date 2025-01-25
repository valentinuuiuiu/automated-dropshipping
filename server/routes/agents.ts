import { Router } from 'express';
import type { Request, Response } from 'express';
import { redisClient } from '../index';
import PricingAgent from '../agents/pricingEngine';
import ProcurementAgent from '../agents/procurementAgent';

const router = Router();
const pricingAgent = new PricingAgent();
const procurementAgent = new ProcurementAgent();

// Pricing endpoints
router.post('/pricing/optimize', async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }
    
    const result = await pricingAgent.optimizePricing(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Procurement endpoints
router.post('/procurement/execute', async (req: Request, res: Response) => {
  try {
    const result = await procurementAgent.execute();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Get all agents
router.get('/', async (req: Request, res: Response) => {
  try {
    const agents = await redisClient.hGetAll('agents');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
});

// Get agent by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const agent = await redisClient.hGet('agents', req.params.id);
    if (agent) {
      res.json(JSON.parse(agent));
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch agent' });
  }
});

export default router;
