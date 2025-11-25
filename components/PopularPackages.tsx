import React from 'react';
import { POPULAR_PACKAGES } from '../constants';
import { TravelPackage } from '../types';
import { Clock, Star, ArrowRight, Heart } from 'lucide-react';

interface PopularPackagesProps {
  onSelectPackage: (pkg: TravelPackage) => void;
}

const PopularPackages: React.FC<PopularPackagesProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Trending <span className="text-brand-orange">Packages</span></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Curated experiences for the modern traveler. Pick your next adventure.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {POPULAR_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.destination} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-extrabold text-brand-dark shadow-sm z-10">
                  {pkg.price}
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-brand-orange hover:text-white transition-colors">
                   <Heart size={18} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                   <div className="flex items-center gap-1 text-brand-yellow mb-1">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                   </div>
                   <h3 className="text-xl font-bold">{pkg.packageName}</h3>
                   <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                      <Clock size={14} /> 
                      <span>{pkg.duration}</span>
                   </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                 <p className="text-gray-600 mb-6 flex-grow line-clamp-3">{pkg.description}</p>
                 <button 
                   onClick={() => onSelectPackage(pkg)}
                   className="w-full py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-600 hover:border-brand-orange hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                 >
                   Book Now <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform"/>
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;