
import React, { useState, useEffect } from 'react';
import { NavPage, Language } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AIInsights from './pages/AIInsights';
import FinancialAnalysis from './pages/FinancialAnalysis';
import LotManagement from './pages/LotManagement';
import Inventory from './pages/Inventory';
import OperationsRegistry from './pages/OperationsRegistry';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<NavPage>(NavPage.LOGIN);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'es');

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage(NavPage.DASHBOARD);
  };

  const renderPage = () => {
    switch (currentPage) {
      case NavPage.DASHBOARD: return <Dashboard language={language} />;
      case NavPage.AI_INSIGHTS: return <AIInsights language={language} />;
      case NavPage.FINANCIAL: return <FinancialAnalysis language={language} />;
      case NavPage.LOTS: return <LotManagement language={language} />;
      case NavPage.INVENTORY: return <Inventory language={language} />;
      case NavPage.OPERATIONS: return <OperationsRegistry language={language} />;
      case NavPage.SETTINGS: return (
        <Settings 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          language={language} 
          setLanguage={setLanguage} 
        />
      );
      default: return <Dashboard language={language} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-[#f6f8f6] dark:bg-[#0a0d0a] text-[#111811] dark:text-slate-100 transition-colors duration-300">
      <Sidebar 
        activePage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={() => setIsAuthenticated(false)} 
        language={language}
      />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
