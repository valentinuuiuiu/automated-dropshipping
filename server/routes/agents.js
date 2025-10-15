import express from 'express';
const router = express.Router();

// Mock agent data
const agents = [
  { id: 1, name: 'Procurement Agent', status: 'active' },
  { id: 2, name: 'Pricing Agent', status: 'idle' },
];

router.get('/', (req, res) => {
  res.json(agents);
});

export default router;
