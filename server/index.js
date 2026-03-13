import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import ProcurementAgent from './agents/procurementAgent.js';
import PricingAgent from './agents/pricingEngine.js';
import path from 'path';
import { fileURLToPath } from 'url';
import agentsRouter from './routes/agents.js';
import productsRouter from './routes/products.js';
import emailRouter from './routes/email.js';

const app = express();
app.use(express.json());

// Database Connection (optional - only connects if MONGODB_URI is set)
if (process.env.MONGODB_URI) {
  import('mongoose').then(mongoose => {
    mongoose.default.connect(process.env.MONGODB_URI).then(() => {
      console.log('Connected to MongoDB');
    }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
  });
}

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

// API Endpoints
app.use('/api/agents', agentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/email', emailRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the client's static files
app.use(express.static(path.join(__dirname, '../client/src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src', 'index.html'));
});

app.listen(3001, () => console.log('Orchestrator running on port 3001'));
