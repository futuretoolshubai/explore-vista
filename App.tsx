import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GeneratedItinerary from './components/GeneratedItinerary';
import PopularPackages from './components/PopularPackages';
import BookingModal from './components/BookingModal';
import { FeaturedDestinations, Testimonials, AboutOffers, Footer } from './components/OtherSections';
import { generateTravelPackage } from './services/geminiService';
import { TravelPackage, UserPreferences } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPackage, setGeneratedPackage] = useState<TravelPackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingPackageName, setBookingPackageName] = useState('');
  const [prefilledDestination, setPrefilledDestination] = useState<string | undefined>(undefined);

  const handleSearch = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPackage(null);

    try {
      const result = await generateTravelPackage(
        prefs.destination,
        prefs.days,
        prefs.travelers,
        prefs.budget,
        prefs.dates
      );
      setGeneratedPackage(result);
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Failed to generate itinerary. Please try again or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookGenerated = () => {
    if (generatedPackage) {
      setBookingPackageName(generatedPackage.packageName);
      setIsBookingModalOpen(true);
    }
  };

  const handleSelectDestination = (dest: string) => {
    setPrefilledDestination(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (pkg: TravelPackage) => {
    setBookingPackageName(pkg.packageName);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      <Hero onSearch={handleSearch} isLoading={isLoading} prefilledDestination={prefilledDestination} />

      {error && (
        <div className="container mx-auto px-4 mt-8">
           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
             <AlertCircle size={20} />
             {error}
           </div>
        </div>
      )}

      <GeneratedItinerary 
        data={generatedPackage} 
        onBook={handleBookGenerated}
      />

      <FeaturedDestinations onSelectDestination={handleSelectDestination} />
      
      <PopularPackages onSelectPackage={handleSelectPackage} />
      
      <AboutOffers />
      
      <Testimonials />
      
      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        packageName={bookingPackageName} 
      />
    </div>
  );
};

export default App;