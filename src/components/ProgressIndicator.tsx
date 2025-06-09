import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

export function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 sm:mb-12">
      {/* Mobile Progress - Simplified */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Step {steps.findIndex(s => s.current) + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {steps.find(s => s.current)?.title}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((steps.findIndex(s => s.current) + 1) / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>

      {/* Desktop Progress - Full Steps */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    step.completed
                      ? "bg-blue-600 border-blue-600 text-white"
                      : step.current
                      ? "bg-blue-50 border-blue-600 text-blue-600"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                  )}
                >
                  {step.completed ? (
                    <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                  ) : (
                    <span className="text-xs lg:text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs lg:text-sm font-medium transition-colors duration-300 text-center max-w-[80px] lg:max-w-none",
                    step.completed || step.current
                      ? "text-blue-600"
                      : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 lg:w-16 h-0.5 mx-2 lg:mx-4 transition-colors duration-300",
                    steps[index + 1].completed || step.completed
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}