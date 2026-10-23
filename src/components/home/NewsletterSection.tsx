import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. baker@brrrread.id)');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate async subscription
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-20 md:py-24 bg-[#FFF6E8] relative overflow-hidden">
      <div className="bakery-container">
        <div className="relative rounded-3xl bg-espresso p-8 sm:p-12 md:p-16 text-center text-cream-50 overflow-hidden shadow-warm-lg">
          {/* Subtle pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#F6D98B 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-butter/20 text-butter flex items-center justify-center mx-auto mb-6">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-cream tracking-tight mb-4">
              Good Things Are Baking.
            </h2>

            <p className="text-xs sm:text-base text-cream/75 leading-relaxed mb-8">
              Join our morning flour circle. Get first access to weekend secret menu drops, seasonal viennoiserie specials, and invitations to baking workshops.
            </p>

            {status === 'success' ? (
              <div className="p-4 rounded-2xl bg-butter/20 border border-butter/40 text-butter flex items-center justify-center gap-3 animate-fade-in">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-bold text-cream">
                  Welcome to the Brrrread family! Check your inbox for 10% off your first bake order.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address..."
                    className="flex-1 px-5 py-3.5 rounded-full bg-cream-50 text-espresso placeholder-espresso/45 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-butter shadow-inner"
                    disabled={status === 'loading'}
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    isLoading={status === 'loading'}
                    className="whitespace-nowrap px-7"
                  >
                    Subscribe
                  </Button>
                </div>

                {status === 'error' && (
                  <p className="flex items-center justify-center gap-1.5 text-xs text-rose-300 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                <p className="text-[11px] text-cream/50 mt-3">
                  No spam, ever. Only warm bread news and exclusive seasonal drops.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
