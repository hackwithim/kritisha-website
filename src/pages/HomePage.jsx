import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Compass, Building2, Leaf, Users, BarChart2, Plane, Car, Navigation, Eye, CheckSquare, TrendingUp, FileText } from 'lucide-react';
import { getHomepageStats, getCapabilities, getProjects, getServices, useCmsLiveStore } from '../lib/cmsStore';
import SEO from '../components/SEO';

export default function HomePage({ onOpenEnquire, onOpenVideo }) {
  const stats = useCmsLiveStore(getHomepageStats);
  const capabilities = useCmsLiveStore(getCapabilities);
  const projects = useCmsLiveStore(getProjects);
  const servicesList = useCmsLiveStore(getServices);
  const featuredProject = projects[0] || {};

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const currentProject = projects[activeProjectIndex] || featuredProject;

  const capIcons = {
    "Transportation": (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19L12 4L20 19" />
        <path d="M12 4V19" strokeDasharray="2 2" />
      </svg>
    ),
    "Urban Infrastructure": (
      <Building2 className="w-6 h-6 text-white" />
    ),
    "Asset Management": (
      <Leaf className="w-6 h-6 text-white" />
    ),
    "Advisory & Consultancy": (
      <Users className="w-6 h-6 text-white" />
    )
  };

  const serviceIcons = {
    "Toll Plaza Operations": (
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19L12 4L20 19" />
        <path d="M12 4V19" strokeDasharray="2 2" />
      </svg>
    ),
    "Airport Operations": <Plane className="w-5 h-5 text-white" />,
    "Airport Parking": <Car className="w-5 h-5 text-white" />,
    "Manpower Solutions": <Users className="w-5 h-5 text-white" />,
    "Ropeway / Trolley Operations": <Navigation className="w-5 h-5 text-white" />,
    "Surveillance & Storage": <Eye className="w-5 h-5 text-white" />,
    "Project Audit & Inspection": <CheckSquare className="w-5 h-5 text-white" />,
    "Consultancy Services": <TrendingUp className="w-5 h-5 text-white" />,
    "Detailed Audit Reporting": <FileText className="w-5 h-5 text-white" />
  };

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      <SEO 
        title="Home"
        description="Integrated infrastructure, engineering, operations and consultancy solutions for a more connected, sustainable and prosperous India."
      />
      {/* ============================================================ */}
      {/* 01. HERO SECTION (ENLARGED TYPOGRAPHY & VISUALS) */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_bridge.jpg"
            alt="KRITISHA Hero Elevated Highway Bridge"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          {/* Vignette Gradients for High Image Visibility & Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        {/* HERO CONTENT GRID */}
        <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT SIDE CONTENT */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-7 pr-0 lg:pr-8">
            {/* Eyebrow: 2 Stacked Lines + Gold Bar */}
            <div className="inline-flex items-center gap-4">
              <div className="flex flex-col text-[10px] sm:text-xs font-sans-ui tracking-[0.26em] text-slate-200 font-semibold uppercase leading-snug">
                <span>INFRASTRUCTURE</span>
                <span>FOR A BRIGHTER INDIA</span>
              </div>
              <span className="w-12 h-[2px] bg-[#C5963D]" />
            </div>

            {/* Main Editorial Title */}
            <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.05] pt-1">
              Building <br />
              <span className="text-[#C5963D] font-normal">What's Next.</span>
            </h1>

            {/* Description */}
            <p className="font-sans-ui text-slate-200 text-sm sm:text-base max-w-xl leading-relaxed font-light drop-shadow-sm pt-2">
              Integrated infrastructure, engineering, operations and consultancy solutions for a more connected, sustainable and prosperous India.
            </p>

            {/* Hero CTA Button with Large Gold Circular Arrow */}
            <div className="pt-4">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-4 bg-transparent text-white hover:text-[#C5963D] transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-[#C5963D] text-[#0B2341] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                  <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="font-sans-ui font-bold text-base sm:text-lg lg:text-xl tracking-wide">Explore Our Work</span>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE VERTICAL LABELS TREATMENT */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-center pr-4">
            <div className="flex flex-col items-center gap-7 text-xs sm:text-sm tracking-[0.3em] font-sans-ui font-medium text-slate-200">
              <span className="hover:text-[#C5963D] transition-colors cursor-default uppercase">PEOPLE</span>
              <div className="w-[1.5px] h-10 bg-white/30" />
              <span className="hover:text-[#C5963D] transition-colors cursor-default uppercase">PLACES</span>
              <div className="w-[1.5px] h-10 bg-white/30" />
              <span className="hover:text-[#C5963D] transition-colors cursor-default uppercase">POSSIBILITIES</span>
            </div>
          </div>
        </div>

        {/* HERO BOTTOM BAR */}
        <div className="absolute bottom-6 left-6 sm:left-12 lg:left-16 right-6 sm:right-12 lg:right-16 z-10 max-w-[1440px] mx-auto flex items-end justify-between pointer-events-none">
          {/* Bottom Left: Scroll Indicator */}
          <div className="hidden sm:flex flex-col items-start gap-2 text-xs sm:text-sm font-sans-ui tracking-widest text-slate-200">
            <span className="uppercase text-xs font-semibold tracking-[0.25em]">SCROLL</span>
            <div className="w-[1.5px] h-8 bg-white/40" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02. IMPACT STRIP (WHITE BACKGROUND WITH 4 STATS + STATEMENT) */}
      {/* ============================================================ */}
      {/* 
      <section className="bg-white text-[#0B2341] py-8 sm:py-12 px-6 sm:px-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center divide-x-0 md:divide-x divide-slate-200">
          
          {(stats && stats.length > 0 ? stats : [
            { stat_value: "150+", stat_label: "Toll Plazas Managed" },
            { stat_value: "40+", stat_label: "Years of Excellence" },
            { stat_value: "16+", stat_label: "States PAN India" },
            { stat_value: "700+", stat_label: "Workforce Deployed" }
          ]).map((st, i) => {
            const isLong = (st.stat_value || '').length > 5;
            return (
              <div key={st.id || i} className="flex flex-col justify-center px-3 sm:px-6 md:first:pl-0">
                <div className={`font-editorial font-normal text-[#0B2341] tracking-tight whitespace-nowrap leading-none ${
                  isLong ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl lg:text-[48px]'
                }`}>
                  {st.stat_value}
                </div>
                <div className="font-sans-ui text-xs sm:text-sm text-slate-600 font-semibold mt-2 leading-tight">
                  {st.stat_label}
                </div>
              </div>
            );
          })}

          <div className="col-span-2 md:col-span-1 flex items-center gap-3 pl-4 border-l-0 md:border-l border-slate-200">
            <div className="w-[3px] h-10 bg-[#C5963D] shrink-0" />
            <div className="font-sans-ui text-[11px] sm:text-xs font-bold text-slate-800 tracking-[0.2em] uppercase leading-snug">
              BUILDING <br /> A BRIGHTER <br /> INDIA
            </div>
          </div>

        </div>
      </section>
      */}

      {/* ============================================================ */}
      {/* 03. CAPABILITIES SECTION */}
      {/* ============================================================ */}
      <section className="bg-[#F5F7F9] text-[#0B2341] py-18 sm:py-28 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs sm:text-sm font-sans-ui tracking-[0.22em] text-[#C5963D] font-bold uppercase">
                  OUR CAPABILITIES
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0B2341] leading-tight">
                End-to-end solutions <br />
                for a complex world.
              </h2>
            </div>

            <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="font-sans-ui text-sm sm:text-base lg:text-lg text-slate-600 max-w-lg font-light leading-relaxed">
                From concept to completion, we bring together expertise, innovation and execution to deliver infrastructure that creates lasting impact.
              </p>

              <div className="flex items-center gap-4 shrink-0">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-sans-ui font-bold text-[#0B2341] hover:text-[#C5963D] transition-colors"
                >
                  <span>Explore All Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#C5963D] flex items-center justify-center text-slate-600 hover:text-[#C5963D] transition-colors cursor-pointer">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-slate-300 hover:border-[#C5963D] flex items-center justify-center text-slate-600 hover:text-[#C5963D] transition-colors cursor-pointer">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Capability Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.id}
                className="group relative bg-[#0B2341] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[400px] sm:h-[440px] border border-white/10"
              >
                {/* Image Background */}
                <img
                  src={cap.image_url}
                  alt={cap.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-[#0B2341]/50 to-transparent" />

                {/* Card Header Icon Badge */}
                <div className="relative z-10 p-7 flex justify-between items-start">
                  <div className="w-11 h-11 rounded-full bg-[#0B2341]/85 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    {capIcons[cap.title] || <Compass className="w-5 h-5 text-white" />}
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="relative z-10 p-7 space-y-2.5">
                  <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-snug">
                    {cap.title}
                  </h3>
                  <p className="font-sans-ui text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed font-light">
                    {cap.short_description}
                  </p>
                  
                  <div className="pt-2 flex justify-end">
                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-[#C5963D] border border-white/20 group-hover:border-[#C5963D] text-white group-hover:text-[#0B2341] flex items-center justify-center transition-all cursor-pointer">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. FEATURED PROJECT SECTION (TOP 3 PROJECTS SLIDESHOW) */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-18 sm:py-28 px-6 sm:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs sm:text-sm font-sans-ui tracking-[0.22em] text-white/90 font-semibold uppercase">
                  FEATURED PROJECT
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight min-h-[90px]">
                {currentProject.title}
              </h2>

              <p className="font-sans-ui text-slate-200 text-sm sm:text-base leading-relaxed font-light min-h-[80px]">
                {currentProject.short_description}
              </p>

              <div className="pt-2">
                <Link
                  to={`/projects/${currentProject.slug || 'haivargaon-pawasa-toll-plaza-nhai'}`}
                  className="inline-flex items-center gap-2.5 text-sm sm:text-base font-sans-ui font-bold text-white hover:text-[#C5963D] border-2 border-white/20 hover:border-[#C5963D] px-7 py-3 rounded-full transition-all"
                >
                  <span>View Project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Interactive Pagination Pills */}
              <div className="pt-4 flex items-center gap-4 text-sm font-mono text-slate-400 select-none">
                {[0, 1, 2].map((idx) => {
                  const isActive = activeProjectIndex === idx;
                  const numStr = `0${idx + 1}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveProjectIndex(idx)}
                      className={`flex items-center gap-2 cursor-pointer transition-all ${
                        isActive ? 'text-white font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <span>{numStr}</span>
                      {isActive && <div className="w-8 h-[2px] bg-[#C5963D] transition-all" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Center Column: Interactive Featured Image Card */}
            <div className="lg:col-span-5 relative group rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={currentProject.featured_image || '/images/hero_bridge.jpg'}
                alt={currentProject.title}
                className="w-full h-[320px] sm:h-[420px] object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341]/50 via-transparent to-transparent" />
              
              {/* Floating Arrow Button - Click to advance to next slide */}
              <button
                onClick={() => setActiveProjectIndex((prev) => (prev + 1) % Math.min(3, (projects && projects.length) || 3))}
                title="Next Slide"
                className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-[#0B2341]/85 hover:bg-[#C5963D] border border-white/20 text-white hover:text-[#0B2341] flex items-center justify-center transition-all cursor-pointer shadow-lg group-hover:scale-110"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Column: 3 Dynamic Metric Blocks */}
            <div className="lg:col-span-3 space-y-7 divide-y divide-white/10">
              <div className="pt-2">
                <div className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                  {currentProject.total_length || '137.9 km'}
                </div>
                <div className="text-xs sm:text-sm font-sans-ui text-slate-300 font-semibold mt-1">Total Length</div>
              </div>

              <div className="pt-7">
                <div className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                  {currentProject.lanes || '10 Lanes'}
                </div>
                <div className="text-xs sm:text-sm font-sans-ui text-slate-300 font-semibold mt-1">Access & Connectivity</div>
              </div>

              <div className="pt-7">
                <div className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white">
                  {currentProject.contract_value || '₹370 Cr'}
                </div>
                <div className="text-xs sm:text-sm font-sans-ui text-slate-300 font-semibold mt-1">Contract Value</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. A SUSTAINABLE TOMORROW */}
      {/* ============================================================ */}
      <section className="bg-white text-[#0B2341] py-18 sm:py-28 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-3">
                <span className="text-xs sm:text-sm font-sans-ui tracking-[0.22em] text-[#C5963D] font-bold uppercase">
                  A SUSTAINABLE TOMORROW
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-[#0B2341] leading-tight">
                More than <br />
                infrastructure. <br />
                <span className="text-[#C5963D] italic font-normal">A better tomorrow.</span>
              </h2>
            </div>

            {/* Center Column: 3 Value Pillars */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-[#F5F7F9] border border-slate-200 space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0B2341]">Greener Infrastructure</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Minimizing environmental impact through sustainable practices.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F7F9] border border-slate-200 space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0B2341]">Stronger Communities</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Creating opportunities and improving lives across regions.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F5F7F9] border border-slate-200 space-y-2.5">
                <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0B2341]">Long-term Value</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Building assets that drive inclusive and sustainable growth.
                </p>
              </div>
            </div>

            {/* Right Column: Image with Curved Arch Top Mask */}
            <div className="lg:col-span-3 relative flex justify-center">
              <div className="relative w-full max-w-[280px] aspect-[3/4] curved-arch-mask overflow-hidden shadow-2xl border-2 border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=85"
                  alt="Sustainable Valley Landscape"
                  className="w-full h-full object-cover"
                />
                
                {/* Top-Right Badge */}
                <div className="absolute top-4 right-4 bg-[#C5963D] text-[#0B2341] rounded-full p-3 shadow-md flex items-center justify-center">
                  <div className="text-[10px] font-sans-ui font-bold text-center leading-tight">
                    PEOPLE <br /> PLACES
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06. JOIN US TODAY SECTION */}
      {/* ============================================================ */}
      <section className="relative min-h-[35vh] sm:min-h-[380px] bg-[#0B2341] text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-16 border-t border-white/10 overflow-hidden flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341] via-[#102D52] to-[#0B2341] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5963D_1px,transparent_1px)] [background-size:24px_24px] opacity-10 z-0" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center Content */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="text-xs sm:text-sm font-sans-ui tracking-[0.24em] text-[#C5963D] font-bold uppercase">
                JOIN US TODAY
              </span>
              <span className="w-14 h-[1.5px] bg-[#C5963D]" />
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
              Build the future with us. <br />
              <span className="text-[#C5963D] italic font-normal">Shape India's infrastructure landscape.</span>
            </h2>

            <p className="font-sans-ui text-slate-200 text-sm sm:text-base md:text-xl max-w-2xl font-light leading-relaxed">
              We are constantly seeking visionary engineers, project managers, and operational specialists to lead high-impact infrastructure assets across the nation.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-sans-ui text-sm sm:text-base md:text-lg font-bold px-9 py-4 rounded-full transition-all shadow-xl hover:scale-105"
              >
                <span>Explore Careers & Openings</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </Link>

              <button
                onClick={onOpenEnquire}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-sans-ui font-semibold text-slate-200 hover:text-white border-2 border-white/20 hover:border-[#C5963D] px-8 py-3.5 rounded-full transition-all"
              >
                <span>Contact HR Department</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Stats */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 border-l-0 lg:border-l border-white/10 lg:pl-8 pt-4 lg:pt-0">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
              <div className="font-editorial text-3xl sm:text-4xl font-bold text-[#C5963D]">700+</div>
              <div className="font-sans-ui text-xs sm:text-sm text-slate-200 font-medium">Deployed Field Staff</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5">
              <div className="font-editorial text-3xl sm:text-4xl font-bold text-white">40+ Yrs</div>
              <div className="font-sans-ui text-xs sm:text-sm text-slate-200 font-medium">Industry Leadership</div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5 col-span-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white font-sans-ui">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Now Hiring Across Engineering & Operations</span>
              </div>
              <p className="text-xs text-slate-300 font-light pt-0.5">Competitive compensation, rapid growth, and work on landmark infrastructure assets.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 07. OUR SERVICES SECTION */}
      {/* ============================================================ */}
      <section className="bg-[#F8FAFC] text-[#0B2341] py-18 sm:py-28 pl-6 sm:pl-12 lg:pl-16 pr-0 border-t border-slate-200 overflow-hidden w-full">
        <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT & CENTER CONTENT */}
          <div className="xl:col-span-8 space-y-9 flex flex-col justify-between pr-6 xl:pr-8">
            
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-3">
                  <span className="text-xs sm:text-sm font-sans-ui tracking-[0.22em] text-[#0B2341] font-bold uppercase">
                    OUR SERVICES
                  </span>
                  <span className="w-14 h-[1.5px] bg-[#C5963D]" />
                </div>
                <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0B2341] leading-tight">
                  Solutions built <br />
                  <span className="text-[#C5963D] italic font-normal">for the real world.</span>
                </h2>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 max-w-md">
                <p className="font-sans-ui text-sm sm:text-base lg:text-lg text-slate-600 font-light leading-relaxed text-left md:text-right">
                  Delivering specialized infrastructure services that ensure efficiency, safety and long-term value across India's critical assets.
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-sans-ui text-sm sm:text-base font-bold px-7 py-3.5 rounded-full transition-all shadow-md hover:scale-105"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* 6 Service Cards Grid (2 rows x 3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicesList.slice(0, 6).map((srv) => (
                <Link
                  key={srv.id}
                  to={`/services#${srv.slug}`}
                  className="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#C5963D]/60 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Thumbnail Image + Icon Badge & Category Tag */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-xs">
                        <img
                          src={srv.image_url}
                          alt={srv.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-[#0B2341] text-[#C5963D] flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#C5963D] group-hover:text-[#0B2341] transition-all">
                          {serviceIcons[srv.title] || <Compass className="w-5 h-5" />}
                        </div>
                        <span className="text-[10px] font-sans-ui font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#0B2341] group-hover:bg-[#C5963D]/15 group-hover:text-[#C5963D] transition-colors uppercase tracking-wider">
                          {srv.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description Block - FULL WIDTH AVAILABLE */}
                    <div className="space-y-1.5 pt-1">
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-[#0B2341] leading-snug group-hover:text-[#C5963D] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="font-sans-ui text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed font-light">
                        {srv.short_description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action Row */}
                  <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between mt-3">
                    <span className="text-xs font-sans-ui font-semibold text-[#0B2341] group-hover:text-[#C5963D] transition-colors">
                      View Service Details
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#F5F7F9] group-hover:bg-[#C5963D] text-slate-600 group-hover:text-[#0B2341] flex items-center justify-center transition-all shadow-2xs group-hover:scale-105">
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: FLUSH TO RIGHT SCREEN EDGE CURVED ARCH BANNER */}
          <div className="hidden xl:flex xl:col-span-4 relative min-h-[620px] w-full rounded-l-[300px] lg:rounded-l-[360px] overflow-hidden shadow-2xl group mr-0">
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/images/hero_bridge.jpg"
                alt="Infrastructure Elevated Highway Sunset"
                className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-[#0B2341]/40 to-transparent" />
            </div>

            <div className="relative z-10 p-8 flex flex-col justify-between w-full h-full">
              <div className="flex flex-col items-end gap-4 text-xs sm:text-sm tracking-[0.32em] font-sans-ui font-medium text-slate-100 pt-4 pr-6">
                <span className="uppercase hover:text-[#C5963D] transition-colors cursor-default">PEOPLE</span>
                <span className="uppercase hover:text-[#C5963D] transition-colors cursor-default">PLACES</span>
                <span className="uppercase hover:text-[#C5963D] transition-colors cursor-default">POSSIBILITIES</span>
              </div>

              {/* HIGHLY VISIBLE & READABLE FEATURED BADGE */}
              <div className="mb-6 ml-8 max-w-xs bg-[#0B2341]/95 backdrop-blur-xl border border-[#C5963D]/60 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-1.5 transform hover:scale-102 transition-transform">
                <div className="w-8 h-[2px] bg-[#C5963D] mb-2" />
                <p className="font-editorial text-xl sm:text-2xl font-bold text-white leading-snug tracking-wide">
                  Connecting today <br />
                  <span className="text-[#C5963D] italic font-normal">for a stronger tomorrow.</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 08. CALL TO ACTION BANNER */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] py-18 sm:py-24 px-6 sm:px-12 border-t border-white/10 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight">
            Let's build what's next.
          </h2>
          <p className="font-sans-ui text-slate-200 text-sm sm:text-base lg:text-xl max-w-xl mx-auto font-light leading-relaxed">
            Connect with us to explore how KRITISHA can support your infrastructure vision.
          </p>
          <div className="pt-3">
            <button
              onClick={onOpenEnquire}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#DDBB73] text-[#0B2341] font-bold px-9 py-4 rounded-full transition-all text-base sm:text-lg shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
