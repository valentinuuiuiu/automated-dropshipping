import PricingAgent from '../agents/pricingEngine.js';

describe('PricingAgent', () => {
  let agent;

  beforeEach(() => {
    agent = new PricingAgent();
  });

  test('constructor creates instance with strategies array', () => {
    expect(agent).toBeInstanceOf(PricingAgent);
    expect(Array.isArray(agent.strategies)).toBe(true);
  });

  test('optimizePricing throws on invalid productId', async () => {
    await expect(agent.optimizePricing(null)).rejects.toThrow('Invalid product ID');
    await expect(agent.optimizePricing('')).rejects.toThrow('Invalid product ID');
    await expect(agent.optimizePricing(123)).rejects.toThrow('Invalid product ID');
  });

  test('applyPricing throws on invalid strategy', () => {
    expect(() => agent.applyPricing(null)).toThrow('Invalid pricing strategy format');
    expect(() => agent.applyPricing('string')).toThrow('Invalid pricing strategy format');
  });

  test('applyPricing throws on missing required fields', () => {
    expect(() => agent.applyPricing({ optimal_price: 100 })).toThrow('Missing required field');
    expect(() => agent.applyPricing({ optimal_price: 100, dynamic_pricing_strategy: 'x' })).toThrow('Missing required field: promotional_calendar');
  });

  test('applyPricing succeeds with valid strategy', async () => {
    const strategy = {
      optimal_price: 99.99,
      dynamic_pricing_strategy: 'competitive',
      promotional_calendar: [{ month: 'Jan', discount: 10 }]
    };
    const result = await agent.applyPricing(strategy);
    expect(result).toHaveProperty('success', true);
  });
});
