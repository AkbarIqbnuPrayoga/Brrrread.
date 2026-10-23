import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useScrollState } from '../../hooks/useScrollState';
import { MobileMenu } from './MobileMenu';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const isScrolled = useScrollState(25);
  const location = useLocation();
  const { getTotalItems, openCart, openSearch } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeBounced, setBadgeBounced] = useState(false);
  const totalItems = getTotalItems();

  // Micro-interaction bounce when cart item count changes
  useEffect(() => {
    if (totalItems > 0) {
      setBadgeBounced(true);
      const timer = setTimeout(() => setBadgeBounced(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Menu', path: '/menu' },
    { name: 'Our Story', path: '/our-story' },
    { name: 'Find Us', path: '/find-us' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-3 sm:pt-4 md:pt-6 pointer-events-none transition-all duration-300">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-[1180px] rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-panel-cream shadow-warm-lg py-2.5 px-5 sm:px-7'
              : 'bg-[#FFF6E8]/70 backdrop-blur-md border border-[#C98752]/20 shadow-warm py-3.5 px-6 sm:px-8'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo with playful hover micro-interaction */}
            <Link
              to="/"
              className="group flex items-center font-display text-xl sm:text-2xl font-extrabold tracking-tight text-espresso select-none"
              aria-label="Brrrread Bakery Home"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-espresso group-hover:text-caramel transition-colors"
              >
                Brrrread
              </motion.span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
                      isActive
                        ? 'text-espresso'
                        : 'text-espresso/70 hover:text-espresso hover:bg-espresso/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute bottom-0 left-3 right-3 h-[2px] bg-caramel rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Action Icons: Search, Bag, Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Search Toggle */}
              <button
                onClick={openSearch}
                aria-label="Search bakes and bread"
                className="p-2 sm:p-2.5 rounded-full text-espresso/80 hover:text-espresso hover:bg-espresso/5 transition-all duration-200 active:scale-95"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Shopping Bag with Dynamic Bounce Badge */}
              <button
                onClick={openCart}
                aria-label={`Shopping bag with ${totalItems} items`}
                className="relative p-2 sm:p-2.5 rounded-full bg-butter/30 hover:bg-butter text-espresso transition-all duration-200 active:scale-95 flex items-center justify-center border border-butter/50"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{
                        scale: badgeBounced ? 1.25 : 1,
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute -top-1 -right-1 bg-caramel text-cream-50 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="md:hidden p-2 rounded-full text-espresso hover:bg-espresso/5 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Global Search Modal */}
      <SearchModal />
    </>
  );
};
