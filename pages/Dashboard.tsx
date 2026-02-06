
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Language } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = translations[language].dashboard;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.subtitle} <span className="text-primary font-bold">4 {t.activeFields}</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.investment}</p>
            <span className="material-symbols-outlined text-earth-brown-600 dark:text-earth-brown-400">account_balance_wallet</span>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">$124,500.00</p>
          <div className="flex items-center gap-2 mt-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+12.4% ROI</span>
            <span className="text-slate-400 dark:text-slate-500 font-normal ml-auto">{t.vsLast}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.lifecycle}</p>
            <span className="material-symbols-outlined text-primary">eco</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {[
              { label: 'Field Alpha (Russet)', val: 85, phase: 'Tuberization' },
              { label: 'Field Beta (Yukon)', val: 42, phase: 'Vegetative' },
              { label: 'Field Gamma (Red)', val: 15, phase: 'Planting' },
              { label: 'Field Delta (Fingerling)', val: 0, phase: 'Fallow' },
            ].map((field) => (
              <div key={field.label} className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase">
                  <span className="text-slate-700 dark:text-slate-300">{field.label}</span>
                  <span className="text-primary">{field.val}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${field.val}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">Phase: {field.phase}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span>
              {t.alerts}
            </h3>
            <button className="text-primary text-[10px] font-black uppercase hover:underline">{t.clearAll}</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { title: 'Low Stock: NPK Fertilizer', time: '2h ago', msg: 'Current levels in Warehouse A are below 10%. Immediate replenishment required.', icon: 'inventory', color: 'red' },
              { title: 'Overdue Task: Soil Test', time: '1d ago', msg: 'Field Gamma soil pH analysis was scheduled for yesterday.', icon: 'event_busy', color: 'amber' },
              { title: 'Irrigation Cycle Complete', time: '5h ago', msg: 'Field Alpha cycle finished successfully. 1200L delivered.', icon: 'water_drop', color: 'blue' },
            ].map((alert, idx) => (
              <div key={idx} className="p-6 flex gap-4 items-start">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  alert.color === 'red' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 
                  alert.color === 'amber' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                }`}>
                  <span className="material-symbols-outlined">{alert.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{alert.title}</p>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{alert.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{alert.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-forest-green dark:bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border dark:border-slate-800 transition-colors">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">{t.weather}</p>
                  <h4 className="text-xl font-black">Andean Valley, PE</h4>
                </div>
                <span className="material-symbols-outlined text-4xl text-primary">wb_sunny</span>
              </div>
              <div className="flex items-end gap-2 mb-8">
                <span className="text-5xl font-black">18°</span>
                <span className="text-2xl font-medium opacity-60 mb-1">C</span>
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg ml-auto mb-2">Sunny</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 pt-6">
                {[
                  { label: t.humidity, val: '65%', icon: 'humidity_percentage' },
                  { label: t.wind, val: '12 km/h', icon: 'air' },
                  { label: t.rain, val: '5%', icon: 'rainy' },
                  { label: t.uv, val: 'Low (2)', icon: 'wb_twilight' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm opacity-60">{item.icon}</span>
                    <div className="text-[10px]">
                      <p className="opacity-60 leading-none mb-1 font-bold">{item.label}</p>
                      <p className="font-bold">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-1 shadow-sm h-48 overflow-hidden relative group transition-colors">
            <img 
              src="https://picsum.photos/id/10/400/200" 
              className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" 
              alt="Farm Map" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{t.map}</p>
              <p className="font-bold">Main Estate Sector 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
