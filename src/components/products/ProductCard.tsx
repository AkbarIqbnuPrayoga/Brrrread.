import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Check, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatIDR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(product);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  const hasSecondaryImage = product.images.length > 1;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-cream-50 rounded-3xl border border-caramel/20 overflow-hidden shadow-warm hover:shadow-warm-lg transition-all duration-300"
    >
      {/* Top Image Showcase */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-cream-200"
      >
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered && hasSecondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Image on Hover */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {product.isBestSeller && (
            <Badge variant="butter">Best Seller</Badge>
          )}
          {product.isStaffPick && (
            <Badge variant="espresso">Staff Pick</Badge>
          )}
          {product.isSeasonal && (
            <Badge variant="caramel">Seasonal Box</Badge>
          )}
        </div>

        {/* Quick Add Button floating on top right on desktop, static bottom on mobile */}
        <div className="absolute bottom-3 right-3 z-10">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleQuickAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-xs shadow-warm transition-all duration-300 ${
              isAddedRecently
                ? 'bg-sage text-espresso ring-2 ring-sage'
                : 'bg-espresso text-cream-50 hover:bg-bread'
            }`}
            aria-label={`Add ${product.name} to bag`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </motion.button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-caramel mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>{product.categoryName}</span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-caramel transition-colors">
            <h3 className="font-display font-bold text-base sm:text-lg text-espresso leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-bread/75 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {product.tagline}
          </p>

          {/* Flavor Notes Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.flavorNotes.slice(0, 2).map((note) => (
              <span
                key={note}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-cream text-bread/80 border border-caramel/15"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Stock info */}
        <div className="pt-4 mt-4 border-t border-caramel/15 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-bread/60 block font-medium uppercase tracking-wider">
              Stone-hearth bake
            </span>
            <span className="font-display font-extrabold text-base sm:text-lg text-espresso">
              {formatIDR(product.price)}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-bread/60">
            {product.stock > 5 ? `${product.stock} available` : `Only ${product.stock} left!`}
          </span>
        </div>
      </div>
    </div>
  );
};
