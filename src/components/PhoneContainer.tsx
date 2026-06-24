import React from 'react';
import { AppType } from '../types';

interface PhoneContainerProps {
  children: React.ReactNode;
}

export function PhoneContainer({ children }: PhoneContainerProps) {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-gray-100 p-0 sm:p-4">
      <div className="relative h-full w-full overflow-hidden bg-white sm:h-[850px] sm:max-h-full sm:w-[400px] sm:rounded-[3rem] sm:border-[14px] sm:border-gray-900 sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
