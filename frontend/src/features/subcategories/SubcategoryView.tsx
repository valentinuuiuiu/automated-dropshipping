


import { useCredits } from '../../lib/contexts';
import AdCard from '../ads/AdCard';
import ProductCard from '../products/ProductCard';
import type { Ad, Product } from '../../lib/types';

interface SubcategoryViewProps {
  ads: Ad[];
  products: Product[];
}

export default function SubcategoryView({ ads, products }: SubcategoryViewProps) {
  const { credits, deductCredits } = useCredits();

  const handleAdClick = async (ad: Ad) => {
    if (ad.premium && ad.creditsRequired) {
      const success = await deductCredits(ad.creditsRequired);
      if (!success) {
        alert(`You need ${ad.creditsRequired} credits (You have ${credits})`);
        return;
      }
    }
    // Proceed with ad view
    console.log('Viewing ad:', ad.text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Advertisements Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Advertisements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map(ad => (
            <AdCard
              key={ad.id}
              {...ad}
              onClick={() => handleAdClick(ad)}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}


