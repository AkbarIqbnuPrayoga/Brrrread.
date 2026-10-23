import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../products/ProductCard';

export const BestSellers: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller || p.isStaffPick).slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#FFF6E8] border-t border-caramel/15">
      <div className="bakery-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-caramel font-bold text-xs uppercase tracking-widest mb-3">
              <Flame className="w-4 h-4 text-caramel" />
              <span>Beloved by Jakarta Bread Lovers</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-espresso tracking-tight">
              Today’s Best Sellers.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-bread/75">
              The loaves and morning pastries that sell out before noon.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-espresso hover:text-caramel transition-colors group"
          >
            <span>Explore full bakery menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
