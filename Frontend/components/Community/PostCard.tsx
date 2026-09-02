import React, { useState } from 'react';
import { SocialPost } from '../../types';

interface PostCardProps {
  post: SocialPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onMessage: (userId: string) => void;
  language: 'es' | 'en';
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onMessage, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = language === 'es' ? {
    like: 'Me Gusta',
    comment: 'Comentar',
    message: 'Mensaje'
  } : {
    like: 'Like',
    comment: 'Comment',
    message: 'Message'
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // En un caso real, aquí iría la lógica del reproductor (HTMLAudioElement)
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6 transition-colors">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={post.user.avatar} alt={post.user.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{post.user.name}</h4>
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px]">location_on</span>
              {post.user.location} • {post.createdAt}
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>

      {/* Content */}
      <div className="w-full relative bg-slate-50 dark:bg-slate-800/50 min-h-[100px] flex items-center justify-center">
        {post.imageUrl && (
          <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
        )}
        
        {post.audioUrl && !post.imageUrl && (
          <div className="p-12 flex flex-col items-center justify-center w-full">
            <button 
              onClick={togglePlay}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${isPlaying ? 'bg-earth-brown-500 text-white' : 'bg-primary text-slate-900'}`}
            >
              <span className="material-symbols-outlined text-4xl">{isPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
            <p className="mt-4 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {isPlaying ? 'Reproduciendo...' : 'Nota de Voz'}
            </p>
          </div>
        )}
      </div>

      {/* Body Text */}
      {post.text && (
        <div className="p-4 pt-4">
          <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{post.text}</p>
        </div>
      )}

      {/* Footer Actions - Accessible big buttons */}
      <div className="px-2 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div className="flex gap-1">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl text-red-500">favorite</span>
            <span className="font-bold text-lg">{post.likes}</span>
          </button>
          
          <button 
            onClick={() => onComment(post.id)}
            className="flex items-center justify-center gap-2 min-h-[48px] min-w-[48px] px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
            <span className="font-bold text-lg">{post.comments.length}</span>
          </button>
        </div>

        <button 
          onClick={() => onMessage(post.user.id)}
          className="flex items-center justify-center min-h-[48px] min-w-[48px] px-4 rounded-xl text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">send</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
