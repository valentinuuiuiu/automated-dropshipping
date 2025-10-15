import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import mongoose from 'mongoose';
import ProcurementAgent from './agents/procurementAgent.js';
import PricingAgent from './agents/pricingEngine.js';
const app = express();

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Real-time Agent Updates
const wss = new WebSocketServer({ port: 8080 });
const broadcast = (data) => {
  wss.clients.forEach(client => client.send(JSON.stringify(data)));
};

// Agent Orchestration (mocked)
const agents = {
  procurement: new ProcurementAgent(),
  pricing: new PricingAgent()
};

setInterval(() => {
  agents.procurement.findProducts()
    .then(products => broadcast({ type: 'PRODUCTS_UPDATE', data: products }));
}, 300000);

import agentsRouter from './routes/agents.js';
import productsRouter from './routes/products.js';
import emailRouter from './routes/email.js';

// API Endpoints
app.use('/api/agents', agentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/email', emailRouter);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the client's static files
app.use(express.static(path.join(__dirname, '../client/src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src', 'index.html'));
});

app.listen(3001, () => console.log('Orchestrator running on port 3001'));
