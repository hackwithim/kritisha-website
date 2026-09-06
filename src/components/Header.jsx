import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronDown, 
  Sparkles, 
  Compass, 
  Plane, 
  Car, 
  Users, 
  Navigation, 
  Eye, 
  CheckSquare, 
  TrendingUp, 
  FileText, 
  Building2,
  Menu
} from 'lucide-react';
import { getServices, getSiteSettings, useCmsLiveStore } from '../lib/cmsStore';
import KritishaLogo from './KritishaLogo';
import MobileNav from './MobileNav';

export default function Header({ onOpenEnquire }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const location = useLocation();
  const services = useCmsLiveStore(getServices);
  const settings = useCmsLiveStore(getSiteSettings);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 250);
    setDropdownTimeout(timeout);
  };

  const handleNavClick = (path) => {
    setIsServicesDropdownOpen(false);
    if (path.includes('#')) {
      const [route, hashStr] = path.split('#');
      if (location.pathname === route) {
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', path: '/projects' },
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'About', path: '/about' },
    { label: 'Insights', path: '/insights' },
    { label: 'Careers', path: '/careers' },
  ];

  const getServiceIcon = (iconName, className = "w-4 h-4") => {
    switch (iconName) {
      case 'Compass': return <Compass className={className} />;
      case 'Plane': return <Plane className={className} />;
      case 'Car': return <Car className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Navigation': return <Navigation className={className} />;
      case 'Eye': return <Eye className={className} />;
      case 'CheckSquare': return <CheckSquare className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'FileText': return <FileText className={className} />;
      default: return <Building2 className={className} />;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 lg:px-16 py-4 sm:py-6 bg-gradient-to-b from-[#0B2341]/90 via-[#0B2341]/40 to-transparent">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <div className="flex items-center gap-4 transition-all duration-300">
            <div className="relative h-16 sm:h-20 md:h-24 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/Infrastructure - 3 - Edited.png" alt="KRITISHA Infrastructure" className="h-full w-auto object-contain" />
            </div>
            <div className="flex flex-col pt-1">
              <span className="font-editorial text-lg sm:text-xl md:text-2xl font-bold tracking-[0.16em] text-white leading-none uppercase">
                KRITISHA
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs font-sans-ui tracking-[0.28em] text-slate-300 font-medium uppercase mt-1">
                INFRASTRUCTURE
              </span>
            </div>
          </div>
        </Link>

        {/* CENTER: LARGER SLENDER GLASS PILL NAV WITH SERVICES DROPDOWN (HIDDEN ON MOBILE) */}
        <nav className="hidden lg:flex relative items-center gap-6 sm:gap-10 lg:gap-14 px-8 sm:px-12 py-3 sm:py-4 rounded-full border border-white/25 bg-slate-900/35 backdrop-blur-md shadow-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));

            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="py-1"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`inline-flex items-center gap-1.5 relative text-xs sm:text-[15px] lg:text-[16px] font-sans-ui font-medium tracking-wider transition-all duration-200 ${
                      isActive
                        ? 'text-[#C5963D] font-bold drop-shadow-sm'
                        : 'text-slate-200 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C5963D] rounded-full" />
                    )}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isServicesDropdownOpen ? 'rotate-180 text-[#C5963D]' : 'text-slate-300'
                      }`}
                    />
                  </Link>

                  {/* SERVICES DROPDOWN MENU - EXACT MATCH TO NAVBAR WIDTH & GLASS STYLING */}
                  {isServicesDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 pt-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-[#0B2341]/95 backdrop-blur-2xl border border-white/30 rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 text-white space-y-4">
                        {/* Header bar */}
                        <div className="flex items-center justify-between border-b border-white/15 pb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#C5963D]" />
                            <span className="text-xs font-bold tracking-[0.2em] text-[#C5963D] uppercase font-sans-ui">
                              OUR INFRASTRUCTURE SERVICES
                            </span>
                          </div>
                          <Link
                            to="/services"
                            onClick={() => handleNavClick('/services')}
                            className="text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-1 transition-colors group/all cursor-pointer"
                          >
                            <span>View All Services</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C5963D] group-hover/all:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Grid of 6 Featured Services - Prominent Visible Titles Only */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {services.slice(0, 6).map((srv) => (
                            <Link
                              key={srv.id}
                              to={`/services#${srv.slug}`}
                              onClick={() => handleNavClick(`/services#${srv.slug}`)}
                              className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-[#C5963D] text-white hover:text-[#0B2341] border border-white/15 hover:border-[#C5963D] transition-all duration-200 group/item cursor-pointer shadow-sm"
                            >
                              <div className="w-9.5 h-9.5 rounded-xl bg-[#0B2341] text-[#C5963D] group-hover/item:bg-[#0B2341] group-hover/item:text-[#C5963D] border border-white/20 flex items-center justify-center shrink-0 transition-all shadow-md">
                                {getServiceIcon(srv.icon_name, "w-4.5 h-4.5")}
                              </div>
                              <span className="font-editorial text-xs sm:text-sm lg:text-[14.5px] font-bold tracking-wide leading-snug min-w-0">
                                {srv.title}
                              </span>
                            </Link>
                          ))}
                        </div>

                        {/* Bottom Footer Callout Strip */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-sans-ui text-slate-300">
                          <span className="font-light truncate pr-2">Need custom toll plaza operations or turnkey highway solutions?</span>
                          <Link
                            to="/services"
                            onClick={() => handleNavClick('/services')}
                            className="font-semibold text-[#C5963D] hover:text-white transition-colors flex items-center gap-1 shrink-0"
                          >
                            <span>Explore Capabilities</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`relative text-xs sm:text-[15px] lg:text-[16px] font-sans-ui font-medium tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[#C5963D] font-bold drop-shadow-sm'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C5963D] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: ENQUIRE NOW BUTTON & MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={onOpenEnquire}
            className="inline-flex items-center gap-2 sm:gap-3 bg-white hover:bg-slate-100 text-[#0B2341] font-sans-ui text-xs sm:text-[15px] font-semibold px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-full transition-all shadow-lg cursor-pointer border border-white/30 hover:scale-102"
          >
            <span>Enquire Now</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
          </button>

          {/* HAMBURGER TOGGLE FOR MOBILE (LG:HIDDEN) */}
          <button
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Open Mobile Menu"
            className="lg:hidden p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE NAV DRAWER */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenEnquire={onOpenEnquire}
      />
    </header>
  );
}
