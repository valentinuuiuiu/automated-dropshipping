
import { useState } from 'react';
import { useProductFilter } from '../../hooks/useProductFilter';
import categorii from '../../data/categories.json';
import styles from './CategorySelector.ro.module.css';

export function CategorySelector() {
  const { filterProducts } = useProductFilter();
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    filterProducts({ category: categoryId });
  };

  return (
    <div className={styles.wrapper}>
      <button 
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? '× Închide' : '☰ Categorii'} 
      </button>
      
      <div className={`${styles.categoriiContainer} ${isMobileOpen ? styles.open : ''}`}>
        {categorii.categorii.map(categorie => (
          <div key={categorie.id} className={styles.categoryGroup}>
            <h3 
              className={activeCategory === categorie.id ? styles.activeCategory : ''}
              onClick={() => handleCategorySelect(categorie.id)}
            >
              {categorie.nume}
            </h3>
            <ul>
              {categorie.subcategorii.map(sub => (
                <li 
                  key={sub.id}
                  className={activeCategory === sub.id ? styles.activeSubcategory : ''}
                  onClick={() => handleCategorySelect(sub.id)}
                >
                  {sub.nume}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
