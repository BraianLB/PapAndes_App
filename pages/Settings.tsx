
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode, language, setLanguage }) => {
  const t = translations[language].settings;

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.subtitle}</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <span className="material-symbols-outlined text-primary">palette</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{t.appearance}</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Look and Feel</p>
            </div>
          </div>

          <div className="flex items-center justify-between py-6 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.theme}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.themeDesc}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                isDarkMode ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span 
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`} 
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-6 border-t border-slate-50 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">language</span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{t.language}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.languageDesc}</p>
              </div>
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button 
                onClick={() => setLanguage('es')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                  language === 'es' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                  language === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Info/About Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
           <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-slate-400 text-lg">info</span>
             <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
               Versión de la Aplicación: <strong>v1.0.4-beta</strong>. Próximas actualizaciones incluirán integración con sensores IoT para humedad de suelo.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
