import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Music, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'motion/react';

interface MusicAppProps {
  onClose: () => void;
}

export function MusicApp({ onClose }: MusicAppProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const updateProgress = () => {
        setCurrentTime(formatTime(audio.currentTime));
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      };

      const handleLoadedMetadata = () => {
        setDuration(formatTime(audio.duration));
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime('0:00');
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col bg-gray-900 text-white"
    >
      <audio 
        ref={audioRef} 
        src="https://raw.githubusercontent.com/W4vy0/maids/main/mp3.mp3" 
        preload="metadata"
        loop
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-12">
        <button onClick={onClose} className="p-2 text-white">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-sm font-medium">지금 재생 중</h1>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="mb-8 flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full border-4 border-gray-800 bg-gray-800 shadow-2xl relative">
          <img src="https://igx.kr/v/35/w/1" alt="Album Cover" className="w-full h-full object-cover opacity-70" />
        </div>

        <div className="mb-8 w-full text-center">
          <h2 className="mb-1 text-2xl font-bold">체리의 플레이리스트</h2>
          <p className="text-gray-400">이체리</p>
        </div>

        {/* Progress */}
        <div className="mb-8 w-full">
          <div className="h-1.5 w-full rounded-full bg-gray-700 overflow-hidden">
            <div 
              className="h-1.5 rounded-full bg-pink-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-400">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex w-full items-center justify-center gap-8">
          <button className="text-gray-400 hover:text-white">
            <SkipBack size={32} />
          </button>
          <button 
            onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-400 transition-colors"
          >
            {isPlaying ? (
              <Pause size={32} />
            ) : (
              <Play size={32} className="ml-1" />
            )}
          </button>
          <button className="text-gray-400 hover:text-white">
            <SkipForward size={32} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
