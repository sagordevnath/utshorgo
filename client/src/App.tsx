import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { useRevealObserver } from './hooks/useReveal';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { SellPage } from './pages/SellPage';
import { AdminPage } from './pages/AdminPage';
import { ResellersPage } from './pages/ResellersPage';
import { InventoryPage } from './pages/InventoryPage';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Discover',
  '/checkout': 'Your Bag',
  '/dashboard': 'Seller Dashboard',
  '/sell': 'Sell with Us',
  '/admin': 'Admin Console',
  '/resellers': 'Reseller Exchange',
  '/inventory': 'Reseller Inventory',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const section =
      ROUTE_TITLES[pathname] ?? (pathname.startsWith('/product/') ? 'Product' : 'Marketplace');
    document.title = `Utshorgo — ${section}`;
  }, [pathname]);
  return null;
}

export default function App() {
  useRevealObserver();

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/resellers" element={<ResellersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
      <Footer />
      <CartDrawer />
      <Toast />
      <CustomCursor />
    </>
  );
}
