


import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import categories from '../../../../data/categories.json';
import styles from '../../categories.module.css';

interface Product {
  id: number;
  nume: string;
  pret: number;
  imagine: string;
}

interface SubcategoryPageProps {
  categoryName: string;
  subcategory: {
    id: number;
    nume: string;
    produse: Product[];
  };
}

export default function SubcategoryPage({ 
  categoryName,
  subcategory 
}: SubcategoryPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <div className={styles.breadcrumbs}>
        <span onClick={() => router.push('/')}>Home</span> &gt; 
        <span onClick={() => router.push(`/categories/${router.query.categoryId}`)}>
          {categoryName}
        </span> &gt; 
        <span>{subcategory.nume}</span>
      </div>

      <h1 className={styles.title}>{subcategory.nume}</h1>
      
      <motion.div 
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {subcategory.produse?.map(product => (
          <motion.div
            key={product.id}
            className={styles.card}
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
          >
            <img 
              src={product.imagine} 
              alt={product.nume}
              className={styles.productImage}
            />
            <h3>{product.nume}</h3>
            <p>{product.pret} RON</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.categorii.flatMap(category =>
    category.subcategorii.map(sub => ({
      params: { 
        categoryId: category.id.toString(),
        subcategoryId: sub.id.toString() 
      }
    }))
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = categories.categorii.find(
    c => c.id.toString() === params?.categoryId
  );
  
  const subcategory = category?.subcategorii.find(
    s => s.id.toString() === params?.subcategoryId
  );

  // TODO: Replace with actual product fetching
  const mockProducts = [
    { id: 1, nume: 'Produs Exemplu 1', pret: 199, imagine: '/placeholder-product.jpg' },
    { id: 2, nume: 'Produs Exemplu 2', pret: 299, imagine: '/placeholder-product.jpg' }
  ];

  return { 
    props: { 
      categoryName: category?.nume || '',
      subcategory: {
        ...subcategory,
        produse: mockProducts
      } 
    } 
  };
};


