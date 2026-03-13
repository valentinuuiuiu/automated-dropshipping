import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">AI-Powered Dropshipping</h1>
        <p className="hero-subtitle">
          Discover trending products curated by our intelligent agents.
          Automated sourcing, dynamic pricing, and real-time analytics.
        </p>
        <Link to="/products" className="hero-cta">
          Browse Products
        </Link>
      </div>
    </section>
  )
}
