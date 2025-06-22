


import { GetStaticProps, GetStaticPaths } from 'next';
import SubcategoryView from '../../src/features/subcategories/SubcategoryView';
import { Category, Subcategory } from '../../src/lib/types';
import categoriesData from '../../src/data/categories.json';

interface SubcategoryPageProps {
  ads: Subcategory['ads'];
  products: Subcategory['products'];
}

export default function SubcategoryPage({ ads, products }: SubcategoryPageProps) {
  return <SubcategoryView ads={ads} products={products} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = Number(params?.id);
  const categories = categoriesData.categorii as Category[];

  // Find matching subcategory
  let subcategory: Subcategory | undefined;
  for (const category of categories) {
    subcategory = category.subcategories.find(sub => sub.id === categoryId);
    if (subcategory) break;
  }

  if (!subcategory) {
    return { notFound: true };
  }

  return {
    props: {
      ads: subcategory.ads,
      products: subcategory.products
    },
    revalidate: 60 // ISR: Regenerate every 60 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = categoriesData.categorii as Category[];
  const paths = categories.flatMap(category =>
    category.subcategories.map(subcategory => ({
      params: { id: subcategory.id.toString() }
    }))
  );

  return {
    paths,
    fallback: 'blocking' // Generate new pages on demand
  };
};


