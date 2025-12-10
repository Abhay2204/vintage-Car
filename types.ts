export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'Sedan' | 'Hatchback' | 'SUV' | 'Muscle';
  year: number;
  image: string;
  description: string;
  specs: {
    mileage: string;
    engine: string;
    topSpeed: string;
  };
}

export interface CartItem extends Car {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
}