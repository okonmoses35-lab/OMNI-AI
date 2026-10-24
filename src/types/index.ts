export type ModuleId =
  | 'omni_central'
  | 'omni_health'
  | 'omni_learn'
  | 'omni_career'
  | 'omni_move'
  | 'omni_shield'
  | 'omni_finance'
  | 'omni_power'
  | 'omni_business'
  | 'omni_waste'
  | 'omni_verify';

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'chat'
  | 'omni_central'
  | 'omni_health'
  | 'omni_learn'
  | 'omni_career'
  | 'omni_move'
  | 'omni_shield'
  | 'omni_finance'
  | 'omni_power'
  | 'omni_business'
  | 'omni_waste'
  | 'omni_verify'
  | 'history'
  | 'profile'
  | 'settings'
  | 'subscription'
  | 'help'
  | 'login'
  | 'signup';

export type LanguageMode = 'en' | 'pidgin' | 'yoruba' | 'igbo' | 'hausa';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state: string; // Nigerian state (e.g. Lagos, Abuja FCT, Rivers, Kano)
  category: 'Student' | 'Job Seeker' | 'Entrepreneur' | 'Household' | 'Driver / Transport' | 'Professional';
  language: LanguageMode;
  tier: 'Free' | 'Pro Citizen' | 'Enterprise SME';
  joinedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  module?: ModuleId;
  actionTips?: string[];
  disclaimer?: string;
  source?: string;
}

export interface ConversationSession {
  id: string;
  title: string;
  module: ModuleId;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ServiceDefinition {
  id: ModuleId;
  name: string;
  tagline: string;
  iconName: string;
  badge: string;
  accentColor: string;
  description: string;
  sampleQuestions: string[];
}

// Module specific types
export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Housing/Rent' | 'Power/Fuel' | 'Data/Airtime' | 'Family' | 'Business' | 'Other';
  date: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  lowStockThreshold: number;
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TransitRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estMinutes: number;
  fareEstimateNgn: number;
  transitTypes: string[]; // ['BRT', 'Danfo', 'Train']
  trafficStatus: 'Light' | 'Moderate' | 'Heavy' | 'Gridlock';
}
