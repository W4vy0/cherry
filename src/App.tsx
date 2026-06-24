import React, { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { StatusBar } from './components/StatusBar';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileApp } from './components/apps/ProfileApp';
import { GalleryApp } from './components/apps/GalleryApp';
import { MusicApp } from './components/apps/MusicApp';
import { MessageApp } from './components/apps/MessageApp';
import { AppType } from './types';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [currentApp, setCurrentApp] = useState<AppType>(null);

  const handleUnlock = () => setIsLocked(false);
  const handleOpenApp = (appId: AppType) => setCurrentApp(appId);
  const handleCloseApp = () => setCurrentApp(null);

  return (
    <PhoneContainer>
      <StatusBar isLockScreen={isLocked} />
      
      <AnimatePresence mode="wait">
        {isLocked && <LockScreen key="lock" onUnlock={handleUnlock} />}
      </AnimatePresence>

      {!isLocked && (
        <>
          <HomeScreen onOpenApp={handleOpenApp} />
          
          <AnimatePresence>
            {currentApp === 'profile' && <ProfileApp key="profile" onClose={handleCloseApp} />}
            {currentApp === 'gallery' && <GalleryApp key="gallery" onClose={handleCloseApp} />}
            {currentApp === 'music' && <MusicApp key="music" onClose={handleCloseApp} />}
            {currentApp === 'message' && <MessageApp key="message" onClose={handleCloseApp} />}
          </AnimatePresence>
        </>
      )}
    </PhoneContainer>
  );
}
