

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

interface CreditResponse {
  credits?: number;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreditResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { userId } = req.query;

  // Authentication check
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Authorization check
  if (session.user.id !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    switch (req.method) {
      case 'GET':
        // TODO: Replace with actual database call
        return res.status(200).json({ credits: 10 });

      case 'PUT':
        const { credits } = req.body;
        
        // Validation
        if (typeof credits !== 'number' || !Number.isInteger(credits) || credits < 0) {
          return res.status(400).json({ error: 'Invalid credit amount' });
        }

        // TODO: Replace with actual database update
        return res.status(200).json({ credits });

      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Credits API error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}

