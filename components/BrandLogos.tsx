
import React from 'react';

const BRANDS = [
    { name: 'ARRI', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Arri_logo.svg' },
    { name: 'APUTURE', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Aputure_logo.svg' },
    { name: 'LITEPANELS', logo: 'https://www.litepanels.com/media/2311/litepanels_logo_black.png' },
    { name: 'ASTERA', logo: 'https://astera-led.com/wp-content/uploads/2020/03/Astera-Logo-Black.png' },
    { name: 'NANLITE', logo: 'https://www.nanlite.com/images/logo.png' },
    { name: 'KINO FLO', logo: 'https://kinoflo.com/wp-content/themes/kinoflo/images/logo-kino-flo.png' },
    { name: 'QUASAR', logo: 'https://www.quasarscience.com/media/1001/quasar-logo.png' },
    { name: 'ZEISS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/df/ZEISS_logo.svg' }
];

const BrandLogos: React.FC = () => {
    return (
        <section className="py-24 bg-white border-t border-border overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-4 italic">The Standards of the Industry</h2>
                    <h3 className="text-3xl font-heading font-black tracking-tighter text-text-primary uppercase">
                        AUTHORISED INVENTORY.
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-12 items-center justify-items-center opacity-30 hover:opacity-100 transition-opacity duration-700">
                    {BRANDS.map((brand) => (
                        <div key={brand.name} className="group relative flex items-center justify-center w-full grayscale h-16 px-6 transition-all duration-500 hover:grayscale-0 hover:scale-110">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-h-full max-w-full object-contain brightness-0"
                                onError={(e) => {
                                    // Fallback to text if logo fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                        const text = document.createElement('span');
                                        text.innerText = brand.name;
                                        text.className = "text-[12px] font-black tracking-[0.2em] text-black";
                                        parent.appendChild(text);
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandLogos;
