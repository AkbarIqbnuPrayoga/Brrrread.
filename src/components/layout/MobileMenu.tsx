import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, Sparkles, MapPin, Clock, Phone } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Our Menu', path: '/menu' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Find Us', path: '/find-us' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso/70 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Drawer Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-cream-50 z-50 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto md:hidden border-l border-caramel/20"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-caramel/15">
                <span className="font-display font-extrabold text-2xl text-espresso tracking-tight">
                  Brrrread
                </span>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-cream hover:bg-caramel/20 text-espresso transition-colors"
                  aria-label="Close mobile menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col space-y-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `text-xl font-display font-bold px-3 py-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-butter/50 text-espresso'
                          : 'text-espresso/80 hover:text-espresso hover:bg-cream'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Bakery Info Footer */}
            <div className="pt-8 border-t border-caramel/15 space-y-4 text-xs text-bread/80">
              <div className="flex items-center gap-2 text-caramel font-semibold uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Baking Daily in Jakarta</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-bread flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-espresso">Daily Baking Hours</p>
                  <p>Tue – Sun: 07:00 – 19:00 (Mon Closed)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bread flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-espresso">Artisan Flagship</p>
                  <p>Jl. Senopati No. 44, Kebayoran Baru, Jakarta</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bread flex-shrink-0" />
                <span>+62 812-BRRR-EAD (Order Hotlines)</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
