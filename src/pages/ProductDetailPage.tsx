import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Clock,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductVariant } from '../types';
import { formatIDR } from '../utils/formatters';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setQuantity(1);
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="pt-36 pb-24 text-center bakery-container">
        <h2 className="text-2xl font-bold text-espresso mb-4">Bake Not Found</h2>
        <p className="text-bread/70 mb-6">
          The requested bread or pastry could not be located in our ovens.
        </p>
        <Link to="/menu">
          <Button variant="primary">Return to Menu</Button>
        </Link>
      </div>
    );
  }

  const currentPrice = product.price + (selectedVariant ? selectedVariant.priceModifier : 0);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FFF6E8] min-h-screen">
      <div className="bakery-container">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-bread/60 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-espresso transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/menu" className="hover:text-espresso transition-colors">
            Menu
          </Link>
          <span>/</span>
          <Link
            to={`/menu?category=${product.category}`}
            className="hover:text-espresso transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-espresso font-bold">{product.name}</span>
        </nav>

        {/* 2-Column Editorial Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          {/* Left Column: Image Gallery (col 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-cream-200 border border-caramel/25 shadow-warm">
              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex gap-2">
                {product.isBestSeller && <Badge variant="butter">Best Seller</Badge>}
                {product.isStaffPick && <Badge variant="espresso">Staff Pick</Badge>}
                {product.isSeasonal && <Badge variant="caramel">Limited Batch</Badge>}
              </div>
            </div>

            {/* Thumbnail Switcher if multiple images exist */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-caramel ring-2 ring-caramel/40 scale-102'
                        : 'border-caramel/20 hover:border-caramel/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Purchasing & Recipe Story (col 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-caramel mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.categoryName}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-black text-espresso tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-espresso">
                  {formatIDR(currentPrice)}
                </span>
                <span className="text-xs font-semibold text-bread/60">
                  {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Sold Out for Today'}
                </span>
              </div>

              {/* Tagline */}
              <p className="mt-4 text-sm sm:text-base text-bread/85 font-medium leading-relaxed">
                {product.tagline}
              </p>

              {/* Full Description */}
              <div className="mt-4 p-4 rounded-2xl bg-cream-50 border border-caramel/20 text-xs sm:text-sm text-bread/80 leading-relaxed">
                {product.description}
              </div>

              {/* Flavor Profile Notes */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso mb-2">
                  Tasting Notes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="text-xs px-3 py-1 rounded-full bg-butter/30 text-bread-dark font-medium border border-butter/50"
                    >
                      🍯 {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Variant Selector (if available) */}
              {product.variants && product.variants.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-espresso mb-2.5">
                    Select Packaging / Slice Style
                  </h4>
                  <div className="space-y-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all text-left ${
                            isSelected
                              ? 'border-caramel bg-butter/25 text-espresso shadow-sm'
                              : 'border-caramel/20 bg-cream-50 text-espresso/80 hover:bg-cream'
                          }`}
                        >
                          <span>{v.name}</span>
                          <span className="text-xs font-bold text-bread">
                            {v.priceModifier > 0
                              ? `+${formatIDR(v.priceModifier)}`
                              : 'Standard'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="mt-8 pt-6 border-t border-caramel/20 space-y-4">
                <div className="flex items-center gap-4">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center bg-cream-50 border border-caramel/25 rounded-full p-1 shadow-sm">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-espresso hover:bg-butter/50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-display font-extrabold text-sm text-espresso">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      disabled={quantity >= product.stock}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-espresso hover:bg-butter/50 transition-colors disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    size="lg"
                    className="flex-1 shadow-warm-lg"
                    disabled={product.stock <= 0}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 text-butter" />
                        <span>Added to Bakery Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>Add to Bag • {formatIDR(currentPrice * quantity)}</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Baking schedule & allergens accordion/cards */}
                <div className="space-y-3 pt-2 text-xs text-bread/75">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-cream-50 border border-caramel/15">
                    <Clock className="w-4 h-4 text-caramel flex-shrink-0" />
                    <span>
                      <strong>Oven Schedule:</strong> {product.prepTime}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-cream-50 border border-caramel/15">
                    <ShieldAlert className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-espresso">Allergen Notice:</strong>
                      <span>Contains: {product.allergens.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 p-3 rounded-xl bg-cream-50 border border-caramel/15">
                    <Flame className="w-4 h-4 text-caramel flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-espresso">Storage & Reheating:</strong>
                      <span>{product.storageAdvice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-caramel/20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-espresso">
                  Pairs Wonderfully With
                </h3>
                <p className="text-xs sm:text-sm text-bread/75 mt-1">
                  Other artisan creations from our {product.categoryName} hearth.
                </p>
              </div>

              <Link
                to="/menu"
                className="text-xs sm:text-sm font-bold text-espresso hover:text-caramel transition-colors"
              >
                View All Menu &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
