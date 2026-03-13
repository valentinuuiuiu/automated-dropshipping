import UnifiedAPI from '../integrations/marketplace-stub.js';

describe('UnifiedAPI (marketplace-stub)', () => {
  let api;

  beforeEach(() => {
    api = new UnifiedAPI();
  });

  test('getCompetitorPrices returns amazon price', async () => {
    const result = await api.getCompetitorPrices('test-product');
    expect(result).toHaveProperty('amazon');
    expect(typeof result.amazon).toBe('number');
    expect(result.amazon).toBe(100);
  });

  test('getProductDetails returns minOrderQuantity', async () => {
    const result = await api.getProductDetails('alibaba', 'test-product');
    expect(result).toHaveProperty('minOrderQuantity');
    expect(typeof result.minOrderQuantity).toBe('number');
    expect(result.minOrderQuantity).toBe(10);
  });

  test('getProductCost returns a number', async () => {
    const result = await api.getProductCost('test-product');
    expect(typeof result).toBe('number');
    expect(result).toBe(70);
  });

  test('updatePricing returns success with data', async () => {
    const pricingData = { price: 99.99, strategy: 'competitive' };
    const result = await api.updatePricing(pricingData);
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('price', 99.99);
    expect(result).toHaveProperty('strategy', 'competitive');
  });
});
