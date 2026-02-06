
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface OperationsRegistryProps {
  language: Language;
}

const OperationsRegistry: React.FC<OperationsRegistryProps> = ({ language }) => {
  const t = translations[language].operations;

  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{t.subtitle}</p>
        </div>
        <button className="bg-primary hover:brightness-110 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          {t.logActivity}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Views</p>
            <nav className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl bg-primary text-slate-900 font-bold text-sm shadow-sm transition-all">
                <span className="material-symbols-outlined text-xl">event_list</span>
                {t.registry}
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm transition-all">
                <span className="material-symbols-outlined text-xl">calendar_month</span>
                {t.weeklyPlan}
              </button>
              <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm transition-all">
                <span className="material-symbols-outlined text-xl">history</span>
                {t.history}
              </button>
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-50 dark:border-slate-800 pb-6 mb-6 transition-colors">
              <div className="flex gap-4">
                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary min-w-[160px] transition-colors">
                  <option>{t.opTypes}</option>
                </select>
                <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary min-w-[140px] transition-colors">
                  <option>{t.allLots}</option>
                </select>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl transition-colors">
                <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white transition-all">{t.week}</button>
                <button className="px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-all">{t.month}</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white">{t.recentAct}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                    <th className="px-6 py-4">{t.dateTime}</th>
                    <th className="px-6 py-4">{t.operation}</th>
                    <th className="px-6 py-4">{t.lot}</th>
                    <th className="px-6 py-4">{t.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
                  {[
                    { date: 'Oct 04, 2023', type: 'Fertilization', lot: 'LOT-A102', status: 'Completed' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{row.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{row.type}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase transition-colors">
                          {row.lot}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black uppercase text-emerald-600">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsRegistry;
