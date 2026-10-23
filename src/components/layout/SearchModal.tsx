import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data/products';
import { formatIDR } from '../../utils/formatters';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useCartStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const filtered = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.flavorNotes.some((f) => f.toLowerCase().includes(query)) ||
          p.ingredients.some((i) => i.toLowerCase().includes(query))
        );
      })
    : [];

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    navigate(`/product/${slug}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-cream-50 border border-caramel/25 rounded-3xl shadow-warm-lg overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-caramel/15 bg-cream/50">
              <Search className="w-5 h-5 text-bread" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search croissants, sourdough, cardamom, dark chocolate..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-espresso placeholder-espresso/45 font-medium text-base focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-full text-espresso/40 hover:text-espresso hover:bg-espresso/5"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="ml-2 text-xs font-semibold px-2.5 py-1 rounded-lg bg-espresso/10 text-espresso hover:bg-espresso/15"
              >
                ESC
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-caramel/10">
              {searchQuery.trim() === '' ? (
                <div>
                  <div className="text-xs font-semibold tracking-wider text-bread/60 uppercase mb-3">
                    Popular Bakery Cravings
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Croissant', 'Sourdough', 'Valrhona Chocolate', 'Shokupan', 'Cardamom', 'Truffle Danish'].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-xs px-3 py-1.5 rounded-full bg-cream hover:bg-butter/50 text-espresso font-medium border border-caramel/20 transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                  <div className="text-xs font-semibold tracking-wider text-bread/60 uppercase mb-3">
                    Recommended Bakes
                  </div>
                  <div className="space-y-2">
                    {PRODUCTS.slice(0, 3).map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod.slug)}
                        className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-cream/80 cursor-pointer transition-colors group"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-espresso group-hover:text-caramel-dark transition-colors truncate">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-bread/70 truncate">{prod.tagline}</p>
                        </div>
                        <span className="text-xs font-bold text-bread">
                          {formatIDR(prod.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-base font-semibold text-espresso mb-1">
                    No warm bakes found for "{searchQuery}"
                  </p>
                  <p className="text-xs text-bread/60">
                    Try searching for "croissant", "sourdough", or "butter".
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-xs font-semibold tracking-wider text-bread/60 uppercase mb-3">
                    {filtered.length} Fresh Bakes Found
                  </div>
                  {filtered.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.slug)}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-cream/80 cursor-pointer transition-colors group"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-espresso group-hover:text-caramel-dark transition-colors truncate">
                            {prod.name}
                          </h4>
                          <span className="text-[10px] uppercase font-semibold text-bread/50 px-2 py-0.5 rounded-full bg-cream">
                            {prod.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-bread/75 line-clamp-1 mt-0.5">
                          {prod.tagline}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-extrabold text-bread">
                          {formatIDR(prod.price)}
                        </div>
                        <span className="text-[11px] text-caramel flex items-center justify-end gap-1 font-medium mt-0.5">
                          View Bake <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Quick Link */}
            <div className="px-6 py-3.5 bg-cream/70 border-t border-caramel/15 flex justify-between items-center text-xs text-bread/70">
              <span>Looking for complete catalog?</span>
              <Link
                to="/menu"
                onClick={closeSearch}
                className="font-bold text-espresso hover:text-caramel flex items-center gap-1"
              >
                Browse All Menu &rarr;
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
