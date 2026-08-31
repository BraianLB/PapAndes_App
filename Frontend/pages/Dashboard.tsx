import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Language } from '../types';

interface DashboardProps {
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ language }) => {
  const t = translations[language].dashboard;

  // States
  const [finanzas, setFinanzas] = useState<any[]>([]);
  const [lotes, setLotes] = useState<any[]>([]);
  const [actividades, setActividades] = useState<any[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [weatherAlert, setWeatherAlert] = useState<{type: string, message: string} | null>(null);

  // Modals state
  const [showInversionModal, setShowInversionModal] = useState(false);
  const [showProgresoModal, setShowProgresoModal] = useState(false);
  const [showActividadesModal, setShowActividadesModal] = useState(false);
  const [showWeatherAlertModal, setShowWeatherAlertModal] = useState(false);

  useEffect(() => {
    fetchData();
    fetchWeather();
  }, []);

  const fetchData = async () => {
    try {
      const [resFinanzas, resLotes, resActividades] = await Promise.all([
        fetch('http://localhost:3001/api/finanzas/resumen'),
        fetch('http://localhost:3001/api/lotes'),
        fetch('http://localhost:3001/api/actividades')
      ]);

      setFinanzas(await resFinanzas.json());
      setLotes(await resLotes.json());
      setActividades(await resActividades.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=6.4630&longitude=-75.5273&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=precipitation_sum&past_days=5&forecast_days=3&timezone=America%2FBogota');
      const data = await res.json();
      setWeather(data);

      // Calcular alertas de clima
      if (data && data.daily && data.daily.precipitation_sum) {
        const pastPrecipitation = data.daily.precipitation_sum.slice(0, 5); // Últimos 5 días
        const sumPastPrecip = pastPrecipitation.reduce((a: number, b: number) => a + (b || 0), 0);
        
        let rainStreak = 0;
        let maxRainStreak = 0;
        for (let i = 0; i < pastPrecipitation.length; i++) {
          if (pastPrecipitation[i] > 10) { // más de 10mm es lluvia intensa
            rainStreak++;
            if (rainStreak > maxRainStreak) maxRainStreak = rainStreak;
          } else {
            rainStreak = 0;
          }
        }

        if (sumPastPrecip < 2) {
          setWeatherAlert({
            type: 'sequia',
            message: 'Alerta de Sequía: Llevamos 5 días sin llover. ¡Aplica preventivos para el gusano y plagas!'
          });
        } else if (maxRainStreak >= 3) {
          setWeatherAlert({
            type: 'lluvia',
            message: 'Alerta de Lluvias Intensas: 3 días seguidos de lluvias. ¡Aplica protección urgente contra la pica!'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Calcular Inversión
  const totalInversion = finanzas.reduce((acc, item) => acc + (parseFloat(item.total) || 0), 0);
  const mp = finanzas.find(i => i.Tipo === 'MP')?.total || 0;
  const mo = finanzas.find(i => i.Tipo === 'MO')?.total || 0;
  const cif = finanzas.find(i => i.Tipo === 'CIF')?.total || 0;
  const gasto = finanzas.find(i => i.Tipo === 'GASTO')?.total || 0;

  // Progreso Lotes
  const calculateProgress = (plantedDate: string, maturityDays: number) => {
    if (!plantedDate || !maturityDays) return 0;
    const planted = new Date(plantedDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - planted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let progress = (diffDays / maturityDays) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const lotesWithProgress = lotes.map(l => {
    // Si metros es usado como tamaño y no madurez, necesitamos una madurez estándar (ej: 120 días para papa)
    const maturity = l.maturity > 0 && l.maturity < 300 ? l.maturity : 120; 
    const prog = calculateProgress(l.plantedDate, maturity);
    return { ...l, progress: prog };
  }).sort((a, b) => b.progress - a.progress);

  const top4Lotes = lotesWithProgress.slice(0, 4);

  // Actividades por día
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const dayAfter = new Date();
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = dayAfter.toISOString().split('T')[0];

  const upcomingActivities = actividades.filter(a => {
    const actDate = new Date(a.fecha).toISOString().split('T')[0];
    return actDate >= todayStr && actDate <= dayAfterStr;
  });

  const nextActivity = upcomingActivities.length > 0 ? upcomingActivities[0] : null;

  // Repartir inversión proporcionalmente al tamaño del lote
  const totalMetros = lotes.reduce((acc, l) => acc + (parseFloat(l.maturity) || 10000), 0); // Asumimos metros si no hay

  return (
    <div className="p-8 relative">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{t.subtitle} <span className="text-primary font-bold">{lotes.length} {t.activeFields}</span>.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Inversión Total */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group">
          <div className="absolute top-4 right-4">
            <button onClick={() => setShowInversionModal(true)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-slate-400 hover:text-earth-brown-600">book</span>
            </button>
          </div>
          <div className="mb-4">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Inversión Total</p>
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            ${totalInversion.toLocaleString('es-CO')}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">MP:</span>
              <span className="font-bold text-slate-900 dark:text-white">${parseFloat(mp as string).toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">MO:</span>
              <span className="font-bold text-slate-900 dark:text-white">${parseFloat(mo as string).toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CIF:</span>
              <span className="font-bold text-slate-900 dark:text-white">${parseFloat(cif as string).toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gasto:</span>
              <span className="font-bold text-slate-900 dark:text-white">${parseFloat(gasto as string).toLocaleString('es-CO')}</span>
            </div>
          </div>
        </div>

        {/* Progreso de Ciclo */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:col-span-2 relative group">
          <div className="absolute top-4 right-4">
            <button onClick={() => setShowProgresoModal(true)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-slate-400 hover:text-primary">eco</span>
            </button>
          </div>
          <div className="mb-6">
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Progreso del Ciclo de Cultivo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {top4Lotes.map((lote) => {
              const isHarvest = lote.progress >= 85;
              return (
                <div key={lote.id} className="space-y-2">
                  <div className="flex justify-between text-[11px] font-black uppercase">
                    <span className="text-slate-700 dark:text-slate-300">{lote.name} ({lote.variety})</span>
                    <span className={isHarvest ? "text-orange-500" : "text-primary"}>{Math.round(lote.progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isHarvest ? "bg-orange-500" : "bg-primary"}`} 
                      style={{ width: `${lote.progress}%` }} 
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                    {isHarvest ? 'Próximo a Cosechar' : 'En Crecimiento'}
                  </p>
                </div>
              );
            })}
            {top4Lotes.length === 0 && <p className="text-sm text-slate-500">No hay lotes registrados.</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alertas Críticas */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span>
              Alertas Críticas
            </h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Alerta de Siguiente Actividad */}
            {nextActivity ? (
              <div onClick={() => setShowActividadesModal(true)} className="p-6 flex gap-4 items-start cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                  <span className="material-symbols-outlined">event_available</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">Siguiente Actividad: {nextActivity.tipo_operacion}</p>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                      {new Date(nextActivity.fecha).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Programado en el lote {nextActivity.lote_nombre}. Clic para ver actividades de los próximos días.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 text-sm text-slate-500">No hay actividades programadas para los próximos días.</div>
            )}

            {/* Alerta de Clima */}
            {weatherAlert && (
              <div onClick={() => setShowWeatherAlertModal(true)} className="p-6 flex gap-4 items-start cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-amber-50 dark:bg-amber-900/20 text-amber-600">
                  <span className="material-symbols-outlined">{weatherAlert.type === 'sequia' ? 'wb_sunny' : 'thunderstorm'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">
                      Alerta Climática: {weatherAlert.type === 'sequia' ? 'Sequía' : 'Lluvias Intensas'}
                    </p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Se han detectado condiciones anómalas. Clic para ver recomendaciones.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clima en Vivo */}
        <div className="space-y-6">
          <div className="bg-forest-green dark:bg-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border dark:border-slate-800 transition-colors">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 mb-1 tracking-widest">Clima en Vivo</p>
                  <h4 className="text-xl font-black">San Pedro de los Milagros, Ant</h4>
                </div>
                <span className="material-symbols-outlined text-4xl text-primary">
                  {weather?.current?.precipitation > 0 ? 'rainy' : 'wb_sunny'}
                </span>
              </div>
              
              {weather?.current ? (
                <>
                  <div className="flex items-end gap-2 mb-8">
                    <span className="text-5xl font-black">{Math.round(weather.current.temperature_2m)}°</span>
                    <span className="text-2xl font-medium opacity-60 mb-1">C</span>
                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg ml-auto mb-2">
                      {weather.current.precipitation > 0 ? 'Lluvioso' : 'Despejado'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm opacity-60">humidity_percentage</span>
                      <div className="text-[10px]">
                        <p className="opacity-60 leading-none mb-1 font-bold">Humedad</p>
                        <p className="font-bold">{weather.current.relative_humidity_2m}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm opacity-60">air</span>
                      <div className="text-[10px]">
                        <p className="opacity-60 leading-none mb-1 font-bold">Viento</p>
                        <p className="font-bold">{weather.current.wind_speed_10m} km/h</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm opacity-60">rainy</span>
                      <div className="text-[10px]">
                        <p className="opacity-60 leading-none mb-1 font-bold">Precipitación</p>
                        <p className="font-bold">{weather.current.precipitation} mm</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-sm opacity-80 py-8">Cargando clima...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALES --- */}

      {/* Modal Inversion */}
      {showInversionModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Desglose de Inversión por Lote</h3>
              <button onClick={() => setShowInversionModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
              <div className="space-y-4">
                {lotes.map(lote => {
                  const loteMetros = parseFloat(lote.maturity) || 10000;
                  const ratio = totalMetros > 0 ? (loteMetros / totalMetros) : 0;
                  
                  return (
                    <div key={lote.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-slate-900 dark:text-white">{lote.name} <span className="text-xs font-normal text-slate-500">({lote.variety})</span></h4>
                        <span className="font-black text-primary">${(totalInversion * ratio).toLocaleString('es-CO')}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs text-center">
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <p className="text-slate-400 mb-1">MP</p>
                          <p className="font-bold text-slate-700 dark:text-slate-300">${(Number(mp) * ratio).toLocaleString('es-CO')}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <p className="text-slate-400 mb-1">MO</p>
                          <p className="font-bold text-slate-700 dark:text-slate-300">${(Number(mo) * ratio).toLocaleString('es-CO')}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <p className="text-slate-400 mb-1">CIF</p>
                          <p className="font-bold text-slate-700 dark:text-slate-300">${(Number(cif) * ratio).toLocaleString('es-CO')}</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-900 p-2 rounded-lg">
                          <p className="text-slate-400 mb-1">Gasto</p>
                          <p className="font-bold text-slate-700 dark:text-slate-300">${(Number(gasto) * ratio).toLocaleString('es-CO')}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {lotes.length === 0 && <p className="text-center text-slate-500">No hay lotes para mostrar.</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Progreso Lotes */}
      {showProgresoModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Progreso de Todos los Lotes</h3>
              <button onClick={() => setShowProgresoModal(false)} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-900/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lotesWithProgress.map(lote => {
                  const isHarvest = lote.progress >= 85;
                  return (
                    <div key={lote.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between text-xs font-black uppercase mb-3">
                        <span className="text-slate-700 dark:text-slate-300">{lote.name}</span>
                        <span className={isHarvest ? "text-orange-500" : "text-primary"}>{Math.round(lote.progress)}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full ${isHarvest ? "bg-orange-500" : "bg-primary"}`} 
                          style={{ width: `${lote.progress}%` }} 
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold mb-1">Semilla: {lote.variety}</p>
                      <p className="text-[10px] text-slate-500 font-bold mb-1">Siembra: {new Date(lote.plantedDate).toLocaleDateString()}</p>
                      {isHarvest && <p className="text-xs font-bold text-orange-500 mt-2">¡Lote próximo a cosechar!</p>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Actividades */}
      {showActividadesModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-blue-600 text-white">
              <h3 className="text-xl font-black">Próximas Actividades</h3>
              <button onClick={() => setShowActividadesModal(false)} className="text-blue-200 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-0 overflow-y-auto">
              {['Hoy', 'Mañana', 'Día Siguiente'].map((dayLabel, idx) => {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + idx);
                const targetStr = targetDate.toISOString().split('T')[0];
                
                const dayActivities = actividades.filter(a => new Date(a.fecha).toISOString().split('T')[0] === targetStr);

                return (
                  <div key={dayLabel} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-2">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dayLabel} ({targetDate.toLocaleDateString()})</h4>
                    </div>
                    <div className="p-6 space-y-4">
                      {dayActivities.length > 0 ? dayActivities.map(act => (
                        <div key={act.id} className="flex gap-4 items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-sm">{act.tipo_operacion}</p>
                            <p className="text-xs text-slate-500">Lote: {act.lote_nombre}</p>
                          </div>
                        </div>
                      )) : <p className="text-xs text-slate-400 italic">No hay actividades programadas.</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal Alerta Clima */}
      {showWeatherAlertModal && weatherAlert && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl">
            <div className={`p-6 flex justify-between items-center ${weatherAlert.type === 'sequia' ? 'bg-amber-500' : 'bg-blue-600'} text-white`}>
              <h3 className="text-xl font-black flex items-center gap-2">
                <span className="material-symbols-outlined">{weatherAlert.type === 'sequia' ? 'wb_sunny' : 'thunderstorm'}</span>
                {weatherAlert.type === 'sequia' ? 'Alerta por Sequía' : 'Alerta por Lluvias'}
              </h3>
              <button onClick={() => setShowWeatherAlertModal(false)} className="text-white/70 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="p-8 text-center space-y-6">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${weatherAlert.type === 'sequia' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'}`}>
                <span className="material-symbols-outlined text-4xl">{weatherAlert.type === 'sequia' ? 'pest_control' : 'agriculture'}</span>
              </div>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                {weatherAlert.message}
              </p>
              <button 
                onClick={() => setShowWeatherAlertModal(false)}
                className={`w-full py-3 rounded-xl font-bold text-white transition-transform active:scale-95 ${weatherAlert.type === 'sequia' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
