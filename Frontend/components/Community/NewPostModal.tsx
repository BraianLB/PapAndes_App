import React, { useState } from 'react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'es' | 'en';
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose, language }) => {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const t = language === 'es' ? {
    newPost: 'Nueva Publicación',
    voiceNote: 'Nota de Voz',
    photo: 'Foto',
    publish: 'Publicar',
    placeholder: '¿Cómo van tus cultivos hoy?',
    recording: 'Grabando...',
    audioRecorded: 'Audio grabado (0:15)'
  } : {
    newPost: 'New Post',
    voiceNote: 'Voice Note',
    photo: 'Photo',
    publish: 'Publish',
    placeholder: 'How are your crops doing today?',
    recording: 'Recording...',
    audioRecorded: 'Audio recorded (0:15)'
  };

  if (!isOpen) return null;

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasAudio(true);
    } else {
      setIsRecording(true);
      setHasAudio(false);
    }
  };

  const handlePublish = () => {
    // Aquí iría la lógica para guardar el post
    setText('');
    setHasAudio(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black/60 p-0 lg:p-4 transition-opacity">
      <div className="bg-white dark:bg-slate-900 w-full lg:max-w-xl rounded-t-3xl lg:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up lg:animate-none">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2">
            <span className="material-symbols-outlined">close</span>
          </button>
          <h3 className="font-black text-xl text-slate-900 dark:text-white">{t.newPost}</h3>
          <button 
            onClick={handlePublish}
            disabled={!text && !hasAudio}
            className="bg-primary text-slate-900 font-bold px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.publish}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex gap-4">
            <img src="https://i.pravatar.cc/150?img=11" alt="Me" className="w-12 h-12 rounded-full object-cover shrink-0" />
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-transparent border-0 text-xl resize-none focus:ring-0 p-2 min-h-[120px] text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>

          {/* Audio Preview */}
          {hasAudio && (
            <div className="mt-4 ml-16 bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <button className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined">play_arrow</span>
              </button>
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                 <div className="w-0 h-full bg-primary"></div>
              </div>
              <span className="text-sm font-bold text-slate-500">{t.audioRecorded}</span>
              <button onClick={() => setHasAudio(false)} className="text-slate-400 hover:text-red-500">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Big Accessible Action Buttons */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex gap-4 border-t border-slate-100 dark:border-slate-800">
          <button className="flex-1 min-h-[64px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-3xl">photo_camera</span>
            <span className="text-xs font-bold">{t.photo}</span>
          </button>
          
          <button 
            onClick={handleToggleRecord}
            className={`flex-1 min-h-[64px] rounded-2xl flex flex-col items-center justify-center gap-1 transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-3xl">mic</span>
            <span className="text-xs font-bold">{isRecording ? t.recording : t.voiceNote}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewPostModal;
