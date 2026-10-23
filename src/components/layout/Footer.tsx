import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Clock, Phone, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso text-cream-50 pt-16 sm:pt-20 pb-12 border-t border-butter/20">
      <div className="bakery-container">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-cream/15">
          {/* Brand Info (col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-block font-display text-2xl sm:text-3xl font-extrabold text-butter tracking-tight"
            >
              Brrrread
            </Link>
            <p className="text-xs sm:text-sm text-cream/75 leading-relaxed max-w-sm">
              Fresh, warm, playful, and uncompromisingly artisan. Dedicated to 36-hour slow sourdough fermentation, pure French AOP butter, and the daily joy of warm bread.
            </p>
            <div className="flex items-center gap-2 text-xs text-butter font-semibold pt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Good things take a little dough.</span>
            </div>
          </div>

          {/* Quick Links (col 6-7) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-butter uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-cream/70">
              <li>
                <Link to="/" className="hover:text-butter transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-butter transition-colors">
                  Daily Menu
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-butter transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/find-us" className="hover:text-butter transition-colors">
                  Find Our Bakery
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-butter transition-colors">
                  Order & Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours & Flagship (col 8-10) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm text-butter uppercase tracking-wider">
              Hearth Kitchen
            </h4>
            <div className="space-y-2.5 text-xs text-cream/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-butter flex-shrink-0 mt-0.5" />
                <span>Jl. Senopati No. 44, Kebayoran Baru, Jakarta Selatan 12190</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-butter flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-cream">Tue – Sun: 07:00 – 19:00</p>
                  <p className="text-[11px] text-cream/50">Monday: Closed for Fermentation & Dough R&D</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-butter flex-shrink-0" />
                <span>+62 812-BRRR-EAD (WhatsApp)</span>
              </div>
            </div>
          </div>

          {/* Socials & Cert (col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-sm text-butter uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-cream/10 hover:bg-butter hover:text-espresso transition-colors text-cream"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="mailto:hello@brrrread.id"
                className="p-2.5 rounded-full bg-cream/10 hover:bg-butter hover:text-espresso transition-colors text-cream"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-[11px] text-cream/50">
              <p>Jakarta Delivery via Instant Courier</p>
              <p>Special Catering & Corporate Boxes</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Brrrread Bakery Artisan Indonesia. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/our-story" className="hover:text-butter transition-colors">
              Privacy Policy
            </Link>
            <Link to="/our-story" className="hover:text-butter transition-colors">
              Terms & Delivery
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-1.5 rounded-lg bg-cream/10 hover:bg-butter hover:text-espresso text-cream transition-colors ml-2"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-[11px] font-bold">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
