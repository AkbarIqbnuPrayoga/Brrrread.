import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Flame, Clock } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
      {/* Warm Ambient Glow in the background */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-butter/25 rounded-full blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-caramel/15 rounded-full blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="bakery-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* 1. Small badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butter/40 border border-butter/60 text-xs font-extrabold uppercase tracking-widest text-espresso mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-caramel-dark" />
              <span>BRRRREAD / FRESHLY BAKED DAILY</span>
            </motion.div>

            {/* 2. Main Headline with text mask reveal */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-espresso tracking-tight leading-[1.08]"
              >
                A Little Bread.{' '}
                <span className="font-serif italic font-normal text-caramel block sm:inline">
                  A Lot of
                </span>{' '}
                Happiness.
              </motion.h1>
            </div>

            {/* 3. Brand Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-bread/85 max-w-xl font-normal leading-relaxed mb-8"
            >
              Warm loaves, buttery flaky layers, and gentle morning rituals worth slowing down for. Baked with wild fermentation and pure French butter. Find your new daily comfort at <strong className="font-bold text-espresso">Brrrread</strong>.
            </motion.p>

            {/* 4. Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/menu" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-warm-lg group">
                  <span>Explore Our Menu</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/our-story" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Our Bakery Story
                </Button>
              </Link>
            </motion.div>

            {/* Micro stats banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10 sm:mt-12 pt-6 border-t border-caramel/20 flex flex-wrap items-center gap-6 text-xs text-bread font-semibold"
            >
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-caramel" />
                <span>Stone-Hearth Baked Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caramel" />
                <span>36-Hour Wild Fermentation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage" />
                <span>Zero Artificial Preservatives</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Food Photography */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Main Circular / Rounded Frame */}
              <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-caramel/30 shadow-warm-lg bg-cream-50 aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85"
                  alt="Golden flaky artisan croissant from Brrrread"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Bottom Tag */}
                <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-butter block mb-1">
                    Signature Morning Bake
                  </span>
                  <p className="font-display text-xl font-bold">
                    Pure French AOP Butter Croissant
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Sourdough Heritage */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 sm:-left-8 bg-cream-50/95 backdrop-blur-md p-4 rounded-2xl border border-caramel/30 shadow-warm max-w-[210px] hidden sm:block"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">🥖</span>
                  <span className="text-xs font-bold text-espresso uppercase tracking-wider">
                    Dough-lilah
                  </span>
                </div>
                <p className="text-[11px] text-bread/80 leading-snug">
                  8-year-old wild starter nurtured with spring water & rye.
                </p>
              </motion.div>

              {/* Floating Badge 2: Fresh Out of Oven */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-espresso text-butter px-4 py-2.5 rounded-2xl border border-butter/30 shadow-warm flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-butter animate-ping" />
                <span className="text-xs font-bold tracking-wide">
                  Oven Fresh at 07:00
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
