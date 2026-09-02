import React, { useState } from 'react';
import { SocialUser, SocialMessage } from '../../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: SocialUser | null;
  language: 'es' | 'en';
}

const mockMessages: SocialMessage[] = [
  { id: '1', senderId: 'u2', text: '¡Hola! ¿Cómo va ese cultivo de R12?', createdAt: '10:00 AM' },
  { id: '2', senderId: 'me', text: 'Todo muy bien, gracias a Dios. Ayer aplicamos abono.', createdAt: '10:05 AM' },
  { id: '3', senderId: 'u2', audioUrl: 'dummy.mp3', createdAt: '10:10 AM' },
];

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, recipient, language }) => {
  const [messages, setMessages] = useState<SocialMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const t = language === 'es' ? {
    messagesTitle: 'Mensajes',
    typeMessage: 'Escribe un mensaje...',
    send: 'Enviar',
    recording: 'Grabando audio...'
  } : {
    messagesTitle: 'Messages',
    typeMessage: 'Type a message...',
    send: 'Send',
    recording: 'Recording audio...'
  };

  if (!isOpen) return null;

  const handleSendText = () => {
    if (!newMessage.trim()) return;
    const msg: SocialMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      createdAt: 'Ahora'
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      // Simulate sending voice note
      const msg: SocialMessage = {
        id: Date.now().toString(),
        senderId: 'me',
        audioUrl: 'dummy.mp3',
        createdAt: 'Ahora'
      };
      setMessages([...messages, msg]);
    }
    setIsRecording(!isRecording);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 dark:bg-slate-900 lg:bg-black/60 lg:items-center lg:justify-center lg:p-4">
      <div className="flex flex-col h-full w-full lg:h-[80vh] lg:max-w-md bg-white dark:bg-slate-900 lg:rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            {recipient ? (
              <div className="flex items-center gap-2">
                <img src={recipient.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                <h3 className="font-bold text-slate-900 dark:text-white">{recipient.name}</h3>
              </div>
            ) : (
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">{t.messagesTitle}</h3>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/50">
          {messages.map((msg) => {
            const isMe = msg.senderId === 'me';
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 ${isMe ? 'bg-primary text-slate-900 rounded-br-sm' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-sm shadow-sm'}`}>
                  {msg.text && <p className="text-base">{msg.text}</p>}
                  {msg.audioUrl && (
                    <div className="flex items-center gap-3">
                      <button className={`w-10 h-10 rounded-full flex items-center justify-center ${isMe ? 'bg-slate-900 text-primary' : 'bg-primary text-slate-900'}`}>
                        <span className="material-symbols-outlined">play_arrow</span>
                      </button>
                      <div className="w-24 h-1 bg-current opacity-30 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-current"></div>
                      </div>
                      <span className="text-xs opacity-70">0:12</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-medium">{msg.createdAt}</span>
              </div>
            );
          })}
        </div>

        {/* Input Area - Accessible */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0 flex gap-2 items-end">
          {isRecording ? (
            <div className="flex-1 min-h-[56px] bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center gap-2 text-red-500 animate-pulse">
              <span className="material-symbols-outlined">mic</span>
              <span className="font-bold">{t.recording}</span>
            </div>
          ) : (
            <textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t.typeMessage}
              className="flex-1 min-h-[56px] max-h-32 bg-slate-50 dark:bg-slate-800 border-0 rounded-2xl resize-none p-4 focus:ring-2 focus:ring-primary text-slate-900 dark:text-white"
            />
          )}
          
          {newMessage.trim() && !isRecording ? (
            <button 
              onClick={handleSendText}
              className="w-14 h-14 rounded-2xl bg-primary text-slate-900 flex items-center justify-center shrink-0 hover:bg-primary/90 transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          ) : (
            <button 
              onClick={handleToggleRecord}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${isRecording ? 'bg-red-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              <span className="material-symbols-outlined">{isRecording ? 'stop' : 'mic'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
