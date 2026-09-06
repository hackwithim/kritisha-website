import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { getSiteSettings, useCmsLiveStore } from '../lib/cmsStore';
import KritishaLogo from './KritishaLogo';

export default function Footer({ onOpenEnquire = () => {} }) {
  const settings = useCmsLiveStore(getSiteSettings);

  return (
    <footer className="relative bg-[#07192F] text-slate-300 pt-16 pb-8 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/10">
      {/* Background Highway Sunset Silhouette (Right Side Overlay) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/images/hero_bridge.jpg"
          alt="Infrastructure Background"
          className="w-full h-full object-cover object-right opacity-15 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07192F] via-[#07192F]/90 to-[#07192F]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07192F] via-transparent to-[#07192F]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto space-y-16">
        
        {/* TOP MAIN GRID: LOGO BLOCK, 3 NAV COLUMNS & GET IN TOUCH CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* 1. LOGO & BRAND DESCRIPTION BLOCK (COL 1 - 4) */}
          <div className="lg:col-span-4 space-y-5 pr-0 lg:pr-6">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3.5">
                <div className="h-14 sm:h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img src="/Infrastructure - 3 - Edited.png" alt="KRITISHA Infrastructure" className="h-full w-auto object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-editorial text-2xl font-bold tracking-wider text-white group-hover:text-[#C5963D] transition-colors">KRITISHA</span>
                  <span className="text-[11px] font-sans-ui tracking-[0.28em] text-[#C5963D] uppercase font-medium">INFRASTRUCTURE</span>
                </div>
              </div>
            </Link>

            <div className="w-12 h-[2px] bg-[#C5963D]" />

            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed font-light">
              Building a smarter, more connected tomorrow through infrastructure that creates lasting value.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a href="javascript:void(0)" aria-label="LinkedIn" className="w-9 h-9 rounded-full border border-white/20 text-slate-300 flex items-center justify-center transition-all bg-white/5 opacity-50 cursor-default">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
              </a>
              <a href="javascript:void(0)" aria-label="YouTube" className="w-9 h-9 rounded-full border border-white/20 text-slate-300 flex items-center justify-center transition-all bg-white/5 opacity-50 cursor-default">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="javascript:void(0)" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/20 text-slate-300 flex items-center justify-center transition-all bg-white/5 opacity-50 cursor-default">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="javascript:void(0)" aria-label="X Twitter" className="w-9 h-9 rounded-full border border-white/20 text-slate-300 flex items-center justify-center transition-all bg-white/5 opacity-50 cursor-default">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>

            {/* Bottom Curved Line Label */}
            <div className="pt-4 flex items-center gap-3 text-[10px] sm:text-[11px] font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
              <span>INFRASTRUCTURE</span>
              <span>/</span>
              <span>PEOPLE</span>
              <span>/</span>
              <span>PROGRESS</span>
            </div>
          </div>

          {/* 2. COMPANY COLUMN (COL 5 - 6) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs uppercase font-bold text-[#C5963D] tracking-[0.2em] font-sans-ui">COMPANY</h4>
              <div className="w-6 h-[1.5px] bg-[#C5963D] mt-1.5 mb-4" />
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-sans-ui text-slate-300">
              <li><Link to="/about" className="hover:text-[#C5963D] transition-colors">About Us</Link></li>
              <li><Link to="/about#leadership" className="hover:text-[#C5963D] transition-colors">Leadership Team</Link></li>
              <li><Link to="/projects" className="hover:text-[#C5963D] transition-colors">Our Projects</Link></li>
              <li><Link to="/careers" className="hover:text-[#C5963D] transition-colors">Careers</Link></li>
              <li><Link to="/insights" className="hover:text-[#C5963D] transition-colors">News & Insights</Link></li>
              <li><Link to="/contact" className="hover:text-[#C5963D] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. SERVICES COLUMN (COL 7 - 8) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs uppercase font-bold text-[#C5963D] tracking-[0.2em] font-sans-ui">SERVICES</h4>
              <div className="w-6 h-[1.5px] bg-[#C5963D] mt-1.5 mb-4" />
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-sans-ui text-slate-300">
              <li><Link to="/services#toll-plaza-operations" className="hover:text-[#C5963D] transition-colors">Road Infrastructure</Link></li>
              <li><Link to="/services#airport-operations" className="hover:text-[#C5963D] transition-colors">Urban Development</Link></li>
              <li><Link to="/services#airport-parking" className="hover:text-[#C5963D] transition-colors">Industrial Infrastructure</Link></li>
              <li><Link to="/services#consultancy-services" className="hover:text-[#C5963D] transition-colors">Advisory & Consulting</Link></li>
              <li><Link to="/services#manpower-solutions" className="hover:text-[#C5963D] transition-colors">Sustainable Solutions</Link></li>
            </ul>
          </div>

          {/* 4. RESOURCES COLUMN (COL 9 - 10) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h4 className="text-xs uppercase font-bold text-[#C5963D] tracking-[0.2em] font-sans-ui">RESOURCES</h4>
              <div className="w-6 h-[1.5px] bg-[#C5963D] mt-1.5 mb-4" />
            </div>
            <ul className="space-y-3 text-xs sm:text-sm font-sans-ui text-slate-300">
              <li><Link to="/insights" className="hover:text-[#C5963D] transition-colors">Brochures & Downloads</Link></li>
              <li><Link to="/projects" className="hover:text-[#C5963D] transition-colors">Case Studies</Link></li>
              <li><Link to="/insights" className="hover:text-[#C5963D] transition-colors">Media Coverage</Link></li>
              <li><Link to="/contact" className="hover:text-[#C5963D] transition-colors">FAQs</Link></li>
              <li><Link to="/projects" className="hover:text-[#C5963D] transition-colors">Tender Updates</Link></li>
            </ul>
          </div>

          {/* 5. GET IN TOUCH GLASS CARD BLOCK (COL 11 - 12) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0B2545]/70 backdrop-blur-xl border border-white/15 p-6 rounded-3xl space-y-4 shadow-2xl relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C5963D]" />
                <span className="text-xs font-bold text-[#C5963D] tracking-[0.2em] uppercase font-sans-ui">
                  GET IN TOUCH
                </span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-xs text-slate-300 font-sans-ui leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#C5963D] shrink-0 mt-0.5" />
                <span>
                  Office No. 319, Commodity Exchange Bldg, Plot No. 2,3,4, Sector 19, Vashi, Navi Mumbai – 400705, Maharashtra, India
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-sans-ui">
                <Phone className="w-3.5 h-3.5 text-[#C5963D] shrink-0" />
                <a href="tel:+917678050277" className="hover:text-[#C5963D] transition-colors font-mono">
                  +91 7678050277
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-sans-ui">
                <Mail className="w-3.5 h-3.5 text-[#C5963D] shrink-0" />
                <a href="mailto:info@kritishainfra.com" className="hover:text-[#C5963D] transition-colors">
                  info@kritishainfra.com
                </a>
              </div>

              {/* Enquire Now CTA Pill Button */}
              <button
                onClick={onOpenEnquire}
                className="w-full mt-2 py-3 px-5 rounded-full border border-[#C5963D]/70 bg-[#0B2341] hover:bg-[#C5963D] text-[#C5963D] hover:text-[#0B2341] font-sans-ui text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR WITH THIN GOLD DIVIDER */}
        <div className="border-t border-[#C5963D]/30 pt-6 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs font-sans-ui text-slate-400">
          
          {/* LEFT: COPYRIGHT STATEMENT */}
          <p>© {new Date().getFullYear()} KRITISHA Infrastructure. All rights reserved.</p>

          {/* CENTER: WEBWORK STUDIOS DESIGN & DEV BADGE */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2545]/90 border border-[#C5963D]/40 shadow-lg backdrop-blur-md my-1 lg:my-0">
            <span className="text-[11px] font-sans-ui text-slate-300 font-light tracking-wide">
              Designed &amp; Developed by
            </span>
            <a
              href="https://webworksstudios.com/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#C5963D] hover:text-white tracking-wider font-sans-ui transition-all flex items-center gap-1 group"
            >
              <span className="underline underline-offset-3 decoration-[#C5963D]/60 group-hover:decoration-white">WebWork Studios</span>
              <span className="text-[#C5963D] group-hover:translate-x-0.5 transition-transform text-[11px]">↗</span>
            </a>
          </div>

          {/* RIGHT: POLICIES & TAGLINE */}
          <div className="flex items-center gap-4 sm:gap-6 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-[#C5963D] transition-colors">Privacy Policy</Link>
            <span className="text-slate-600">|</span>
            <Link to="/terms-of-use" className="hover:text-[#C5963D] transition-colors">Terms of Use</Link>
            <span className="text-slate-600">|</span>
            <Link to="/sitemap" className="hover:text-[#C5963D] transition-colors">Sitemap</Link>
            
            <span className="hidden xl:inline-block text-[#C5963D] font-mono tracking-widest pl-2">
              — INDIA FOR TOMORROW
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
