


import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

export const initializeStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_KEY);
  }
  return stripePromise;
};

interface CreditPackage {
  id: string;
  credits: number;
  amount: number; // in cents
  bonus?: number;
}

export const creditPackages: CreditPackage[] = [
  { id: 'basic', credits: 5, amount: 500 }, // $5
  { id: 'standard', credits: 12, amount: 1000, bonus: 2 }, // $10 (+2 bonus)
  { id: 'premium', credits: 30, amount: 2000, bonus: 10 } // $20 (+10 bonus)
];

export const initiateCreditPurchase = async (
  packageId: string,
  userId: string
): Promise<void> => {
  const stripe = await initializeStripe();
  if (!stripe) throw new Error('Stripe failed to initialize');

  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId,
        userId,
        redirectUrl: window.location.href
      })
    });

    const { sessionId } = await response.json();
    await stripe.redirectToCheckout({ sessionId });
  } catch (error) {
    console.error('Purchase failed:', error);
    throw error;
  }
};

// Ad promotion pricing
export const AD_PROMOTION_COST = 0.5; // credits
export const AD_PLACEMENTS = {
  TOP: 'top',
  URGENT: 'urgent',
  HIGHLIGHT: 'highlight'
};


