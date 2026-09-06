import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Compass, Plane, Car, Users, Navigation, Eye, CheckSquare, 
  TrendingUp, FileText, ChevronRight, Shield, Cpu, Truck, BarChart3, 
  CheckCircle2, MapPin, Globe, Mail, Award, Layers, X
} from 'lucide-react';
import { getServices, getProjects, getCapabilities, getLeadership, useCmsLiveStore } from '../lib/cmsStore';

export default function ExpertisePage({ onOpenEnquire }) {
  const [activeCategory, setActiveCategory] = useState('All Services');
  const [selectedMember, setSelectedMember] = useState(null);
  const services = useCmsLiveStore(getServices);
  const projects = useCmsLiveStore(getProjects);
  const capabilities = useCmsLiveStore(getCapabilities);
  const leadership = useCmsLiveStore(getLeadership);

  const categories = ['All Services', 'Transportation', 'Airport Solutions', 'Operations', 'Consultancy'];

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All Services') return services;
    return services.filter(s => s.category === activeCategory);
  }, [services, activeCategory]);

  const iconsMap = {
    Compass: <Compass className="w-5 h-5 text-[#C5963D]" />,
    Plane: <Plane className="w-5 h-5 text-[#C5963D]" />,
    Car: <Car className="w-5 h-5 text-[#C5963D]" />,
    Users: <Users className="w-5 h-5 text-[#C5963D]" />,
    Navigation: <Navigation className="w-5 h-5 text-[#C5963D]" />,
    Eye: <Eye className="w-5 h-5 text-[#C5963D]" />,
    CheckSquare: <CheckSquare className="w-5 h-5 text-[#C5963D]" />,
    TrendingUp: <TrendingUp className="w-5 h-5 text-[#C5963D]" />,
    FileText: <FileText className="w-5 h-5 text-[#C5963D]" />
  };

  // Dynamic KRITISHA Infrastructure Team Members Data (Live from CMS Store)
  const teamMembers = (leadership && leadership.length > 0 ? leadership : []).map((item, index) => ({
    id: item.id || `lead-${index}`,
    name: item.name,
    role: item.designation || item.role || 'Executive Leadership',
    specialty: item.specialty || 'Infrastructure & Operations',
    bio: item.bio,
    highlights: item.highlights || [],
    image: item.image || item.image_url || '/images/team/vinod-jadhav.jpg',
    badge: item.designation || item.role || 'Executive'
  }));

  // Delivery Framework Steps
  const deliverySteps = [
    {
      step: '01',
      title: 'Assessment & SLA Alignment',
      description: 'Comprehensive audit of asset parameters, vehicle throughput estimates, and concessionaire SLA benchmarks.'
    },
    {
      step: '02',
      title: 'ITS Tech & Hardware Setup',
      description: 'Deploying RFID/FASTag readers, optical lane sensors, WIM scales, and high-resolution ANPR surveillance cameras.'
    },
    {
      step: '03',
      title: 'Skilled Workforce Deployment',
      description: 'Mobilizing background-verified, certified plaza collectors, shift managers, and round-the-clock safety marshals.'
    },
    {
      step: '04',
      title: 'Real-Time Surveillance & Auditing',
      description: 'Continuous plaza vigilance, shift reconciliation, automated zero-leakage reporting, and instant audit trails.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      
      {/* ============================================================ */}
      {/* 01. EXPERTISE HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_expertise.jpg"
            alt="KRITISHA Infrastructure Expertise Highway Tolling"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans-ui">
            <Link to="/" className="hover:text-[#C5963D] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[#C5963D] font-medium">Services</span>
          </div>

          <div className="inline-flex items-center gap-3">
            <span className="text-[11px] sm:text-xs font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
              01. OUR SERVICES
            </span>
            <span className="w-12 h-[1.5px] bg-[#C5963D]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08]">
                Pioneering Infrastructure & <br />
                <span className="text-[#C5963D] italic font-normal">Operational Excellence.</span>
              </h1>

              <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                Deep domain knowledge, advanced Intelligent Transportation Systems (ITS), and operational rigor powering long-span sea bridges, high-speed toll expressways, and complex airport landside transit hubs across India.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 text-[#C5963D]">
                <Award className="w-6 h-6" />
                <span className="font-editorial text-lg font-bold text-white">Proven Track Record</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-sans-ui pt-2 border-t border-white/10">
                <div>
                  <div className="font-editorial text-2xl font-bold text-[#C5963D]">Decades</div>
                  <div className="text-slate-400">of Excellence</div>
                </div>
                <div>
                  <div className="font-editorial text-[20px] font-bold text-white">Nationwide</div>
                  <div className="text-slate-400">Plazas Managed</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 02. SERVICES */}
      {/* ============================================================ */}
      <section id="services" className="scroll-mt-28 py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-[#F8FAFC] text-[#0B2341]">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  02. SERVICES
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
                Specialized Service Solutions
              </h2>
            </div>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-500 max-w-md">
              Tailored services for highway concessionaires, government bodies, and airport authorities.
            </p>
          </div>

          {/* Filter Category Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-slate-200 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans-ui font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#0B2341] text-white shadow-md font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#C5963D] hover:text-[#0B2341]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={service.slug}
                className="scroll-mt-28 group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5963D]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0B2341]/85 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      {iconsMap[service.icon_name] || <Compass className="w-5 h-5 text-[#C5963D]" />}
                    </div>
                    <div className="absolute top-4 left-4 bg-[#0B2341]/85 backdrop-blur-md text-white text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {service.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-editorial text-xl font-bold text-[#0B2341] group-hover:text-[#C5963D] transition-colors">
                      {service.title}
                    </h3>
                    <p className="font-sans-ui text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                      {service.short_description}
                    </p>

                    {service.features && service.features.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        {service.features.slice(0, 6).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{feat}</span>
                          </div>
                        ))}
                        {service.features.length > 6 && (
                          <div className="text-[11px] font-sans-ui text-sky-600 font-semibold pt-1">
                            +{service.features.length - 6} more capabilities
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-sans-ui font-semibold text-[#0B2341] hover:text-[#C5963D] py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => onOpenEnquire(service.title)}
                    className="inline-flex items-center justify-center text-xs font-sans-ui font-semibold text-[#0B2341] hover:text-white py-3 px-4 rounded-xl bg-[#C5963D] hover:bg-[#0B2341] transition-all cursor-pointer shadow-xs"
                  >
                    <span>Enquire</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 03. CAPABILITIES */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-[#0B2341] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                03. CORE CAPABILITIES
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              End-to-End Infrastructure Pillars
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              From heavy transit highway operations to intelligent landside airport management and zero-leakage revenue auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#C5963D]/20 text-[#C5963D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-white">Toll Plaza Operations</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Full turn-key management of multi-lane toll plazas, 24/7 cashier & FASTag reconciliation, shift supervision, and emergency incident response.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#C5963D]/20 text-[#C5963D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-white">ITS & Smart Mobility</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Integration of automatic number plate recognition (ANPR), weigh-in-motion (WIM) sensors, optical vehicle profilers, and CCTV control centers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#C5963D]/20 text-[#C5963D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-white">Airport Landside Hubs</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Managing terminal curbside passenger drop-offs, commercial vehicle staging, valet management, and multi-level parking automated kiosks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#C5963D]/20 text-[#C5963D] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-white">Vigilance & SLA Audits</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Independent revenue audit teams, anti-leakage surveillance, concession SLA compliance reporting, and financial risk mitigation.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. TEAM */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-[#F8FAFC] text-[#0B2341] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  04. TEAM
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
                The Leadership & Operations Team
              </h2>
            </div>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-500 max-w-md">
              Senior engineering directors, toll operations specialists, and vigilance auditors steering KRITISHA's asset portfolio.
            </p>
          </div>

          {/* 6 Team Member Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5963D]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Member Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute top-4 left-4 bg-[#0B2341]/90 backdrop-blur-md text-[#C5963D] text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {member.badge}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                      <h3 className="font-editorial text-2xl font-bold text-white leading-tight">
                        {member.name}
                      </h3>
                      <div className="text-xs font-sans-ui text-[#C5963D] font-medium">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio & Details */}
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] font-sans-ui font-bold text-slate-400 uppercase tracking-wider">
                      Specialty: <span className="text-[#0B2341]">{member.specialty}</span>
                    </div>
                    <p className="font-sans-ui text-xs text-slate-500 leading-relaxed font-light line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Globe className="w-4 h-4 text-slate-400 group-hover:text-[#C5963D] transition-colors" />
                    <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#C5963D] transition-colors" />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                    className="text-[11px] font-sans-ui font-semibold text-[#0B2341] group-hover:text-[#C5963D] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    View Profile <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. HOW WE DELIVER */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-[#0B2341] text-white border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                05. HOW WE DELIVER
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              Our Proven Delivery Framework
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 font-light">
              Structured execution designed for zero revenue leakage, 100% SLA compliance, and long-term asset extension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative group hover:border-[#C5963D] transition-all">
                <div className="font-editorial text-4xl font-bold text-[#C5963D]">{item.step}</div>
                <h3 className="font-editorial text-xl font-bold text-white">{item.title}</h3>
                <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 06. SELECTED WORK */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-16 bg-[#F8FAFC] text-[#0B2341] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  06. SELECTED WORK
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
                Expertise In Action
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#0B2341] hover:text-[#C5963D] transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5963D]/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-[#0B2341]/90 text-white text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {proj.scope}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C5963D] font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#0B2341] group-hover:text-[#C5963D] transition-colors">{proj.title}</h3>
                    <p className="font-sans-ui text-xs text-slate-500 font-light line-clamp-2">{proj.short_description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#0B2341] hover:text-[#C5963D] transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 07. CTA */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#0B2341] to-[#07172c] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              07. PARTNER WITH US
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Need specialized infrastructure expertise?
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Whether launching a new toll plaza, upgrading airport landside logistics, or auditing revenue leakage, KRITISHA’s expert teams are ready to assist.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquire('General Expertise Inquiry')}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans-ui font-medium text-slate-200 hover:text-white border border-white/20 hover:border-[#C5963D] px-7 py-3.5 rounded-full transition-all"
            >
              <span>Contact Expertise Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* LEADERSHIP PROFILE SPECIFICATIONS MODAL */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white text-[#0B2341] max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-slate-200 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors z-20 shadow-xs"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            {/* Left Image Column */}
            <div className="md:w-5/12 bg-slate-100 relative min-h-[300px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
            </div>

            {/* Right Details Column */}
            <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-xs font-sans-ui font-bold text-[#0B2341] bg-sky-50 px-3 py-1 rounded-full w-fit border border-sky-100">
                  {selectedMember.role || selectedMember.badge}
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                  {selectedMember.name}
                </h2>

                <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {selectedMember.bio}
                </p>
              </div>

              {selectedMember.highlights && selectedMember.highlights.length > 0 && (
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  {selectedMember.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                      <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500 font-sans-ui">
                <span>KRITISHA Executive Profile</span>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="bg-[#0B2341] hover:bg-[#163F68] text-white px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
