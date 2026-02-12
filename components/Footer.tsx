
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <img src="/assets/logo.png" alt="CAMHOUSE" className="h-12 w-auto object-contain brightness-0 mb-8" />
            <p className="text-black/50 text-lg max-w-md mb-12 leading-relaxed">
              Based in El Salvador with a global network of Hollywood-tier alliances. We provide the filmmaking community with the most advanced optics, cameras, and production gear regardless of project scale.
            </p>
            <div className="flex gap-8">
              <a href="https://instagram.com/camhouserental" target="_blank" className="text-[10px] font-bold text-black tracking-[0.2em] hover:text-primary transition-colors border-b border-transparent hover:border-primary">INSTAGRAM</a>
              <a href="mailto:camhouserental@gmail.com" className="text-[10px] font-bold text-black tracking-[0.2em] hover:text-primary transition-colors border-b border-transparent hover:border-primary">EMAIL</a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/30 mb-8">Locations</h4>
            <ul className="space-y-6 text-sm text-text-primary">
              <li>
                <p className="font-bold uppercase tracking-widest text-primary">El Salvador (Base)</p>
                <p className="text-black/50 leading-relaxed">
                  Polígono 25, Senda 3, Residencial Pinares de Suiza, Casa No. 5<br />
                  Santa Tecla, La Libertad
                </p>
              </li>
              <li>
                <p className="font-bold uppercase tracking-widest text-black/40">Los Angeles</p>
                <p className="text-black/50">Los Angeles, CA</p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-black/30 mb-8">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://instagram.com/camhouserental" target="_blank" className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  @camhouserental
                </a>
              </li>
              <li>
                <a href="mailto:camhouserental@gmail.com" className="text-xs font-bold uppercase tracking-widest text-black/60 hover:text-black transition-colors">
                  camhouserental@gmail.com
                </a>
              </li>
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
