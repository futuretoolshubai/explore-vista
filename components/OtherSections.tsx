import React, { useState } from 'react';
import { DESTINATIONS, TESTIMONIALS } from '../constants';
import { Map, Gift, MessageCircle, ArrowRight, Compass, Instagram, Twitter, Facebook, Send, CheckCircle, AlertCircle, ExternalLink, Sparkles, Users, Trophy, Globe } from 'lucide-react';

// --- EDITABLE CONFIGURATION FOR ABOUT SECTION ---
const ABOUT_CONFIG = {
  badge: "Our Philosophy",
  title: "Travel Smart, Explore More",
  subtitle: "Where AI precision meets human wanderlust.",
  description: "At Explore Vista, we are redefining the travel experience. We believe that planning a trip should be as exciting as the journey itself. By combining cutting-edge AI technology with the deep insights of seasoned travel experts, we curate personalized itineraries that adapt to your unique style, budget, and dreams. Say goodbye to travel stress and hello to your next great adventure.",
  image: "https://images.unsplash.com/photo-1519055548548-ac7171f6c152?q=80&w=2694&auto=format&fit=crop", // High quality lifestyle/travel image
  buttonText: "Discover Our Story",
  stats: [
    { value: "50k+", label: "Happy Travelers", icon: Users },
    { value: "120+", label: "Countries", icon: Globe },
    { value: "#1", label: "AI Travel App", icon: Trophy }
  ]
};

interface FeaturedDestinationsProps {
  onSelectDestination: (dest: string) => void;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({ onSelectDestination }) => (
  <section id="destinations" className="py-24 bg-brand-light">
    <div className="container mx-auto px-4">
       <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-brand-orange font-bold uppercase tracking-widest text-sm mb-2 block">Bucket List</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Top <span className="text-brand-teal">Destinations</span></h2>
          </div>
          {/* View All Button - purely visual for this demo */}
          <button className="hidden md:flex items-center gap-2 text-brand-teal font-bold hover:text-brand-dark transition-colors border-b-2 border-brand-teal pb-1">
             Explore All <ArrowRight size={20}/>
          </button>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DESTINATIONS.map((dest, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative border border-gray-100 flex flex-col"
            >
               {/* Image Area - Click to Plan with AI */}
               <div 
                 className="relative h-56 overflow-hidden cursor-pointer"
                 onClick={() => onSelectDestination(dest.name)}
               >
                 <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                 
                 <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white hover:text-brand-orange transition-colors">
                    <Sparkles size={16} />
                 </div>

                 <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-xl drop-shadow-md">{dest.name}</h3>
                    <p className="text-xs font-medium text-brand-yellow flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                      Click to plan trip <ArrowRight size={12}/>
                    </p>
                 </div>
               </div>

               {/* Action Area */}
               <div className="p-4 flex gap-2">
                 {/* Plan AI Button */}
                 <button 
                    onClick={() => onSelectDestination(dest.name)}
                    className="flex-1 py-2 text-sm font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                 >
                    AI Plan
                 </button>

                 {/* Affiliate Button */}
                 <a 
                   href={dest.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex-[2] py-2 px-3 text-sm font-bold text-white bg-gradient-to-r from-brand-orange to-red-500 rounded-lg hover:from-orange-500 hover:to-red-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
                 >
                   View Deals <ExternalLink size={14} />
                 </a>
               </div>
            </div>
          ))}
       </div>
    </div>
  </section>
);

export const Testimonials: React.FC = () => (
  <section id="testimonials" className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
         <h2 className="text-4xl font-bold text-brand-dark mb-4">Traveler <span className="text-brand-orange">Stories</span></h2>
         <p className="text-gray-500 max-w-2xl mx-auto">Real reviews from our community of global explorers.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 px-4">
        {TESTIMONIALS.map((t, i) => (
           <div key={i} className="bg-brand-light p-8 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl relative hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                 <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-brand-orange" />
                 <div>
                    <h4 className="font-bold text-brand-dark">{t.name}</h4>
                    <p className="text-xs font-bold text-brand-teal uppercase">{t.location}</p>
                 </div>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{t.text}"</p>
              <div className="absolute top-8 right-8 text-brand-teal/10">
                 <MessageCircle size={64} fill="currentColor" />
              </div>
           </div>
        ))}
      </div>
    </div>
  </section>
);

export const AboutOffers: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setStatus('submitting');
    
