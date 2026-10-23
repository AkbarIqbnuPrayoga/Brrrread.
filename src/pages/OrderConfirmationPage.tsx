import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Flame, Clock, Truck, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { OrderDetails } from '../types';
import { formatIDR } from '../utils/formatters';
import { Button } from '../components/ui/Button';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Read stored order record
    try {
      const saved = sessionStorage.getItem('brrrread_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load order record', e);
    }

    // Launch celebratory confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F6D98B', '#C98752', '#75452D', '#2D1B15'],
    });
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FFF6E8] min-h-screen">
      <div className="bakery-container max-w-3xl">
        {/* Celebration Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-butter/40 border border-butter/60 text-caramel flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce">
            <CheckCircle2 className="w-8 h-8 text-caramel-dark" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage/30 text-bread-dark text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORDER CONFIRMED & QUEUED</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-espresso tracking-tight">
            The Ovens Are Warmed Up!
          </h1>
          <p className="mt-2 text-sm sm:text-base text-bread/80 max-w-lg mx-auto">
            Thank you for ordering with Brrrread. Your order <strong className="text-espresso">#{orderId}</strong> has been received by our head baker.
          </p>
        </div>

        {/* Live Baking Status Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-espresso text-cream-50 shadow-warm-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <Flame className="w-5 h-5 text-butter animate-pulse" />
              <h3 className="font-display font-extrabold text-lg text-butter">
                Hearth Preparation Status
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-butter/20 text-butter font-bold border border-butter/30">
              In Production
            </span>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-espresso-soft border border-butter/30">
              <span className="text-[10px] uppercase font-bold text-butter block mb-1">
                Step 1: Confirmed
              </span>
              <p className="font-bold text-cream">Order Verified</p>
              <p className="text-cream/60 text-[11px] mt-0.5">Payment successfully processed</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-espresso-soft border border-butter/60 ring-1 ring-butter">
              <span className="text-[10px] uppercase font-bold text-butter block mb-1">
                Step 2: Hearth Oven
              </span>
              <p className="font-bold text-butter">Baking & Thermal Packing</p>
              <p className="text-cream/60 text-[11px] mt-0.5">Sealed in wax breathable paper</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-espresso-soft/50 border border-cream/10">
              <span className="text-[10px] uppercase font-bold text-cream/40 block mb-1">
                Step 3: Ready
              </span>
              <p className="font-bold text-cream/70">
                {order?.fulfillmentType === 'pickup' ? 'Counter Pickup' : 'Courier Dispatch'}
              </p>
              <p className="text-cream/40 text-[11px] mt-0.5">WhatsApp alert will be sent</p>
            </div>
          </div>
        </div>

        {/* Order Details Receipt Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-caramel/15 pb-4">
            <div>
              <span className="text-xs text-bread/60 uppercase font-semibold tracking-wider block">
                Order Reference
              </span>
              <span className="font-display font-extrabold text-xl text-espresso">
                #{orderId}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-bread/60 uppercase font-semibold tracking-wider block">
                Date & Time
              </span>
              <span className="text-xs sm:text-sm font-bold text-espresso">
                {new Date().toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Fulfillment details recap */}
          <div className="p-4 rounded-2xl bg-cream border border-caramel/15 space-y-2 text-xs sm:text-sm text-bread/85">
            <div className="flex items-center gap-2 font-bold text-espresso">
              {order?.fulfillmentType === 'pickup' ? (
                <>
                  <Clock className="w-4 h-4 text-caramel" />
                  <span>Store Pickup at Senopati Flagship</span>
                </>
              ) : (
                <>
                  <Truck className="w-4 h-4 text-caramel" />
                  <span>Instant Jakarta Delivery</span>
                </>
              )}
            </div>

            {order?.fulfillmentType === 'pickup' ? (
              <p className="text-xs text-bread/75">
                Pickup Slot: <strong>{order.pickupDate || 'Today'}</strong> ({order.pickupTime || 'Morning Batch'}). Please show your Order ID at the counter.
              </p>
            ) : (
              <p className="text-xs text-bread/75">
                Destination: <strong>{order?.deliveryAddress || 'Jl. Senopati No. 44'}</strong>
              </p>
            )}

            {order?.customerName && (
              <p className="text-xs text-bread/75">
                Customer: <strong>{order.customerName}</strong> ({order.phone})
              </p>
            )}

            {order?.orderNotes && (
              <p className="text-xs text-caramel-dark font-medium pt-1 border-t border-caramel/10">
                Note for Baker: "{order.orderNotes}"
              </p>
            )}
          </div>

          {/* Items Table */}
          {order?.items && order.items.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="font-display font-bold text-sm text-espresso uppercase tracking-wider">
                Bake Items
              </h4>
              <div className="divide-y divide-caramel/10">
                {order.items.map((item) => (
                  <div key={item.id} className="py-2.5 flex justify-between items-center text-xs sm:text-sm">
                    <div>
                      <p className="font-bold text-espresso">{item.product.name}</p>
                      {item.selectedVariant && (
                        <p className="text-[11px] text-caramel">{item.selectedVariant.name}</p>
                      )}
                      <p className="text-[11px] text-bread/60">
                        Qty: {item.quantity} × {formatIDR(item.unitPrice)}
                      </p>
                    </div>
                    <span className="font-extrabold text-espresso">
                      {formatIDR(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-caramel/20 flex justify-between items-center text-base sm:text-lg">
                <span className="font-bold text-espresso">Total Paid ({order.paymentMethod})</span>
                <span className="font-display font-extrabold text-2xl text-espresso">
                  {formatIDR(order.total)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={handlePrint}
            variant="outline"
            size="md"
            className="w-full sm:w-auto gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </Button>

          <Link to="/menu" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
              <span>Order More Bakes</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
