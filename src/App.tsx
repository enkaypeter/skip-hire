import { useState } from 'react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StickyFooter } from './components/StickyFooter';
import { SkipSelectionPage } from './components/SkipSelectionPage';

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
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleContinue = () => {
    console.log('Continue to permit check');
  };

  const handleBack = () => {
    console.log('Back to waste type');
    setSelectedSkip(null);
  };

  const handleCloseFooter = () => {
    setSelectedSkip(null);
  };

  const steps = [
    { id: 'postcode', title: 'Postcode', completed: true, current: false },
    { id: 'wastetype', title: 'Waste Type', completed: true, current: false },
    { id: 'selectskip', title: 'Select Skip', completed: false, current: true },
    { id: 'permit', title: 'Permit Check', completed: false, current: false },
    { id: 'date', title: 'Choose Date', completed: false, current: false },
    { id: 'payment', title: 'Payment', completed: false, current: false },
  ];


  const handleSkipSelect = (skip: Skip | null) => {
    setSelectedSkip(skip);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <ProgressIndicator steps={steps} />

        <SkipSelectionPage
          selectedSkipId={selectedSkip ? selectedSkip.id : null}
          onSkipSelect={handleSkipSelect}
          onBackClick={handleBack}
        />    

        <StickyFooter
          selectedSkip={selectedSkip}
          onContinue={handleContinue}
          onBack={handleBack}
          onClose={handleCloseFooter}
        />
      </main>
    </div>
  );
}

export default App;