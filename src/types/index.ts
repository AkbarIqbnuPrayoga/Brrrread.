export type ProductCategory = 
  | 'all' 
  | 'croissants' 
  | 'artisan-bread' 
  | 'sweet-bakes' 
  | 'savory-bakes' 
  | 'bakery-boxes';

export interface ProductVariant {
  id: string;
  name: string;
  priceModifier: number; // additional cost or base override
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  isBestSeller?: boolean;
  isStaffPick?: boolean;
  isSeasonal?: boolean;
  stock: number;
  images: string[];
  description: string;
  flavorNotes: string[];
  ingredients: string[];
  allergens: string[];
  storageAdvice: string;
  prepTime: string; // e.g. "Baked fresh at 06:00 & 14:00"
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string; // unique item id (productId + variantId)
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  fulfillmentType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  postalCode?: string;
  pickupDate?: string;
  pickupTime?: string;
  orderNotes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'confirmed' | 'baking';
}
