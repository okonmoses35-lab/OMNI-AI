import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { AndroidApkModal } from './components/AndroidApkModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { IntroSlidesModal } from './components/IntroSlidesModal';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CentralChatPage } from './pages/CentralChatPage';
import { OmniHealthPage } from './pages/OmniHealthPage';
import { OmniLearnPage } from './pages/OmniLearnPage';
import { OmniCareerPage } from './pages/OmniCareerPage';
import { OmniMovePage } from './pages/OmniMovePage';
import { OmniShieldPage } from './pages/OmniShieldPage';
import { OmniFinancePage } from './pages/OmniFinancePage';
import { OmniPowerPage } from './pages/OmniPowerPage';
import { OmniBusinessPage } from './pages/OmniBusinessPage';
import { OmniWastePage } from './pages/OmniWastePage';
import { OmniVerifyPage } from './pages/OmniVerifyPage';
import { HistoryPage } from './pages/HistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { SubscriptionPage } from './pages/SubscriptionPage';
import { HelpSupportPage } from './pages/HelpSupportPage';
import { AuthPages } from './pages/AuthPages';

const MainContent: React.FC = () => {
  const { currentPage, showIntroModal, setShowIntroModal } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'chat':
      case 'omni_central':
        return <CentralChatPage />;
      case 'omni_health':
        return <OmniHealthPage />;
      case 'omni_learn':
        return <OmniLearnPage />;
      case 'omni_career':
        return <OmniCareerPage />;
      case 'omni_move':
        return <OmniMovePage />;
      case 'omni_shield':
        return <OmniShieldPage />;
      case 'omni_finance':
        return <OmniFinancePage />;
      case 'omni_power':
        return <OmniPowerPage />;
      case 'omni_business':
        return <OmniBusinessPage />;
      case 'omni_waste':
        return <OmniWastePage />;
      case 'omni_verify':
        return <OmniVerifyPage />;
      case 'history':
        return <HistoryPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'subscription':
        return <SubscriptionPage />;
      case 'help':
        return <HelpSupportPage />;
      case 'login':
      case 'signup':
        return <AuthPages />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar (hidden on mobile) */}
        {currentPage !== 'landing' && <Sidebar />}

        {/* Dynamic Page View */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto w-full">
          {renderPage()}
        </main>
      </div>

      {/* Android Mobile Bottom Navigation (visible on mobile/tablet) */}
      {currentPage !== 'landing' && <BottomNav />}

      {/* Modals */}
      <AndroidApkModal />
      <GlobalSearchModal />
      <IntroSlidesModal isOpen={showIntroModal} onClose={() => setShowIntroModal(false)} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
