import EmailManager from '../integrations/emailService.js';

describe('EmailManager', () => {
  let emailManager;

  beforeEach(() => {
    emailManager = new EmailManager();
  });

  test('constructor creates instance', () => {
    expect(emailManager).toBeInstanceOf(EmailManager);
  });

  test('sendAgentReport resolves successfully', async () => {
    const result = await emailManager.sendAgentReport('TestAgent', [
      { action: 'sourced', product: 'Widget' }
    ]);
    expect(result).toBeUndefined();
  });

  test('sendAgentReport handles empty actions', async () => {
    await expect(
      emailManager.sendAgentReport('TestAgent', [])
    ).resolves.toBeUndefined();
  });

  test('sendErrorReport resolves successfully', async () => {
    const error = new Error('Test error');
    const result = await emailManager.sendErrorReport('TestAgent', error);
    expect(result).toBeUndefined();
  });

  test('sendErrorReport handles string errors', async () => {
    await expect(
      emailManager.sendErrorReport('TestAgent', 'string error')
    ).resolves.toBeUndefined();
  });
});
