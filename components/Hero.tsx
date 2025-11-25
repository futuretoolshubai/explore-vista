import React, { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Minus, Plus, MapPin, Loader2, Sparkles, Plane, ArrowRight } from 'lucide-react';
import { BudgetLevel, UserPreferences } from '../types';

// --- EDITABLE CONFIGURATION ---
const HERO_CONFIG = {
  // High-quality Unsplash images for the slider
  images: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop", // Swiss Alps
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop", // Tropical Beach
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop", // Kyoto Nature
    "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009&auto=format&fit=crop", // Underwater/Blue
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1975&auto=format&fit=crop"  // Dubai City
  ],
  // Words that will be typed out in the headline
  typingWords: ["The World", "Paradise", "Hidden Gems", "Luxury", "Your Dreams"],
  // Quick pick destinations
  quickPicks: ["Bali", "Paris", "Tokyo", "Santorini", "Dubai"]
};

interface HeroProps {
  onSearch: (prefs: UserPreferences) => void;
  isLoading: boolean;
  prefilledDestination?: string;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading, prefilledDestination }) => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [days, setDays] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [budget, setBudget] = useState<string>(BudgetLevel.STANDARD);

  // Background Slider State
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  // Typewriter State
  const [textValue, setTextValue] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // --- EFFECTS ---

  // 1. Sync with prop (Destination Pre-fill)
  useEffect(() => {
    if (prefilledDestination) {
      setDestination(prefilledDestination);
    }
  }, [prefilledDestination]);

  // 2. Background Image Rotation (Every 6 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_CONFIG.images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // 3. Typewriter Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = HERO_CONFIG.typingWords[wordIndex];
      
      if (isDeleting) {
        // Deleting
        setTextValue(currentWord.substring(0, textValue.length - 1));
        setTypingSpeed(50); // Faster deletion
      } else {
        // Typing
        setTextValue(currentWord.substring(0, textValue.length + 1));
        setTypingSpeed(150); // Normal typing speed
      }

      // Word Completed
      if (!isDeleting && textValue === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && textValue === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % HERO_CONFIG.typingWords.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [textValue, isDeleting, wordIndex, typingSpeed]);

  // --- HANDLERS ---

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !dates) return;

    // Analytics
    fetch("https://formspree.io/f/mjkzekab", {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ formType: 'Search Query', destination, dates, days, travelers, budget })
    }).catch(err => console.log("Analytics silent fail", err));

    onSearch({ destination, dates, days, travelers, budget });
  };

  return (
    <div id="home" className="relative h-screen min-h-[850px] flex items-center justify-center overflow-hidden font-sans bg-gray-900">
      
      {/* --- CINEMATIC BACKGROUND SLIDER --- */}
      {HERO_CONFIG.images.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIdx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img 
            src={img} 
            alt="Travel Background" 
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${index === currentImageIdx ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-brand-light/90"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div> {/* Subtle texture */}

      <div className="relative z-10 container mx-auto px-4 text-center pt-12">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm mb-8 animate-slide-up shadow-xl hover:bg-white/20 transition-colors cursor-default">
           <Plane size={16} className="text-brand-orange animate-pulse" /> 
           <span>AI-Powered Travel Planning</span>
        </div>
        
        {/* Headline with Typewriter */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight leading-tight animate-slide-up min-h-[1.2em]">
          Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-yellow">{textValue}</span>
          <span className="animate-blink text-brand-orange">|</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 mb-14 max-w-2xl mx-auto font-light leading-relaxed animate-slide-up drop-shadow-md">
          Discover the world's most breathtaking destinations with itineraries crafted just for you.
        </p>

        {/* --- SEARCH BAR (Glassmorphism Card) --- */}
        <div className="bg-white/10 backdrop-blur-xl p-4 md:p-5 rounded-[2.5rem] shadow-2xl shadow-black/20 max-w-6xl mx-auto border border-white/20 animate-slide-up relative z-20">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-3 items-stretch">
            
            {/* 1. Destination Input */}
            <div className="flex-[2] relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-[1.6rem] opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></div>
              <div className="relative h-full bg-white rounded-[1.5rem] px-6 py-3 flex flex-col justify-center transition-all group-hover:bg-blue-50/50 shadow-sm">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-brand-teal mb-1 flex items-center gap-1.5">
                  <MapPin size={12} strokeWidth={3} /> Destination
                </label>
                <input 
                  type="text" 
                  placeholder="Where do you want to go?" 
                  className="w-full bg-transparent text-xl font-bold text-brand-dark placeholder:text-gray-300 outline-none truncate"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* 2. Check-in Date (Fixed Overlay Method) */}
            <div className="flex-[1.5] relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-orange via-pink-500 to-red-500 rounded-[1.6rem] opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300"></div>
               
               <div className="relative h-full bg-white rounded-[1.5rem] px-6 py-3 shadow-sm flex flex-col justify-center overflow-hidden group-hover:bg-orange-50/50 transition-colors cursor-pointer">
                 
                 <div className="flex justify-between items-center pointer-events-none"> {/* Text ignored by mouse, input handles click */}
                    <div className="flex flex-col text-left">
                        <label className="text-[11px] font-extrabold uppercase tracking-widest text-brand-orange mb-1 flex items-center gap-1.5">
                          <Calendar size={12} strokeWidth={3} /> Check-in
                        </label>
                        <span className={`text-xl font-black truncate tracking-tight ${dates ? 'text-brand-dark' : 'text-gray-300'}`}>
                          {dates ? new Date(dates).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Add Dates'}
                        </span>
                    </div>
                 </div>

                 {/* FULL COVER INPUT - The "Real Developer" Fix */}
                 <input 
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    required
                  />
               </div>
            </div>

            {/* 3. Counters (Travelers & Days) */}
            <div className="flex-[2] flex flex-col sm:flex-row gap-3">
               {/* Travelers */}
               <div className="flex-1 bg-white rounded-[1.5rem] p-2 flex flex-col justify-center items-center shadow-sm border border-transparent hover:border-brand-teal/30 transition-all">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">Travelers</label>
                  <div className="flex items-center justify-between w-full px-1">
                      <button type="button" onClick={() => setTravelers(Math.max(1, travelers - 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-teal hover:text-white flex items-center justify-center transition-colors active:scale-90">
                          <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="font-black text-xl text-brand-dark w-6 text-center">{travelers}</span>
                      <button type="button" onClick={() => setTravelers(Math.min(20, travelers + 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-teal hover:text-white flex items-center justify-center transition-colors active:scale-90">
                          <Plus size={14} strokeWidth={3} />
                      </button>
                  </div>
               </div>

               {/* Duration */}
               <div className="flex-1 bg-white rounded-[1.5rem] p-2 flex flex-col justify-center items-center shadow-sm border border-transparent hover:border-brand-teal/30 transition-all">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1">Duration</label>
                  <div className="flex items-center justify-between w-full px-1">
                      <button type="button" onClick={() => setDays(Math.max(1, days - 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-teal hover:text-white flex items-center justify-center transition-colors active:scale-90">
                          <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="font-black text-xl text-brand-dark w-10 text-center">{days}<span className="text-xs text-gray-400 font-normal ml-0.5">d</span></span>
                      <button type="button" onClick={() => setDays(Math.min(30, days + 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-brand-teal hover:text-white flex items-center justify-center transition-colors active:scale-90">
                          <Plus size={14} strokeWidth={3} />
                      </button>
                  </div>
               </div>
            </div>

            {/* 4. Search Button - Catchy & Animated */}
            <div className="lg:w-auto w-full">
                 <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-full min-h-[75px] lg:min-h-0 lg:px-10 bg-gradient-to-br from-brand-orange to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold rounded-[1.5rem] shadow-lg shadow-brand-orange/30 transform transition-all active:scale-95 flex flex-col items-center justify-center gap-1 group relative overflow-hidden ring-4 ring-transparent hover:ring-brand-orange/20"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={28}/>
                  ) : (
                    <>
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                        <Search size={28} strokeWidth={3} className="mb-1 group-hover:scale-110 transition-transform duration-300"/> 
                        <span className="text-xs uppercase tracking-widest font-extrabold">Search</span>
                      </div>
                    </>
                  )}
                </button>
            </div>
           
          </form>
        </div>

        {/* Quick Picks */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 animate-slide-up">
          <span className="text-white/90 font-semibold text-sm flex items-center mr-2 bg-black/30 px-3 py-1 rounded-lg backdrop-blur-sm">
            <Sparkles size={14} className="mr-2 text-brand-yellow"/> Trending:
          </span>
          {HERO_CONFIG.quickPicks.map((city) => (
            <button 
              key={city}
              type="button"
              onClick={() => setDestination(city)}
              className="bg-white/10 hover:bg-white text-white hover:text-brand-dark border border-white/20 hover:border-white px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 backdrop-blur-md flex items-center gap-1 group"
            >
              {city} <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Hero;