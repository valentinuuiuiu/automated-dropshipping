import { Router } from 'express';
import type { Request, Response } from 'express';
import { redisClient } from '../index.js';

const router = Router();

// Send email
router.post('/', async (req: Request, res: Response) => {
  try {
    const { to, subject, body } = req.body;
    
    // Store email in Redis
    const emailId = Date.now().toString();
    await redisClient.hSet('emails', emailId, JSON.stringify({
      to,
      subject,
      body,
      status: 'queued'
    }));
    
    res.json({ 
      message: 'Email queued successfully',
      emailId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to queue email' });
  }
});

// Get email status
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const email = await redisClient.hGet('emails', req.params.id);
    if (email) {
      res.json(JSON.parse(email));
    } else {
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch email status' });
  }
});

export default router;
