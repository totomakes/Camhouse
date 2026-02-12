
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
    const [activeImage, setActiveImage] = useState(product.gallery?.[0] || product.imageUrl);

    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-all"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-7xl h-full max-h-[95vh] overflow-hidden flex flex-col lg:flex-row shadow-[0_64px_128px_-32px_rgba(0,0,0,0.5)] rounded-3xl animate-fade-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF3E1F] transition-all group shadow-2xl"
                >
                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Media Section */}
                <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto bg-[#f8f8f8] relative flex flex-col">
                    <div className="flex-grow relative overflow-hidden group">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

                        {product.videoUrl && (
                            <div className="absolute bottom-6 left-6 z-10">
                                <a
                                    href={product.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-white/90 backdrop-blur-md border border-white px-5 py-3 rounded-full text-black text-[9px] font-bold tracking-widest hover:bg-[#FF3E1F] hover:text-white transition-all shadow-lg"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#FF3E1F] flex items-center justify-center">
                                        <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                    WATCH VIDEO
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.gallery && product.gallery.length > 1 && (
                        <div className="p-6 bg-white border-t border-black/5 flex gap-4 overflow-x-auto no-scrollbar">
                            {product.gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-[#FF3E1F] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt={`${product.name} view ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-14 overflow-y-auto bg-white custom-scrollbar">
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#FF3E1F] text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 bg-[#FF3E1F]/10 rounded-full">
                                {product.brand}
                            </span>
                            <span className="text-[10px] text-black/30 font-bold uppercase tracking-widest">
                                {product.category} / {product.subcategory}
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-heading mb-6 text-[#121212] font-black leading-tight uppercase tracking-tighter">
                            {product.name}
                        </h1>
                        <div className="prose prose-sm max-w-none text-black/60 leading-relaxed font-body">
                            <p className="text-lg text-black/80 font-medium mb-4">Professional Rental Gear</p>
                            <p>{product.description}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 py-10 border-y border-black/5">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF3E1F] mb-6">Especificaciones</h4>
                            <ul className="space-y-3">
                                {Object.entries(product.specs).map(([key, value]) => {
                                    const isNumericKey = /^Feature \d+$/i.test(key) || /^\d+$/i.test(key);
                                    return (
                                        <li key={key} className="flex gap-3 text-sm border-b border-black/[0.03] pb-3 last:border-0">
                                            <span className="text-[#FF3E1F] font-bold">•</span>
                                            <div className="flex flex-col">
                                                {!isNumericKey && (
                                                    <span className="text-black/30 uppercase font-bold tracking-widest text-[8px] mb-1">{key}</span>
                                                )}
                                                <span className="text-[#121212] font-medium leading-tight">{value}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-6 italic">Disponibilidad</h4>
                            <div className="bg-[#FF3E1F] p-7 rounded-none text-white shadow-2xl relative overflow-hidden group border border-white/5">
                                <div className="relative z-10">
                                    <div className="flex items-end justify-between mb-3">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-white/60 uppercase font-black tracking-widest mb-1">STOCK ACTUAL</span>
                                            <span className="text-4xl font-black tracking-tighter text-white">{product.available} <span className="text-xs text-white/40">/ {product.stock}</span></span>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-none border-2 shadow-2xl bg-white text-[#FF3E1F] border-transparent`}>
                                            {product.available > 0 ? 'EN INVENTARIO' : 'SIN STOCK'}
                                        </span>
                                    </div>
                                    <div className="w-full h-1.5 bg-black/10 rounded-none overflow-hidden mt-4">
                                        <div
                                            className="h-full bg-white transition-all duration-1000 ease-out"
                                            style={{ width: `${(product.available / product.stock) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                {/* Decorative circle */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                            </div>

                            <div className="mt-8 p-6 border border-black/5 rounded-2xl bg-[#fdfaf5]">
                                <h5 className="text-[9px] font-bold uppercase text-black/40 tracking-widest mb-3">Rental Conditions</h5>
                                <p className="text-[10px] text-black/60 italic leading-snug">Requires personal identification and rental agreement. Daily rate subject to production insurance.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-cta mb-6">Incluido en la Renta</h4>
                        <div className="flex flex-wrap gap-2">
                            {product.included.map((item, i) => (
                                <span key={i} className="text-[10px] font-black text-[#121212] border border-black/10 px-4 py-2.5 rounded-none bg-[#F9F9F9] flex items-center gap-2 hover:border-black transition-colors uppercase tracking-widest">
                                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-black/10">
                        <div className="w-full sm:w-auto">
                            <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.3em] mb-1">Precio por Día (Rental)</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-[#121212] tracking-tighter italic leading-none">${product.pricePerDay}</span>
                                <span className="text-xs font-black text-black/20 uppercase tracking-widest">USD + IVA</span>
                            </div>
                        </div>
                        <button
                            onClick={() => onAddToCart(product)}
                            disabled={product.available === 0}
                            className={`w-full sm:w-auto px-12 py-6 text-[12px] font-black uppercase tracking-[0.5em] rounded-none transition-all shadow-2xl active:scale-95 border-2 ${product.available > 0
                                ? 'bg-[#121212] border-[#121212] text-white hover:bg-white hover:text-black hover:border-black'
                                : 'bg-black/5 text-black/20 border-transparent cursor-not-allowed'
                                }`}
                        >
                            AGREGAR A LISTA
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
