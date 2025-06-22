

import { GetStaticPaths, GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import categories from '../../../data/categories.json';
import styles from './categories.module.css';

interface Subcategory {
  id: number;
  nume: string;
}

interface Category {
  id: number;
  nume: string;
  subcategorii: Subcategory[];
}

export default function CategoryPage({ category }: { category: Category }) {
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
      <h1 className={styles.title}>{category.nume}</h1>
      
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
        {category.subcategorii.map(sub => (
          <motion.div
            key={sub.id}
            className={styles.card}
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
          >
            <h3>{sub.nume}</h3>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.categorii.map(category => ({
    params: { categoryId: category.id.toString() }
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = categories.categorii.find(
    c => c.id.toString() === params?.categoryId
  );

  return { props: { category } };
};

