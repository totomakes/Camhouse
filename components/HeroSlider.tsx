
import React, { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1492691523567-6170c8675fa8?auto=format&fit=crop&q=80&w=1920',
    title: 'THE CORE OF YOUR STORY.',
    subtitle: 'Elite camera packages for world-class productions.'
  },
  {
    image: '/assets/hero/hero_2.jpg',
    title: 'PRECISION OPTICS.',
    subtitle: 'Cooke, Arri, Zeiss. The glass that defines the look.'
  },
  {
    image: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f5f85?auto=format&fit=crop&q=80&w=1920',
    title: 'SHAPE THE LIGHT.',
    subtitle: 'From SkyPanels to M-Series. Total atmospheric control.'
  }
];

const HeroSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Subtle gradient overlay to help readability of centered text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === current ? 'scale-110' : 'scale-100'}`}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center mt-10">
            <h2 className="text-primary tracking-[0.4em] text-xs mb-6 font-black uppercase animate-fade-in-down drop-shadow-md">
              Your production ally in El Salvador
            </h2>
            <h1 className="text-white text-5xl md:text-8xl lg:text-9xl mb-8 max-w-5xl leading-tight drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/90 mb-12 max-w-2xl drop-shadow-lg">
              {slide.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button
                onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-white px-12 py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all shadow-xl"
              >
                Explore Inventory
              </button>
              <a
                href="mailto:camhouserental@gmail.com"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-12 py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all shadow-xl inline-block"
              >
                Contact Rental Desk
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`group relative py-4 transition-all`}
          >
            <div className={`w-16 h-[2px] transition-all ${i === current ? 'bg-primary scale-x-110' : 'bg-white/30 group-hover:bg-white/60'}`} />
            <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-widest transition-opacity ${i === current ? 'opacity-100 text-primary' : 'opacity-0'}`}>
              0{i + 1}
            </span>
          </button>
        ))}
      </div>

      {/* Viewfinder Decorative Elements */}
      <div className="absolute top-32 left-10 w-20 h-20 border-t border-l border-white/20 z-20 pointer-events-none hidden lg:block"></div>
      <div className="absolute top-32 right-10 w-20 h-20 border-t border-r border-white/20 z-20 pointer-events-none hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 border-b border-l border-white/20 z-20 pointer-events-none hidden lg:block"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/20 z-20 pointer-events-none hidden lg:block"></div>
    </section>
  );
};

export default HeroSlider;
