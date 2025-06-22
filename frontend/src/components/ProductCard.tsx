
import { useCart } from '../hooks/useCart'
import styles from './ProductCard.module.css'

interface Product {
  id: string
  name: string
  price: number
  thumbnail: string
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <div className={styles.card}>
      <img 
        src={product.thumbnail} 
        alt={product.name}
        className={styles.thumbnail}
      />
      <div className={styles.info}>
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
        <button 
          className={styles.addButton}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
