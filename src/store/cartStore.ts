import { create } from 'zustand';
import { CartItem, Product, ProductVariant } from '../types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  hasSeenIntro: boolean;
  lastAddedItemId: string | null;

  // Actions
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  setIntroSeen: () => void;
  
  // Computed helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: (fulfillmentType: 'delivery' | 'pickup') => number;
  getPackagingFee: () => number;
  getTotalPrice: (fulfillmentType: 'delivery' | 'pickup') => number;
}

const CART_STORAGE_KEY = 'brrrread_cart_items_v1';

const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: getInitialCart(),
  isCartOpen: false,
  isSearchOpen: false,
  searchQuery: '',
  hasSeenIntro: false,
  lastAddedItemId: null,

  addItem: (product, variant, quantity = 1) => {
    set((state) => {
      const variantId = variant ? variant.id : 'standard';
      const itemId = `${product.id}-${variantId}`;
      const unitPrice = product.price + (variant ? variant.priceModifier : 0);

      const existingIndex = state.items.findIndex((item) => item.id === itemId);
      let updatedItems: CartItem[];

      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          selectedVariant: variant,
          quantity: Math.min(quantity, product.stock),
          unitPrice,
        };
        updatedItems = [...state.items, newItem];
      }

      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
      } catch (e) {
        console.warn('Could not save cart to localStorage', e);
      }

      return {
        items: updatedItems,
        isCartOpen: true,
        lastAddedItemId: itemId,
      };
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const updated = state.items.filter((item) => item.id !== itemId);
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save cart to localStorage', e);
      }
      return { items: updated };
    });
  },

  updateQuantity: (itemId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        const updated = state.items.filter((item) => item.id !== itemId);
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn('Could not save cart to localStorage', e);
        }
        return { items: updated };
      }

      const updated = state.items.map((item) => {
        if (item.id === itemId) {
          const clamped = Math.min(quantity, item.product.stock);
          return { ...item, quantity: clamped };
        }
        return item;
      });

      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save cart to localStorage', e);
      }
      return { items: updated };
    });
  },

  clearCart: () => {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear cart in localStorage', e);
    }
    set({ items: [] });
  },

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false, searchQuery: '' }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  setIntroSeen: () => set({ hasSeenIntro: true }),

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  },

  getDeliveryFee: (fulfillmentType) => {
    if (fulfillmentType === 'pickup') return 0;
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    // Free delivery over Rp 150.000
    return subtotal >= 150000 ? 0 : 18000;
  },

  getPackagingFee: () => {
    const subtotal = get().getSubtotal();
    return subtotal > 0 ? 4000 : 0;
  },

  getTotalPrice: (fulfillmentType) => {
    const sub = get().getSubtotal();
    if (sub === 0) return 0;
    const del = get().getDeliveryFee(fulfillmentType);
    const pack = get().getPackagingFee();
    return sub + del + pack;
  },
}));
