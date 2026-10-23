import React, { useEffect } from 'react';
import { Sparkles, Heart, Clock, Award, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export const OurStoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#FFF6E8] min-h-screen">
      <div className="bakery-container">
        {/* Header Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-butter/50 border border-butter/70 text-xs font-bold uppercase tracking-widest text-espresso mb-4">
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>OUR ARTISAN ROOTS</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-espresso tracking-tight leading-tight">
            Flour, Water, Salt, Time.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-bread/80 leading-relaxed font-normal">
            Brrrread began with an obsession: what if a bakery refused to rush anything? What if our dough rested in cold fermentation until every grain blossomed with aroma?
          </p>
        </div>

        {/* Story Section 1: The Name & Sourdough Mother */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-warm border border-caramel/25 aspect-[4/3] bg-cream-200">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
              alt="Bakers hand shaping sourdough dough at Brrrread"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-caramel">
              The Wild Starter
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-espresso leading-snug">
              Meet “Dough-lilah”, Our 8-Year Old Mother Culture.
            </h2>
            <p className="text-sm sm:text-base text-bread/85 leading-relaxed">
              Every loaf of sourdough baked at Brrrread originates from a single, living culture nurtured since 2018. Fed every twelve hours with organic stoneground rye and spring water, Dough-lilah imparts the signature lactic custard note and wild sourdough tang that commercial yeast can never replicate.
            </p>
            <p className="text-sm text-bread/80 leading-relaxed">
              Why the name <strong className="text-espresso">Brrrread</strong>? Because the magic happens in the cold room (“Brrr!”)—where slow, 36-hour proofing unlocks prebiotic benefits and converts complex starches into gentle, easily digestible nourishment.
            </p>
          </div>
        </div>

        {/* Story Section 2: Pure French Butter & Lamination */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-24">
          <div className="lg:col-span-6 lg:order-2 rounded-3xl overflow-hidden shadow-warm border border-caramel/25 aspect-[4/3] bg-cream-200">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85"
              alt="Golden flaky layers of Brrrread French croissant"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 lg:order-1 space-y-5">
            <div className="text-xs font-bold uppercase tracking-widest text-caramel">
              The Art of Viennoiserie
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-espresso leading-snug">
              27 Micro-Layers of 84% French AOP Butter.
            </h2>
            <p className="text-sm sm:text-base text-bread/85 leading-relaxed">
              True croissants cannot be faked with margarine or generic fats. We import pure AOP Charentes-Poitou dry butter from western France, renowned for its high butterfat content and hazelnut aroma.
            </p>
            <p className="text-sm text-bread/80 leading-relaxed">
              Our viennoiserie chefs roll, fold, and chill each pastry across three strict stages, achieving the mythical golden honeycomb cross-section that shatters into delicate flakes upon your first bite.
            </p>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-espresso">
              Our 4 Baking Promises
            </h3>
            <p className="text-xs sm:text-sm text-bread/75 mt-2">
              No shortcuts. Ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-cream-50 border border-caramel/20 shadow-sm space-y-3">
              <Clock className="w-6 h-6 text-caramel" />
              <h4 className="font-display font-bold text-lg text-espresso">36-Hour Proofing</h4>
              <p className="text-xs text-bread/75 leading-relaxed">
                Cold fermented for maximum flavor depth and easy gut digestion.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50 border border-caramel/20 shadow-sm space-y-3">
              <Award className="w-6 h-6 text-caramel" />
              <h4 className="font-display font-bold text-lg text-espresso">Unbleached Flour</h4>
              <p className="text-xs text-bread/75 leading-relaxed">
                Milled without chemical bromates, bleaching agents, or synthetic additives.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50 border border-caramel/20 shadow-sm space-y-3">
              <ShieldCheck className="w-6 h-6 text-caramel" />
              <h4 className="font-display font-bold text-lg text-espresso">Zero Preservatives</h4>
              <p className="text-xs text-bread/75 leading-relaxed">
                Natural acidity from wild fermentation acts as nature's gentle preservative.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-cream-50 border border-caramel/20 shadow-sm space-y-3">
              <Heart className="w-6 h-6 text-caramel" />
              <h4 className="font-display font-bold text-lg text-espresso">Baked Daily</h4>
              <p className="text-xs text-bread/75 leading-relaxed">
                Baked in twice-daily batches so you never receive day-old bread.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-espresso text-cream-50 text-center max-w-3xl mx-auto shadow-warm-lg">
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-butter mb-3">
            Taste the Difference of Patient Baking.
          </h3>
          <p className="text-xs sm:text-sm text-cream/75 max-w-md mx-auto mb-6">
            Experience our fresh morning bakes delivered directly to your doorstep in Jakarta.
          </p>
          <Link to="/menu">
            <Button variant="secondary" size="lg" className="group">
              <span>Explore Today's Hearth Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
