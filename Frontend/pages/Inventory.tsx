import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface InventoryProps {
  language: Language;
}

const Inventory: React.FC<InventoryProps> = ({ language }) => {
  const t = translations[language].inventory;
  const [items, setItems] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Producto: '', Tipo: '', Medida: '', Precio: 0, P_Unitario: 0, Q_Caneca: 0, Descripcion: ''
  });

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/items');
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error('Error fetching inventory:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData({ ...formData, [name]: type === 'number' ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowModal(false);
        setFormData({ Producto: '', Tipo: '', Medida: '', Precio: 0, P_Unitario: 0, Q_Caneca: 0, Descripcion: '' });
        loadItems();
      } else {
        alert('Error al guardar el producto.');
      }
    } catch (e) {
      console.error('Error saving item:', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">{t.title}</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">{t.subtitle}</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-primary hover:brightness-110 text-slate-900 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-md transition-all">
          <span className="material-symbols-outlined text-lg">add_circle</span>
          {t.addProduct}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: t.totalItems, val: items.length.toString(), trend: 'Updated', icon: 'inventory', color: 'primary' },
          { label: t.lowStock, val: '0', trend: 'Ok', icon: 'warning', color: 'rose' },
          { label: t.valuation, val: `Calculated`, trend: 'Dynamic', icon: 'account_balance_wallet', color: 'blue' },
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                <th className="px-6 py-4">{t.prodName}</th>
                <th className="px-6 py-4">{t.type}</th>
                <th className="px-6 py-4">{t.stock} / Medida</th>
                <th className="px-6 py-4">{t.price}</th>
                <th className="px-6 py-4 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-colors">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-slate-500">Subiendo inventario...</td></tr>
              ) : items.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">{p.Producto}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[200px]">{p.Descripcion}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors">
                      {p.Tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-900 dark:text-white transition-colors">{p.Q_Caneca} {p.Medida}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white transition-colors">${p.Precio}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 dark:text-slate-500 hover:text-primary transition-colors p-2">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400">package_2</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Nuevo Producto</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Añadir al inventario de PapAndes</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Producto */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nombre del Producto</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                    </div>
                    <input required name="Producto" value={formData.Producto} onChange={handleInputChange} 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400" 
                      placeholder="Ej: NitroX 500" />
                  </div>
                </div>

                {/* Tipo */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tipo (Categoría)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">category</span>
                    </div>
                    <input required name="Tipo" value={formData.Tipo} onChange={handleInputChange} 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400" 
                      placeholder="Ej: Insecticida" />
                  </div>
                </div>

                {/* Medida & Cantidad */}
                <div className="flex gap-4 col-span-1 md:col-span-2">
                  <div className="flex gap-2 flex-col w-1/3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Medida</label>
                    <div className="relative">
                      <input required name="Medida" value={formData.Medida} onChange={handleInputChange} 
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400" 
                        placeholder="Ej: Litros" />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-col w-2/3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Cantidad (Stock)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                      </div>
                      <input required name="Q_Caneca" type="number" step="any" value={formData.Q_Caneca} onChange={handleInputChange} 
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white" />
                    </div>
                  </div>
                </div>

                {/* Precios */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Precio Total ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">payments</span>
                    </div>
                    <input required name="Precio" type="number" step="any" value={formData.Precio} onChange={handleInputChange} 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Precio Unitario ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-[18px]">attach_money</span>
                    </div>
                    <input required name="P_Unitario" type="number" step="any" value={formData.P_Unitario} onChange={handleInputChange} 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white" />
                  </div>
                </div>

                {/* Descripcion */}
                <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Descripción detallada</label>
                  <textarea required name="Descripcion" value={formData.Descripcion} onChange={handleInputChange} 
                    className="w-full p-4 bg-slate-50 dark:bg-slate-800/50 border border-transparent rounded-xl text-sm focus:bg-white dark:focus:bg-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-900 dark:text-white min-h-[100px] resize-y" 
                    placeholder="Escribe brevemente para qué sirve o detalles adicionales..." />
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={submitting} className="group relative px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/30 transition-all overflow-hidden flex items-center gap-2">
                  <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] duration-500 transition-transform"></div>
                  {submitting ? 'Procesando...' : 'Guardar en Inventario'}
                  {!submitting && <span className="material-symbols-outlined text-[18px]">done</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;
