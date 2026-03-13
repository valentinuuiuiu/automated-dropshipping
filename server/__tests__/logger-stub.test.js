import { logger } from '../utils/logger-stub.js';

describe('Logger Stub', () => {
  test('logger has error method', () => {
    expect(typeof logger.error).toBe('function');
  });

  test('logger has info method', () => {
    expect(typeof logger.info).toBe('function');
  });

  test('error method does not throw', () => {
    expect(() => logger.error('test error')).not.toThrow();
  });

  test('info method does not throw', () => {
    expect(() => logger.info('test info')).not.toThrow();
  });
});
