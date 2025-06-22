

import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useCredits } from '../../src/context/CreditContext';
import SubcategoryPage from '../../src/components/SubcategoryPage';
import categories from '../../src/data/categories.json';

interface SubcategoryProps {
  ads: Array<{
    id: string;
    text: string;
    image: string;
    premium: boolean;
    creditsRequired?: number;
  }>;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    requiresCredits?: number;
  }>;
}

export default function Subcategory({ ads, products }: SubcategoryProps) {
  const router = useRouter();
  const { subcategoryId } = router.query;
  const { credits, deductCredits } = useCredits();

  const handleAdClick = async (ad: SubcategoryProps['ads'][0]) => {
    if (ad.premium && (!ad.creditsRequired || !(await deductCredits(ad.creditsRequired)))) {
      alert(`You need ${ad.creditsRequired} credits to view this premium ad`);
      return;
    }
    // Proceed with ad view
    console.log('Viewing ad:', ad.text);
  };

  return (
    <SubcategoryPage 
      ads={ads.map(ad => ({
        ...ad,
        onClick: () => handleAdClick(ad)
      })} 
      products={products}
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const subcategoryId = parseInt(params?.subcategoryId as string);
  
  // Find matching subcategory data
  let subcategoryData;
  for (const category of categories.categorii) {
    const subcategory = category.subcategorii.find(
      sub => sub.id === subcategoryId
    );
    if (subcategory) {
      subcategoryData = subcategory;
      break;
    }
  }

  if (!subcategoryData) {
    return { notFound: true };
  }

  return {
    props: {
      ads: subcategoryData.ads || [],
      products: subcategoryData.products || []
    },
    revalidate: 60 // ISR: Regenerate every 60 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.categorii.flatMap(category =>
    category.subcategorii.map(subcategory => ({
      params: { subcategoryId: subcategory.id.toString() }
    }))
  );

  return { 
    paths, 
    fallback: 'blocking' // Generate new pages on demand
  };
};

