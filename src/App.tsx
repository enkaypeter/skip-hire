import React, { useState } from 'react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { SkipCard } from './components/SkipCard';
import { Button } from './components/ui/button';
import { ArrowLeft, ArrowRight, Truck, Menu, X } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const steps = [
    { id: 'postcode', title: 'Postcode', completed: true, current: false },
    { id: 'wastetype', title: 'Waste Type', completed: true, current: false },
    { id: 'selectskip', title: 'Select Skip', completed: false, current: true },
    { id: 'permit', title: 'Permit Check', completed: false, current: false },
    { id: 'date', title: 'Choose Date', completed: false, current: false },
    { id: 'payment', title: 'Payment', completed: false, current: false },
  ];

  const skips: Skip[] = [
    {
      id: '4-yard',
      size: '4 Yard Skip',
      capacity: '4 Yards',
      price: '£211',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '5-yard',
      size: '5 Yard Skip',
      capacity: '5 Yards',
      price: '£241',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '6-yard',
      size: '6 Yard Skip',
      capacity: '6 Yards',
      price: '£264',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '8-yard',
      size: '8 Yard Skip',
      capacity: '8 Yards',
      price: '£299',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '10-yard',
      size: '10 Yard Skip',
      capacity: '10 Yards',
      price: '£366',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
      isRestricted: true,
      restrictionText: 'Not Allowed On The Road',
    },
    {
      id: '12-yard',
      size: '12 Yard Skip',
      capacity: '12 Yards',
      price: '£399',
      period: '14 day hire period',
      image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=400',
      isRestricted: true,
      restrictionText: 'Not Allowed On The Road',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      {/* <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"> */}
  

      {/* Main Content */}
    
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <ProgressIndicator steps={steps} />

        <div className="text-center mb-8 sm:mb-12">
          {/* <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-sky-700 mb-3 sm:mb-4"> */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Choose Your Skip Size
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Select the skip size that best suits your needs. All prices include delivery, 
            collection, and disposal fees for a 14-day hire period.
          </p>
        </div>

        {/* Skip Grid - Responsive Layout */}
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
      </main>
    </div>
  );
}

export default App;