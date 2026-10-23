import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { CartItemRow } from './CartItemRow';
import { formatIDR } from '../../utils/formatters';
import { Button } from '../ui/Button';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const navigate = useNavigate();
  const subtotal = getSubtotal();
  const totalCount = getTotalItems();
  const freeDeliveryThreshold = 150000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleBrowseMenu = () => {
    closeCart();
    navigate('/menu');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-cream-50 shadow-2xl flex flex-col border-l border-caramel/20"
              role="dialog"
              aria-label="Shopping Bag"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-caramel/15 flex items-center justify-between bg-cream/50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-butter/60 text-espresso">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-lg text-espresso">
                      Your Bakery Bag
                    </h3>
                    <p className="text-xs text-bread/70">
                      {totalCount} {totalCount === 1 ? 'warm bake' : 'warm bakes'} selected
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-cream text-espresso/70 hover:text-espresso transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free delivery tracker */}
              <div className="px-6 py-3.5 bg-butter/20 border-b border-butter/30">
                <div className="flex items-center justify-between text-xs font-semibold text-espresso mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-caramel" />
                    {remainingForFreeDelivery === 0 ? (
                      <span className="text-caramel-dark font-bold">
                        🎉 You’ve unlocked FREE Jakarta delivery!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-caramel">{formatIDR(remainingForFreeDelivery)}</strong> for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-bread/60">
                    {Math.round(deliveryProgress)}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-caramel rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${deliveryProgress}%` }}
                  />
                </div>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-caramel/10">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                    <div className="w-20 h-20 rounded-full bg-butter/40 flex items-center justify-center text-3xl mb-4 shadow-inner">
                      🥐
                    </div>
                    <h4 className="font-display font-bold text-lg text-espresso mb-2">
                      Your bag is smelling a bit empty...
                    </h4>
                    <p className="text-xs sm:text-sm text-bread/70 max-w-xs mb-6">
                      Nothing compares to the aroma of sourdough and golden croissants straight from the hearth.
                    </p>
                    <Button onClick={handleBrowseMenu} variant="primary" size="md">
                      Explore Today's Bakes
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-caramel/15 bg-cream/60 space-y-4">
                  {/* Subtotal row */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-bread/80 font-medium">Subtotal</span>
                    <span className="font-extrabold text-lg text-espresso">
                      {formatIDR(subtotal)}
                    </span>
                  </div>

                  <p className="text-[11px] text-bread/60 italic">
                    Taxes & thermal packaging calculated at checkout.
                  </p>

                  {/* Actions */}
                  <div className="space-y-2.5">
                    <Button
                      onClick={handleCheckout}
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-between"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <button
                      onClick={closeCart}
                      className="w-full py-2.5 text-xs font-bold text-bread hover:text-espresso transition-colors text-center"
                    >
                      Continue Browsing Bakes
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
