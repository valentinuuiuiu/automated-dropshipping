import React, { useState } from 'react';
import './Products.css';

const Products: React.FC = () => {
  const [productDetails, setProductDetails] = useState<{ [key: string]: string }>({});

  const handleViewDetails = (productId: string) => {
    setProductDetails((prevDetails: { [key: string]: string }) => ({
      ...prevDetails,
      [productId]: `This is a detailed description for product ${productId}.`,
    }));
  };

  return (
    <section className="products section">
      <div className="container">
        <h1 className="section-title">Our Products</h1>
      <div className="product-grid">
        <div className="product-card">
          <div className="product-image-container">
            <img
              src="https://placehold.co/600x400"
              alt="Product 1"
              className="product-image"
            />
            <div className="product-overlay">
              <button className="btn quick-view-btn" onClick={() => handleViewDetails('1')}>Quick View</button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Premium Smart Watch</h3>
            <p className="product-price">$199.99</p>
            <p className="product-rating">★★★★☆ (4.2)</p>
            {productDetails['1'] && <p className="product-description">{productDetails['1']}</p>}
          </div>
        </div>

        <div className="product-card">
          <div className="product-image-container">
            <img
              src="https://placehold.co/600x400"
              alt="Product 2"
              className="product-image"
            />
            <div className="product-overlay">
              <button className="btn quick-view-btn" onClick={() => handleViewDetails('2')}>Quick View</button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Wireless Noise-Cancelling Headphones</h3>
            <p className="product-price">$249.99</p>
            <p className="product-rating">★★★★★ (4.8)</p>
            {productDetails['2'] && <p className="product-description">{productDetails['2']}</p>}
          </div>
        </div>

        <div className="product-card">
          <div className="product-image-container">
            <img
              src="https://placehold.co/600x400"
              alt="Product 3"
              className="product-image"
            />
            <div className="product-overlay">
              <button className="btn quick-view-btn" onClick={() => handleViewDetails('3')}>Quick View</button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">4K Action Camera</h3>
            <p className="product-price">$299.99</p>
            <p className="product-rating">★★★★☆ (4.5)</p>
            {productDetails['3'] && <p className="product-description">{productDetails['3']}</p>}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Products;