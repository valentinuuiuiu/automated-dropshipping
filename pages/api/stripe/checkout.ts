


import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { creditPackages } from '../../../../frontend/src/lib/stripeConfig';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-08-16',
  typescript: true
});

interface CheckoutRequest {
  packageId: string;
  userId: string;
  redirectUrl: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { packageId, userId, redirectUrl }: CheckoutRequest = req.body;
    
    // Validate package
    const creditPackage = creditPackages.find(p => p.id === packageId);
    if (!creditPackage) {
      return res.status(400).json({ error: 'Invalid credit package' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${creditPackage.credits} Credits Package`,
            description: `Get ${creditPackage.credits} credits${creditPackage.bonus ? ` + ${creditPackage.bonus} bonus` : ''}`
          },
          unit_amount: creditPackage.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${redirectUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${redirectUrl}?canceled=true`,
      metadata: {
        user_id: userId,
        credit_amount: String(creditPackage.credits + (creditPackage.bonus || 0)),
        package_id: packageId
      }
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      details: err instanceof Error ? err.message : String(err)
    });
  }
}


