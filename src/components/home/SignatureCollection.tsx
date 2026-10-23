import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../../types';

interface CollectionItem {
  id: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 'croissants',
    title: 'Croissants & Pastries',
    subtitle: 'Honeycomb Micro-Layers',
    description: 'Folded with 84% French cultured butter and baked to golden, shatter-crisp perfection.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=85',
    badge: 'Flagship Craft',
  },
  {
    id: 'artisan-bread',
    title: 'Artisan Country Breads',
    subtitle: 'Wild Fermentation',
    description: 'Deep blistered crusts, open custard crumbs, nurtured with our 8-year wild levain.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=85',
    badge: '36h Fermented',
  },
  {
    id: 'sweet-bakes',
    title: 'Sweet Morning Bakes',
    subtitle: 'Spiced & Glazed',
    description: 'Swedish cardamom knots, double Valrhona chocolate pain, and almond frangipane.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=85',
    badge: 'Sweet Comfort',
  },
  {
    id: 'savory-bakes',
    title: 'Savory Hearth Bakes',
    subtitle: 'Herbs & Truffle',
    description: 'High-hydration olive oil focaccias, wild mushroom danishes, and bubbling Gruyère.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=85',
    badge: 'Lunch & Snack',
  },
  {
    id: 'bakery-boxes',
    title: 'Artisan Bakery Boxes',
    subtitle: 'Curated Bundles',
    description: 'Thoughtfully packaged tasting sets and breakfast pairings for sharing with loved ones.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=85',
    badge: 'Gifting & Bundles',
  },
];

export const SignatureCollection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FFF6E8]">
      <div className="bakery-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-caramel font-bold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Artisanal Repertoire</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-espresso tracking-tight leading-tight">
              Crafted in Small Batches.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-bread/80">
              Each recipe is tuned to let the heritage grain and natural fermentation speak for itself.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-display font-bold text-sm text-espresso hover:text-caramel transition-colors group"
          >
            <span>View All Menu (10 Bakes)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {COLLECTIONS.map((col, index) => {
            const isLarge = index === 0;
            return (
              <Link
                key={col.id}
                to={`/menu?category=${col.id}`}
                className={`group relative rounded-3xl overflow-hidden bg-cream-50 border border-caramel/25 shadow-warm hover:shadow-warm-lg transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 min-h-[360px] sm:min-h-[400px] ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Background Image */}
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent opacity-85 group-hover:opacity-90 transition-opacity" />

                {/* Content */}
                <div className="relative z-10 text-cream-50">
                  <div className="inline-block px-3 py-1 rounded-full bg-butter/25 backdrop-blur-md border border-butter/40 text-butter text-[11px] font-bold tracking-wider uppercase mb-3">
                    {col.badge}
                  </div>

                  <span className="block text-xs uppercase tracking-widest text-cream/70 font-medium mb-1">
                    {col.subtitle}
                  </span>

                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-cream group-hover:text-butter transition-colors">
                      {col.title}
                    </h3>
                    <div className="w-9 h-9 rounded-full bg-cream/10 border border-cream/25 flex items-center justify-center text-cream group-hover:bg-butter group-hover:text-espresso transition-all duration-300 flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-cream/80 line-clamp-2">
                    {col.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
