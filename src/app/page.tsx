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
  return (
    <>
      <LoadingScreen />
      <HeroSection />
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
