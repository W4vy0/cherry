import React from 'react';
import { AppType } from '../types';
import { Image as ImageIcon, Music, MessageCircle, User } from 'lucide-react';

interface HomeScreenProps {
  onOpenApp: (appId: AppType) => void;
}

export function HomeScreen({ onOpenApp }: HomeScreenProps) {
  const apps = [
    { id: 'gallery' as AppType, name: '갤러리', icon: ImageIcon, color: 'bg-yellow-400 text-white' },
    { id: 'music' as AppType, name: '음악', icon: Music, color: 'bg-red-400 text-white' },
    { id: 'message' as AppType, name: '메시지', icon: MessageCircle, color: 'bg-green-400 text-white' },
    { id: 'profile' as AppType, name: '프로필', icon: User, color: 'bg-pink-400 text-white' },
  ];

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-between bg-pink-100 px-6 pb-8 pt-24">
      {/* App Grid */}
      <div className="grid grid-cols-4 gap-4">
        {apps.slice(0, 3).map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="flex flex-col items-center gap-2"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ${app.color}`}>
              <app.icon size={28} />
            </div>
            <span className="text-xs font-medium text-pink-900 drop-shadow-sm">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="flex w-full justify-around rounded-3xl bg-white/40 px-4 py-4 backdrop-blur-md">
        <button
          onClick={() => onOpenApp('profile')}
          className="flex flex-col items-center gap-1"
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm bg-pink-400 text-white`}>
            <User size={28} />
          </div>
        </button>
        <button
          onClick={() => onOpenApp('message')}
          className="flex flex-col items-center gap-1"
        >
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm bg-green-400 text-white relative`}>
            <MessageCircle size={28} />
            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
              2
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
