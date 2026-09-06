import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX, so it doesn't just abruptly appear on first load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    // In a real application, you might want to handle this differently,
    // like disabling non-essential tracking cookies.
    // For now, we'll just hide the banner and set a flag.
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-[#0B2341]/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-500">
          
          <div className="flex-1 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C5963D]/20 flex flex-shrink-0 items-center justify-center mt-1">
              <Cookie className="w-5 h-5 text-[#C5963D]" />
            </div>
            <div>
              <h3 className="font-editorial text-lg text-white mb-2">We value your privacy</h3>
              <p className="text-sm font-sans-ui text-slate-300 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept", you consent to our use of cookies. 
                Read more in our <Link to="/privacy" className="text-[#C5963D] hover:text-white transition-colors underline underline-offset-2">Privacy Policy</Link>.
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-auto items-center gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-full border border-white/20 text-white font-sans-ui text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 md:flex-none px-6 py-2.5 rounded-full bg-[#C5963D] text-[#0B2341] font-sans-ui text-sm font-bold hover:bg-[#DDBB73] transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-2.5 rounded-full hover:bg-white/10 text-slate-300 transition-colors hidden md:block ml-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
