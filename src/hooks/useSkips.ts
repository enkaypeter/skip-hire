import { useState, useEffect } from 'react';
import { Skip } from '../features/skip-selection/types';

// Define a type for the expected API response structure for a single skip
interface ApiSkip {
  id: number | string;
  size: string; 
  price_before_vat: string;
  vat: string;
  hire_period_days: number | string;
  allowed_on_road: boolean;
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
        const apiSkips: ApiSkip[] = await response.json();

        if (!apiSkips || !Array.isArray(apiSkips)) {
          throw new Error("Invalid API response structure");
        }

        const transformedSkips = apiSkips.map((apiSkip: ApiSkip): Skip => {
          const price_before_vat = parseFloat(apiSkip.price_before_vat);
          const vat_percentage = parseFloat(apiSkip.vat);
          const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${apiSkip.size}-yarder-skip.jpg`;

          if (isNaN(price_before_vat) || isNaN(vat_percentage)) {
            console.warn(`Invalid price or VAT data for skip ID ${apiSkip.id}`, apiSkip);
            return {
              id: String(apiSkip.id),
              size: `${apiSkip.size} Yard Skip`,
              capacity: `${apiSkip.size} Yards`,
              price: `£ERR`,
              period: `${apiSkip.hire_period_days} day hire period`,
              image: imageUrl,
              isRestricted: !apiSkip.allowed_on_road,
              restrictionText: !apiSkip.allowed_on_road ? "Not Allowed On The Road" : undefined,
            };
          }

          const totalPrice = price_before_vat * (1 + vat_percentage / 100);

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
