import { Link } from 'react-router-dom'
import './ProductCard.css'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    color?: string
    modelUrl?: string
    features?: string[]
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="product-card-link">
      <div className="product-card" style={{ borderTopColor: product.color || '#667eea' }}>
        <div className="product-card-image" style={{ background: product.color || '#667eea' }}>
          <span className="product-card-icon">📦</span>
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-price">${product.price.toFixed(2)}</p>
          {product.features && product.features.length > 0 && (
            <ul className="product-card-features">
              {product.features.slice(0, 2).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  )
}
