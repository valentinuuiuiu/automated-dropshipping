

import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import { demoProducts } from '../../data/products'
import styles from './Products.module.css'

export function ProductsPage() {
  const [products] = useState(demoProducts)

  return (
    <div className={styles.container}>
      <h1>Our Products</h1>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export { ProductsPage as default }

