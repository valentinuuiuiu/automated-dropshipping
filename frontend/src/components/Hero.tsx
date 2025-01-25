import React, { useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  useEffect(() => {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.classList.add('animate-in');
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-line">Your One-Stop</span>
          <span className="title-line">Dropshipping Solution</span>
        </h1>
        <p className="hero-subtitle">
          Start your online store today and discover the world of dropshipping.
        </p>
        <a href="/about" className="hero-button">
          <span>Learn More</span>
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
