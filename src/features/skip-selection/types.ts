export interface Skip {
  id: string;
  size: string; // e.g., "6 Yard Skip"
  capacity: string; // e.g., "6 Yards"
  price: string; // Formatted total price, e.g., "£250"
  period: string; // e.g., "14 day hire period"
  image: string; // URL
  isRestricted?: boolean;
  restrictionText?: string;
}
