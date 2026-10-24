import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageId,
  ModuleId,
  UserProfile,
  ChatMessage,
  ConversationSession,
  ExpenseItem,
  InventoryItem,
  LanguageMode,
} from '../types';

interface AppContextType {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  activeModule: ModuleId;
  setActiveModule: (module: ModuleId) => void;
  user: UserProfile | null;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  language: LanguageMode;
  setLanguage: (lang: LanguageMode) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  
  // Chat state
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, moduleOverride?: ModuleId) => Promise<void>;
  isTyping: boolean;
  clearChat: () => void;
  conversations: ConversationSession[];
  
  // Expenses (OmniFinance)
  expenses: ExpenseItem[];
  addExpense: (item: Omit<ExpenseItem, 'id'>) => void;
  deleteExpense: (id: string) => void;
  monthlyBudget: number;
  setMonthlyBudget: (amount: number) => void;
  
  // Inventory (OmniBusiness)
  inventory: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryQty: (id: string, qty: number) => void;
  deleteInventoryItem: (id: string) => void;

  // Health Reminders (OmniHealth)
  healthReminders: Array<{ id: string; title: string; time: string; done: boolean }>;
  addHealthReminder: (title: string, time: string) => void;
  toggleHealthReminder: (id: string) => void;

  // Notifications
  notifications: Array<{ id: string; title: string; time: string; read: boolean; type: 'info' | 'warning' | 'success' }>;
  markNotificationRead: (id: string) => void;

  // Modals & UI
  showApkModal: boolean;
  setShowApkModal: (show: boolean) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  showIntroModal: boolean;
  setShowIntroModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: 'ng-usr-01',
  name: 'Adewale Johnson',
  email: 'adewale.j@example.ng',
  phone: '+234 803 123 4567',
  state: 'Lagos',
  category: 'Entrepreneur',
  language: 'en',
  tier: 'Pro Citizen',
  joinedDate: 'Jan 2026',
};

