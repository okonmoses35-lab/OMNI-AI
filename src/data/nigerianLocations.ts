/**
 * Nigerian Cities, Transit Hubs, and Geolocation Utilities
 * Provides coordinates, Haversine distance calculations, and fuel consumption modeling.
 */

export interface NigerianLocation {
  id: string;
  name: string;
  state: string;
  category: 'lagos_district' | 'abuja_district' | 'state_capital' | 'major_hub' | 'airport' | 'interstate';
  lat: number;
  lng: number;
  description: string;
}

export const NIGERIAN_LOCATIONS: NigerianLocation[] = [
  // Lagos Major Districts & Hubs
  { id: 'ikeja', name: 'Ikeja (Computer Village / Allen / Alausa)', state: 'Lagos', category: 'lagos_district', lat: 6.6018, lng: 3.3515, description: 'Lagos State Capital, commercial & tech hub' },
  { id: 'vi', name: 'Victoria Island (VI / Adeola Odeku / Eko Atlantic)', state: 'Lagos', category: 'lagos_district', lat: 6.4281, lng: 3.4219, description: 'Financial & corporate center' },
  { id: 'lekki_1', name: 'Lekki Phase 1 / Admiralty Way', state: 'Lagos', category: 'lagos_district', lat: 6.4474, lng: 3.4723, description: 'Lekki peninsula prime residential & commercial' },
  { id: 'ajah', name: 'Ajah / Abraham Adesanya / Sangotedo', state: 'Lagos', category: 'lagos_district', lat: 6.4698, lng: 3.5852, description: 'Lekki-Epe expressway corridor' },
  { id: 'marina_cms', name: 'Marina / CMS / Lagos Island', state: 'Lagos', category: 'lagos_district', lat: 6.4531, lng: 3.3958, description: 'Historic central business district & ferry terminal' },
  { id: 'yaba', name: 'Yaba / Sabo / Tejuosho', state: 'Lagos', category: 'lagos_district', lat: 6.5158, lng: 3.3762, description: 'Tech cluster, Unilag & Yabatech academic district' },
  { id: 'ikorodu', name: 'Ikorodu Garage / Agric / Ipakodo', state: 'Lagos', category: 'lagos_district', lat: 6.6194, lng: 3.5105, description: 'Lagos East transit hub & BRT terminal' },
  { id: 'berger', name: 'Berger / Ojodu / OPIC Expressway', state: 'Lagos', category: 'lagos_district', lat: 6.6436, lng: 3.3719, description: 'Lagos-Ibadan gateway corridor' },
  { id: 'surulere', name: 'Surulere (National Stadium / Ojuelegba)', state: 'Lagos', category: 'lagos_district', lat: 6.4969, lng: 3.3541, description: 'Central mainland residential & cultural hub' },
  { id: 'oshodi', name: 'Oshodi Transport Interchange', state: 'Lagos', category: 'lagos_district', lat: 6.5569, lng: 3.3489, description: 'Primary intermodal transit hub in Lagos' },
  { id: 'festac', name: 'Festac Town / Mile 2 / Amuwo Odofin', state: 'Lagos', category: 'lagos_district', lat: 6.4674, lng: 3.2982, description: 'Blue Line rail terminal & Badagry expressway' },
  { id: 'murtala_airport', name: 'Murtala Muhammed International Airport (MMA2)', state: 'Lagos', category: 'airport', lat: 6.5774, lng: 3.3212, description: 'Main international & domestic aviation hub' },
  { id: 'epe', name: 'Epe Town / Alaro City', state: 'Lagos', category: 'lagos_district', lat: 6.5841, lng: 3.9834, description: 'Lagos East industrial and university zone' },
  { id: 'badagry', name: 'Badagry Heritage City', state: 'Lagos', category: 'lagos_district', lat: 6.4316, lng: 2.8876, description: 'Border coastal heritage hub' },

  // Abuja Major Districts
  { id: 'abuja_cbd', name: 'Abuja Central Business District (CBD / Sec)', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.0579, lng: 7.4951, description: 'Federal government ministries & central district' },
  { id: 'wuse2', name: 'Wuse 2 / Aminu Kano Crescent', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.0765, lng: 7.4721, description: 'Abuja premier retail & lifestyle center' },
  { id: 'maitama', name: 'Maitama / Transcorp Hilton Corridor', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.0882, lng: 7.4934, description: 'Diplomatic zone & luxury district' },
  { id: 'garki', name: 'Garki Area 1 - Area 11', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.0322, lng: 7.4883, description: 'Administrative & residential hub' },
  { id: 'gwarinpa', name: 'Gwarinpa Estate / 1st - 5th Avenue', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.1098, lng: 7.4042, description: 'West Africa largest planned housing estate' },
  { id: 'kubwa', name: 'Kubwa / Train Station Corridor', state: 'Abuja (FCT)', category: 'abuja_district', lat: 9.1539, lng: 7.3328, description: 'Abuja-Kaduna standard gauge rail hub' },
  { id: 'nnamdi_airport', name: 'Nnamdi Azikiwe International Airport', state: 'Abuja (FCT)', category: 'airport', lat: 9.0065, lng: 7.2631, description: 'Federal Capital aviation gateway' },
  { id: 'lugbe', name: 'Lugbe / Airport Road Corridor', state: 'Abuja (FCT)', category: 'abuja_district', lat: 8.9835, lng: 7.3688, description: 'Rapidly growing Abuja commuter corridor' },

  // Interstate Major Cities & State Capitals
  { id: 'ibadan', name: 'Ibadan (Iwo Road / Bodija / Dugbe)', state: 'Oyo', category: 'state_capital', lat: 7.3775, lng: 3.9470, description: 'Largest metropolis in southwestern Nigeria' },
  { id: 'abeokuta', name: 'Abeokuta (Panseke / Kuto)', state: 'Ogun', category: 'state_capital', lat: 7.1475, lng: 3.3619, description: 'Historic rock city & rail stop' },
  { id: 'port_harcourt', name: 'Port Harcourt (GRA / Aba Road / Trans Amadi)', state: 'Rivers', category: 'state_capital', lat: 4.8156, lng: 7.0498, description: 'Oil & gas industrial hub of the Niger Delta' },
  { id: 'benin_city', name: 'Benin City (Ring Road / Ugbowo)', state: 'Edo', category: 'state_capital', lat: 6.3350, lng: 5.6037, description: 'Ancient kingdom capital & central transit junction' },
  { id: 'enugu', name: 'Enugu (Independence Layout / Polo Park)', state: 'Enugu', category: 'state_capital', lat: 6.4584, lng: 7.5464, description: 'Coal City, southeastern cultural and business hub' },
  { id: 'kano', name: 'Kano (Sabon Gari / Bompai / Nassarawa)', state: 'Kano', category: 'state_capital', lat: 12.0022, lng: 8.5920, description: 'Northern commercial nerve center' },
  { id: 'kaduna', name: 'Kaduna (Ahmadu Bello Way / Barnawa)', state: 'Kaduna', category: 'state_capital', lat: 10.5105, lng: 7.4165, description: 'Historic Northern capital & industrial hub' },
  { id: 'asaba', name: 'Asaba / Niger Bridge Crossing', state: 'Delta', category: 'state_capital', lat: 6.1984, lng: 6.7327, description: 'Delta State capital & gateway to Onitsha' },
  { id: 'onitsha', name: 'Onitsha (Main Market / Upper Iweka)', state: 'Anambra', category: 'major_hub', lat: 6.1517, lng: 6.7863, description: 'West Africa largest commercial open market' },
  { id: 'warri', name: 'Warri (Effurun Roundabout / Airport Road)', state: 'Delta', category: 'major_hub', lat: 5.5167, lng: 5.7500, description: 'Commercial oil hub of Delta' },
  { id: 'calabar', name: 'Calabar (Marina / Marian / Tinapa)', state: 'Cross River', category: 'state_capital', lat: 4.9757, lng: 8.3417, description: 'Tourism capital & coastal port' },
  { id: 'uyo', name: 'Uyo (Ikot Ekpene Road / Tropicana)', state: 'Akwa Ibom', category: 'state_capital', lat: 5.0377, lng: 7.9128, description: 'Clean state capital & road network hub' },
  { id: 'ilorin', name: 'Ilorin (Taiwo Road / GRA)', state: 'Kwara', category: 'state_capital', lat: 8.4799, lng: 4.5418, description: 'Confluence gateway between North and South' },
  { id: 'jos', name: 'Jos (Terminus / Rayfield)', state: 'Plateau', category: 'state_capital', lat: 9.8965, lng: 8.8583, description: 'Plateau highland hub' },
  { id: 'akure', name: 'Akure (Alagbaka / Oyemekun)', state: 'Ondo', category: 'state_capital', lat: 7.2571, lng: 5.2058, description: 'Ondo State administrative center' },
  { id: 'owerri', name: 'Owerri (Wetheral / Ikenegbu)', state: 'Imo', category: 'state_capital', lat: 5.4850, lng: 7.0355, description: 'Heartland hospitality & commercial center' },
];

