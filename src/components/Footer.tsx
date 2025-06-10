import { ArrowLeft, ArrowRight, X, Info } from 'lucide-react';
import { Button } from './ui/button';

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

interface StickyFooterProps {
  selectedSkip: Skip | null;
  onContinue: () => void;
  onBack: () => void;
  onClose: () => void;
}

export function StickyFooter({ selectedSkip, onContinue, onBack, onClose }: StickyFooterProps) {
  if (!selectedSkip) return null;
  const disclaimerText = "Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6">
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300"> */}
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Footer content */}
      <div className="relative w-full max-w-4xl animate-in slide-in-from-bottom duration-300 bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl">
        {/* <div className="relative bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl"> */}
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
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-4">
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                className="flex-1 flex items-center justify-center gap-2 rounded-full px-5 sm:px-8 py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                size="lg"
                onClick={onContinue}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-full px-5 sm:px-8 py-3"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* --- Disclaimer Text (Mobile) --- */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  {disclaimerText}
                </p>
              </div>
            </div>

          </div>

          {/* Tablet Layout (640px - 1024px) */}
          <div className="hidden sm:block lg:hidden py-4">
            <div className="flex flex-col gap-4">
              {/* Top row - Skip info with close button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                    <img
                      src={selectedSkip.image}
                      alt={selectedSkip.size}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {selectedSkip.size}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{selectedSkip.period}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">
                        {selectedSkip.price}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Bottom row - Action buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="flex-1 flex items-center justify-center gap-2 min-h-[48px] rounded-full px-5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Waste Type
                </Button>
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 min-h-[48px] rounded-full px-5"
                  disabled={selectedSkip.isRestricted}
                >
                  Continue to Permit Check
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {disclaimerText}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>


          {/* Desktop Layout (>= 1024px) */}
          <div className="hidden lg:block py-6">
            <div className="flex items-center justify-between">
              {/* Selected skip info */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <img
                    src={selectedSkip.image}
                    alt={selectedSkip.size}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900 text-xl">
                      {selectedSkip.size}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{selectedSkip.period}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {selectedSkip.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="flex items-center rounded-full gap-2 px-5 min-h-[48px]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Waste Type
                </Button>
                <Button
                  size="lg"
                  onClick={onContinue}
                  className="flex items-center rounded-full gap-2 bg-blue-600 hover:bg-blue-700 px-5 min-h-[48px]"
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

            {/* Disclaimer - Desktop */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200 rounded-2xl p-5">
              <div className="flex items-start gap-4 max-w-4xl">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {disclaimerText}
                  </p>
                </div>
              </div>
            </div>
            {/* End Disclaimer - Desktop */}

          </div>
        </div>
      </div>
    </div>
  );
}