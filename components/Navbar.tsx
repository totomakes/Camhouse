
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
      ? 'bg-white/95 backdrop-blur-md border-b border-border py-3 shadow-lg'
      : 'bg-white/80 backdrop-blur-sm py-5 border-b border-black/5'
      }`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#" className="flex items-center group">
            <img
              src="/assets/logo.png"
              alt="CAMHOUSE"
              className="h-10 w-auto object-contain brightness-0 transition-all group-hover:brightness-100 group-hover:opacity-80"
            />
          </a>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-text-primary">
            <a href="#inventory" className="hover:text-primary transition-colors relative group">
              Inventory
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-primary transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-primary transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-primary transition-colors relative group">
              Studios
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button className="hidden sm:block text-[11px] uppercase tracking-[0.2em] font-bold text-text-primary hover:text-primary transition-colors">
            Login
          </button>
          <button
            onClick={onOpenCart}
            className="group flex items-center gap-3 bg-text-primary border border-text-primary px-6 py-2.5 hover:bg-primary hover:border-primary transition-all"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-white">Quote List</span>
            <div className="bg-primary group-hover:bg-white text-white group-hover:text-black w-6 h-6 flex items-center justify-center text-[10px] font-bold transition-colors">
              {cartCount}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
