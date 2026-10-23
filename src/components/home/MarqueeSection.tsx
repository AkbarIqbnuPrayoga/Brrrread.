import React from 'react';

const MARQUEE_ITEMS = [
  'FRESHLY BAKED DAILY',
  'PURE FRENCH AOP BUTTER',
  '36-HOUR SLOW FERMENTATION',
  'STONE-HEARTH BAKED',
  'GOOD BREAD, GOOD MOOD',
  'ZERO PRESERVATIVES',
  'HANDCRAFTED CROISSANTS',
  'NATURAL SOURDOUGH CULTURE',
];

export const MarqueeSection: React.FC = () => {
  return (
    <div className="relative py-4 sm:py-5 bg-espresso text-butter overflow-hidden border-y border-butter/25 select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* Render twice for continuous loop */}
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 text-xs sm:text-sm font-display font-extrabold tracking-[0.2em]">
            <span>{text}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-caramel inline-block" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
};
