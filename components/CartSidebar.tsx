
import React from 'react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((sum, item) => sum + (item.pricePerDay * item.quantity), 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-[#D1D1D1] z-[101] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-[#D1D1D1] flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-[#121212]">Your Rental List</h2>
            <p className="text-[10px] uppercase tracking-widest text-[#FF3E1F] font-bold">{items.length} Items Selected</p>
          </div>
          <button onClick={onClose} className="p-2 text-[#121212] hover:text-[#FF3E1F]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {items.length > 0 ? (
            items.map(item => (
              <div key={item.id} className="flex gap-4 border-b border-[#F0F0F0] pb-6">
                <div className="w-20 h-20 bg-[#F0F0F0] overflow-hidden flex-shrink-0">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-bold uppercase text-[#121212]">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-[10px] text-black/30 hover:text-[#FF3E1F] uppercase">Remove</button>
                  </div>
                  <p className="text-[10px] text-black/40 uppercase mb-4">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-[#D1D1D1]">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 hover:bg-[#F0F0F0] text-[#121212]">-</button>
                      <span className="px-3 py-1 text-xs border-x border-[#D1D1D1] text-[#121212]">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 hover:bg-[#F0F0F0] text-[#121212]">+</button>
                    </div>
                    <span className="text-sm font-bold text-[#121212]">${item.pricePerDay * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 text-[#121212]">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="uppercase tracking-[0.2em] text-sm">Your quote is empty.</p>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-[#D1D1D1] bg-[#F6F4EF]">
          <div className="flex justify-between items-end mb-8">
            <span className="text-[11px] uppercase tracking-widest text-black/40">Total Day Rate (Est.)</span>
            <span className="text-3xl font-bold text-[#121212]">${total}</span>
          </div>
          <button className="w-full bg-[#FF3E1F] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#121212] transition-all shadow-lg">
            Request Formal Quote
          </button>
          <p className="text-[9px] text-center text-black/30 mt-4 uppercase">Excluding insurance & logistics fees.</p>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
