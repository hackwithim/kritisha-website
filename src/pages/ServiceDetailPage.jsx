import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  Shield, 
  CheckCircle2, 
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
  Sparkles,
  MapPin,
  Layers,
  Award
} from 'lucide-react';
import { getServices, getProjects, useCmsLiveStore } from '../lib/cmsStore';
import TollPlazasDirectory from '../components/TollPlazasDirectory';
import SEO from '../components/SEO';

export default function ServiceDetailPage({ onOpenEnquire }) {
  const { slug } = useParams();
  const services = useCmsLiveStore(getServices);
  const projects = useCmsLiveStore(getProjects);

  const service = services.find(s => s.slug === slug) || services[0] || {};
  const relatedProjects = projects.slice(0, 2);

  const getServiceIcon = (iconName, className = "w-6 h-6 text-[#C5963D]") => {
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

  const deliveryPillars = [
    {
      title: 'Turnkey Operations & SLA Rigor',
      desc: '24/7 site supervision, automated cash/FASTag shift reconciliation, and 99.98% uptime SLA enforcement.'
    },
    {
      title: 'Integrated Telemetry & ITS',
      desc: 'High-speed ANPR camera network, RFID readers, dynamic WIM scales, and central cloud telemetry command.'
    },
    {
      title: 'Vigilance & Revenue Assurance',
      desc: 'Unscheduled field audits, video analytics verification, and zero-leakage toll plaza management.'
    },
    {
      title: 'ISO Certified Field Workforce',
      desc: 'Deployment of background-verified collectors, site engineers, and safety marshals across India.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white pt-16 sm:pt-20">
      <SEO 
        title={service.title}
        description={service.description}
      />
      
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[60vh] flex items-center pt-32 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image_url || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=90'}
            alt={service.title}
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/95 via-[#0B2341]/80 to-[#0B2341]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans-ui">
            <Link to="/" className="hover:text-[#C5963D] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/services" className="hover:text-[#C5963D] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[#C5963D] font-medium truncate max-w-[200px] sm:max-w-none">{service.title}</span>
          </div>

          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 bg-[#C5963D]/20 border border-[#C5963D]/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C5963D] animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-[#DDBB73] uppercase font-sans-ui">
              {service.category || 'Infrastructure Service'}
            </span>
          </div>

          {/* Title & Short Description */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12]">
              {service.title}
            </h1>
            <p className="font-sans-ui text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {service.short_description}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenEnquire(service.title)}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#DDBB73] text-[#0B2341] font-sans-ui text-sm font-semibold px-7 py-3.5 rounded-full transition-all shadow-xl cursor-pointer hover:scale-102"
            >
              <span>Enquire About This Service</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-sans-ui text-sm font-medium px-6 py-3.5 rounded-full border border-white/20 transition-all backdrop-blur-md"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW & FULL DESCRIPTION */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.2em] text-[#C5963D] uppercase font-sans-ui">
                SERVICE OVERVIEW & CAPABILITIES
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-normal text-white">
                Technical Execution & Industry Scope
              </h2>
            </div>

            <div className="prose prose-invert max-w-none text-slate-300 font-sans-ui text-base leading-relaxed space-y-4 font-light">
              <p>{service.full_description || service.short_description}</p>
              <p>
                Backed by extensive field operations and numerous operational infrastructure contracts, 
                KRITISHA Infrastructure delivers zero-leakage, SLA-compliant, and technology-driven asset management solutions 
                for NHAI, Ministry of Road Transport and Highways (MoRTH), State Public Works Departments, and private concessionaires.
              </p>
            </div>

            {/* Delivery Pillars Grid */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliveryPillars.map((pillar, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 space-y-2 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#C5963D]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <h4 className="font-sans-ui text-sm font-semibold text-white">{pillar.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-slate-900/90 to-[#0B2341] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5963D]/10 rounded-full blur-3xl" />
              
              <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#C5963D]/20 border border-[#C5963D]/40 flex items-center justify-center shrink-0">
                  {getServiceIcon(service.icon_name)}
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-white">{service.title}</h3>
                  <span className="text-xs text-[#DDBB73] font-sans-ui font-medium">{service.category}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs font-sans-ui">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">SLA Compliance Uptime</span>
                  <span className="font-bold text-white">99.98% Guaranteed</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Quality Standards</span>
                  <span className="font-bold text-white">ISO 9001 / 14001 / 45001</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-slate-400">Deployment Scale</span>
                  <span className="font-bold text-white">Nationwide Plazas & Projects</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400">Authority Concessions</span>
                  <span className="font-bold text-white">NHAI, PWD, IRCON, NHIT</span>
                </div>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <div className="text-xs font-bold text-[#C5963D] uppercase tracking-wider font-sans-ui">Key Capabilities & Features</div>
                  <div className="space-y-2">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200 font-medium">
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => onOpenEnquire(service.title)}
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-[#0B2341] font-sans-ui text-xs sm:text-sm font-semibold py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <span>Request Custom Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* TOLL PLAZAS DIRECTORY */}
      <section className="bg-white text-[#0B2341] py-16 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <TollPlazasDirectory dark={false} title="National Toll Plaza Operations Directory" />
        </div>
      </section>

      {/* 3. RELATED LANDMARK PROJECTS */}
      <section className="py-20 px-6 sm:px-12 lg:px-16 max-w-[1440px] mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#C5963D] uppercase font-sans-ui">PROVEN TRACK RECORD</span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-normal text-white mt-1">
              Projects Executed Under This Service
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5963D] hover:text-white transition-colors font-sans-ui"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedProjects.map((proj) => (
            <Link
              key={proj.id}
              to={`/projects/${proj.slug}`}
              className="bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-[#C5963D]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={proj.featured_image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-[#0B2341]/90 border border-[#C5963D]/40 text-[#DDBB73] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                  {proj.status}
                </span>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#C5963D] font-sans-ui font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-white group-hover:text-[#DDBB73] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-400 font-sans-ui line-clamp-2 font-light leading-relaxed">
                  {proj.short_description}
                </p>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 text-xs text-slate-300 font-sans-ui">
                <span>{proj.scope}</span>
                <span className="text-[#C5963D] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Project <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
