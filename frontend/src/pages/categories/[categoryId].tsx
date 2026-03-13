import { useParams } from 'react-router-dom';
import categories from '../../data/categories.json';
import styles from './categories.module.css';

interface Subcategory {
  id: number;
  nume: string;
}

interface CategoryData {
  id: number;
  nume: string;
  subcategorii: Subcategory[];
}

export default function CategoryPage() {
  const { categoryId } = useParams();
  
  const category = (categories.categorii as CategoryData[]).find(
    c => c.id.toString() === categoryId
  );

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{category.nume}</h1>
      
      <div className={styles.grid}>
        {category.subcategorii.map(sub => (
          <div
            key={sub.id}
            className={styles.card}
          >
            <h3>{sub.nume}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

