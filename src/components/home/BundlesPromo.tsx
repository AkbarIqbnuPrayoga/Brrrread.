import React, { useState } from 'react';
import { Gift, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatIDR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

export const BundlesPromo: React.FC = () => {
  const weekendBox = PRODUCTS.find((p) => p.id === 'prod-09') || PRODUCTS[0];
  const breakfastBundle = PRODUCTS.find((p) => p.id === 'prod-10') || PRODUCTS[1];
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddBundle = (prod: typeof weekendBox) => {
    addItem(prod);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="py-20 md:py-28 bg-cream border-t border-caramel/20">
      <div className="bakery-container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel/15 text-caramel font-bold text-xs uppercase tracking-widest mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Seasonal Bakery Boxes & Bundles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-espresso tracking-tight">
            Curated Weekend Treats.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-bread/80">
            Bundled boxes baked fresh on Saturday & Sunday mornings for brunch gatherings and thoughtful gifts.
          </p>
        </div>

        {/* 2 Big Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Weekend Tasting Box */}
          <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-caramel/25 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-cream-200">
                <img
                  src={weekendBox.images[0]}
                  alt={weekendBox.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-butter text-espresso font-bold text-xs">
                  Weekend Limited (20 Boxes Daily)
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-caramel uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>6 Signature Bakes Included</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-espresso mb-2">
                {weekendBox.name}
              </h3>
              <p className="text-xs sm:text-sm text-bread/75 leading-relaxed mb-4">
                {weekendBox.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {['2x Butter Croissant', '1x Valrhona Pain au Chocolat', '1x Almond Croissant', '1x Cardamom Bun', '1x Focaccia'].map(
                  (item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-cream font-medium text-bread border border-caramel/15"
                    >
                      ✓ {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-caramel/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-bread/60 block">Bundle Price</span>
                <span className="font-display font-extrabold text-2xl text-espresso">
                  {formatIDR(weekendBox.price)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/product/${weekendBox.slug}`}
                  className="text-xs font-bold text-bread hover:text-espresso"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleAddBundle(weekendBox)}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-warm flex items-center gap-2 transition-all ${
                    addedId === weekendBox.id
                      ? 'bg-sage text-espresso'
                      : 'bg-espresso text-cream-50 hover:bg-bread'
                  }`}
                >
                  {addedId === weekendBox.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add Box to Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Morning Sourdough & Butter */}
          <div className="bg-cream-50 rounded-3xl p-6 sm:p-8 border border-caramel/25 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-cream-200">
                <img
                  src={breakfastBundle.images[0]}
                  alt={breakfastBundle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-caramel text-cream-50 font-bold text-xs">
                  Breakfast Favorite
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-caramel uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Loaf + Cultured Butter Slab</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-espresso mb-2">
                {breakfastBundle.name}
              </h3>
              <p className="text-xs sm:text-sm text-bread/75 leading-relaxed mb-4">
                {breakfastBundle.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  '1x 36-Hour Country Sourdough Loaf',
                  '150g French Fleur de Sel Cultured Butter',
                  'Fresh linen wrapping included',
                ].map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-cream font-medium text-bread border border-caramel/15"
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-caramel/15 flex items-center justify-between">
              <div>
                <span className="text-xs text-bread/60 block">Bundle Price</span>
                <span className="font-display font-extrabold text-2xl text-espresso">
                  {formatIDR(breakfastBundle.price)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/product/${breakfastBundle.slug}`}
                  className="text-xs font-bold text-bread hover:text-espresso"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleAddBundle(breakfastBundle)}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-warm flex items-center gap-2 transition-all ${
                    addedId === breakfastBundle.id
                      ? 'bg-sage text-espresso'
                      : 'bg-espresso text-cream-50 hover:bg-bread'
                  }`}
                >
                  {addedId === breakfastBundle.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add Bundle to Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
