
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Alexa 35',
    brand: 'ARRI',
    category: 'Cameras',
    description: 'The new gold standard for digital cinema, featuring 17 stops of dynamic range.',
    pricePerDay: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f5f85?auto=format&fit=crop&q=80&w=800',
    specs: { Sensor: 'Super 35', Resolution: '4.6K', Mount: 'LPL' }
  },
  {
    id: '2',
    name: 'V-Raptor 8K VV',
    brand: 'RED',
    category: 'Cameras',
    description: 'High-speed cinema performance with multi-format 8K capture.',
    pricePerDay: 950,
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    specs: { Sensor: 'Full Frame', Resolution: '8K', Mount: 'RF' }
  },
  {
    id: '3',
    name: 'Panchro/i Classic Prime',
    brand: 'Cooke',
    category: 'Lenses',
    description: 'The legendary "Cooke Look" in a modern casing for professional storytellers.',
    pricePerDay: 150,
    imageUrl: 'https://images.unsplash.com/photo-1617113930975-f9c732335270?auto=format&fit=crop&q=80&w=800',
    specs: { FocalLength: '32mm', MaxAperture: 'T2.2', Coverage: 'S35' }
  },
  {
    id: '4',
    name: 'SkyPanel S60-C',
    brand: 'ARRI',
    category: 'Lighting',
    description: 'Versatile LED soft light with full color control and unmatched intensity.',
    pricePerDay: 250,
    imageUrl: 'https://images.unsplash.com/photo-1524311582024-754859302633?auto=format&fit=crop&q=80&w=800',
    specs: { Type: 'LED', Power: '450W', CRI: '95+' }
  },
  {
    id: '5',
    name: 'MōVI Pro',
    brand: 'Freefly',
    category: 'Grip',
    description: 'The world’s most versatile camera gimbal for dynamic, stable shots.',
    pricePerDay: 300,
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    specs: { Payload: '15lbs', Weight: '6lbs', RunTime: '3hr' }
  },
  {
    id: '6',
    name: 'Venice 2 8K',
    brand: 'Sony',
    category: 'Cameras',
    description: 'Full-frame cinematography with exceptional low-light sensitivity.',
    pricePerDay: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    specs: { Sensor: 'Full Frame', Resolution: '8K', Mount: 'PL/E' }
  },
  {
    id: '7',
    name: 'Summilux-C Prime',
    brand: 'Leitz',
    category: 'Lenses',
    description: 'Ultra-fast primes with incredible sharpness and natural fall-off.',
    pricePerDay: 180,
    imageUrl: 'https://images.unsplash.com/photo-1621570275918-97205167667e?auto=format&fit=crop&q=80&w=800',
    specs: { FocalLength: '50mm', MaxAperture: 'T1.4', Coverage: 'S35' }
  },
  {
    id: '8',
    name: 'Orbitron II Slider',
    brand: 'GripRig',
    category: 'Grip',
    description: 'Heavy duty slider for precision camera movement on any terrain.',
    pricePerDay: 120,
    imageUrl: 'https://images.unsplash.com/photo-1574717024453-354056afd6fc?auto=format&fit=crop&q=80&w=800',
    specs: { Length: '4ft', Payload: '100lbs', Material: 'Carbon' }
  },
  {
    id: '9',
    name: 'URSA Mini Pro 12K',
    brand: 'Blackmagic',
    category: 'Cameras',
    description: 'The world’s most advanced digital film camera with 12K resolution.',
    pricePerDay: 450,
    imageUrl: 'https://images.unsplash.com/photo-1589324546879-880c107f9c21?auto=format&fit=crop&q=80&w=800',
    specs: { Sensor: 'S35', Resolution: '12K', Mount: 'PL' }
  },
  {
    id: '10',
    name: 'C500 Mark II',
    brand: 'Canon',
    category: 'Cameras',
    description: 'Full-frame sensor and internal RAW recording in a compact body.',
    pricePerDay: 600,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    specs: { Sensor: 'Full Frame', Resolution: '5.9K', Mount: 'EF/PL' }
  },
  {
    id: '11',
    name: 'Optimo Ultra 12x',
    brand: 'Angenieux',
    category: 'Lenses',
    description: 'The new multi-format reference high ratio cinema zoom.',
    pricePerDay: 900,
    imageUrl: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&q=80&w=800',
    specs: { Range: '24-290mm', MaxAperture: 'T2.8', Coverage: 'FF' }
  },
  {
    id: '12',
    name: 'Supreme Prime 50mm',
    brand: 'Zeiss',
    category: 'Lenses',
    description: 'Versatile, high-speed lenses for cinematic full-frame capture.',
    pricePerDay: 220,
    imageUrl: 'https://images.unsplash.com/photo-1621570163351-574a4f895f32?auto=format&fit=crop&q=80&w=800',
    specs: { FocalLength: '50mm', MaxAperture: 'T1.5', Weight: '1.6kg' }
  },
  {
    id: '13',
    name: 'LS 600d Pro',
    brand: 'Aputure',
    category: 'Lighting',
    description: 'Weather-resistant point-source LED with intense output.',
    pricePerDay: 110,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    specs: { Type: 'LED', Power: '600W', CRI: '96+' }
  },
  {
    id: '14',
    name: 'Titan Tube 8-Kit',
    brand: 'Astera',
    category: 'Lighting',
    description: 'Versatile wireless LED tubes with high color consistency.',
    pricePerDay: 180,
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    specs: { Length: '40"', Color: 'RGBMA', IP: '65' }
  },
  {
    id: '15',
    name: 'MKH 416 Shotgun',
    brand: 'Sennheiser',
    category: 'Audio',
    description: 'The industry standard short shotgun microphone for film and TV.',
    pricePerDay: 45,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800',
    specs: { Pattern: 'Supercardioid', Power: 'P48', Weight: '175g' }
  },
  {
    id: '16',
    name: '888 Mixer/Recorder',
    brand: 'Sound Devices',
    category: 'Audio',
    description: 'Advanced 16-channel, 20-track mixer-recorder with Dante.',
    pricePerDay: 160,
    imageUrl: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f5f85?auto=format&fit=crop&q=80&w=800',
    specs: { Inputs: '16', Tracks: '20', SSD: '256GB' }
  },
  {
    id: '17',
    name: 'Titan Arm v2',
    brand: 'GripRig',
    category: 'Grip',
    description: 'Precision articulated arm for mounting monitors and accessories.',
    pricePerDay: 15,
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
    specs: { Payload: '15lbs', Length: '11"', Mount: '1/4-20' }
  },
  {
    id: '18',
    name: 'A-Box Mono',
    brand: 'Wooden Camera',
    category: 'Audio',
    description: 'Adapts 3.5mm input to industry standard gold-plated XLR.',
    pricePerDay: 10,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    specs: { Input: 'XLR', Output: '3.5mm' }
  },
  {
    id: '19',
    name: 'Ultra 5 Bright',
    brand: 'SmallHD',
    category: 'Grip',
    description: '5-inch touchscreen monitor with 3000 nits brightness.',
    pricePerDay: 85,
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b86d35f71716?auto=format&fit=crop&q=80&w=800',
    specs: { Screen: '5"', Brightness: '3000nits', Resolution: '1080p' }
  },
  {
    id: '20',
    name: 'Bolt 4K 750',
    brand: 'Teradek',
    category: 'Grip',
    description: 'Zero-delay 4K wireless video transmission system.',
    pricePerDay: 140,
    imageUrl: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f5f85?auto=format&fit=crop&q=80&w=800',
    specs: { Range: '750ft', Format: '4K30', Delay: '0' }
  }
];

export const CATEGORIES: string[] = ['All', 'Cameras', 'Lenses', 'Lighting', 'Grip', 'Audio'];
