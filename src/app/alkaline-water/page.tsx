'use client';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import AlkalineHeroSection from '@/components/sections/AlkalineHeroSection';
import AlkalineLifestyleSection from '@/components/sections/AlkalineLifestyleSection';
import AlkalineSubscribeSection from '@/components/sections/AlkalineSubscribeSection';

export default function AlkalineWaterPage() {
  const [loadingState, setLoadingState] = useState<'loading' | 'transitioning' | 'loaded'>('loading');

  useEffect(() => {
    document.body.classList.add('loading-active');
    return () => {
      document.body.classList.remove('loading-active');
    };
  }, []);

  const handleTransitionStart = () => {
    setLoadingState('transitioning');
  };

  const handleTransitionEnd = () => {
    setLoadingState('loaded');
    document.body.classList.remove('loading-active');
  };

  return (
    <>
      {loadingState !== 'loaded' && (
        <LoadingScreen 
          loadingState={loadingState}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
        />
      )}
      <div style={{ opacity: loadingState === 'loaded' ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        <AlkalineHeroSection />
        <AlkalineLifestyleSection />
        <AlkalineSubscribeSection />
      </div>
    </>
  );
}
