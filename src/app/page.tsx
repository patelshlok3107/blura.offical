'use client';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/ui/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import PourSection from '@/components/sections/PourSection';
import GlassSection from '@/components/sections/GlassSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import BulkInquirySection from '@/components/sections/BulkInquirySection';
import RotationSection from '@/components/sections/RotationSection';
import CondensationSection from '@/components/sections/CondensationSection';
import LifestyleSection from '@/components/sections/LifestyleSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  const [loadingState, setLoadingState] = useState<'loading' | 'transitioning' | 'loaded'>('loading');

  useEffect(() => {
    // Add loading active state class to body on mount
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
      <HeroSection loadingState={loadingState} />
      <PourSection />
      <GlassSection />
      <FeaturesSection />
      <BulkInquirySection />
      <RotationSection />
      <CondensationSection />
      <LifestyleSection />
      <CTASection />
    </>
  );
}

