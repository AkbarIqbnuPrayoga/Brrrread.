import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Building2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatIDR, generateOrderId } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { OrderDetails } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    getSubtotal,
    getDeliveryFee,
    getPackagingFee,
    getTotalPrice,
    clearCart,
  } = useCartStore();

  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [pickupDate, setPickupDate] = useState('Today');
  const [pickupTime, setPickupTime] = useState('08:00 - 10:00 (Fresh Morning Batch)');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee(fulfillmentType);
  const packagingFee = getPackagingFee();
  const totalPrice = getTotalPrice(fulfillmentType);

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center bakery-container">
        <div className="text-4xl mb-3">🥐</div>
        <h2 className="font-display font-extrabold text-2xl text-espresso mb-2">
          Your Bakery Bag is Empty
        </h2>
        <p className="text-sm text-bread/75 mb-6">
          Add some warm loaves or fresh croissants before proceeding to checkout.
        </p>
        <Link to="/menu">
          <Button variant="primary" size="md">
            Browse Today's Menu
          </Button>
        </Link>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!customerName.trim()) {
      errs.customerName = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errs.email = 'Please provide a valid email for order receipt.';
    }

    if (!phone.trim() || phone.length < 9) {
      errs.phone = 'Please provide an active WhatsApp number for courier/pickup updates.';
    }

    if (fulfillmentType === 'delivery') {
      if (!deliveryAddress.trim() || deliveryAddress.length < 10) {
        errs.deliveryAddress = 'Please provide a detailed delivery address with street and unit number.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderRecord: OrderDetails = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName,
      email,
      phone,
      fulfillmentType,
      deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
      postalCode: fulfillmentType === 'delivery' ? postalCode : undefined,
      pickupDate: fulfillmentType === 'pickup' ? pickupDate : undefined,
      pickupTime: fulfillmentType === 'pickup' ? pickupTime : undefined,
      orderNotes: orderNotes.trim() || undefined,
      items: [...items],
      subtotal,
      deliveryFee,
      packagingFee,
      total: totalPrice,
      paymentMethod,
      paymentStatus: 'confirmed',
    };

    // Store completed order in sessionStorage for Order Confirmation page
    try {
      sessionStorage.setItem('brrrread_last_order', JSON.stringify(orderRecord));
    } catch (e) {
      console.warn('Could not store order in session', e);
    }

    // Simulate payment confirmation
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-confirmation/${orderId}`);
    }, 1200);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FFF6E8] min-h-screen">
      <div className="bakery-container">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <Link
            to="/menu"
            className="text-xs font-bold text-caramel hover:text-bread transition-colors flex items-center gap-1 mb-2"
          >
            &larr; Back to Menu
          </Link>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-espresso tracking-tight">
            Checkout Your Bakes.
          </h1>
          <p className="mt-2 text-sm text-bread/80">
            Freshly packed from our stone-hearth ovens with insulated bakery packaging.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form & Selection (col 1-7) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* 1. Fulfillment Option (Delivery vs Pickup) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm">
                <h3 className="font-display font-extrabold text-lg text-espresso mb-4 flex items-center gap-2">
                  <span>1. How would you like to receive your bakes?</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFulfillmentType('delivery')}
                    className={`flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'border-caramel bg-butter/25 text-espresso shadow-sm ring-1 ring-caramel'
                        : 'border-caramel/20 bg-cream text-espresso/70 hover:bg-cream-200'
                    }`}
                  >
                    <Truck className="w-6 h-6 mb-2 text-caramel" />
                    <span className="font-display font-bold text-sm">Instant Delivery</span>
                    <span className="text-[11px] text-bread/60 mt-0.5">
                      Direct to doorstep (Jakarta)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFulfillmentType('pickup')}
                    className={`flex flex-col items-center p-4 rounded-2xl border text-center transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'border-caramel bg-butter/25 text-espresso shadow-sm ring-1 ring-caramel'
                        : 'border-caramel/20 bg-cream text-espresso/70 hover:bg-cream-200'
                    }`}
                  >
                    <Store className="w-6 h-6 mb-2 text-caramel" />
                    <span className="font-display font-bold text-sm">Store Pickup</span>
                    <span className="text-[11px] text-bread/60 mt-0.5">
                      Senopati Flagship Bakery
                    </span>
                  </button>
                </div>
              </div>

              {/* 2. Customer Contact Information */}
              <div className="p-6 sm:p-7 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-4">
                <h3 className="font-display font-extrabold text-lg text-espresso mb-2">
                  2. Contact Information
                </h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Raditya Pratama"
                    className={`w-full px-4 py-3 rounded-xl bg-cream border text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel ${
                      errors.customerName ? 'border-rose-500' : 'border-caramel/25'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. raditya@gmail.com"
                      className={`w-full px-4 py-3 rounded-xl bg-cream border text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel ${
                        errors.email ? 'border-rose-500' : 'border-caramel/25'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0812-3456-7890"
                      className={`w-full px-4 py-3 rounded-xl bg-cream border text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel ${
                        errors.phone ? 'border-rose-500' : 'border-caramel/25'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Address or Pickup Slot */}
              <div className="p-6 sm:p-7 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-4">
                <h3 className="font-display font-extrabold text-lg text-espresso mb-2">
                  3. {fulfillmentType === 'delivery' ? 'Delivery Address' : 'Pickup Slot'}
                </h3>

                {fulfillmentType === 'delivery' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                        Street Address & Unit / Floor *
                      </label>
                      <textarea
                        rows={3}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="e.g. Jl. Bumi No. 12, Kebayoran Baru, Jakarta Selatan (Rumah pagar hitam sebelah warung)"
                        className={`w-full px-4 py-3 rounded-xl bg-cream border text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel ${
                          errors.deliveryAddress ? 'border-rose-500' : 'border-caramel/25'
                        }`}
                      />
                      {errors.deliveryAddress && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.deliveryAddress}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                        Postal Code (Optional)
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g. 12120"
                        className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-cream border border-caramel/25 text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-cream border border-caramel/20 flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-bread/80">
                        <strong className="block text-espresso text-sm mb-0.5">
                          Pickup at Brrrread Flagship
                        </strong>
                        <span>Jl. Senopati No. 44, Kebayoran Baru, Jakarta Selatan</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                          Pickup Day
                        </label>
                        <select
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-cream border border-caramel/25 text-sm font-semibold text-espresso focus:outline-none focus:ring-2 focus:ring-caramel"
                        >
                          <option value="Today">Today (Within 60 mins)</option>
                          <option value="Tomorrow">Tomorrow Morning</option>
                          <option value="Saturday">Saturday Brunch</option>
                          <option value="Sunday">Sunday Morning</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                          Time Slot
                        </label>
                        <select
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-cream border border-caramel/25 text-sm font-semibold text-espresso focus:outline-none focus:ring-2 focus:ring-caramel"
                        >
                          <option value="08:00 - 10:00 (Fresh Morning Batch)">
                            08:00 – 10:00 (Morning Batch)
                          </option>
                          <option value="11:00 - 13:00 (Lunch Batch)">
                            11:00 – 13:00 (Lunch Batch)
                          </option>
                          <option value="14:00 - 16:00 (Afternoon Batch)">
                            14:00 – 16:00 (Afternoon Batch)
                          </option>
                          <option value="16:00 - 18:30 (Evening Warm Drop)">
                            16:00 – 18:30 (Evening Drop)
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes for Baker */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-bread/80 mb-1.5">
                    Notes for Baker / Greeting Card (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Tolong potong sourdough 14mm / request kartu ucapan selamat ulang tahun"
                    className="w-full px-4 py-3 rounded-xl bg-cream border border-caramel/25 text-sm font-medium text-espresso placeholder-espresso/40 focus:outline-none focus:ring-2 focus:ring-caramel"
                  />
                </div>
              </div>

              {/* 4. Payment Method */}
              <div className="p-6 sm:p-7 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-4">
                <h3 className="font-display font-extrabold text-lg text-espresso mb-2">
                  4. Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'QRIS', label: 'QRIS Instant', icon: QrCode, desc: 'GoPay, OVO, BCA, Dana' },
                    { id: 'BCA VA', label: 'BCA Virtual Account', icon: Building2, desc: 'Auto-verification' },
                    { id: 'Credit Card', label: 'Credit Card', icon: CreditCard, desc: 'Visa / Mastercard' },
                  ].map((method) => {
                    const isSelected = paymentMethod === method.id;
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-caramel bg-butter/25 text-espresso shadow-sm ring-1 ring-caramel'
                            : 'border-caramel/20 bg-cream text-espresso/70 hover:bg-cream-200'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-caramel mb-2" />
                        <span className="font-display font-bold text-sm block">
                          {method.label}
                        </span>
                        <span className="text-[11px] text-bread/60 block mt-0.5">
                          {method.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full py-4 text-base shadow-warm-lg"
              >
                <span>Place Order & Pay • {formatIDR(totalPrice)}</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>
          </div>

          {/* Right Column: Order Summary (col 8-12) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-6">
              <div className="flex items-center justify-between border-b border-caramel/15 pb-4">
                <h3 className="font-display font-extrabold text-xl text-espresso flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-caramel" />
                  <span>Order Summary</span>
                </h3>
                <span className="text-xs font-bold text-bread/70">
                  {items.length} items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1 divide-y divide-caramel/10">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-caramel/20 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs sm:text-sm font-bold text-espresso truncate">
                        {item.product.name}
                      </h5>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-caramel font-medium">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <p className="text-[11px] text-bread/60">
                        Qty: {item.quantity} × {formatIDR(item.unitPrice)}
                      </p>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-espresso">
                      {formatIDR(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-caramel/15 text-xs sm:text-sm text-bread/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso">{formatIDR(subtotal)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Thermal Wax Packaging</span>
                  <span className="font-semibold text-espresso">{formatIDR(packagingFee)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>
                    Delivery Fee{' '}
                    {fulfillmentType === 'pickup'
                      ? '(Pickup Free)'
                      : subtotal >= 150000
                      ? '(Free Delivery Promo)'
                      : ''}
                  </span>
                  <span className="font-semibold text-espresso">
                    {deliveryFee === 0 ? 'FREE' : formatIDR(deliveryFee)}
                  </span>
                </div>

                <div className="pt-3 border-t border-caramel/20 flex justify-between items-center text-base sm:text-lg">
                  <span className="font-bold text-espresso">Total Amount</span>
                  <span className="font-display font-extrabold text-xl text-espresso">
                    {formatIDR(totalPrice)}
                  </span>
                </div>
              </div>

              {/* Guarantee badge */}
              <div className="p-3 rounded-2xl bg-cream border border-caramel/15 flex items-center gap-2.5 text-xs text-bread/80">
                <ShieldCheck className="w-4 h-4 text-caramel flex-shrink-0" />
                <span>Stone-hearth fresh bake guarantee. Packed warm.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
