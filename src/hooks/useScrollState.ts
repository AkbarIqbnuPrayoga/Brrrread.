import { useState, useEffect } from 'react';

export function useScrollState(threshold = 40): boolean {
  const [isScrolled, setIsScrolled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.scrollY > threshold;
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrolled = window.scrollY > threshold;
          setIsScrolled((prev) => (prev !== currentScrolled ? currentScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
