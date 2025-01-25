import React, { useState } from 'react';
import './ProcurementDashboard.css';

interface Product {
  name: string;
  supplier: string;
  profitMargin: number;
  amazonPrice: number;
  alibabaMOQ: number;
}

const ProcurementDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExecute = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/agents/procurement/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to execute procurement');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute procurement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="procurement-dashboard">
      <h2>Procurement Dashboard</h2>
      <button 
        onClick={handleExecute} 
        disabled={loading}
        className="execute-button"
      >
        {loading ? 'Processing...' : 'Run Procurement'}
      </button>

      {error && <div className="error">{error}</div>}

      {products.length > 0 && (
        <div className="product-list">
          <h3>Recommended Products</h3>
          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <h4>{product.name}</h4>
                <div className="product-details">
                  <div><strong>Supplier:</strong> {product.supplier}</div>
                  <div><strong>Profit Margin:</strong> {product.profitMargin.toFixed(2)}%</div>
                  <div><strong>Amazon Price:</strong> ${product.amazonPrice.toFixed(2)}</div>
                  <div><strong>MOQ:</strong> {product.alibabaMOQ}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementDashboard;