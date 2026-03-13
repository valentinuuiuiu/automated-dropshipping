import UnifiedAPI from '../integrations/marketplaceAPI.js';

describe('UnifiedAPI (marketplaceAPI)', () => {
  let api;

  beforeEach(() => {
    api = new UnifiedAPI();
  });

  test('getProductDetails returns product data', async () => {
    const result = await api.getProductDetails('amazon', 'prod-1');
    expect(result).toHaveProperty('id', 'prod-1');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('price');
    expect(result).toHaveProperty('description');
    expect(typeof result.price).toBe('number');
  });

  test('getCompetitorPrices returns competitor array', async () => {
    const result = await api.getCompetitorPrices('prod-1');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    result.forEach(competitor => {
      expect(competitor).toHaveProperty('competitor');
      expect(competitor).toHaveProperty('price');
      expect(typeof competitor.price).toBe('number');
    });
  });

  test('getProductCost returns a number', async () => {
    const result = await api.getProductCost('prod-1');
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
  });

  test('updatePricing returns success with data', async () => {
    const pricingData = { price: 120, strategy: 'premium', promotions: [] };
    const result = await api.updatePricing(pricingData);
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('price', 120);
    expect(result).toHaveProperty('strategy', 'premium');
  });
});
