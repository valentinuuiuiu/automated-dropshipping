import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <section className="home">
      <Hero />
      <section className="featured-products section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            <div className="featured-product-card">
              <div className="product-image-container">
                <img
                  src="https://placehold.co/600x400"
                  alt="Smart Watch"
                  className="product-image"
                />
                <div className="product-overlay">
                  <Link to="/products/1" className="btn quick-view-btn">
                    View Product
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Smart Watch Pro</h3>
                <p className="product-price">$199.99</p>
                <p className="product-rating">★★★★☆ (4.2)</p>
              </div>
            </div>

            <div className="featured-product-card">
              <div className="product-image-container">
                <img
                  src="https://placehold.co/600x400"
                  alt="Wireless Headphones"
                  className="product-image"
                />
                <div className="product-overlay">
                  <Link to="/products/2" className="btn quick-view-btn">
                    View Product
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">Noise-Cancelling Headphones</h3>
                <p className="product-price">$249.99</p>
                <p className="product-rating">★★★★★ (4.8)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <Link to="/products?category=electronics" className="category-link">
                <div className="category-image-container">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Electronics"
                    className="category-image"
                  />
                  <div className="category-overlay">
                    <span className="btn">Explore Electronics</span>
                  </div>
                </div>
                <h3 className="category-title">Electronics</h3>
              </Link>
            </div>

            <div className="category-card">
              <Link to="/products?category=clothing" className="category-link">
                <div className="category-image-container">
                  <img
                    src="https://placehold.co/600x400"
                    alt="Clothing"
                    className="category-image"
                  />
                  <div className="category-overlay">
                    <span className="btn">Explore Clothing</span>
                  </div>
                </div>
                <h3 className="category-title">Clothing</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
