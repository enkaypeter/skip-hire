import React from 'react';
import { SkipCard } from '../components/SkipCard';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useSkips } from '../hooks/useSkips';
import { Skip } from '../commons/types';

interface SkipSelectionPageProps {
  onSkipSelect: (skip: Skip | null) => void;
  selectedSkipId: string | null;
  onBackClick: () => void;
}

export const SkipSelectionPage: React.FC<SkipSelectionPageProps> = (props) => {
  const { skips, isLoading, error } = useSkips();
  const { selectedSkipId, onSkipSelect, onBackClick } = props;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-2">Choose Your Skip Size</h1>
      <p className="text-center text-gray-600 mb-8">
        Select the perfect skip size for your needs. If you're unsure, click the details button on any skip for more information.
      </p>

      {isLoading && <p className="text-center">Loading skips...</p>}
      {error && <p className="text-center text-red-500">Error loading skips: {error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {skips.map((skip: Skip) => (
            <SkipCard
              key={skip.id}
              size={skip.size}
              capacity={skip.capacity}
              price={skip.price}
              period={skip.period}
              image={skip.image}
              isRestricted={skip.isRestricted}
              restrictionText={skip.restrictionText}
              isSelected={selectedSkipId === skip.id}
              onSelect={() => onSkipSelect(skip)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" className='rounded-full' onClick={onBackClick}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Waste Type
        </Button>
      </div>
    </div>
  );
};