import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [onlyInStock, setOnlyInStock] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync category with URL search param if changed externally
  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory;
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('popular');
    setOnlyInStock(false);
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesTag = item.tagline.toLowerCase().includes(q);
        const matchesNotes = item.flavorNotes.some((f) => f.toLowerCase().includes(q));
        const matchesIngr = item.ingredients.some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesTag && !matchesNotes && !matchesIngr) return false;
      }
      // Stock filter
      if (onlyInStock && item.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // default: popular (best sellers first, then staff pick)
      const scoreA = (a.isBestSeller ? 2 : 0) + (a.isStaffPick ? 1 : 0);
      const scoreB = (b.isBestSeller ? 2 : 0) + (b.isStaffPick ? 1 : 0);
      return scoreB - scoreA;
    });
  }, [selectedCategory, searchTerm, sortBy, onlyInStock]);

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0) + (onlyInStock ? 1 : 0);

  return (
    <div className="pt-28 sm:pt-36 pb-24 min-h-screen bg-[#FFF6E8]">
      <div className="bakery-container">
        {/* Page Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter/50 border border-butter/70 text-xs font-bold uppercase tracking-widest text-espresso mb-3">
            <Sparkles className="w-3.5 h-3.5 text-caramel-dark" />
            <span>DAILY STONE-HEARTH MENU</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-espresso tracking-tight">
            Find Your Kind of Bread.
          </h1>

          <p className="mt-3 text-sm sm:text-base md:text-lg text-bread/80 leading-relaxed">
            Every morning before sunrise, our bakers fire up the hearth ovens to craft small-batch croissants, long-fermented sourdoughs, and spiced morning buns. Explore what's warm today.
          </p>
        </div>

        {/* Local Search input inside menu */}
        <div className="mb-6 relative max-w-md">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-bread/60" />
          <input
            type="text"
            placeholder="Search by ingredient, flavor, or pastry name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-cream-50 border border-caramel/25 text-sm font-medium text-espresso placeholder-espresso/45 focus:outline-none focus:ring-2 focus:ring-caramel shadow-sm"
          />
        </div>

        {/* Filters and Sorting Component */}
        <div className="mb-10">
          <ProductFilters
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onlyInStock={onlyInStock}
            onToggleInStock={setOnlyInStock}
            activeCount={activeFilterCount}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Products Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-cream-50 rounded-3xl border border-caramel/20 p-8 shadow-warm">
            <div className="text-4xl mb-3">🥖</div>
            <h3 className="font-display font-extrabold text-xl text-espresso mb-2">
              No bakes match your criteria
            </h3>
            <p className="text-sm text-bread/70 max-w-md mx-auto mb-6">
              We couldn't find any artisan bakes matching your active filters. Try clearing search keywords or switching categories.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-espresso text-cream-50 font-bold text-xs hover:bg-bread transition-colors shadow-warm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-bread/70 mb-6">
              <span>
                Showing <strong>{filteredProducts.length}</strong> fresh bakes
              </span>
              <span>Available for instant Jakarta delivery & store pickup</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
