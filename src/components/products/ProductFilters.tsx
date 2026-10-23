import React from 'react';
import { ProductCategory } from '../../types';
import { ArrowUpDown, X } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onlyInStock: boolean;
  onToggleInStock: (checked: boolean) => void;
  activeCount: number;
  onResetFilters: () => void;
}

const CATEGORIES: { id: ProductCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Bakes', icon: '✨' },
  { id: 'croissants', label: 'Croissants & Pastries', icon: '🥐' },
  { id: 'artisan-bread', label: 'Artisan Bread', icon: '🥖' },
  { id: 'sweet-bakes', label: 'Sweet Bakes', icon: '🧁' },
  { id: 'savory-bakes', label: 'Savory Bakes', icon: '🌿' },
  { id: 'bakery-boxes', label: 'Bakery Boxes', icon: '🎁' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onlyInStock,
  onToggleInStock,
  activeCount,
  onResetFilters,
}) => {
  return (
    <div className="space-y-6">
      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-espresso text-cream-50 border-espresso shadow-warm'
                  : 'bg-cream-50 text-espresso/80 border-caramel/25 hover:border-caramel hover:bg-cream'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Sub-bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cream-50 border border-caramel/15">
        {/* Availability Switch */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs sm:text-sm font-semibold text-espresso">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="w-4 h-4 rounded text-caramel accent-caramel focus:ring-caramel"
          />
          <span>Show ready-to-bake in-stock only</span>
        </label>

        {/* Right side: Sort Selector & Reset */}
        <div className="flex items-center gap-3 ml-auto">
          {activeCount > 0 && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-caramel hover:text-bread font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <div className="flex items-center gap-2 bg-cream px-3 py-1.5 rounded-xl border border-caramel/20">
            <ArrowUpDown className="w-3.5 h-3.5 text-bread/60" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-espresso focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
