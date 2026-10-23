import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/home/HeroSection';
import { MarqueeSection } from '../components/home/MarqueeSection';
import { SignatureCollection } from '../components/home/SignatureCollection';
import { BestSellers } from '../components/home/BestSellers';
import { BakeryStory } from '../components/home/BakeryStory';
import { BundlesPromo } from '../components/home/BundlesPromo';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      {/* 5.1 Stage 1: Left-to-right Reveal Curtain */}
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
        style={{ transformOrigin: 'right' }}
        className="fixed inset-0 bg-espresso z-40 pointer-events-none"
      />

      <HeroSection />
      <MarqueeSection />
      <SignatureCollection />
      <BestSellers />
      <BakeryStory />
      <BundlesPromo />
      <NewsletterSection />
    </motion.div>
  );
};
