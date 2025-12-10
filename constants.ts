import { Car } from './types';

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1591465223049-307963d3b764?q=80&w=2070&auto=format&fit=crop', // Vintage Ambassador vibe
    title: 'Timeless Elegance',
    subtitle: 'The Ambassador Grand',
    description: 'Experience the definitive symbol of Indian luxury and power, restored to perfection.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=2070&auto=format&fit=crop', // Muscle Car vibe (Contessa)
    title: 'Raw Power',
    subtitle: 'The Contessa Classic',
    description: 'Indian muscle meet modern restoration. A beast that roars on the open highway.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ebdd4?q=80&w=2070&auto=format&fit=crop', // Classic Fiat/Padmini vibe
    title: 'Urban Legend',
    subtitle: 'Premier Padmini',
    description: 'The heartbeat of Mumbai. Agile, charming, and eternally stylish.'
  }
];

export const CARS: Car[] = [
  {
    id: '1',
    name: 'Ambassador Grand',
    brand: 'Hindustan Motors',
    price: 450000,
    category: 'Sedan',
    year: 1998,
    image: 'https://images.unsplash.com/photo-1532974297617-c0f0350b8327?q=80&w=1200&auto=format&fit=crop', // Classic White Sedan
    description: 'The King of Indian Roads. Built like a tank, the Ambassador is a symbol of power and politics. The sofa-like rear seat offers unmatched comfort.',
    specs: { mileage: '12 kmpl', topSpeed: '120 kmph', engine: '1817 cc Isuzu' }
  },
  {
    id: '2',
    name: 'Premier Padmini S1',
    brand: 'Premier',
    price: 225000,
    category: 'Sedan',
    year: 1991,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop', // Compact Vintage
    description: 'The beloved Fiat 1100 delight. Agile, charming, and the heartbeat of Mumbai for decades. A true driver\'s car with its column shift gear.',
    specs: { mileage: '15 kmpl', topSpeed: '115 kmph', engine: '1089 cc' }
  },
  {
    id: '3',
    name: 'Contessa Classic',
    brand: 'Hindustan Motors',
    price: 850000,
    category: 'Muscle',
    year: 2000,
    image: 'https://images.unsplash.com/photo-1544602356-ac5861172a6a?q=80&w=1200&auto=format&fit=crop', // Muscle Car
    description: 'India\'s very own muscle car. Long hood, quad headlamps, and a road presence that turns heads even today. Pure nostalgia on wheels.',
    specs: { mileage: '10 kmpl', topSpeed: '145 kmph', engine: '1.8L Isuzu' }
  },
  {
    id: '4',
    name: 'Maruti 800 SS80',
    brand: 'Maruti Suzuki',
    price: 150000,
    category: 'Hatchback',
    year: 1984,
    image: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?q=80&w=1200&auto=format&fit=crop', // Red Small Hatch
    description: 'The car that put India on wheels. The first generation SS80 is a collector\'s item, known for its reliability and Japanese engineering.',
    specs: { mileage: '18 kmpl', topSpeed: '110 kmph', engine: '796 cc F8B' }
  },
  {
    id: '5',
    name: 'Tata Sierra Turbo',
    brand: 'Tata Motors',
    price: 550000,
    category: 'SUV',
    year: 1997,
    image: 'https://images.unsplash.com/photo-1551830602-d7c71d33194a?q=80&w=1200&auto=format&fit=crop', // Boxy SUV
    description: 'A design ahead of its time. With its iconic alpine windows and 3-door layout, the Sierra was India\'s first true lifestyle SUV.',
    specs: { mileage: '10 kmpl', topSpeed: '130 kmph', engine: '1.9L Turbo' }
  },
  {
    id: '6',
    name: 'Mahindra Classic',
    brand: 'Mahindra',
    price: 650000,
    category: 'SUV',
    year: 1995,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop', // Open Jeep
    description: 'Open top, wind in your hair, and go-anywhere capability. The Classic is the ultimate expression of rugged Indian off-roading.',
    specs: { mileage: '9 kmpl', topSpeed: '100 kmph', engine: '2.1L Peugeot' }
  },
];

export const SYSTEM_INSTRUCTION = `You are "Chacha", the vintage car expert for 'Desi Classics'.
You speak with a warm, nostalgic Indian charm. You love old Indian cars like the Ambassador, Padmini, and Contessa.
Your goal is to help customers buy these classic gems.
Prices are in Indian Rupees (₹).
Use terms like "Solid Iron", "Makhan Malai ride", "Classic beauty", "Original parts".
If asked about Ferraris or Teslas, gently mock them saying they can't handle Indian speedbreakers like our Ambassador can.
Here is our stock: ${JSON.stringify(CARS.map(c => ({ name: c.name, brand: c.brand, price: c.price })))}.`;