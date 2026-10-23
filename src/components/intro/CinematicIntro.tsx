import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

const FULL_HEADLINE = "GOOD THINGS TAKE A LITTLE DOUGH.";
const SUBTEXT = "Freshly baked. Made with love.";

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleSkip = () => {
    // Clear all scheduled timers immediately
    timerRef.current.forEach((t) => clearTimeout(t));
    setIsExiting(true);
    const exitTimer = setTimeout(() => {
      onComplete();
    }, 850);
    timerRef.current.push(exitTimer);
  };

  useEffect(() => {
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < FULL_HEADLINE.length) {
        setDisplayedText(FULL_HEADLINE.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingDone(true);

        const subTimer = setTimeout(() => {
          setShowSubtext(true);
        }, 350);
        timerRef.current.push(subTimer);

        // Auto transition after user reads
        const finishTimer = setTimeout(() => {
          handleSkip();
        }, 2200);
        timerRef.current.push(finishTimer);
      }
    }, 65);

    return () => {
      clearInterval(typingInterval);
      timerRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{
            x: '100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#2D1B15] text-[#FFF6E8] select-none overflow-hidden"
          style={{ willChange: 'transform' }}
          role="dialog"
          aria-label="Welcome to Brrrread Intro"
        >
          {/* Subtle Organic Background Texture */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#F6D98B 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Top Bakery Packaging Line */}
          <div className="relative w-full pt-8 px-6 md:px-12 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-butter animate-pulse" />
              <span className="font-display tracking-[0.25em] text-xs uppercase text-butter/80">
                BRRRREAD / EST. 2024
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex items-center gap-2 text-xs text-butter/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-butter" />
              <span>Artisanal Fermentation Lab</span>
            </motion.div>
          </div>

          {/* Center Stage: Wordmark & Typewriter Headline */}
          <div className="relative w-full max-w-4xl mx-auto px-6 text-center py-12 flex flex-col items-center">
            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <span className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-butter">
                Brrrread
              </span>
            </motion.div>

            {/* Packaging divider line expanding */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-[1px] bg-butter/40 mb-10"
            />

            {/* Typewriter text */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] text-[#FFF6E8] min-h-[4rem] sm:min-h-[5rem] text-center max-w-4xl mx-auto">
              <span className="inline">
                {displayedText}
                <span
                  className={`inline-block w-[3px] sm:w-1 md:w-1.5 h-[0.8em] ml-1.5 bg-butter ${
                    isTypingDone ? 'animate-pulse' : 'opacity-100'
                  }`}
                  style={{ verticalAlign: '-0.05em' }}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtext reveal */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showSubtext ? 1 : 0, y: showSubtext ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-base sm:text-lg text-butter/85 font-serif italic tracking-wide"
            >
              {SUBTEXT}
            </motion.p>

            {/* Minimal Dough Baking Progress Bar */}
            <div className="mt-12 w-48 sm:w-64 h-1 bg-espresso-soft rounded-full overflow-hidden border border-butter/20">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: isTypingDone ? '100%' : '75%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
                className="h-full bg-butter rounded-full"
              />
            </div>
            <span className="text-[11px] text-butter/50 tracking-widest mt-2 uppercase">
              Warming hearth ovens...
            </span>
          </div>

          {/* Bottom Bar: Skip Button */}
          <div className="relative w-full pb-8 px-6 md:px-12 flex justify-between items-end">
            <div className="text-xs text-cream/40 hidden md:block">
              Daily stone-hearth bakes • 100% French Butter
            </div>

            <button
              onClick={handleSkip}
              className="ml-auto group flex items-center gap-2 px-5 py-2.5 rounded-full bg-espresso-soft/80 border border-butter/30 text-xs sm:text-sm text-butter hover:bg-butter hover:text-espresso transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-butter shadow-warm active:scale-95"
              aria-label="Skip introduction and enter bakery shop"
            >
              <span>Skip Intro</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
