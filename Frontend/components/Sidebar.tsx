
import React from 'react';
import { NavPage, Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  activePage: NavPage;
  onNavigate: (page: NavPage) => void;
  onLogout: () => void;
  language: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onLogout, language }) => {
  const t = translations[language].sidebar;

  const navItems = [
    { id: NavPage.DASHBOARD, label: t.dashboard, icon: 'dashboard' },
    { id: NavPage.AI_INSIGHTS, label: t.ai, icon: 'psychology_alt' },
    { id: NavPage.FINANCIAL, label: t.financial, icon: 'payments' },
    { id: NavPage.LOTS, label: t.lots, icon: 'potted_plant' },
    { id: NavPage.INVENTORY, label: t.inventory, icon: 'inventory_2' },
    { id: NavPage.OPERATIONS, label: t.operations, icon: 'event_list' },
    { id: NavPage.SETTINGS, label: t.settings, icon: 'settings' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-40 hidden lg:flex transition-colors">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary size-10 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">agriculture</span>
        </div>
        <div>
          <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-none">Papandes</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Agro-tech Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
              activePage === item.id
                ? 'bg-primary/10 text-slate-900 dark:text-white border-l-4 border-primary font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
            }`}
          >
            <span className={`material-symbols-outlined ${activePage === item.id ? 'filled-icon' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
        <button className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-sm">
          <span className="material-symbols-outlined text-sm">download</span>
          {t.export}
        </button>
        <button 
          onClick={onLogout}
          className="w-full text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 font-bold py-2 rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          {t.logout}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
