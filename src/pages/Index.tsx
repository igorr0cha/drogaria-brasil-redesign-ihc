
import React, { useEffect } from 'react';
import HomeCarousel from '@/components/HomeCarousel';
import FeatureSection from '@/components/FeatureSection';
import StoreSection from '@/components/StoreSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import SearchBar from '@/components/SearchBar';
import ReviewSection from '@/components/ReviewSection';
import { initGlobalAnimations } from '@/utils/scrollAnimations';

const Index = () => {
  useEffect(() => {
    const cleanup = initGlobalAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <HomeCarousel />
      
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto scroll-animation">
          <SearchBar />
        </div>
      </div>
      
      <FeatureSection />
      <FeaturedProducts />
      <StoreSection />
      <ReviewSection />
    </div>
  );
};

export default Index;
