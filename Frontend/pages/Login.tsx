import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    usuario: '',
    contrasena: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const url = isLogin ? 'http://localhost:3001/api/login' : 'http://localhost:3001/api/register';
    const body = isLogin 
      ? { usuario: formData.usuario, contrasena: formData.contrasena }
      : formData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error en la solicitud');
      }

      if (isLogin) {
        onLogin(); 
      } else {
        setIsLogin(true);
        setFormData({ ...formData, contrasena: '' });
        alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      <div className="fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-center bg-cover brightness-[0.4]"
          style={{ backgroundImage: 'url("https://picsum.photos/id/111/1920/1080")' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[440px] px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          <div className="pt-10 pb-6 px-8 flex flex-col items-center">
            <div className="mb-4 flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
              <span className="material-symbols-outlined text-primary text-4xl">agriculture</span>
            </div>
            <h1 className="text-slate-900 tracking-tight text-3xl font-black text-center">
              Welcome to Papandes
            </h1>
            <p className="text-slate-500 text-sm mt-1 text-center">
              {isLogin ? 'Inicia sesión para continuar' : 'Crea una cuenta nueva'}
            </p>
          </div>

          <form className="px-8 pb-10 space-y-4" onSubmit={handleSubmit}>
            {errorMsg && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
                <p>{errorMsg}</p>
              </div>
            )}

            {!isLogin && (
              <>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 text-xs font-bold uppercase tracking-wider px-1">
                    Nombre Completo
                  </label>
                  <input 
                    name="nombre_completo"
                    value={formData.nombre_completo}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-slate-200 bg-white h-12 px-4 text-sm focus:ring-primary focus:border-primary transition-all"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-700 text-xs font-bold uppercase tracking-wider px-1">
                    Correo
                  </label>
                  <input 
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-slate-200 bg-white h-12 px-4 text-sm focus:ring-primary focus:border-primary transition-all"
                    placeholder="tucorreo@ejemplo.com"
                    required
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider px-1">
                {isLogin ? 'Usuario o Correo' : 'Nombre de Usuario'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">{isLogin ? 'mail' : 'person'}</span>
                </div>
                <input 
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-slate-200 bg-white h-12 pl-11 pr-4 text-sm focus:ring-primary focus:border-primary transition-all"
                  placeholder={isLogin ? 'usuario o correo' : 'tu_usuario'}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                  Contraseña
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border-slate-200 bg-white h-12 pl-11 pr-4 text-sm focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-forest-green hover:bg-forest-green/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Procesando...' : isLogin ? 'Ingresar' : 'Registrarse'}
              {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </button>
            
            <p className="text-center text-sm text-slate-500 pt-4">
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'} 
              <button 
                type="button" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrorMsg('');
                }}
                className="text-primary font-bold hover:underline ml-1"
              >
                {isLogin ? 'Regístrate aquí' : 'Ingresa aquí'}
              </button>
            </p>
          </form>

          <div className="bg-slate-50 py-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-slate-400">verified_user</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Enterprise Access</span>
          </div>
        </div>
        <p className="mt-8 text-white/60 text-center text-xs">
          © {new Date().getFullYear()} Papandes Agro-Tech Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
