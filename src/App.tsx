import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useCartStore } from './store/cartStore';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { FindUsPage } from './pages/FindUsPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';

export function App() {
  const { hasSeenIntro, setIntroSeen } = useCartStore();

  return (
    <BrowserRouter>
      {/* 4. Cinematic Intro Screen (only displayed once per session) */}
      {!hasSeenIntro && (
        <CinematicIntro onComplete={() => setIntroSeen()} />
      )}

      {/* Main Bakery Experience Layout */}
      <div className="flex flex-col min-h-screen bg-[#FFF6E8] text-[#2D1B15] relative selection:bg-[#F6D98B] selection:text-[#2D1B15]">
        {/* 6. Floating Glassmorphism Navbar */}
        <Navbar />

        {/* 10. Global Slide-Over Shopping Cart Drawer */}
        <CartDrawer />

        {/* Page Routing */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/find-us" element={<FindUsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Bakery Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
