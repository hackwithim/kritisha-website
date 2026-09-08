import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Building2, 
  MapPin, Play, Activity, FileText, Cpu, Truck, BarChart3, Shield
} from 'lucide-react';
import { getProjects, useCmsLiveStore } from '../lib/cmsStore';
import TollPlazasDirectory from '../components/TollPlazasDirectory';
import SEO from '../components/SEO';

export default function WorkPage({ onOpenEnquire, onOpenVideo }) {




  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      <SEO 
        title="Our Work & Projects"
        description="Explore KRITISHA's portfolio of landmark sea bridges, high-speed expressways, airport transit hubs, and automated toll plazas across India."
      />
      {/* ============================================================ */}
      {/* 01 HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_work.jpg"
            alt="KRITISHA Work Portfolio Sea Bridge"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="max-w-3xl space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
                01. OUR WORK — PORTFOLIO
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              Infrastructure that <br />
              <span className="text-[#C5963D] italic font-normal">moves India forward.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans-ui text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm max-w-2xl">
              Explore KRITISHA’s portfolio of landmark sea bridges, high-speed expressways, airport transit hubs, automated toll plazas, and strategic engineering consultancy assets across India.
            </p>

            {/* Quick Metrics Badge Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-sans-ui text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5963D]" />
                <span className="text-white font-semibold">Nationwide</span> Toll Plazas Managed
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">PAN India</span> Presence
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white font-semibold">Decades of</span> Operational Leadership
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 TOLL PLAZAS & PROJECTS DIRECTORY TABLE (MOVED TO TOP) */}
      {/* ============================================================ */}
      <section id="directory" className="scroll-mt-28 bg-white text-[#0B2341] py-12 sm:py-16 px-4 sm:px-8 lg:px-10 border-b border-slate-200">
        <div id="projects-table" className="max-w-[1700px] mx-auto w-full">
          <TollPlazasDirectory dark={false} title="National Toll Plaza & Infrastructure Projects Directory" />
        </div>
      </section>



      {/* ============================================================ */}
      {/* 03 FINAL CTA */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-t border-white/10 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              03. GET IN TOUCH
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Have an infrastructure challenge?
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Partner with KRITISHA for turnkey toll plaza operations, airport ground transport management, and strategic infrastructure consultancy.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquire()}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans-ui font-medium text-slate-200 hover:text-white border border-white/20 hover:border-[#C5963D] px-7 py-3.5 rounded-full transition-all"
            >
              <span>Contact Project Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
