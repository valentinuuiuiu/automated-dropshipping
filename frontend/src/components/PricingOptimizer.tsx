import React, { useState } from 'react';
import './PricingOptimizer.css';

const PricingOptimizer: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [result, setResult] = useState<{
    optimal_price: number;
    dynamic_pricing_strategy: string;
    promotional_calendar: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    if (!productId) {
      setError('Please enter a product ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agents/pricing/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to optimize pricing');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to optimize pricing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pricing-optimizer">
      <h2>Pricing Optimization</h2>
      <div className="input-group">
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter product ID"
        />
        <button onClick={handleOptimize} disabled={loading}>
          {loading ? 'Optimizing...' : 'Optimize Pricing'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h3>Optimization Results</h3>
          <div className="result-item">
            <strong>Optimal Price:</strong> ${result.optimal_price}
          </div>
          <div className="result-item">
            <strong>Strategy:</strong> {result.dynamic_pricing_strategy}
          </div>
          <div className="result-item">
            <strong>Promotions:</strong> {result.promotional_calendar}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingOptimizer;