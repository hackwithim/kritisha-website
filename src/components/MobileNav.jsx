import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, ChevronDown, Phone, Mail, MapPin, Sparkles } from 'lucide-react';
import KritishaLogo from './KritishaLogo';

export default function MobileNav({ isOpen, onClose, onOpenEnquire }) {
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);

  if (!isOpen) return null;

  const handleNavClick = (path) => {
    onClose();
    if (path.includes('#')) {
      const [route, hashStr] = path.split('#');
      if (window.location.pathname === route) {
        const el = document.getElementById(hashStr);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  const servicesList = [
    { title: 'Toll Plaza Operations', path: '/services#toll-plaza-operations' },
    { title: 'Airport Operations', path: '/services#airport-operations' },
    { title: 'Airport Parking', path: '/services#airport-parking' },
    { title: 'Manpower Solutions', path: '/services#manpower-solutions' },
    { title: 'Ropeway (Trolley) Operations', path: '/services#ropeway-trolley-operations' },
    { title: 'Consultancy Services', path: '/services#consultancy-services' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B2341]/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#0B2341] border-l border-white/10 h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto z-10">
        {/* Top bar */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <KritishaLogo variant="light" size="sm" />
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links (EXACT MATCH TO DESKTOP NAVBAR) */}
          <nav className="mt-6 flex flex-col gap-2">
            {/* 1. Projects */}
            <Link
              to="/projects"
              onClick={() => handleNavClick('/projects')}
              className="group flex items-center justify-between text-lg sm:text-xl font-editorial text-slate-200 hover:text-[#C5963D] transition-colors py-2.5 border-b border-white/5"
            >
              <span>Projects</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5963D]" />
            </Link>

            {/* 2. Services (Expandable Accordion Dropdown) */}
            <div className="border-b border-white/5 py-2.5 space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  to="/services"
                  onClick={() => handleNavClick('/services')}
                  className="text-lg sm:text-xl font-editorial text-slate-200 hover:text-[#C5963D] transition-colors"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className="p-1 text-slate-300 hover:text-[#C5963D] transition-colors cursor-pointer"
                >
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isServicesExpanded ? 'rotate-180 text-[#C5963D]' : ''}`} />
                </button>
              </div>

              {/* Sub-services list when expanded */}
              {isServicesExpanded && (
                <div className="pl-4 pt-2 space-y-2.5 border-l-2 border-[#C5963D]/40 my-2">
                  {servicesList.map((srv, idx) => (
                    <Link
                      key={idx}
                      to={srv.path}
                      onClick={() => handleNavClick(srv.path)}
                      className="block text-xs sm:text-sm font-sans-ui text-slate-300 hover:text-[#C5963D] font-medium transition-colors"
                    >
                      {srv.title}
                    </Link>
                  ))}
                  <Link
                    to="/services"
                    onClick={() => handleNavClick('/services')}
                    className="inline-flex items-center gap-1.5 text-xs font-sans-ui font-semibold text-[#C5963D] hover:text-white pt-1 transition-colors"
                  >
                    <span>View All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* 3. About */}
            <Link
              to="/about"
              onClick={() => handleNavClick('/about')}
              className="group flex items-center justify-between text-lg sm:text-xl font-editorial text-slate-200 hover:text-[#C5963D] transition-colors py-2.5 border-b border-white/5"
            >
              <span>About</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5963D]" />
            </Link>

            {/* 4. Insights */}
            <Link
              to="/insights"
              onClick={() => handleNavClick('/insights')}
              className="group flex items-center justify-between text-lg sm:text-xl font-editorial text-slate-200 hover:text-[#C5963D] transition-colors py-2.5 border-b border-white/5"
            >
              <span>Insights</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5963D]" />
            </Link>

            {/* 5. Careers */}
            <Link
              to="/careers"
              onClick={() => handleNavClick('/careers')}
              className="group flex items-center justify-between text-lg sm:text-xl font-editorial text-slate-200 hover:text-[#C5963D] transition-colors py-2.5 border-b border-white/5"
            >
              <span>Careers</span>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#C5963D]" />
            </Link>

            {/* 6. Contact Us */}
            <Link
              to="/contact"
              onClick={() => handleNavClick('/contact')}
              className="group flex items-center justify-between text-lg sm:text-xl font-editorial text-[#C5963D] hover:text-white transition-colors py-2.5 border-b border-white/5 font-bold"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-[#C5963D]" />
            </Link>
          </nav>
        </div>

        {/* Bottom Info & Enquire CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
          <button
            onClick={() => {
              onClose();
              onOpenEnquire();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#C5963D] hover:bg-[#DDBB73] text-[#0B2341] font-semibold py-3 px-6 rounded-full transition-colors cursor-pointer shadow-lg"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" />
              <span>Office No. 319, Commodity Exchange Bldg, Sector 19, Vashi, Navi Mumbai, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5963D] shrink-0" />
              <span>+91 7678050277</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C5963D] shrink-0" />
              <span>info@kritishainfra.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
