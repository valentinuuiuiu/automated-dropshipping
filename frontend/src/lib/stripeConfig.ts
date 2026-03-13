// Stripe configuration placeholder
// In production, replace with actual Stripe integration

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';

export const initializeStripe = async () => {
  if (!STRIPE_KEY) {
    console.warn('Stripe publishable key not configured');
    return null;
  }
  // In production, dynamically import and initialize Stripe
  return null;
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
  _userId: string
): Promise<void> => {
  const stripe = await initializeStripe();
  if (!stripe) throw new Error('Stripe not configured. Set VITE_STRIPE_PUBLISHABLE_KEY.');

  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId,
        redirectUrl: window.location.href
      })
    });

    const data = await response.json();
    console.log('Checkout session created:', data);
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