const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: 'exp-1', title: 'Prepaid Light Token (IKEDC)', amount: 15000, category: 'Power/Fuel', date: '2026-10-20' },
  { id: 'exp-2', title: 'Generator Fuel (PMS 20L)', amount: 21000, category: 'Power/Fuel', date: '2026-10-21' },
  { id: 'exp-3', title: 'Monthly Foodstuff (Mile 12 Market)', amount: 65000, category: 'Food', date: '2026-10-18' },
  { id: 'exp-4', title: 'MTN 5G Monthly Data (100GB)', amount: 20000, category: 'Data/Airtime', date: '2026-10-15' },
  { id: 'exp-5', title: 'BRT Bus Card Top-up', amount: 8000, category: 'Transport', date: '2026-10-19' },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: 'Cotton Ankara Fabrics (6 Yards)', category: 'Textiles', quantity: 18, unitPrice: 12500, lowStockThreshold: 5 },
  { id: 'inv-2', name: 'Handmade Leather Slippers', category: 'Footwear', quantity: 4, unitPrice: 9500, lowStockThreshold: 6 },
  { id: 'inv-3', name: 'Rechargeable LED Emergency Lamp', category: 'Electronics', quantity: 24, unitPrice: 8500, lowStockThreshold: 8 },
  { id: 'inv-4', name: 'Organic Shea Butter (500g Jar)', category: 'Beauty', quantity: 32, unitPrice: 3500, lowStockThreshold: 10 },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [activeModule, setActiveModule] = useState<ModuleId>('omni_central');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('omni_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });
  const [language, setLanguage] = useState<LanguageMode>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showApkModal, setShowApkModal] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [showIntroModal, setShowIntroModal] = useState(() => {
    // Show intro on start unless user explicitly dismissed it, or allow testing
    return localStorage.getItem('omni_intro_seen') !== 'true';
  });

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: "Kedu, Bawo, Sannu! Welcome to OmniAI Nigeria. I am your central intelligent assistant connecting 10 essential solutions — from Health, JAMB/WAEC learning, CV & career, Lagos/Abuja transit, scam detection, Naira budgeting, energy & generator management, SME business, recycling, to fact verification. How can I help you today?",
      timestamp: 'Just now',
      actionTips: [
        'Help me prepare for JAMB',
        'Check whether this message is a scam',
        'Help me manage my monthly budget',
        'Improve my CV',
        'Help me save electricity'
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversations, setConversations] = useState<ConversationSession[]>([]);

  // Expenses & Budget
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const saved = localStorage.getItem('omni_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });
  const [monthlyBudget, setMonthlyBudget] = useState<number>(250000);

  // Inventory
  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('omni_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  // Health Reminders
  const [healthReminders, setHealthReminders] = useState([
    { id: 'hr-1', title: 'Take Vitamin C & Multivitamins', time: '08:00 AM', done: true },
    { id: 'hr-2', title: 'Drink 500ml Clean Water (Hydration)', time: '01:00 PM', done: false },
    { id: 'hr-3', title: 'Blood Pressure / Pulse Check', time: '07:30 PM', done: false },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Scam Alert: New Fake BVN Block SMS circulating in Lagos & Abuja',
      time: '15m ago',
      read: false,
      type: 'warning' as const,
    },
    {
      id: 'notif-2',
      title: 'OmniLearn: JAMB UTME 2026 Mathematics Practice Quiz Ready',
      time: '2h ago',
      read: false,
      type: 'info' as const,
    },
    {
      id: 'notif-3',
      title: 'OmniPower: New DisCo Band Tariff calculator updated',
      time: '1d ago',
      read: true,
      type: 'success' as const,
    },
  ]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('omni_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('omni_expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('omni_inventory', JSON.stringify(inventory));
  }, [inventory]);

  const loginUser = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name || email.split('@')[0],
      email,
      state: 'Lagos',
      category: 'Professional',
      language: 'en',
      tier: 'Pro Citizen',
      joinedDate: 'October 2026',
    };
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const logoutUser = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const sendChatMessage = async (text: string, moduleOverride?: ModuleId) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          moduleHint: moduleOverride || (activeModule !== 'omni_central' ? activeModule : undefined),
          languageMode: language,
          userProfile: user,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'Request received and processed.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        module: data.detectedModule,
        actionTips: data.actionTips,
        disclaimer: data.disclaimer,
        source: data.source,
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        sender: 'assistant',
        text: "Network or server connection issue. I've switched to local offline assistance mode. You can still access all module tools, Naira budgeting, and exam practice directly.",
        timestamp: 'Just now',
        disclaimer: 'Offline mode active.',
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "New conversation started. How can OmniAI Nigeria assist you right now?",
        timestamp: 'Just now',
      },
    ]);
  };

  const addExpense = (item: Omit<ExpenseItem, 'id'>) => {
    const newItem: ExpenseItem = { ...item, id: 'exp_' + Date.now() };
    setExpenses((prev) => [newItem, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = { ...item, id: 'inv_' + Date.now() };
    setInventory((prev) => [...prev, newItem]);
  };

  const updateInventoryQty = (id: string, qty: number) => {
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
    );
  };

  const deleteInventoryItem = (id: string) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
  };

  const addHealthReminder = (title: string, time: string) => {
    setHealthReminders((prev) => [...prev, { id: 'hr_' + Date.now(), title, time, done: false }]);
  };

  const toggleHealthReminder = (id: string) => {
    setHealthReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        activeModule,
        setActiveModule,
        user,
        loginUser,
        logoutUser,
        updateProfile,
        language,
        setLanguage,
        theme,
        setTheme,
        chatMessages,
        sendChatMessage,
        isTyping,
        clearChat,
        conversations,
        expenses,
        addExpense,
        deleteExpense,
        monthlyBudget,
        setMonthlyBudget,
        inventory,
        addInventoryItem,
        updateInventoryQty,
        deleteInventoryItem,
        healthReminders,
        addHealthReminder,
        toggleHealthReminder,
        notifications,
        markNotificationRead,
        showApkModal,
        setShowApkModal,
        searchModalOpen,
        setSearchModalOpen,
        showIntroModal,
        setShowIntroModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