/**
 * Calculates great-circle distance between two points in km (Haversine formula)
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Road driving distance correction factor for Nigerian road networks
 */
export function getEstimatedRoadDistanceKm(haversineKm: number): number {
  if (haversineKm <= 3) return Math.max(1.2, Math.round(haversineKm * 1.4 * 10) / 10);
  if (haversineKm <= 15) return Math.round(haversineKm * 1.34 * 10) / 10;
  if (haversineKm <= 60) return Math.round(haversineKm * 1.28 * 10) / 10;
  return Math.round(haversineKm * 1.22 * 10) / 10;
}

/**
 * Finds the closest predefined Nigerian landmark or city to given GPS coordinates
 */
export function findClosestNigerianLocation(
  lat: number,
  lng: number
): { location: NigerianLocation; distanceKm: number } {
  let closest = NIGERIAN_LOCATIONS[0];
  let minDistance = Infinity;

  for (const loc of NIGERIAN_LOCATIONS) {
    const dist = calculateHaversineDistance(lat, lng, loc.lat, loc.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = loc;
    }
  }

  return {
    location: closest,
    distanceKm: Math.round(minDistance * 10) / 10,
  };
}

/**
 * Fuzzy search or exact match for destination string
 */
export function resolveLocationFromQuery(query: string): NigerianLocation | null {
  if (!query || !query.trim()) return null;
  const q = query.trim().toLowerCase();

  // Exact ID match
  const byId = NIGERIAN_LOCATIONS.find((l) => l.id.toLowerCase() === q);
  if (byId) return byId;

  // Name inclusion
  const byName = NIGERIAN_LOCATIONS.find(
    (l) => l.name.toLowerCase().includes(q) || q.includes(l.name.toLowerCase().split(' ')[0])
  );
  if (byName) return byName;

  // State match
  const byState = NIGERIAN_LOCATIONS.find((l) => l.state.toLowerCase() === q);
  if (byState) return byState;

  return null;
}

