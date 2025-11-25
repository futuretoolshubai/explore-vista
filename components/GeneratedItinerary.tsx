import React from 'react';
import { TravelPackage } from '../types';
import { CheckCircle, MapPin, Clock, DollarSign, Star, Coffee, Calendar } from 'lucide-react';

interface GeneratedItineraryProps {
  data: TravelPackage | null;
  onClose?: () => void;
  onBook: () => void;
}

const GeneratedItinerary: React.FC<GeneratedItineraryProps> = ({ data, onBook }) => {
  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-16 scroll-mt-20" id="results">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative h-64 md:h-80 bg-gray-200">
           <img 
             src={data.image || `https://picsum.photos/seed/${data.destination}/1200/600`} 
             alt={data.destination} 
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
           <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
             <div className="inline-flex items-center gap-2 bg-brand-orange px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                AI Generated Plan
             </div>
             <h2 className="text-3xl md:text-5xl font-bold">{data.packageName}</h2>
             <div className="flex items-center gap-4 mt-2 text-white/90">
                <span className="flex items-center gap-1"><MapPin size={18} /> {data.destination}</span>
                <span className="flex items-center gap-1"><Clock size={18} /> {data.duration}</span>
             </div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-6 md:p-10">
          {/* Left Column: Details & Itinerary */}
          <div className="md:col-span-2 space-y-10">
            
            {/* Overview */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Trip Overview</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{data.description}</p>
            </section>

            {/* Hotel */}
             <section className="bg-brand-light p-6 rounded-2xl border border-brand-cyan/20">
              <h3 className="text-xl font-bold text-brand-teal mb-4 flex items-center gap-2">
                <Star className="fill-brand-yellow text-brand-yellow" /> Recommended Stay
              </h3>
              <h4 className="text-lg font-semibold text-gray-800">{data.hotel.name}</h4>
              <p className="text-sm text-brand-orange font-medium mb-2">{data.hotel.rating}</p>
              <p className="text-gray-600 mb-4">{data.hotel.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.hotel.amenities.map((am, idx) => (
                  <span key={idx} className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                    {am}
                  </span>
                ))}
              </div>
            </section>

            {/* Itinerary Timeline */}
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Day-by-Day Itinerary</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {data.itinerary.map((day, index) => (
                  <div key={index} className="relative flex items-start group is-active">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-brand-teal shadow shrink-0 z-10 text-white font-bold">
                        {day.day}
                     </div>
                     <div className="ml-6 w-full">
                       <h4 className="text-lg font-bold text-gray-800">{day.title}</h4>
                       <ul className="mt-2 space-y-2">
                         {day.activities.map((act, i) => (
                           <li key={i} className="flex items-start gap-2 text-gray-600">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0"></span>
                              {act}
                           </li>
                         ))}
                       </ul>
                     </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Price & Inclusions & CTA */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-6">
                  <span className="text-gray-500 text-sm uppercase tracking-wide">Total Price Estimate</span>
                  <div className="text-4xl font-bold text-brand-teal mt-1 flex items-center justify-center gap-1">
                     {data.price} <span className="text-base font-normal text-gray-400">/ person</span>
                  </div>
                </div>

                <button 
                  onClick={onBook}
                  className="w-full py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 mb-6"
                >
                  Book This Trip
                </button>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Package Inclusions</h4>
                  <ul className="space-y-3">
                    {data.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-cyan to-brand-teal p-6 rounded-2xl text-white">
                <h4 className="font-bold text-lg mb-2">Need changes?</h4>
                <p className="text-sm opacity-90 mb-4">We can customize this generated plan further. Contact our agents after booking.</p>
                <div className="flex items-center gap-2 text-sm font-semibold cursor-pointer hover:underline">
                   <Coffee size={16} /> Talk to an expert
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedItinerary;