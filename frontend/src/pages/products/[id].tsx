


import { useParams } from 'react-router-dom'
import { demoProducts } from '../../data/products'
import ModelLoader from '../../components/ModelLoader'
import styles from './ProductDetail.module.css'

export function ProductDetailPage() {
  const { id } = useParams()
  const product = demoProducts.find(p => p.id === id)

  if (!product) return <div>Product not found</div>

  return (
    <div className={styles.container}>
      <h1>{product.name}</h1>
      <div className={styles.detailGrid}>
        <div className={styles.modelViewer}>
          <ModelLoader 
            modelUrl={product.modelUrl}
            scale={0.8}
          />
        </div>
        <div className={styles.productInfo}>
          <h2>${product.price.toFixed(2)}</h2>
          <ul className={styles.features}>
            {product.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
          <button className={styles.addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export { ProductDetailPage as default }


