import { DeepseekLLM } from '../agents/deepseek-stub.js';

describe('DeepseekLLM', () => {
  let llm;

  beforeEach(() => {
    llm = new DeepseekLLM('test-api-key');
  });

  test('constructor creates instance', () => {
    expect(llm).toBeInstanceOf(DeepseekLLM);
  });

  test('generate returns valid JSON string', async () => {
    const result = await llm.generate('test prompt');
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.length).toBeGreaterThan(0);
  });

  test('generate returns products with expected fields', async () => {
    const result = await llm.generate('test prompt');
    const parsed = JSON.parse(result);
    parsed.forEach(product => {
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('supplier');
      expect(product).toHaveProperty('profitMargin');
      expect(typeof product.profitMargin).toBe('number');
    });
  });

  test('generate accepts options parameter', async () => {
    const result = await llm.generate('test prompt', { temperature: 0.5, maxTokens: 1000 });
    const parsed = JSON.parse(result);
    expect(Array.isArray(parsed)).toBe(true);
  });

  test('generate works without options parameter', async () => {
    const result = await llm.generate('test prompt');
    expect(typeof result).toBe('string');
  });
});
