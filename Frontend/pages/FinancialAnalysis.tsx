
import React, { useState, useEffect } from 'react';
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

  const [summary, setSummary] = useState({ MO: 0, MP: 0, CIF: 0, GASTO: 0 });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    producto: '',
    tipo: 'MP',
    descripcion: '',
    medida: '',
    cantidad: 1,
    precio: 0
  });

  const [priceUpdatePrompt, setPriceUpdatePrompt] = useState<{producto: string, oldPrice: number, newPrice: number} | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resSummary, resTrans] = await Promise.all([
        fetch('http://localhost:3001/api/finanzas/resumen'),
        fetch('http://localhost:3001/api/compras/recientes')
      ]);
      
      const sumData = await resSummary.json();
      const transData = await resTrans.json();
      
      const newSummary = { MO: 0, MP: 0, CIF: 0, GASTO: 0 };
      sumData.forEach((item: any) => {
        if (item.Tipo === 'MO' || item.Tipo === 'MP' || item.Tipo === 'CIF' || item.Tipo === 'GASTO') {
          newSummary[item.Tipo as keyof typeof newSummary] = parseFloat(item.total) || 0;
        }
      });
      
      setSummary(newSummary);
      setTransactions(transData);
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/compras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsModalOpen(false);
        const currentProduct = formData.producto;
        setFormData({ producto: '', tipo: 'MP', descripcion: '', medida: '', cantidad: 1, precio: 0 });
        
        if (data.priceChanged) {
          setPriceUpdatePrompt({
            producto: currentProduct,
            oldPrice: data.oldPrice,
            newPrice: data.newPrice
          });
        } else {
          fetchData();
        }
      } else {
        console.error('Error al guardar el gasto');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const handlePriceUpdate = async (update: boolean) => {
    if (update && priceUpdatePrompt) {
      try {
        await fetch('http://localhost:3001/api/productos/updatePrice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            producto: priceUpdatePrompt.producto,
            precio_anterior: priceUpdatePrompt.oldPrice,
            precio_nuevo: priceUpdatePrompt.newPrice
          }),
        });
      } catch (error) {
        console.error('Error updating price:', error);
      }
    }
    setPriceUpdatePrompt(null);
    fetchData();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">{t.dateRange}</button>
          <button onClick={() => setIsModalOpen(true)} className="bg-earth-brown-700 dark:bg-earth-brown-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            {t.addExpense}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: t.rawMaterial, val: formatCurrency(summary.MP), pct: 50, icon: 'grass', trend: 'MP', down: false },
          { label: t.labor, val: formatCurrency(summary.MO), pct: 30, icon: 'groups', trend: 'MO', down: false },
          { label: t.indirect, val: formatCurrency(summary.CIF), pct: 15, icon: 'precision_manufacturing', trend: 'CIF' },
          { label: t.admin, val: formatCurrency(summary.GASTO), pct: 5, icon: 'account_balance', trend: 'GASTO' },
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
              {transactions.length > 0 ? (
                transactions.map((t_row, i) => {
                  const isOk = true; 
                  return (
                    <tr key={t_row.ID || i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">{t_row.Producto || t_row.Descripsion}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-black text-earth-brown-700 dark:text-earth-brown-300 bg-earth-brown-100 dark:bg-earth-brown-900/40 px-2.5 py-1 rounded-lg uppercase transition-colors">
                          {t_row.Tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400">
                        {new Date(t_row.Fecha).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric'})}
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-slate-900 dark:text-white">{formatCurrency(t_row.Total)}</td>
                      <td className="px-6 py-4">
                        <span className="material-symbols-outlined text-xl" style={{ color: isOk ? '#19e619' : '#f59e0b' }}>
                          {isOk ? 'check_circle' : 'schedule'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 font-bold">
                    {loading ? 'Cargando...' : 'No hay transacciones recientes'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">Agregar Gasto</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Producto</label>
                <input required type="text" name="producto" value={formData.producto} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" placeholder="Nombre completo" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Tipo</label>
                  <select required name="tipo" value={formData.tipo} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all">
                    <option value="MP">Materia Prima (MP)</option>
                    <option value="MO">Mano de Obra (MO)</option>
                    <option value="CIF">Ind. Fabricación (CIF)</option>
                    <option value="GASTO">Gasto Administrativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Medida</label>
                  <input required type="text" name="medida" value={formData.medida} onChange={handleChange} placeholder="Ej: Kg, Bulto" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Cantidad</label>
                  <input required min="0" step="0.01" type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Precio Unitario</label>
                  <input required min="0" type="number" name="precio" value={formData.precio} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-earth-brown-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 h-20 resize-none" placeholder="Detalles de la compra..."></textarea>
              </div>

              <div className="flex gap-3 justify-end mt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold text-sm bg-earth-brown-600 text-white hover:brightness-110 transition-all shadow-sm">Guardar Gasto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {priceUpdatePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Cambio de Precio</h3>
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-6">
              El precio ingresado para <strong className="text-slate-900 dark:text-white">{priceUpdatePrompt.producto}</strong> (${priceUpdatePrompt.newPrice}) no coincide con el precio registrado en el inventario (${priceUpdatePrompt.oldPrice}).
              <br /><br />
              ¿Desea actualizar y guardar el nuevo precio?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button onClick={() => handlePriceUpdate(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                No
              </button>
              <button onClick={() => handlePriceUpdate(true)} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-600 transition-all shadow-sm">
                Sí, actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialAnalysis;
