import React, { useState } from 'react';
import { X, Check, Calendar, Users, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, packageName }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add context data that isn't in the form fields
    formData.append("packageName", packageName);
    formData.append("formType", "Booking Request");

    try {
      const response = await fetch("https://formspree.io/f/mjkzekab", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("There was an issue submitting your request. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300 border border-gray-100">
        
        {isSubmitted ? (
           <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                <Check size={40} strokeWidth={3} />
              </div>
              <h3 className="text-3xl font-bold text-brand-dark mb-3">Booking Received!</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Get ready! Our Explore Vista agents are reviewing your request for <br/><span className="font-bold text-brand-teal">{packageName}</span>.
              </p>
              <button onClick={onClose} className="bg-brand-teal hover:bg-teal-600 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-teal-200">
                Return to Home
              </button>
           </div>
        ) : (
          <>
            <div className="bg-gradient-to-r from-brand-teal to-brand-cyan p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Secure Your Trip</h3>
                  <p className="text-teal-50 text-sm mt-2 opacity-90 font-medium tracking-wide">REQUESTING: {packageName}</p>
                </div>
                <button onClick={onClose} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors backdrop-blur-sm"><X size={20} /></button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5 bg-white">
              <div className="grid grid-cols-2 gap-5">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
                    <input type="text" name="firstName" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all font-medium" placeholder="Jane" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
                    <input type="text" name="lastName" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all font-medium" placeholder="Doe" />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input type="email" name="email" required className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all font-medium" placeholder="jane@example.com" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Special Requests</label>
                <textarea name="specialRequests" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-teal outline-none transition-all h-24 font-medium" placeholder="Dietary restrictions, honeymoon suite, etc."></textarea>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all hover:translate-y-[-2px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Sending Request...</> : <>Submit Booking Request <Check size={20} /></>}
                </button>
              </div>
              <p className="text-xs text-center text-gray-400 mt-2">No credit card required for initial inquiry.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;