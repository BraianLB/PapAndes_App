
import React from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Language } from '../types';
import { translations } from '../translations';

interface FinancialAnalysisProps {
  language: Language;
}

const budgetData = [
  { month: 'Jan', planned: 4000, actual: 4400 },
  { month: 'Feb', planned: 3000, actual: 3200 },
  { month: 'Mar', planned: 2000, actual: 2400 },
  { month: 'Apr', planned: 2780, actual: 3908 },
  { month: 'May', planned: 1890, actual: 4800 },
  { month: 'Jun', planned: 2390, actual: 3800 },
];

const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({ language }) => {
  const t = translations[language].financial;

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">{t.dateRange}</button>
          <button className="bg-earth-brown-700 dark:bg-earth-brown-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            {t.addExpense}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: t.rawMaterial, val: '$12,450.00', pct: 75, icon: 'grass', trend: '+5.2%' },
          { label: t.labor, val: '$8,210.00', pct: 45, icon: 'groups', trend: '-2.1%', down: true },
          { label: t.indirect, val: '$4,185.00', pct: 30, icon: 'precision_manufacturing', trend: '+0.8%' },
          { label: t.admin, val: '$2,920.00', pct: 15, icon: 'account_balance', trend: '+1.5%' },
        ].map((card) => (
          <div key={card.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-earth-brown-100 dark:bg-earth-brown-900/30 p-2 rounded-xl transition-colors">
                <span className="material-symbols-outlined text-earth-brown-600 dark:text-earth-brown-400">{card.icon}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${card.down ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500 dark:text-rose-400' : 'bg-primary/10 text-primary dark:text-primary-light'}`}>
                {card.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{card.label}</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 transition-colors">{card.val}</h3>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-4 transition-colors">
              <div className="bg-earth-brown-500 h-1.5 rounded-full" style={{ width: `${card.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">{t.budgetExec}</h4>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-earth-brown-200 dark:bg-earth-brown-700" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t.planned}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-3 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t.actual}</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} />
                <YAxis hide />
                {/* Fixed: changed 'shadow' to 'boxShadow' as it is the correct React CSS property */}
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#1e293b', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)' }} />
                <Bar dataKey="planned" fill="#e5cfb8" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="actual" fill="#19e619" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{t.dailyAvg}</h4>
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
            <div className="text-center relative z-10">
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">$320.15</p>
            </div>
            <div className="absolute inset-0 opacity-10 dark:opacity-20 transition-opacity">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={budgetData}>
                  <Area type="monotone" dataKey="actual" stroke="#ad6f4a" fill="#ad6f4a" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center transition-colors">
          <h4 className="text-lg font-black text-slate-900 dark:text-white">{t.recentTrans}</h4>
          <button className="text-primary hover:underline text-sm font-bold">{t.viewAll}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 transition-colors">
                {['Reference', 'Category', 'Date', 'Amount', 'Status'].map(h => (
                  <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              {[
                { ref: 'Seed Purchase #A42', cat: t.rawMaterial, date: 'Oct 12, 2024', amt: '$4,500.00', ok: true },
                { ref: 'Harvester Rental', cat: t.indirect, date: 'Oct 11, 2024', amt: '$1,200.00', ok: true },
                { ref: 'Weekly Labor - Group B', cat: t.labor, date: 'Oct 09, 2024', amt: '$2,100.00', ok: false },
              ].map((t_row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t_row.ref}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-earth-brown-700 dark:text-earth-brown-300 bg-earth-brown-100 dark:bg-earth-brown-900/40 px-2.5 py-1 rounded-lg uppercase transition-colors">
                      {t_row.cat}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">{t_row.date}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{t_row.amt}</td>
                  <td className="px-6 py-4">
                    <span className="material-symbols-outlined text-xl" style={{ color: t_row.ok ? '#19e619' : '#f59e0b' }}>
                      {t_row.ok ? 'check_circle' : 'schedule'}
                    </span>
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

export default FinancialAnalysis;
