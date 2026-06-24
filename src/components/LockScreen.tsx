import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Delete } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const controls = useAnimation();

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
      setDate(
        now.toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
          weekday: 'long',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (pin.length === 4) {
      if (pin === '0000') {
        onUnlock();
      } else {
        setError(true);
        controls.start({
          x: [-10, 10, -10, 10, 0],
          transition: { duration: 0.4 }
        }).then(() => {
          setPin('');
          setError(false);
        });
      }
    }
  }, [pin, onUnlock, controls]);

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del']
  ];

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-between bg-white px-6 pb-12 pt-24 text-pink-500 touch-none">
      <div className="flex flex-col items-center text-center">
        <h2 className="mb-2 text-xl font-medium">{date}</h2>
        <h1 className="text-7xl font-light tracking-tighter">{time}</h1>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <motion.div animate={controls} className="flex gap-6">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full border-2 transition-colors ${
                error ? 'border-red-500 bg-red-500' : 
                pin.length > index ? 'border-pink-500 bg-pink-500' : 'border-pink-500 bg-transparent'
              }`}
            />
          ))}
        </motion.div>

        <p className={`text-sm h-5 font-medium ${error ? 'text-red-500' : 'text-pink-500'}`}>
          {error ? '비밀번호가 틀렸습니다' : '비밀번호 4자리를 입력하세요'}
        </p>

        <div className="grid w-full max-w-[280px] grid-cols-3 gap-y-4 gap-x-8 mt-4">
          {keypad.map((row, rowIndex) =>
            row.map((key, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="flex justify-center">
                {key === '' ? (
                  <div className="h-16 w-16" />
                ) : key === 'del' ? (
                  <button
                    onClick={handleDelete}
                    className="flex h-16 w-16 items-center justify-center rounded-full text-pink-500 active:bg-pink-50 transition-colors"
                  >
                    <Delete size={28} />
                  </button>
                ) : (
                  <button
                    onClick={() => handleKeyPress(key)}
                    className="flex h-16 w-16 items-center justify-center rounded-full text-3xl font-light text-pink-500 active:bg-pink-100 transition-colors"
                  >
                    {key}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
