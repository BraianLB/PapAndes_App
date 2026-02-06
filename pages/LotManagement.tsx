
import React from 'react';
import { CropLot, Language } from '../types';
import { translations } from '../translations';

interface LotManagementProps {
  language: Language;
}

const lots_data: CropLot[] = [
  { id: '1', name: 'Lot A-101', sector: 'Sector 4', variety: 'SPUNTA', plantedDate: 'Oct 12, 2023', maturity: 72, status: 'active', imageUrl: 'https://picsum.photos/id/102/400/300' },
  { id: '2', name: 'Lot B-202', sector: 'Sector 12', variety: 'RUSSET', plantedDate: 'Sept 05, 2023', maturity: 95, status: 'nearing-harvest', imageUrl: 'https://picsum.photos/id/103/400/300' },
  { id: '3', name: 'Lot C-303', sector: 'Sector 7', variety: 'KENNEBEC', plantedDate: 'Nov 10, 2023', maturity: 34, status: 'active', imageUrl: 'https://picsum.photos/id/104/400/300' },
];

const LotManagement: React.FC<LotManagementProps> = ({ language }) => {
  const t = translations[language].lots;

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl h-11 px-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            {t.export}
          </button>
          <button className="flex items-center gap-2 rounded-xl h-11 px-6 bg-primary text-slate-900 font-bold text-sm shadow-md hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            {t.register}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: t.activeLots, val: '12', trend: '+2 this month', icon: 'potted_plant' },
          { label: t.hectares, val: '450', trend: 'Across 4 sectors', icon: 'landscape' },
          { label: t.harvesting, val: '3', trend: 'Next 14 days', icon: 'timer', alert: true },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <span className={`material-symbols-outlined ${stat.alert ? 'text-amber-500' : 'text-primary'}`}>{stat.icon}</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{stat.val}</p>
            <p className={`text-[10px] font-bold mt-1 ${stat.alert ? 'text-amber-500' : 'text-primary'}`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {lots_data.map(lot => (
          <div key={lot.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-40">
              <img src={lot.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={lot.name} />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm transition-colors">
                {lot.status.replace('-', ' ')}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-[10px] font-bold opacity-80 uppercase">{lot.sector}</p>
                <h3 className="text-lg font-black">{lot.name}</h3>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2 py-0.5 bg-primary/20 dark:bg-primary/10 text-slate-900 dark:text-primary text-[10px] font-black rounded uppercase transition-colors">
                    {lot.variety}
                  </span>
                  <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                    {lot.plantedDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${lot.maturity > 90 ? 'text-amber-600 dark:text-amber-400' : 'text-primary'}`}>{lot.maturity}%</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">{t.maturity}</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden transition-colors">
                <div className={`h-full ${lot.maturity > 90 ? 'bg-amber-500' : 'bg-primary'}`} style={{ width: `${lot.maturity}%` }} />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 transition-colors">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t.estHarvest}: Jan 15</p>
                <button className="text-primary hover:underline text-xs font-black flex items-center gap-1 uppercase">
                  {t.details} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 hover:border-primary/40 dark:hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all group">
          <div className="size-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-[32px]">add_circle</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{t.register}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LotManagement;
