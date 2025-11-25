export interface HotelDetails {
  name: string;
  rating: string;
  description: string;
  amenities: string[];
}

export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
}

export interface TravelPackage {
  id?: string;
  packageName: string;
  destination: string;
  duration: string; // e.g., "5 Days"
  price: string; // e.g., "$1200"
  description: string;
  hotel: HotelDetails;
  inclusions: string[];
  itinerary: DayPlan[];
  image?: string; // Optional for generated, required for static
  isGenerated?: boolean;
}

export interface UserPreferences {
  destination: string;
  dates: string;
  days: number;
  travelers: number;
  budget: string; // "Economy", "Standard", "Luxury"
}

export enum BudgetLevel {
  ECONOMY = 'Economy',
  STANDARD = 'Standard',
  LUXURY = 'Luxury'
}