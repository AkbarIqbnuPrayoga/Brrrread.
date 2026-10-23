import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { formatIDR } from '../../utils/formatters';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-3.5 py-4 border-b border-caramel/15 last:border-b-0 group">
      {/* Product Image */}
      <img
        src={item.product.images[0]}
        alt={item.product.name}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover flex-shrink-0 border border-caramel/20 shadow-sm"
      />

      {/* Info & Controls */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-sm font-bold text-espresso line-clamp-1">
            {item.product.name}
          </h4>
          <button
            onClick={() => onRemove(item.id)}
            className="text-bread/40 hover:text-caramel-dark p-1 rounded transition-colors"
            aria-label={`Remove ${item.product.name} from bag`}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Variant */}
        {item.selectedVariant && (
          <p className="text-xs text-caramel font-medium mt-0.5">
            {item.selectedVariant.name}
          </p>
        )}

        {/* Unit Price */}
        <p className="text-xs text-bread font-semibold mt-1">
          {formatIDR(item.unitPrice)}
        </p>

        {/* Quantity Controls & Line Total */}
        <div className="flex items-center justify-between mt-2.5">
          <div className="inline-flex items-center bg-cream border border-caramel/25 rounded-full p-0.5">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-bread hover:bg-butter/50 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-xs font-bold text-espresso">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="w-6 h-6 rounded-full flex items-center justify-center text-bread hover:bg-butter/50 transition-colors disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="text-sm font-extrabold text-espresso">
            {formatIDR(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};
