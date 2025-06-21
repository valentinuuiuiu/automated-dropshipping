import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { 
    type: String, 
    enum: ['Amazon', 'AliExpress', 'Alibaba'],
    required: true
  },
  price: { type: Number, min: 0 },
  margin: { type: Number, min: 0, max: 100 },
  agentDecisions: [{
    agent: String,
    decision: String,
    timestamp: { type: Date, default: Date.now }
  }],
  warehousePosition: {
    x: Number,
    y: Number,
    z: Number
  }
});

export default mongoose.model('Product', productSchema);