/**
 * Vehicle Fuel Efficiencies (Liters per 100km and km per Liter)
 */
export interface VehicleProfile {
  id: string;
  name: string;
  category: string;
  consumptionPer100Km: number; // Litres / 100km
  kmPerLitre: number;
  popularExamples: string;
  tankCapacityL: number;
}

export const NIGERIAN_VEHICLES: VehicleProfile[] = [
  {
    id: 'sedan_econ',
    name: 'Economy Sedan (1.6L - 1.8L)',
    category: 'Private Sedan',
    consumptionPer100Km: 7.8,
    kmPerLitre: 12.8,
    popularExamples: 'Toyota Corolla, Honda Civic, Hyundai Elantra',
    tankCapacityL: 50,
  },
  {
    id: 'sedan_mid',
    name: 'Standard Sedan (2.4L - 2.5L)',
    category: 'Private Sedan',
    consumptionPer100Km: 9.2,
    kmPerLitre: 10.9,
    popularExamples: 'Toyota Camry, Honda Accord, Mercedes C-Class',
    tankCapacityL: 60,
  },
  {
    id: 'suv_compact',
    name: 'Compact SUV / Crossover',
    category: 'SUV',
    consumptionPer100Km: 11.2,
    kmPerLitre: 8.9,
    popularExamples: 'Toyota RAV4, Honda CR-V, Lexus RX350, Highlander',
    tankCapacityL: 65,
  },
  {
    id: 'suv_large',
    name: 'Large SUV / 4WD / Pickup',
    category: '4WD / Heavy',
    consumptionPer100Km: 14.5,
    kmPerLitre: 6.9,
    popularExamples: 'Toyota Prado, Land Cruiser V8, Hilux, Ford Explorer',
    tankCapacityL: 85,
  },
  {
    id: 'danfo_bus',
    name: 'Commercial Minibus (Danfo / Korope)',
    category: 'Commercial',
    consumptionPer100Km: 13.8,
    kmPerLitre: 7.2,
    popularExamples: 'Toyota HiAce ("Hummer bus"), Volkswagen Vanagon',
    tankCapacityL: 70,
  },
  {
    id: 'motorcycle_keke',
    name: 'Keke Napep / Dispatch Bike',
    category: 'Light Transport',
    consumptionPer100Km: 3.5,
    kmPerLitre: 28.5,
    popularExamples: 'TVS King Tricycle, Bajaj Boxer 100/150, Haojue',
    tankCapacityL: 12,
  },
];

/**
 * Nigerian Fuel Types & Pricing Benchmarks (Current 2026 Naira Tariffs)
 */
export interface FuelTypePrice {
  id: string;
  name: string;
  unit: string;
  defaultPriceNgn: number;
  description: string;
  nnpcSubsidizedNgn: number;
  majorMarketerNgn: number;
  independentMarketerNgn: number;
}

export const NIGERIAN_FUEL_PRICES: FuelTypePrice[] = [
  {
    id: 'pms_petrol',
    name: 'Premium Motor Spirit (PMS Petrol)',
    unit: 'Litre',
    defaultPriceNgn: 1050,
    description: 'Standard petrol for sedans, SUVs, buses and generators',
    nnpcSubsidizedNgn: 998,
    majorMarketerNgn: 1050,
    independentMarketerNgn: 1120,
  },
  {
    id: 'ago_diesel',
    name: 'Automotive Gas Oil (AGO Diesel)',
    unit: 'Litre',
    defaultPriceNgn: 1350,
    description: 'Heavy commercial haulage, diesel Hilux and trucks',
    nnpcSubsidizedNgn: 1280,
    majorMarketerNgn: 1350,
    independentMarketerNgn: 1420,
  },
  {
    id: 'cng_gas',
    name: 'Compressed Natural Gas (CNG)',
    unit: 'SCM (Standard Cubic Metre)',
    defaultPriceNgn: 230,
    description: 'Eco-friendly alternative, ~70% cheaper than petrol',
    nnpcSubsidizedNgn: 230,
    majorMarketerNgn: 230,
    independentMarketerNgn: 260,
  },
];
