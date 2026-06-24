import React, { useState, useEffect } from 'react';
import { Battery, Wifi, Signal } from 'lucide-react';

interface StatusBarProps {
  isLockScreen?: boolean;
}

export function StatusBar({ isLockScreen = false }: StatusBarProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const textColor = isLockScreen ? 'text-pink-500' : 'text-gray-900';

  return (
    <div className={`absolute top-0 z-50 flex w-full items-center justify-between px-6 py-3 text-xs font-medium ${textColor}`}>
      <div>{time}</div>
      <div className="flex items-center gap-2">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={16} />
      </div>
    </div>
  );
}
