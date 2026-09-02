import React, { useState } from 'react';
import { Language, SocialPost, SocialUser } from '../types';
import PostCard from '../components/Community/PostCard';
import ChatModal from '../components/Community/ChatModal';
import NewPostModal from '../components/Community/NewPostModal';

interface CommunityProps {
  language: Language;
}

// Mock Data
const MOCK_USERS: Record<string, SocialUser> = {
  u1: { id: 'u1', name: 'Carlos Rendón', avatar: 'https://i.pravatar.cc/150?img=11', location: 'San Pedro de los Milagros' },
  u2: { id: 'u2', name: 'Don Joaquín', avatar: 'https://i.pravatar.cc/150?img=33', location: 'Entrerríos' },
  u3: { id: 'u3', name: 'María Zapata', avatar: 'https://i.pravatar.cc/150?img=5', location: 'Santa Rosa de Osos' },
};

const MOCK_POSTS: SocialPost[] = [
  {
    id: 'p1',
    user: MOCK_USERS.u2,
    text: 'Buen día para todos. Hoy amaneció lloviendo muy fuerte en la vereda. Recuerden aplicar el preventivo para la pica, que la humedad está alta. ¡Bendiciones!',
    imageUrl: 'https://picsum.photos/id/111/800/600',
    likes: 24,
    comments: [
      { id: 'c1', user: MOCK_USERS.u3, text: 'Gracias por el dato, don Joaquín.', createdAt: 'Hace 1h' }
    ],
    createdAt: 'Hace 2 horas'
  },
  {
    id: 'p2',
    user: MOCK_USERS.u3,
    text: '¿Alguien sabe a cómo está pagando el bulto de Diacol Capiro en la mayorista hoy?',
    likes: 12,
    comments: [],
    createdAt: 'Hace 4 horas'
  },
  {
    id: 'p3',
    user: MOCK_USERS.u1,
    audioUrl: 'voice_note_1.mp3', // Simulando que es una nota de voz
    likes: 45,
    comments: [],
    createdAt: 'Ayer'
  }
];

const Community: React.FC<CommunityProps> = ({ language }) => {
  const [posts] = useState<SocialPost[]>(MOCK_POSTS);
  
  // Modals state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatUser, setActiveChatUser] = useState<SocialUser | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);

  const t = language === 'es' ? {
    title: 'Comunidad',
    subtitle: 'Conecta con otros agricultores de la región.',
    newPostTitle: 'Compartir actualización'
  } : {
    title: 'Community',
    subtitle: 'Connect with other regional farmers.',
    newPostTitle: 'Share an update'
  };

  const handleLike = (postId: string) => {
    // Lógica para dar like
    console.log('Like a', postId);
  };

  const handleComment = (postId: string) => {
    // Abrir sección de comentarios o navegar
    console.log('Comentar en', postId);
  };

  const handleMessage = (userId: string) => {
    const user = MOCK_USERS[userId] || MOCK_USERS.u2;
    setActiveChatUser(user);
    setIsChatOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#f6f8f6] dark:bg-[#0a0d0a]">
      {/* Top Header & Big CTA */}
      <div className="sticky top-0 z-30 bg-[#f6f8f6]/90 dark:bg-[#0a0d0a]/90 backdrop-blur-md p-4 lg:p-8 border-b border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t.subtitle}</p>
          </div>
          
          <button 
            onClick={() => { setActiveChatUser(null); setIsChatOpen(true); }}
            className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-sm hover:bg-slate-50"
          >
            <span className="material-symbols-outlined">forum</span>
          </button>
        </div>

        {/* Big Accessible Create Button */}
        <div className="max-w-2xl mx-auto mt-6">
          <button 
            onClick={() => setIsNewPostOpen(true)}
            className="w-full bg-white dark:bg-slate-900 border-2 border-primary/20 hover:border-primary/50 text-slate-600 dark:text-slate-300 rounded-2xl p-4 flex items-center gap-4 shadow-sm transition-all"
          >
            <img src="https://i.pravatar.cc/150?img=11" alt="Me" className="w-12 h-12 rounded-full object-cover" />
            <span className="text-lg font-medium opacity-70 text-left flex-1">{t.newPostTitle}</span>
            <div className="flex gap-2">
              <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">photo_camera</span>
              </span>
              <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-slate-900">
                <span className="material-symbols-outlined">mic</span>
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Feed Container */}
      <div className="max-w-2xl mx-auto p-4 lg:p-8 pb-32">
        {posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike} 
            onComment={handleComment} 
            onMessage={handleMessage}
            language={language}
          />
        ))}
      </div>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <button 
          onClick={() => setIsNewPostOpen(true)}
          className="w-16 h-16 bg-primary text-slate-900 rounded-full shadow-2xl flex items-center justify-center animate-bounce-slow"
        >
          <span className="material-symbols-outlined text-3xl">mic</span>
        </button>
      </div>

      {/* Modals */}
      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
        recipient={activeChatUser}
        language={language}
      />
      
      <NewPostModal 
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        language={language}
      />
    </div>
  );
};

export default Community;
