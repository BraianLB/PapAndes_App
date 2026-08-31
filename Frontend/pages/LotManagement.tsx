
import React, { useState, useEffect } from 'react';
import { CropLot, Language } from '../types';
import { translations } from '../translations';

interface LotManagementProps {
  language: Language;
}

const LotManagement: React.FC<LotManagementProps> = ({ language }) => {
  const [lots, setLots] = useState<CropLot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', sector: '', variety: '', plantedDate: '', status: 'active', maturity: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchLots = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/lotes');
      if (response.ok) {
        const data = await response.json();
        setLots(data);
      }
    } catch (error) {
      console.error('Error fetching lots:', error);
    }
  };

  useEffect(() => {
    fetchLots();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('sector', formData.sector);
    submitData.append('variety', formData.variety);
    submitData.append('plantedDate', formData.plantedDate);
    submitData.append('maturity', formData.maturity.toString());
    submitData.append('status', formData.status);
    if (imageFile) {
      submitData.append('image', imageFile);
    }

    try {
      const response = await fetch('http://localhost:3001/api/lotes', {
        method: 'POST',
        body: submitData,
      });
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ name: '', sector: '', variety: '', plantedDate: '', status: 'active', maturity: 0 });
        setImageFile(null);
        setImagePreview(null);
        fetchLots();
      }
    } catch (error) {
      console.error('Error saving lot:', error);
    }
  };

  const t = translations[language].lots;

  const activeLotsCount = lots.filter(lot => lot.status === 'active' || lot.status === 'nearing-harvest').length;
  const totalMetros = lots.reduce((acc, lot) => acc + (Number(lot.maturity) || 0), 0);
  const today = new Date();
  const nearingHarvestCount = lots.filter(lot => {
    if (lot.status === 'harvested') return false;
    if (lot.status === 'nearing-harvest') return true;
    const harvestDate = new Date(lot.plantedDate);
    harvestDate.setMonth(harvestDate.getMonth() + 6);
    const diffDays = (harvestDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }).length;

  const statusMap: Record<string, string> = {
    'active': 'Activo',
    'nearing-harvest': 'Cosecha Cercana',
    'harvested': 'Cosechado'
  };

  const getHarvestDateStr = (dateString: string) => {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'N/A';
    d.setMonth(d.getMonth() + 6);
    return d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

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
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 rounded-xl h-11 px-6 bg-primary text-slate-900 font-bold text-sm shadow-md hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-[20px]">add</span>
            {t.register}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: t.activeLots, val: activeLotsCount.toString(), trend: 'Lotes en curso', icon: 'potted_plant' },
          { label: t.formMetros || 'Metros', val: totalMetros.toString(), trend: 'Área total cultivada', icon: 'landscape' },
          { label: t.harvesting, val: nearingHarvestCount.toString(), trend: 'En los próximos 30 días', icon: 'timer', alert: true },
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
        {lots.map(lot => (
          <div key={lot.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-lg transition-all group">
            <div className="relative h-40">
              <img src={lot.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={lot.name} />
              <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm transition-colors">
                {statusMap[lot.status] || lot.status.replace('-', ' ')}
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
                  <p className="text-sm font-black text-primary">{lot.maturity} m²</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase transition-colors">{t.formMetros || 'Área'}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800 transition-colors">
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">{t.estHarvest}: {getHarvestDateStr(lot.plantedDate)}</p>
                <button className="text-primary hover:underline text-xs font-black flex items-center gap-1 uppercase">
                  {t.details} <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={() => setIsModalOpen(true)} className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 hover:border-primary/40 dark:hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/5 transition-all group">
          <div className="size-14 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-[32px]">add_circle</span>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{t.register}</p>
          </div>
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">{t.register}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formName}</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. Lote A-101" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formSector}</label>
                  <input required type="text" value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. Sector 4" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formVariety}</label>
                  <input required type="text" value={formData.variety} onChange={e => setFormData({...formData, variety: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. SPUNTA" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formPlantedDate}</label>
                  <input required type="date" value={formData.plantedDate} onChange={e => setFormData({...formData, plantedDate: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formMetros}</label>
                  <input required type="number" value={formData.maturity} onChange={e => setFormData({...formData, maturity: Number(e.target.value)})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Ej. 50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formStatus}</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                    <option value="active">{t.statusActive}</option>
                    <option value="nearing-harvest">{t.statusNearing}</option>
                    <option value="harvested">{t.statusHarvested}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formImage}</label>
                  <div className="relative w-full h-11 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">upload</span> Elegir foto</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 h-11 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                  {t.formCancel}
                </button>
                <button type="submit" className="flex-1 h-11 rounded-xl font-bold text-sm bg-primary text-slate-900 shadow-md hover:brightness-110 transition-all">
                  {t.formSubmit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotManagement;
