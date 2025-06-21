import * as dotenv from 'dotenv';
import express from 'express';
import type { Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createClient } from 'redis';
import ProcurementAgent from './agents/procurementAgent.js';
import PricingAgent from './agents/pricingEngine.js';

dotenv.config();

interface BroadcastData {
  type: string;
  data: unknown;
}

const app = express();
const port = process.env.PORT || 3000;
const wss = new WebSocketServer({ port: 8080 });

// Redis Client
export const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
(async () => { await redisClient.connect(); })();

const broadcast = (data: BroadcastData): void => {
  wss.clients.forEach(client => client.send(JSON.stringify(data)));
};

// Agent Orchestration
const agents = {
  procurement: new ProcurementAgent(),
  pricing: new PricingAgent()
};

setInterval(() => {
  agents.procurement.execute()
    .then(products => broadcast({ type: 'PRODUCTS_UPDATE', data: products }));
}, 300000);

// API Endpoints
import agentsRouter from './routes/agents.js';
import productsRouter from './routes/products.js';
import emailRouter from './routes/email.js';

app.use('/api/agents', agentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/email', emailRouter);

app.listen(3001, () => {
  console.log('Orchestrator running on port 3001');
});
