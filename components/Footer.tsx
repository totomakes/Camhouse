
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#D1D1D1] pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl font-black tracking-tighter mb-8 text-[#121212]"><span className="text-[#FF3E1F]">CAM</span>HOUSE</h2>
            <p className="text-black/50 text-lg max-w-md mb-12 leading-relaxed">
              Based in Los Angeles, Berlin, and Tokyo. Providing the global filmmaking community with the most advanced optics and imaging technology available.
            </p>
            <div className="flex gap-4">
              {['INSTAGRAM', 'VIMEO', 'LINKEDIN', 'TWITTER'].map(social => (
                <a key={social} href="#" className="text-[10px] font-bold text-black tracking-[0.2em] hover:text-[#FF3E1F] transition-colors border-b border-transparent hover:border-[#FF3E1F]">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/30 mb-8">Locations</h4>
            <ul className="space-y-6 text-sm text-[#121212]">
              <li>
                <p className="font-bold uppercase tracking-widest">LOS ANGELES</p>
                <p className="text-black/50">7312 Cine Boulevard, CA 90028</p>
              </li>
              <li>
                <p className="font-bold uppercase tracking-widest">BERLIN</p>
                <p className="text-black/50">Friedrichstraße 12, 10117 Berlin</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/30 mb-8">Work With Us</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-[#121212]">
              <li><a href="#" className="hover:text-[#FF3E1F] transition-colors">Rental Policies</a></li>
              <li><a href="#" className="hover:text-[#FF3E1F] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF3E1F] transition-colors">Producer Support</a></li>
              <li><a href="#" className="hover:text-[#FF3E1F] transition-colors">Insurance Partners</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-[#F0F0F0]">
          <p className="text-[10px] text-black/20 tracking-widest uppercase font-bold">© 2025 CAMHOUSE RENTALS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-[10px] text-black/20 tracking-widest uppercase font-bold">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
