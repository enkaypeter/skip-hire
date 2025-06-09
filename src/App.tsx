import { useState, useEffect } from 'react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { SkipCard } from './components/SkipCard';
import { StickyFooter } from './components/StickyFooter';
import { Button } from './components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Skip {
  id: string;
  size: string;
  capacity: string;
  price: string;
  period: string;
  image: string;
  isRestricted?: boolean;
  restrictionText?: string;
}

function App() {
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const selectedSkipData = skips.find(skip => skip.id === selectedSkip);
  const handleContinue = () => {
    console.log('Continue to permit check');
  };

  const handleBack = () => {
    console.log('Back to waste type');
  };

  const handleCloseFooter = () => {
    setSelectedSkip(null);
  };
  useEffect(() => {
    const fetchSkips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error(response.statusText || 'Failed to fetch skips data');
        }
        const apiData = await response.json();
        const transformedSkips = apiData.map((apiSkip: any) => {
          const price_before_vat = parseFloat(apiSkip.price_before_vat);
          const vat = parseFloat(apiSkip.vat);
          const totalPrice = price_before_vat * (1 + vat / 100);
          const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${apiSkip.size}-yarder-skip.jpg`;
          return {
            id: String(apiSkip.id),
            size: `${apiSkip.size} Yard Skip`,
            capacity: `${apiSkip.size} Yards`,
            price: `£${totalPrice.toFixed(0)}`,
            period: `${apiSkip.hire_period_days} day hire period`,
            image: imageUrl,
            isRestricted: !apiSkip.allowed_on_road,
            restrictionText: !apiSkip.allowed_on_road ? "Not Allowed On The Road" : undefined,
          };
        });
        setSkips(transformedSkips);
      } catch (err: any) {
        setError(err.message || "Failed to fetch skips");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const steps = [
    { id: 'postcode', title: 'Postcode', completed: true, current: false },
    { id: 'wastetype', title: 'Waste Type', completed: true, current: false },
    { id: 'selectskip', title: 'Select Skip', completed: false, current: true },
    { id: 'permit', title: 'Permit Check', completed: false, current: false },
    { id: 'date', title: 'Choose Date', completed: false, current: false },
    { id: 'payment', title: 'Payment', completed: false, current: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <ProgressIndicator steps={steps} />

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-sky-700 mb-3 sm:mb-4">
            Choose Your Skip Size
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Select the skip size that best suits your needs. All prices include delivery,
            collection, and disposal fees for a 14-day hire period.
          </p>
        </div>

        {/* Skip Grid - Responsive Layout */}
        {isLoading && <div className="text-center p-10">Loading skips...</div>}
        {error && <div className="text-center p-10 text-red-600">Error: {error}</div>}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {skips.map((skip) => (
              <SkipCard
                key={skip.id}
                size={skip.size}
                capacity={skip.capacity}
                price={skip.price}
                period={skip.period}
                image={skip.image}
                isSelected={selectedSkip === skip.id}
                isRestricted={skip.isRestricted}
                restrictionText={skip.restrictionText}
                onSelect={() => setSelectedSkip(skip.id)}
              />
            ))}
          </div>
        )}

        {/* Action Buttons - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="flex items-center justify-center gap-2 w-full sm:w-auto order-2 sm:order-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Waste Type</span>
            <span className="sm:hidden">Back</span>
          </Button>

          <Button
            size="lg"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2"
            disabled={!selectedSkip}
          >
            <span className="hidden sm:inline">Continue to Permit Check</span>
            <span className="sm:hidden">Continue</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Sticky Footer */}
        <StickyFooter
          selectedSkip={selectedSkipData || null}
          onContinue={handleContinue}
          onBack={handleBack}
          onClose={handleCloseFooter}
        />
      </main>
    </div>
  );
}

export default App;