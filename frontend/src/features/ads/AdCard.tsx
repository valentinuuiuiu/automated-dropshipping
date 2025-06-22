

import { CreditContext } from '../../lib/contexts';
import { useContext } from 'react';

interface AdCardProps {
  id: string;
  text: string;
  image: string;
  premium: boolean;
  creditsRequired?: number;
  onClick?: () => void;
}

export default function AdCard({
  id,
  text,
  image,
  premium,
  creditsRequired,
  onClick
}: AdCardProps) {
  const { canAfford } = useContext(CreditContext);

  return (
    <div 
      className={`border rounded-lg overflow-hidden transition-shadow ${
        premium ? 'border-yellow-400 shadow-lg' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <img
        src={image}
        alt={text}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium">{text}</h3>
        {premium && creditsRequired && (
          <div className={`mt-2 text-sm px-2 py-1 rounded inline-block ${
            canAfford(creditsRequired) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {creditsRequired} credits required
          </div>
        )}
      </div>
    </div>
  );
}

