import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wheat, Timer, Flame, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

const STEPS = [
  {
    step: '01',
    icon: Wheat,
    title: 'Crafted with Care',
    description: 'We blend heritage stoneground wheat flours with filtered spring water and our 8-year sourdough starter. No chemical improvers, no shortcuts.',
  },
  {
    step: '02',
    icon: Timer,
    title: '36-Hour Slow Fermentation',
    description: 'Patience transforms flour. Cold fermentation breaks down gluten structures naturally, creating deep nutty aroma and easy gut digestibility.',
  },
  {
    step: '03',
    icon: Flame,
    title: 'Fresh from the Stone Hearth',
    description: 'Baked under intense steam on heavy refractory stones. The blistered caramelized crust seals in moisture, producing a cloud-like open crumb.',
  },
  {
    step: '04',
    icon: PackageCheck,
    title: 'Ready for Your Table',
    description: 'Packed fresh in breathable unbleached kraft paper to preserve crust crunchiness while on its way to your home or table.',
  },
];

export const BakeryStory: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-espresso text-cream-50 relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-caramel/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="bakery-container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-butter font-bold text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-butter" />
            <span>The Fermentation Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-cream-50 leading-tight">
            Good Bread Takes Time.{' '}
            <span className="font-serif italic font-normal text-butter block sm:inline">
              Never Rushed.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-cream/80 max-w-2xl leading-relaxed">
            In an era of instant gratification, we choose the ancient craft of slow sourdough baking. Every loaf at Brrrread takes 3 days from mixing bowl to your morning coffee.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col justify-between p-7 rounded-3xl bg-espresso-soft border border-butter/15 hover:border-butter/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-extrabold text-2xl text-butter/60 group-hover:text-butter transition-colors">
                      {s.step}
                    </span>
                    <div className="p-3 rounded-2xl bg-espresso border border-butter/20 text-butter group-hover:bg-butter group-hover:text-espresso transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-cream-50 mb-3 group-hover:text-butter transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-cream/70 leading-relaxed font-normal">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream/10 text-[11px] text-butter/60 uppercase tracking-widest font-semibold">
                  Stage {idx + 1} of 4
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Story CTA Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-bread-dark to-espresso border border-butter/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-cream-50">
              Want to meet our starter and visit our hearth kitchen?
            </h4>
            <p className="text-xs sm:text-sm text-cream/70 mt-1">
              Read the complete story behind how Brrrread started in Senopati, Jakarta.
            </p>
          </div>

          <Link to="/our-story" className="flex-shrink-0">
            <Button variant="secondary" size="md">
              Read Our Full Story
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
