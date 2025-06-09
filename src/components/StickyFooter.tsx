import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { Skip } from '../features/skip-selection/types';

interface StickyFooterProps {
  selectedSkip: Skip | null;
  onContinue: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function StickyFooter({ selectedSkip, onContinue, onBack, onClose }: StickyFooterProps) {
  if (!selectedSkip) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Footer content */}
      <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="block sm:hidden py-4">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Selected skip info */}
            <div className="flex items-center gap-3 mb-4 pr-12">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                <img
                  src={selectedSkip.image}
                  alt={selectedSkip.size}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm truncate">
                  {selectedSkip.size}
                </h3>
                <p className="text-xs text-gray-600">{selectedSkip.period}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-blue-600">{selectedSkip.price}</span>
                  {selectedSkip.isRestricted && (
                    <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      Restricted
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={onContinue}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
                disabled={selectedSkip.isRestricted}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden sm:block py-4 lg:py-6">
            <div className="flex items-center justify-between">
              {/* Selected skip info */}
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="w-20 h-16 lg:w-24 lg:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <img
                    src={selectedSkip.image}
                    alt={selectedSkip.size}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900 text-lg lg:text-xl">
                      {selectedSkip.size}
                    </h3>
                    {selectedSkip.isRestricted && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                        {selectedSkip.restrictionText}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{selectedSkip.period}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl lg:text-3xl font-bold text-blue-600">
                      {selectedSkip.price}
                    </span>
                    <span className="text-sm text-gray-500">inc. VAT</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="flex items-center gap-2 px-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Waste Type
                </Button>
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-8"
                  disabled={selectedSkip.isRestricted}
                >
                  Continue to Permit Check
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-2"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}