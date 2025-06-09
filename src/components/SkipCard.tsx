import { ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkipCardProps {
  size: string;
  capacity: string;
  price: string;
  period: string;
  image: string;
  isSelected?: boolean;
  isRestricted?: boolean;
  restrictionText?: string;
  onSelect: () => void;
}

export function SkipCard({
  size,
  capacity,
  price,
  period,
  image,
  isSelected = false,
  isRestricted = false,
  restrictionText,
  onSelect,
}: SkipCardProps) {
  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer overflow-hidden",
        "hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] sm:active:scale-[1.02]",
        isSelected
          ? "border-blue-500 ring-2 sm:ring-4 ring-blue-200"
          : "border-gray-200 hover:border-blue-300",
        isRestricted && "opacity-75"
      )}
      onClick={!isRestricted ? onSelect : undefined}
    >
      {/* Header Badge */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10">
        <div className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          {capacity}
        </div>
      </div>

      {/* Selection Indicator - Mobile Friendly */}
      {isSelected && (
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* Restriction Warning */}
      {isRestricted && restrictionText && (
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10">
          <div className="bg-amber-100 border border-amber-300 rounded-lg p-2 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
            <span className="text-xs text-amber-800 font-medium">
              {restrictionText}
            </span>
          </div>
        </div>
      )}

      {/* Skip Image - Responsive Aspect Ratio */}
      <div className="aspect-[4/3] sm:aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={image}
          alt={`${size} Skip`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content - Responsive Padding and Typography */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{size}</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">{period}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl sm:text-3xl font-bold text-blue-600">{price}</span>
          </div>
          
          <button
            className={cn(
              "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm",
              "min-h-[36px] sm:min-h-[40px]", // Touch-friendly minimum height
              !isRestricted
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:bg-blue-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
            disabled={isRestricted}
          >
            <span className="hidden sm:inline">Select This Skip</span>
            <span className="sm:hidden">Select</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}