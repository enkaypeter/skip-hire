import { useState, useEffect } from 'react';
import { Skip } from '../features/skip-selection/types';

// Define a type for the expected API response structure for a single skip
interface ApiSkip {
  id: number | string;
  size: string; // Assuming this is a number-like string e.g., "6"
  price_before_vat: string; // e.g., "208.33"
  vat: string; // e.g., "20" (percentage)
  hire_period_days: number | string;
  allowed_on_road: boolean;
  // Add any other fields that might come from the API and are used directly or indirectly
  company_name?: string; // From original hook, may not be needed for new Skip interface
  booking_url?: string;  // From original hook
  details_url?: string;  // From original hook
  terms_url?: string;    // From original hook
}

// Define a type for the overall API response if it's nested (e.g., { skips: [...] })
interface ApiResponse {
  skips: ApiSkip[];
  // Potentially other fields like pagination, metadata etc.
}

export const useSkips = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        // Assuming the API returns an object like { skips: [...] }
        // If it returns an array directly, this should be: const apiData: ApiSkip[] = await response.json();
        const apiResponse: ApiResponse = await response.json();

        // Defensive check in case the 'skips' property is missing or not an array
        if (!apiResponse || !Array.isArray(apiResponse.skips)) {
          throw new Error("Invalid API response structure");
        }

        const transformedSkips = apiResponse.skips.map((apiSkip: ApiSkip): Skip => {
          const price_before_vat = parseFloat(apiSkip.price_before_vat);
          const vat_percentage = parseFloat(apiSkip.vat); // Assuming apiSkip.vat is the percentage, e.g., "20" for 20%

          if (isNaN(price_before_vat) || isNaN(vat_percentage)) {
            console.warn(`Invalid price or VAT data for skip ID ${apiSkip.id}`, apiSkip);
            // Decide how to handle this: throw error, skip item, or use default values
            // For now, let's create the item but with a noticeable error price
            return {
              id: String(apiSkip.id),
              size: `${apiSkip.size} Yard Skip`,
              capacity: `${apiSkip.size} Yards`,
              price: `£ERR`,
              period: `${apiSkip.hire_period_days} day hire period`,
              image: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${apiSkip.size}-yarder-skip.jpg`,
              isRestricted: !apiSkip.allowed_on_road,
              restrictionText: !apiSkip.allowed_on_road ? "Not Allowed On The Road" : undefined,
            };
          }

          const totalPrice = price_before_vat * (1 + vat_percentage / 100);
          const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${apiSkip.size}-yarder-skip.jpg`;

          return {
            id: String(apiSkip.id),
            size: `${apiSkip.size} Yard Skip`,
            capacity: `${apiSkip.size} Yards`, // Or use apiSkip.capacity if available from API
            price: `£${totalPrice.toFixed(0)}`, // toFixed(0) for whole pounds
            period: `${apiSkip.hire_period_days} day hire period`,
            image: imageUrl,
            isRestricted: !apiSkip.allowed_on_road,
            restrictionText: !apiSkip.allowed_on_road ? "Not Allowed On The Road" : undefined,
          };
        });
        setSkips(transformedSkips);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Failed to fetch or transform skips:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkips();
  }, []); // Empty dependency array means this effect runs once on mount

  return { skips, isLoading, error };
};
