
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiDiagnosis } from '../geminiService';
import { Language } from '../types';
import { translations } from '../translations';

interface AIInsightsProps {
  language: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  imageUrl?: string;
  isDiagnostic?: boolean;
}

const AIInsights: React.FC<AIInsightsProps> = ({ language }) => {
  const t = translations[language].ai;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: language === 'es' 
        ? "¡Hola! Soy tu asistente de Papandes. ¿Has notado algo inusual en tus cultivos hoy? Puedes subir una foto para un diagnóstico rápido."
        : "Hello! I am your Papandes assistant. Noticed anything unusual in your crops today? You can upload a photo for a quick diagnosis.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const diagnosis = await getGeminiDiagnosis(input);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: diagnosis || 'Error.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isDiagnostic: diagnosis?.toLowerCase().includes('diagnosis')
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const userMessage: Message = {
          id: Date.now().toString(),
          sender: 'user',
          text: language === 'es' ? "Analiza esta hoja, por favor." : "Analyze this leaf, please.",
          imageUrl: reader.result as string,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        const diagnosis = await getGeminiDiagnosis("Please analyze this potato leaf for diseases.", base64);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: diagnosis || 'Error.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDiagnostic: true
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col bg-[#f6f8f6] dark:bg-[#0a0d0a] transition-colors duration-300">
      <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="size-8 text-primary">
            <span className="material-symbols-outlined text-3xl filled-icon">auto_awesome</span>
          </div>
          <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">{t.title}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center shrink-0 border border-primary/40 transition-colors">
                <span className="material-symbols-outlined text-primary text-xl filled-icon">auto_awesome</span>
              </div>
            )}
            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest mx-1">
                {msg.sender === 'user' ? (language === 'es' ? 'Agricultor' : 'Farmer') : 'Papandes AI'} • {msg.time}
              </p>
              <div className={`rounded-2xl px-5 py-4 shadow-sm border transition-colors ${
                msg.sender === 'user' 
                  ? 'bg-primary text-slate-900 border-primary rounded-tr-none' 
                  : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 rounded-tl-none'
              }`}>
                {msg.imageUrl && (
                  <img src={msg.imageUrl} alt="Analysis" className="rounded-xl mb-3 max-w-full h-auto border border-black/10 dark:border-white/10 shadow-sm" />
                )}
                <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex items-start gap-3">
            <div className="bg-primary/20 rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
               <span className="material-symbols-outlined text-primary text-xl">more_horiz</span>
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-2 italic">{t.analyzing}</p>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-[#0a0d0a] dark:via-[#0a0d0a]/95 dark:to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar">
            {t.suggestions.map(chip => (
              <button 
                key={chip}
                onClick={() => { setInput(chip); }}
                className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 hover:border-primary dark:hover:border-primary hover:text-primary transition-all shadow-sm text-xs font-bold text-slate-600 dark:text-slate-400"
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="relative flex flex-col gap-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl transition-all">
            <textarea 
              className="w-full bg-transparent border-none focus:ring-0 resize-none px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-white"
              placeholder={t.placeholder}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <div className="flex items-center justify-between px-2 pb-1">
              <div className="flex items-center gap-1">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
                >
                  <span className="material-symbols-outlined">add_a_photo</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <button 
                type="submit"
                className="flex items-center gap-2 bg-primary text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-md"
              >
                {language === 'es' ? 'Enviar' : 'Send'}
                <span className="material-symbols-outlined text-lg filled-icon">send</span>
              </button>
            </div>
          </form>
          <p className="text-center text-[10px] text-slate-400 dark:text-slate-600 mt-4 font-bold uppercase tracking-widest">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
