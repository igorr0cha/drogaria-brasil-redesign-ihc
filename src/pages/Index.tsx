
import React from 'react';
import HomeCarousel from '@/components/HomeCarousel';
import FeatureSection from '@/components/FeatureSection';
import StoreSection from '@/components/StoreSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import SearchBar from '@/components/SearchBar';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HomeCarousel />
      
      <div className="container mx-auto py-8">
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>
      
      <FeatureSection />
      <FeaturedProducts />
      <StoreSection />
    </div>
  );
};

export default Index;
