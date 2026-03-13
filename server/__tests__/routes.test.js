import express from 'express';
import request from 'supertest';
import agentsRouter from '../routes/agents.js';
import emailRouter from '../routes/email.js';

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/agents', agentsRouter);
  app.use('/api/email', emailRouter);
  return app;
}

describe('Agents Routes', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('GET /api/agents returns agent list', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(agent => {
      expect(agent).toHaveProperty('id');
      expect(agent).toHaveProperty('name');
      expect(agent).toHaveProperty('status');
    });
  });

  test('GET /api/agents returns agents with correct structure', async () => {
    const res = await request(app).get('/api/agents');
    expect(res.status).toBe(200);
    const agent = res.body[0];
    expect(typeof agent.id).toBe('number');
    expect(typeof agent.name).toBe('string');
    expect(typeof agent.status).toBe('string');
  });
});

describe('Email Routes', () => {
  let app;

  beforeEach(() => {
    app = createApp();
  });

  test('POST /api/email/send-report sends report', async () => {
    const res = await request(app)
      .post('/api/email/send-report')
      .send({
        agentName: 'TestAgent',
        actions: [{ type: 'test', description: 'test action' }]
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Email report sent successfully.');
  });

  test('POST /api/email/send-report handles missing body gracefully', async () => {
    const res = await request(app)
      .post('/api/email/send-report')
      .send({});
    expect(res.status).toBe(200);
  });
});
