import { ProgressIndicator } from '@/components/ProgressIndicator';
import { StickyFooter } from '@/components/Footer';
import usePersistentState from '@/hooks/usePersistentState';
import { SkipSelectionPage } from '@/components/SkipSelectionPage';
import { Skip } from '@/commons/types';

import { 
  MapPin, 
  Trash2, 
  Container,
  ShieldCheck, 
  CalendarDays, 
  CreditCard 
} from 'lucide-react';

function App() {
  const [selectedSkip, setSelectedSkip] = usePersistentState<Skip | null>('selectedSkipData', null);

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
    { id: 'postcode', title: 'Postcode', icon: MapPin, completed: true, current: false },
    { id: 'wastetype', title: 'Waste Type', icon: Trash2, completed: true, current: false },
    { id: 'selectskip', title: 'Select Skip', icon: Container, completed: false, current: true },
    { id: 'permit', title: 'Permit Check', icon: ShieldCheck,  completed: false, current: false },
    { id: 'date', title: 'Choose Date', icon: CalendarDays, completed: false, current: false },
    { id: 'payment', title: 'Payment', icon: CreditCard, completed: false, current: false },
  ];


  const handleSkipSelect = (skip: Skip | null) => {
    setSelectedSkip(skip);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
      <main className="container w-full max-w-6xl p-6 sm:p-8 lg:py-12">
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
