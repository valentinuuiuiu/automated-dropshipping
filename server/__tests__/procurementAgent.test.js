import ProcurementAgent from '../agents/procurementAgent.js';

describe('ProcurementAgent', () => {
  let agent;

  beforeEach(() => {
    agent = new ProcurementAgent();
  });

  test('constructor creates instance with expected properties', () => {
    expect(agent).toBeInstanceOf(ProcurementAgent);
    expect(agent.rateLimit).toBe(100);
    expect(typeof agent.lastCallTime).toBe('number');
  });

  test('rateLimitedCall executes the function', async () => {
    let called = false;
    const fn = () => { called = true; return Promise.resolve('result'); };
    const result = await agent.rateLimitedCall(fn);
    expect(called).toBe(true);
    expect(result).toBe('result');
  });

  test('findProducts calls execute and returns array', async () => {
    const result = await agent.findProducts();
    expect(Array.isArray(result)).toBe(true);
  });

  test('execute returns filtered products', async () => {
    const result = await agent.execute();
    expect(Array.isArray(result)).toBe(true);
  });
});
