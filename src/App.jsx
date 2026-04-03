import { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ProductDetailModal from "./components/ProductDetailModal.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import HomePage from "./pages/HomePage.jsx";

const Bill = lazy(() => import("./pages/Bill.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));

import { useToast } from "./context/ToastContext";
import { useCart } from "./context/CartContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBillPage, setShowBillPage] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [lang, setLang] = useState("en");
  const [shopName, setShopName] = useState("NAMMA OORU");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { addToast } = useToast();
  const { cart, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => setLang((p) => (p === "en" ? "ta" : "en")),
      2000,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setShopName(lang === "en" ? "NAMMA OORU" : "நம்ம ஊரு");
  }, [lang]);

  const handleCheckout = useCallback(
    (customerInfo) => {
      setCustomerInfo(customerInfo);
      setShowBillPage(true);
      addToast("Proceeding to invoice...", "success");
    },
    [addToast],
  );

  const handleBackHome = useCallback(() => {
    setShowBillPage(false);
    clearCart();
    setCustomerInfo(null);
    navigate("/");
  }, [clearCart, navigate]);

  const scrollToProduct = useCallback(
    (productId) => {
      if (pathname !== "/") {
        navigate("/");
      }
      setTimeout(() => {
        const card = document.getElementById(`product-card-${productId}`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("ring-4", "ring-green-500");
          setTimeout(() => card.classList.remove("ring-4", "ring-green-500"), 2000);
        }
      }, 500);
    },
    [navigate, pathname],
  );

  if (showBillPage && cart.length > 0) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <Bill
          cartItems={cart}
          customerInfo={customerInfo}
          onCheckoutComplete={handleCheckout}
          onBackHome={handleBackHome}
        />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-slate-900 flex flex-col">
      <ScrollToTop />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <Navbar
        scrolled={scrolled}
        cartCount={cart.length}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        onCartOpen={() => setIsCartOpen(true)}
        lang={lang}
        shopName={shopName}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage onNavigate={() => {}} scrollToProduct={scrollToProduct} />} />
          <Route path="/services" element={<Suspense fallback={<div className="h-screen" />}><ServicesPage onScrollToProduct={scrollToProduct} /></Suspense>} />
          <Route path="/contact" element={<Suspense fallback={<div className="h-screen" />}><ContactPage /></Suspense>} />
        </Routes>
      </div>

      <WhatsAppFloat count={cart.length} onClick={() => setIsCartOpen(true)} />
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
