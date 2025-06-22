


import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Subcategory } from '../../../lib/types';
import categoriesData from '../../../data/categories.json';

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Subcategory | ErrorResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  const { id } = req.query;

  // Authentication check
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const subcategoryId = Number(id);
    if (isNaN(subcategoryId)) {
      return res.status(400).json({ error: 'Invalid subcategory ID' });
    }

    // Find matching subcategory
    let subcategory: Subcategory | undefined;
    for (const category of categoriesData.categorii) {
      subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
      if (subcategory) break;
    }

    if (!subcategory) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    return res.status(200).json(subcategory);
  } catch (error) {
    console.error('Subcategory API error:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
}


