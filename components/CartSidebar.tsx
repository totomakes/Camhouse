import React from 'react';
import { jsPDF } from 'https://esm.sh/jspdf';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const [customerName, setCustomerName] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');
  const total = items.reduce((sum, item) => sum + (item.pricePerDay * item.quantity), 0);

  const generatePDF = async (userName: string = 'Valued Customer') => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();
    const brandColor = [19, 196, 163]; // #13C4A3 (Teal)
    const darkColor = [18, 18, 18]; // #121212

    // Brand Logo Loader
    const loadImage = (url: string): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    };

    const logo = await loadImage('/assets/logo.png');

    // Header Bar
    doc.setFillColor(...brandColor);
    doc.rect(0, 0, 210, 40, 'F');

    if (logo) {
      // Calculate aspect ratio to avoid deformation
      // Height is fixed at 20mm, width scaled accordingly
      const originalWidth = logo.width;
      const originalHeight = logo.height;
      const ratio = originalWidth / originalHeight;
      const displayHeight = 22;
      const displayWidth = displayHeight * ratio;

      // addImage(img, format, x, y, width, height, alias, compression)
      // Moving x slightly to center vertically in health bar
      doc.addImage(logo, 'PNG', 20, 9, displayWidth, displayHeight, undefined, 'FAST');
    } else {
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text('CAMHOUSE', 20, 28);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const headerInfoY = 35; // Standardized placement
    doc.text('ELITE FILM PRODUCTION GEAR', 20, headerInfoY);

    // Quote Info Header
    doc.setTextColor(...darkColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RENTAL ESTIMATE', 150, 55);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`DATE: ${date}`, 150, 62);
    doc.text(`CLIENT: ${userName}`, 150, 67);

    // Horizontal Divider
    doc.setDrawColor(...brandColor);
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    // Table Headers
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('EQUIPMENT', 20, 85);
    doc.text('QTY', 140, 85);
    doc.text('RATE (DAY)', 160, 85);

    let y = 95;
    items.forEach((item) => {
      // Check for page overflow
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...darkColor);

      // Item Name & Brand
      doc.text(item.name.substring(0, 50).toUpperCase(), 20, y);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(item.brand.toUpperCase(), 20, y + 4);

      doc.setFontSize(9);
      doc.setTextColor(...darkColor);
      doc.text(item.quantity.toString(), 140, y);
      doc.text(`$${item.pricePerDay.toLocaleString()}`, 160, y);

      y += 15;
    });

    // Totals Section
    doc.setDrawColor(230, 230, 230);
    doc.line(20, y, 190, y);
    y += 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('TOTAL ESTIMATE:', 20, y);
    doc.setTextColor(...brandColor);
    doc.text(`$${total.toLocaleString()} USD`, 160, y);

    // Footer Disclaimer & Brand Info
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    const footerYPos = 282;
    doc.text('* This is a non-binding estimate. Final quote requires production insurance and rental agreement.', 20, footerYPos);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text('CAMHOUSE RENTALS | EL SALVADOR | WORLDWIDE LOGISTICS', 105, footerYPos + 6, { align: 'center' });

    return doc;
  };

  const handleDownload = async (name: string = 'Valued Customer') => {
    const doc = await generatePDF(name);
    const dateStr = new Date().toISOString().split('T')[0];
    doc.save(`camhouse_estimate_${dateStr}.pdf`);
  };

  const handleRequestQuote = () => {
    setIsQuoteModalOpen(true);
  };

  const handleSendRequest = async () => {
    if (!customerName || !customerEmail) return;

    await handleDownload(customerName);

    // Prepare Email
    const subject = encodeURIComponent(`Quote Request: ${customerName}`);
    const body = encodeURIComponent(
      `Hello CamHouse team,\n\nI would like to request a formal quote for the following items:\n\n` +
      items.map(i => `- ${i.name} (${i.brand}) x${i.quantity}`).join('\n') +
      `\n\nTotal Estimate: $${total}\n\nClient Contact: ${customerEmail}\n\nThank you,\n${customerName}`
    );

    window.location.href = `mailto:camhouserental@gmail.com?subject=${subject}&body=${body}`;
    setIsQuoteModalOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside className={`fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-border z-[101] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter text-text-primary">Your Rental List</h2>
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold">{items.length} Items Selected</p>
          </div>
          <button onClick={onClose} className="p-2 text-text-primary hover:text-primary">
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
                    <h4 className="text-sm font-bold uppercase text-text-primary">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-[10px] text-black/30 hover:text-primary uppercase">Remove</button>
                  </div>
                  <p className="text-[10px] text-black/40 uppercase mb-4">{item.brand}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 hover:bg-[#F0F0F0] text-text-primary">-</button>
                      <span className="px-3 py-1 text-xs border-x border-border text-text-primary">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 hover:bg-[#F0F0F0] text-text-primary">+</button>
                    </div>
                    <span className="text-sm font-bold text-text-primary">${item.pricePerDay * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20 text-text-primary">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <p className="uppercase tracking-[0.2em] text-sm">Your quote is empty.</p>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-border bg-[#F6F4EF]">
          <div className="flex justify-between items-end mb-8">
            <span className="text-[11px] uppercase tracking-widest text-black/40">Total Day Rate (Est.)</span>
            <span className="text-3xl font-bold text-text-primary">${total}</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleRequestQuote}
              disabled={items.length === 0}
              className="w-full bg-primary text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Request Formal Quote
            </button>
            <button
              onClick={() => handleDownload()}
              disabled={items.length === 0}
              className="w-full bg-white border-2 border-text-primary text-text-primary py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download PDF Estimate
            </button>
          </div>

          <p className="text-[9px] text-center text-black/30 mt-4 uppercase">Excluding insurance & logistics fees.</p>
        </div>
      </aside>

      {/* Custom Quote Modal */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsQuoteModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-sm p-12 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-black/20 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold uppercase tracking-tighter text-text-primary mb-2">Formal Quote</h3>
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold italic">Professional Production Estimate</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-3">
                  Production Name / Company
                </label>
                <input
                  autoFocus
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Netflix / A24"
                  className="w-full bg-[#F0F0F0] border-none px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all mb-4"
                />

                <label className="block text-[10px] uppercase tracking-widest text-black/40 font-bold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="e.g. producer@example.com"
                  className="w-full bg-[#F0F0F0] border-none px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleSendRequest}
                  disabled={!customerName || !customerEmail}
                  className="w-full bg-primary text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary transition-all disabled:opacity-50"
                >
                  Send & Download
                </button>
                <button
                  onClick={() => { handleDownload(customerName || undefined); setIsQuoteModalOpen(false); }}
                  className="w-full bg-white border border-text-primary text-text-primary py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-text-primary hover:text-white transition-all"
                >
                  Download Only
                </button>
              </div>
            </div>

            <p className="mt-8 text-[9px] text-center text-black/30 uppercase leading-relaxed">
              Generating your estimate...<br />Direct email will open upon completion.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;
