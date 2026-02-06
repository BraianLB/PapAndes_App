
import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
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
              Comprehensive potato crop management
            </p>
          </div>

          <form className="px-8 pb-10 space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="flex flex-col gap-1.5">
              <label className="text-slate-700 text-xs font-bold uppercase tracking-wider px-1">
                Username or Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input 
                  className="w-full rounded-xl border-slate-200 bg-white h-12 pl-11 pr-4 text-sm focus:ring-primary focus:border-primary transition-all"
                  placeholder="name@company.com"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                  Password
                </label>
                <a className="text-primary text-[11px] font-bold hover:underline" href="#">Forgot?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  className="w-full rounded-xl border-slate-200 bg-white h-12 pl-11 pr-4 text-sm focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-forest-green hover:bg-forest-green/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
            >
              Log In
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            
            <p className="text-center text-sm text-slate-500 pt-4">
              Don't have an account? <a href="#" className="text-primary font-bold hover:underline">Sign Up</a>
            </p>
          </form>

          <div className="bg-slate-50 py-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-slate-400">verified_user</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Enterprise Access</span>
          </div>
        </div>
        <p className="mt-8 text-white/60 text-center text-xs">
          © 2024 Papandes Agro-Tech Solutions. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