    try {
      const response = await fetch("https://formspree.io/f/mjkzekab", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email, 
          formType: 'Newsletter Subscription' 
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="flex flex-col">
      {/* ABOUT US SECTION - Professional Split Layout */}
      <section id="about" className="py-24 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Image with Overlays */}
            <div className="lg:w-1/2 relative w-full">
              {/* Decorative Blobs */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-orange/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-teal/10 rounded-full blur-2xl"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                 <img 
                  src={ABOUT_CONFIG.image} 
                  alt="Team working" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating Verification Card */}
              <div className="absolute bottom-10 left-[-20px] md:left-[-30px] bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-4 animate-in slide-in-from-left duration-1000">
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Trusted By</p>
                    <p className="text-lg font-bold text-brand-dark">50,000+ Travelers</p>
                  </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:w-1/2">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-teal/10 text-brand-teal font-extrabold text-xs uppercase tracking-widest mb-6">
                {ABOUT_CONFIG.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6 leading-[1.15]">
                {ABOUT_CONFIG.title}
              </h2>
              <p className="text-xl font-medium text-gray-800 mb-4">{ABOUT_CONFIG.subtitle}</p>
              <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
                {ABOUT_CONFIG.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-10 border-t border-gray-100 pt-8">
                {ABOUT_CONFIG.stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <stat.icon size={18} className="text-brand-orange" />
                      <h4 className="text-2xl md:text-3xl font-black text-brand-dark">{stat.value}</h4>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              <button className="bg-brand-dark text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-teal transition-all shadow-lg hover:shadow-brand-teal/30 hover:-translate-y-1 flex items-center gap-2 group">
                {ABOUT_CONFIG.buttonText} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS SECTION - Seamless Integration */}
      <section id="offers" className="bg-brand-dark text-white py-24 px-4 md:px-20 relative overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal rounded-full blur-[120px] opacity-20"></div>

         <div className="container mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="lg:w-1/2 text-center lg:text-left">
               <div className="inline-flex items-center justify-center p-3 bg-brand-orange/20 rounded-xl mb-6 backdrop-blur-sm border border-brand-orange/30">
                 <Gift size={32} className="text-brand-orange" />
               </div>
               <h2 className="text-4xl md:text-5xl font-bold mb-4">Unlock Hidden Deals</h2>
               <p className="text-gray-300 text-lg max-w-lg mx-auto lg:mx-0">
                  Join our exclusive travel club and get <span className="text-brand-yellow font-bold">20% off</span> your first AI-generated itinerary.
               </p>
            </div>

            <div className="lg:w-1/2 w-full max-w-md">
               <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
                 {status === 'success' ? (
                   <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 flex items-center gap-4 text-green-100 animate-fade-in">
                      <CheckCircle className="text-green-400 shrink-0" size={32} />
                      <div>
                        <p className="font-bold text-lg">Welcome Aboard!</p>
                        <p className="text-sm opacity-80">Check your inbox for your discount code.</p>
                      </div>
                   </div>
                 ) : (
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com" 
                          required
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all" 
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={status === 'submitting'}
                        className="w-full bg-brand-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {status === 'submitting' ? 'Processing...' : 'Subscribe for 20% Off'}
                        {status !== 'submitting' && <Send size={18}/>}
                      </button>
                      <p className="text-xs text-center text-gray-500">We respect your privacy. Unsubscribe anytime.</p>
                    </form>
                 )}
                 
                 {status === 'error' && (
                  <p className="text-red-300 mt-4 text-center text-sm flex items-center justify-center gap-1"><AlertCircle size={14}/> Something went wrong. Please try again.</p>
                 )}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export const Footer: React.FC = () => (
  <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
           <div className="flex items-center gap-2 mb-6">
              <div className="bg-brand-orange p-1.5 rounded-lg">
                <Compass size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold">Explore<span className="text-brand-teal">Vista</span></h3>
           </div>
           <p className="text-gray-400 text-sm leading-relaxed mb-6">
             Your modern AI travel concierge. We make discovering the world simple, personalized, and beautiful.
           </p>
           <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-teal transition-colors group">
                <Instagram size={18} className="text-gray-400 group-hover:text-white"/>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-teal transition-colors group">
                <Twitter size={18} className="text-gray-400 group-hover:text-white"/>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-teal transition-colors group">
                <Facebook size={18} className="text-gray-400 group-hover:text-white"/>
              </a>
           </div>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Press</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Support</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-lg mb-6 text-white">Get in Touch</h4>
          <p className="text-gray-400 text-sm mb-3">Questions or feedback? We'd love to hear from you.</p>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
             <p className="text-brand-teal font-bold mb-1">hello@explorevista.com</p>
             <p className="text-gray-400 text-sm">+1 (800) VISTA-AI</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <p>© 2024 Explore Vista. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>
);
