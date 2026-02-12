
import React, { useState, useEffect } from 'react';
import { DataService } from '../services/dataService';
import { Category, Subcategory, Product } from '../types';

interface InventorySectionProps {
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

const InventorySection: React.FC<InventorySectionProps> = ({ onAddToCart, onSelectProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = DataService.getCategories();
  const subcategories = DataService.getSubcategories(activeCategory as Category);

  useEffect(() => {
    const fetchProducts = async () => {
      const filtered = await DataService.filterProducts({
        category: activeCategory,
        subcategory: activeSubcategory,
        search: searchQuery
      });
      setProducts(filtered);
      setCurrentPage(1);
    };
    fetchProducts();
  }, [activeCategory, activeSubcategory, searchQuery]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="inventory" className="py-32 px-6 md:px-12 max-w-[1800px] mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 border-b border-border pb-16">
        <div className="animate-fade-in-down">
          <h2 className="text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-6 italic">Rental Catalog</h2>
          <h3 className="text-5xl md:text-7xl font-heading font-black tracking-tighter text-text-primary uppercase leading-[0.85]">
            ELITE GEAR.
          </h3>
        </div>

        <div className="flex flex-col gap-4 min-w-[340px]">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 italic">Search Inventory</label>
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH BY BRAND, MODEL OR TAGS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border px-8 py-5 text-[11px] font-bold focus:outline-none focus:border-primary transition-all placeholder:text-black/20 text-text-primary uppercase tracking-widest"
            />
          </div>
        </div>
      </div>

      {/* Filter Bar - Restore Original "Liquid Glass" Styling */}
      <div className="flex flex-col gap-8 mb-20">
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat as Category); setActiveSubcategory('All'); }}
              className={`px-10 py-5 rounded-none text-[10px] uppercase font-black tracking-[0.3em] transition-all duration-500 ${activeCategory === cat
                ? 'bg-text-primary text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] scale-105'
                : 'bg-white border border-border text-black/40 hover:border-black/60 hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory !== 'All' && subcategories.length > 1 && (
          <div className="flex flex-wrap gap-2 animate-fade-in">
            {subcategories.map(sub => (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub as Subcategory)}
                className={`px-8 py-3 rounded-none text-[9px] uppercase font-black tracking-[0.2em] transition-all ${activeSubcategory === sub
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white border border-border text-black/20 hover:border-black/40 hover:text-black'
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid - Spaced 4-column */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product, idx) => (
            <div
              key={product.id}
              className="group relative bg-[#FDFCF9] flex flex-col h-full transition-all duration-500 hover:z-10 hover:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)]"
            >
              {/* Image Area - Reduced padding/height */}
              <div
                className="aspect-square overflow-hidden bg-[#F0F0F0] relative cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover grayscale transition-all duration-[1500ms] group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-all" />

                {/* Brand Badge */}
                <div className="absolute top-6 left-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="bg-primary text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest italic shadow-xl">
                    {product.brand}
                  </span>
                </div>
              </div>

              {/* Info Area - Tight Layout */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-black/40 text-[9px] uppercase font-black tracking-[0.2em]">
                    {product.category} — {product.subcategory}
                  </span>
                  <div className={`text-[8px] font-black px-2 py-0.5 rounded-full border border-black/10 uppercase tracking-widest ${product.available > 0 ? 'text-green-600' : 'text-primary'
                    }`}>
                    {product.available}/{product.stock} STOCK
                  </div>
                </div>

                <h3
                  className="text-2xl font-heading text-text-primary font-black tracking-tight mb-8 cursor-pointer hover:text-primary transition-colors leading-none uppercase"
                  onClick={() => onSelectProduct(product)}
                >
                  {product.name}
                </h3>

                <div className="flex justify-between items-end border-t border-[#F0F0F0] pt-6 mt-auto">
                  <div>
                    <span className="text-primary font-black text-3xl tracking-tighter italic leading-none">${product.pricePerDay}</span>
                    <span className="text-[9px] text-black/20 ml-1 font-black uppercase tracking-widest block mt-1">per day</span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="h-11 px-8 bg-text-primary text-white flex gap-3 items-center justify-center hover:bg-primary transition-all transform active:scale-95 shadow-xl group/btn text-[10px] font-black uppercase tracking-[0.2em] italic"
                  >
                    ADD
                    <svg className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-40 text-center border border-border bg-white animate-fade-in">
          <p className="text-black/40 uppercase tracking-[0.4em] text-sm font-black italic">No matching equipment found.</p>
        </div>
      )}

      {/* Pagination - Original Round Buttons */}
      {totalPages > 1 && (
        <div className="mt-24 flex items-center justify-center gap-6">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-16 h-16 border-2 border-border rounded-full flex items-center justify-center disabled:opacity-20 hover:border-primary hover:text-primary transition-all group bg-white shadow-lg"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="flex gap-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-16 h-16 border-2 rounded-full flex items-center justify-center text-[11px] font-black tracking-widest transition-all ${currentPage === i + 1
                  ? 'border-primary bg-primary text-white shadow-2xl scale-110'
                  : 'border-border text-black/30 hover:border-black hover:text-black bg-white'
                  }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-16 h-16 border-2 border-border rounded-full flex items-center justify-center disabled:opacity-20 hover:border-primary hover:text-primary transition-all group bg-white shadow-lg"
          >
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default InventorySection;
