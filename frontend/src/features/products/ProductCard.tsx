


import { useCredits } from '../../lib/contexts';
import type { Product } from '../../lib/types';

interface ProductCardProps extends Product {
  onClick?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  requiresCredits = 0,
  onClick
}: ProductCardProps) {
  const { canAfford } = useCredits();

  return (
    <div 
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-contain bg-gray-50 p-4"
      />
      <div className="p-4">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-gray-600 mt-1">${price.toLocaleString()}</p>
        {requiresCredits > 0 && (
          <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
            canAfford(requiresCredits) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {requiresCredits} credits to view
          </div>
        )}
      </div>
    </div>
  );
}


