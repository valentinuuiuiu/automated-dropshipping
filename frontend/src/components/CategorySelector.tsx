import { useState } from 'react'
import './CategorySelector.css'

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'home', name: 'Home & Garden' },
]

export function CategorySelector() {
  const [active, setActive] = useState('all')

  return (
    <div className="category-selector">
      <div className="category-selector-inner">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${active === cat.id ? 'active' : ''}`}
            onClick={() => setActive(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
