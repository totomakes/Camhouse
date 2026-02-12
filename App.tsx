
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import InventorySection from './components/InventorySection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CartSidebar from './components/CartSidebar';
import ProductDetail from './components/ProductDetail';
import { Product, CartItem } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    // Optionally close detail when adding if you want, but often it feels better to keep it open
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <CustomCursor />
      <Navbar
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        <HeroSlider />

        {/* Industry Badge Bar */}
        <div className="bg-[#FF3E1F] py-4 overflow-hidden whitespace-nowrap">
          <div className="animate-scroll-slow flex gap-24 items-center">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                • TRUSTED BY NETFLIX • HBO • A24 • WARNER BROS • SONY PICTURES • APPLE TV+ •
              </span>
            ))}
          </div>
        </div>

        <InventorySection
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* Brand Story Section */}
        <section className="py-32 px-6 md:px-12 bg-white border-y border-[#D1D1D1]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-[#FF3E1F] uppercase tracking-[0.3em] text-xs font-bold mb-8">Our Philosophy</h2>
            <p className="text-3xl md:text-5xl leading-tight mb-12 heading-font text-[#121212]">
              "We don't just rent cameras. We curate the technical architecture of your visual narrative."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-black/10"></div>
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/60">Erik V., Master Technician</span>
              <div className="w-12 h-[1px] bg-black/10"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <style>{`
        @keyframes scroll-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-scroll-slow {
          animation: scroll-slow 30s linear infinite;
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
