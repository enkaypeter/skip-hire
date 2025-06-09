import { useState } from 'react';
import { ProgressIndicator } from './components/ProgressIndicator';
import { StickyFooter } from './components/StickyFooter';
import { Button } from './components/ui/button'; // Kept for potential future use or if StickyFooter/ProgressIndicator use it indirectly
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Kept for potential future use
import { SkipSelectionPage } from './features/skip-selection/SkipSelectionPage';
import { Skip } from './features/skip-selection/types'; // Import Skip interface

function App() {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleContinue = () => {
    console.log('Continue to permit check with selected skip:', selectedSkip);
  };

  const handleBack = () => {
    console.log('Back to waste type');
  };

  const handleCloseFooter = () => {
    setSelectedSkip(null);
  };

  const handleSkipSelect = (skip: Skip | null) => {
    setSelectedSkip(skip);
  };

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

        <SkipSelectionPage
          selectedSkipId={selectedSkip ? selectedSkip.id : null}
          onSkipSelect={handleSkipSelect}
          onContinueClick={handleContinue} // This continue is for the main page flow after selection
          onBackClick={handleBack}         // This back is for the main page flow before selection
        />

        {/* Sticky Footer */}
        <StickyFooter
          selectedSkip={selectedSkip} // Pass the whole selectedSkip object
          onContinue={handleContinue}  // This continue is for the footer action
          onBack={handleBack}          // This back is for the footer action
          onClose={handleCloseFooter}
        />
      </main>
    </div>
  );
}

export default App;