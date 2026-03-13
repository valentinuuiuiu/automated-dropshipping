import { useParams, Link } from 'react-router-dom';
import categories from '../../../data/categories.json';
import styles from '../categories.module.css';

interface Product {
  id: number;
  nume: string;
  pret: number;
  imagine: string;
}

interface SubcategoryData {
  id: number;
  nume: string;
  products?: Array<{
    id: number;
    nume: string;
    pret: number;
    imagine: string;
  }>;
}

interface CategoryData {
  id: number;
  nume: string;
  subcategorii: SubcategoryData[];
}

export default function SubcategoryPage() {
  const { categoryId, subcategoryId } = useParams();

  const category = (categories.categorii as CategoryData[]).find(
    c => c.id.toString() === categoryId
  );

  const subcategory = category?.subcategorii.find(
    s => s.id.toString() === subcategoryId
  );

  if (!category || !subcategory) {
    return <div>Subcategory not found</div>;
  }

  // Mock products for display
  const mockProducts: Product[] = [
    { id: 1, nume: 'Produs Exemplu 1', pret: 199, imagine: 'https://placehold.co/300x200' },
    { id: 2, nume: 'Produs Exemplu 2', pret: 299, imagine: 'https://placehold.co/300x200' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/">Home</Link> &gt;{' '}
        <Link to={`/categories/${categoryId}`}>{category.nume}</Link> &gt;{' '}
        <span>{subcategory.nume}</span>
      </div>

      <h1 className={styles.title}>{subcategory.nume}</h1>

      <div className={styles.grid}>
        {mockProducts.map(product => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.imagine}
              alt={product.nume}
              className={styles.productImage}
            />
            <h3>{product.nume}</h3>
            <p>{product.pret} RON</p>
          </div>
        ))}
      </div>
    </div>
  );
}


