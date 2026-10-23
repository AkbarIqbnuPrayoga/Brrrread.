import React, { useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Coffee, Dog, Wifi, Car } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const FindUsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FFF6E8] min-h-screen">
      <div className="bakery-container">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter/50 border border-butter/70 text-xs font-bold uppercase tracking-widest text-espresso mb-3">
            <MapPin className="w-3.5 h-3.5 text-caramel-dark" />
            <span>VISIT OUR HEARTH BAKERY</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-espresso tracking-tight">
            Come Smell the Fresh Bread.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-bread/80">
            Step inside our warm Senopati bakehouse. Watch our bakers score sourdough loaves, enjoy specialty pour-overs, or pick up your pre-ordered bakery box.
          </p>
        </div>

        {/* 2-Column Info & Atmosphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Left Column: Essential Store Details (col 1-6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Flagship Card */}
            <div className="p-8 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-espresso">
                  Brrrread Senopati Flagship
                </h3>
                <p className="text-xs text-caramel font-semibold uppercase tracking-wider mt-1">
                  Bakery • Espresso Bar • Outdoor Courtyard
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-bread/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso text-sm">Bakery Address</strong>
                    <span>Jl. Senopati No. 44, RT.8/RW.3, Selong, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12190</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso text-sm">Baking & Service Hours</strong>
                    <span>Tuesday – Sunday: 07:00 – 19:00 WIB</span>
                    <span className="block text-[11px] text-bread/60 mt-0.5">
                      (Fresh batches come out of the oven at 07:00, 10:30, and 14:00)
                    </span>
                    <span className="block text-xs font-semibold text-rose-800/80 mt-1">
                      Monday: Closed for Fermentation & Dough Development
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso text-sm">Phone & WhatsApp Orders</strong>
                    <span>+62 812-BRRR-EAD (0812-2777-323)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-caramel flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-espresso text-sm">Email Inquiry</strong>
                    <span>hello@brrrread.id</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-caramel/15 flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button variant="primary" size="md" className="w-full gap-2">
                    <Navigation className="w-4 h-4" />
                    <span>Open in Google Maps</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cream-50 border border-caramel/15 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-butter/40 text-bread">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-espresso">Specialty Coffee</h4>
                  <p className="text-[11px] text-bread/60">Single-origin beans</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-caramel/15 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-butter/40 text-bread">
                  <Dog className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-espresso">Pet-Friendly</h4>
                  <p className="text-[11px] text-bread/60">Courtyard seating</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-caramel/15 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-butter/40 text-bread">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-espresso">Free High-Speed Wi-Fi</h4>
                  <p className="text-[11px] text-bread/60">Work-friendly tables</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cream-50 border border-caramel/15 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-butter/40 text-bread">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-espresso">Valet Parking</h4>
                  <p className="text-[11px] text-bread/60">Available daily</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Atmosphere & Map Card (col 7-12) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl overflow-hidden border border-caramel/25 shadow-warm aspect-[16/11] bg-cream-200 relative group">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85"
                alt="Brrrread Senopati bakery cafe interior and counter"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-cream-50">
                  <p className="text-xs font-bold uppercase text-butter tracking-wider">
                    Bakehouse Atmosphere
                  </p>
                  <p className="font-display font-extrabold text-xl">
                    Warm stone, natural wood, and hearth aromas.
                  </p>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Map Card */}
            <div className="p-6 rounded-3xl bg-cream-50 border border-caramel/25 shadow-warm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm text-espresso">
                  Senopati Neighborhood Map
                </span>
                <span className="text-[11px] text-bread/60 font-medium">
                  5 mins from SCBD / Senayan
                </span>
              </div>

              {/* Graphical Map Representation */}
              <div className="relative h-48 rounded-2xl bg-cream-200 border border-caramel/20 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C98752_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Roads graphics */}
                <div className="absolute w-full h-8 bg-cream/80 top-1/2 -translate-y-1/2 -rotate-3 border-y border-caramel/30" />
                <div className="absolute h-full w-8 bg-cream/80 left-1/3 -rotate-6 border-x border-caramel/30" />

                {/* Pin Location */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="px-3 py-1 rounded-full bg-espresso text-butter text-xs font-extrabold shadow-lg flex items-center gap-1.5 border border-butter/40">
                    <MapPin className="w-3.5 h-3.5 text-butter" />
                    <span>Brrrread Flagship</span>
                  </div>
                  <div className="w-2 h-2 bg-espresso rotate-45 -mt-1" />
                </div>
              </div>

              <p className="text-xs text-bread/70 italic text-center">
                Located right opposite Senopati Suites, next to green tree-lined sidewalk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
