
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface InventoryProps {
  language: Language;
}

const Inventory: React.FC<InventoryProps> = ({ language }) => {
  const t = translations[language].inventory;

  return (
    <div className="p-8">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{t.subtitle}</p>
        </div>
        <button className="bg-primary hover:brightness-110 text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          {t.addProduct}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: t.totalItems, val: '124', trend: '+2.4%', icon: 'inventory', color: 'primary' },
          { label: t.lowStock, val: '8', trend: '-5%', icon: 'warning', color: 'rose' },
          { label: t.valuation, val: '$12,450', trend: '+12%', icon: 'account_balance_wallet', color: 'blue' },
        ].map(card => (
          <div key={card.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex justify-between items-start mb-2">
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">{card.label}</p>
              <span className={`material-symbols-outlined ${
                card.color === 'primary' ? 'text-primary' : card.color === 'rose' ? 'text-rose-500' : 'text-blue-500'
              }`}>{card.icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{card.val}</p>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 transition-colors">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">search</span>
            <input 
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-all"
              placeholder={t.search}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              {t.categories}
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {t.warehouse}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                <th className="px-6 py-4">{t.prodName}</th>
                <th className="px-6 py-4">{t.type}</th>
                <th className="px-6 py-4">{t.stock}</th>
                <th className="px-6 py-4">{t.price}</th>
                <th className="px-6 py-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              {[
                { name: 'Imidacloprid 70%', type: 'Insecticide', stock: 150, unit: 'L', price: '$42.50', pct: 75, color: 'primary' },
                { name: 'NPK 10-26-26', type: 'Fertilizer', stock: 20, unit: 'kg', price: '$1.12', pct: 15, color: 'rose' },
                { name: 'Chlorothalonil', type: 'Insecticide', stock: 85, unit: 'L', price: '$56.00', pct: 45, color: 'amber' },
              ].map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{p.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                      {p.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-900 dark:text-white transition-colors">{p.stock} {p.unit}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white transition-colors">{p.price}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors p-2">
                      <span className="material-symbols-outlined">show_chart</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
