
import React, { useState, useEffect } from 'react';
import { Language, CropLot, Activity } from '../types';
import { translations } from '../translations';

interface OperationsRegistryProps {
  language: Language;
}

const OperationsRegistry: React.FC<OperationsRegistryProps> = ({ language }) => {
  const t = translations[language].operations;
  const [activities, setActivities] = useState<Activity[]>([]);
  const [lots, setLots] = useState<CropLot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id_lote: '', tipo_operacion: 'Fumigacion-Iny', fecha: '', estado: 'Completado' });
  const [filterType, setFilterType] = useState('');
  const [filterLot, setFilterLot] = useState('');
  const [currentView, setCurrentView] = useState<'registro' | 'plan' | 'historial'>('registro');
  const [timeFilter, setTimeFilter] = useState<'semana' | 'mes' | 'todos'>('todos');

  const opTypes = ['Fumigacion-Iny', 'Fumigacion-Fol', 'Siembra', 'Rayar', 'Aporque', 'Retapa', 'Cuña'];

  const fetchData = async () => {
    try {
      const [actRes, lotRes] = await Promise.all([
        fetch('http://localhost:3001/api/actividades'),
        fetch('http://localhost:3001/api/lotes')
      ]);
      if (actRes.ok && lotRes.ok) {
        const actData = await actRes.json();
        const lotData = await lotRes.json();
        setActivities(actData);
        setLots(lotData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setFormData({ id_lote: '', tipo_operacion: 'Fumigacion-Iny', fecha: '', estado: 'Completado' });
        fetchData();
      }
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  };

  const toggleActivityStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Pendiente' ? 'Completado' : 'Pendiente';
    try {
      const response = await fetch(`http://localhost:3001/api/actividades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus })
      });
      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating activity:', error);
    }
  };

  const filteredActivities = activities.filter(act => {
    const matchType = filterType ? act.tipo_operacion === filterType : true;
    const matchLot = filterLot ? act.id_lote.toString() === filterLot : true;
    
    let matchView = true;
    if (currentView === 'registro') {
      matchView = act.estado === 'Pendiente';
    } else if (currentView === 'historial') {
      matchView = act.estado === 'Completado';
    }

    let matchTime = true;
    if (timeFilter !== 'todos') {
      const actDate = new Date(act.fecha);
      const today = new Date();
      if (timeFilter === 'semana') {
        const diff = Math.abs(actDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        matchTime = diff <= 7;
      } else if (timeFilter === 'mes') {
        matchTime = actDate.getMonth() === today.getMonth() && actDate.getFullYear() === today.getFullYear();
      }
    }
    
    return matchType && matchLot && matchView && matchTime;
  });

  const getTranslatedOpType = (type: string) => {
    const key = Object.keys(t.types || {}).find(k => (t.types as any)[k] === type || k.toLowerCase().replace(/[^a-z]/g, '') === type.toLowerCase().replace(/[^a-z]/g, ''));
    return key ? (t.types as any)[key] || type : type;
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDay = new Date(currentYear, currentMonth, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Lunes como primer dia

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => i);

    const typeColors: Record<string, string> = {
      'Fumigacion-Iny': 'bg-rose-500', 'Fumigacion-Fol': 'bg-pink-500', 'Siembra': 'bg-emerald-500',
      'Rayar': 'bg-blue-500', 'Aporque': 'bg-amber-500', 'Retapa': 'bg-purple-500', 'Cuña': 'bg-orange-500'
    };

    return (
      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map(d => (
            <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {blanks.map(b => <div key={`blank-${b}`} className="h-24 rounded-xl bg-slate-50/50 dark:bg-slate-800/20"></div>)}
          {days.map(day => {
            const calDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayActs = filteredActivities.filter(act => act.fecha.substring(0, 10) === calDateStr);
            return (
              <div key={day} className="h-24 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-2 flex flex-col gap-1 overflow-y-auto hover:border-primary transition-colors cursor-default">
                <span className="text-xs font-bold text-slate-400 mb-1">{day}</span>
                {dayActs.map(act => (
                   <div key={act.id} className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded truncate shadow-sm cursor-pointer hover:brightness-110 ${typeColors[act.tipo_operacion] || 'bg-primary'}`} title={act.tipo_operacion} onClick={() => toggleActivityStatus(act.id, act.estado)}>
                     {getTranslatedOpType(act.tipo_operacion)}
                   </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 relative">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{t.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{t.subtitle}</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary hover:brightness-110 text-slate-900 px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined">add_circle</span>
          {t.logActivity}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Views</p>
            <nav className="flex flex-col gap-2">
              <button onClick={() => setCurrentView('registro')} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-bold text-sm shadow-sm transition-all ${currentView === 'registro' ? 'bg-primary text-slate-900' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <span className="material-symbols-outlined text-xl">event_list</span>
                {t.registry}
              </button>
              <button onClick={() => setCurrentView('plan')} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-bold text-sm transition-all ${currentView === 'plan' ? 'bg-primary text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <span className="material-symbols-outlined text-xl">calendar_month</span>
                {t.weeklyPlan}
              </button>
              <button onClick={() => setCurrentView('historial')} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-bold text-sm transition-all ${currentView === 'historial' ? 'bg-primary text-slate-900 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
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
                <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary min-w-[160px] transition-colors appearance-none px-4 py-2">
                  <option value="">{t.opTypes}</option>
                  {opTypes.map(op => (
                    <option key={op} value={op}>{getTranslatedOpType(op)}</option>
                  ))}
                </select>
                <select value={filterLot} onChange={e => setFilterLot(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 focus:ring-primary min-w-[140px] transition-colors appearance-none px-4 py-2">
                  <option value="">{t.allLots}</option>
                  {lots.map(lot => (
                    <option key={lot.id} value={lot.id}>{lot.name} - {lot.sector}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl transition-colors">
                <button onClick={() => setTimeFilter(timeFilter === 'semana' ? 'todos' : 'semana')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeFilter === 'semana' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}>{t.week}</button>
                <button onClick={() => setTimeFilter(timeFilter === 'mes' ? 'todos' : 'mes')} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${timeFilter === 'mes' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}>{t.month}</button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-6 py-4 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center transition-colors">
              <h3 className="font-bold text-slate-900 dark:text-white">{currentView === 'plan' ? 'Calendario de Actividades' : currentView === 'historial' ? 'Historial de Operaciones' : t.recentAct}</h3>
            </div>
            {currentView === 'plan' ? renderCalendar() : (
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
                  {filteredActivities.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        {new Date(row.fecha).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">
                        {getTranslatedOpType(row.tipo_operacion)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase transition-colors">
                          {row.lote_nombre} ({row.lote_ubicacion})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleActivityStatus(row.id, row.estado)} className={`flex items-center gap-1 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg border transition-all hover:scale-105 ${row.estado === 'Completado' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800'}`}>
                          <span className="material-symbols-outlined text-sm">{row.estado === 'Completado' ? 'check_circle' : 'schedule'}</span>
                          {row.estado}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredActivities.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm font-medium text-slate-500">No hay actividades registradas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para registrar actividad */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{t.logActivity}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formType}</label>
                <select required value={formData.tipo_operacion} onChange={e => setFormData({...formData, tipo_operacion: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                  {opTypes.map(op => (
                    <option key={op} value={op}>{getTranslatedOpType(op)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.lot}</label>
                <select required value={formData.id_lote} onChange={e => setFormData({...formData, id_lote: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                  <option value="">Selecciona un lote</option>
                  {lots.map(lot => (
                    <option key={lot.id} value={lot.id}>{lot.name} - {lot.sector}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formDate}</label>
                  <input required type="date" value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t.formStatus}</label>
                  <select value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})} className="w-full h-11 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none">
                    <option value="Completado">Completado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
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

export default OperationsRegistry;
