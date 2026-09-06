import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Upload, 
  Send,
  Building2,
  Clock,
  UserCheck,
  FileCheck,
  Sparkles,
  Layers
} from 'lucide-react';
import { getCareers, useCmsLiveStore } from '../lib/cmsStore';
import CareerApplicationModal from '../components/CareerApplicationModal';

export default function CareersPage() {
  const allCareers = useCmsLiveStore(getCareers);
  const [activeDept, setActiveDept] = useState('All Departments');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isOpenAppModal, setIsOpenAppModal] = useState(false);

  const departments = ['All Departments', 'Engineering', 'Operations', 'Finance', 'Technology', 'Audit', 'Consultancy'];

  const filteredCareers = activeDept === 'All Departments'
    ? allCareers.filter(c => c.status === 'Open' || !c.status)
    : allCareers.filter(c => (c.status === 'Open' || !c.status) && c.department.toLowerCase() === activeDept.toLowerCase());

  const scrollToPositions = () => {
    const el = document.getElementById('open-positions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      
      {/* ============================================================ */}
      {/* 1. HERO — "Build what moves India." */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 border-b border-white/10 overflow-hidden">
        {/* Background Image: High-impact Civil Engineering & Mega Infrastructure */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_careers.jpg"
            alt="KRITISHA Careers Infrastructure"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
                CAREERS AT KRITISHA
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            {/* Main Heading */}
            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]">
              Build what moves <br />
              <span className="text-[#C5963D] italic font-normal">India.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans-ui text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm max-w-2xl">
              Join a multidisciplinary team working across infrastructure, engineering, operations, technology and consultancy.
            </p>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={scrollToPositions}
                className="group inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold text-xs sm:text-sm font-sans-ui px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. WHY KRITISHA — EDITORIAL STATEMENT */}
      {/* ============================================================ */}
      <section className="bg-white text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-16">
          
          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                02. WHY KRITISHA
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            <blockquote className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B2341] leading-[1.12]">
              "Big infrastructure needs people who think beyond the blueprint."
            </blockquote>
          </div>

          {/* 4 Typographic Blocks (Not Colourful Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            <div className="space-y-3 p-6 rounded-2xl border-l-2 border-[#C5963D] bg-[#F8FAFC]">
              <span className="text-xs font-mono text-[#C5963D] font-bold">01</span>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Meaningful Work</h3>
              <p className="font-sans-ui text-xs text-slate-600 leading-relaxed font-light">
                Work connected to real infrastructure and operations across toll plazas and national transit corridors.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border-l-2 border-[#C5963D] bg-[#F8FAFC]">
              <span className="text-xs font-mono text-[#C5963D] font-bold">02</span>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Multidisciplinary Thinking</h3>
              <p className="font-sans-ui text-xs text-slate-600 leading-relaxed font-light">
                Learn across civil engineering, toll plaza operations, FASTag technology, and financialdue diligence.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border-l-2 border-[#C5963D] bg-[#F8FAFC]">
              <span className="text-xs font-mono text-[#C5963D] font-bold">03</span>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Ownership</h3>
              <p className="font-sans-ui text-xs text-slate-600 leading-relaxed font-light">
                Take direct responsibility and make decisions that safeguard multi-crore revenue assets and public safety.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border-l-2 border-[#C5963D] bg-[#F8FAFC]">
              <span className="text-xs font-mono text-[#C5963D] font-bold">04</span>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Continuous Growth</h3>
              <p className="font-sans-ui text-xs text-slate-600 leading-relaxed font-light">
                Develop through challenging mega-projects, leadership mentorship, and emerging technology perspectives.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. LIFE AT KRITISHA — ASYMMETRIC PHOTOGRAPHY LAYOUT */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                03. LIFE AT KRITISHA
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              Different disciplines. One direction.
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              Collaborative field operations, site inspections, and technology deployments powered by KRITISHA Infrastructure's multidisciplinary team.
            </p>
          </div>

          {/* Asymmetric Photography Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Main Feature Photo */}
            <div className="md:col-span-7 relative rounded-3xl overflow-hidden min-h-[320px] md:min-h-[420px] group border border-white/15">
              <img
                src="/images/cap_transportation.jpg"
                alt="KRITISHA Highway Toll Operations Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#C5963D] tracking-wider font-semibold">Toll Plaza Operations</span>
                <p className="font-editorial text-lg sm:text-xl font-bold">24/7 Field Shift Operations & Plaza Management</p>
              </div>
            </div>

            {/* Secondary Stack */}
            <div className="md:col-span-5 grid grid-cols-1 gap-6">
              <div className="relative rounded-3xl overflow-hidden h-52 group border border-white/15">
                <img
                  src="/images/hero_bridge.jpg"
                  alt="KRITISHA Mega Bridge Infrastructure"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase text-[#C5963D] tracking-wider font-semibold">Sea Bridge Engineering</span>
                  <p className="font-editorial text-sm font-bold">Long-Span Highway & Bridge Due Diligence</p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden h-52 group border border-white/15">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
                  alt="KRITISHA Telemetry Command Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase text-[#C5963D] tracking-wider font-semibold">ITS & Technology Hub</span>
                  <p className="font-editorial text-sm font-bold">FASTag 3.0 & Telemetry Command Control</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. OPEN POSITIONS — MAIN FUNCTIONAL SECTION */}
      {/* ============================================================ */}
      <section id="positions" className="scroll-mt-28 bg-[#F8FAFC] text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  04. OPEN POSITIONS
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2341]">
                Active Career Opportunities
              </h2>
            </div>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-500 max-w-md">
              Explore open positions across operations, engineering, audit, technology, and finance.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-slate-200 pb-6">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans-ui font-medium transition-all cursor-pointer ${
                  activeDept === dept
                    ? 'bg-[#0B2341] text-white shadow-md font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#C5963D] hover:text-[#0B2341]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Job Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((job) => (
              <div
                key={job.id}
                className="group bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#C5963D]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#0B2341]/10 text-[#0B2341] text-[10px] font-sans-ui font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-[11px] font-sans-ui text-slate-500 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C5963D]" />
                      {job.employment_type || 'Full Time'}
                    </span>
                  </div>

                  <h3 className="font-editorial text-xl font-bold text-[#0B2341] group-hover:text-[#C5963D] transition-colors leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-sans-ui text-slate-500">
                    <MapPin className="w-4 h-4 text-[#C5963D] shrink-0" />
                    <span>{job.location}</span>
                  </div>

                  <p className="font-sans-ui text-xs text-slate-600 line-clamp-3 leading-relaxed font-light">
                    {job.short_description}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
                  <span className="text-[11px] font-sans-ui text-slate-500 font-medium">
                    Exp: <span className="font-semibold text-[#0B2341]">{job.experience_range || '3-5 Years'}</span>
                  </span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#0B2341] group-hover:text-[#C5963D] transition-colors cursor-pointer"
                  >
                    <span>View Position</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
              <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-editorial text-lg font-bold text-slate-700">No Open Positions in {activeDept}</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We are actively expanding across departments. Feel free to submit an open application below.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. HOW WE HIRE — ARCHITECTURAL TIMELINE */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                05. HOW WE HIRE
              </span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              Our Selection Process
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 font-light">
              Clear, transparent steps connecting qualified professionals directly with technical and operations leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative pt-4">
            <div className="space-y-4 relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C5963D] transition-all">
              <span className="font-editorial text-4xl font-bold text-[#C5963D]">01</span>
              <h3 className="font-editorial text-xl font-bold text-white">Explore</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Find a role across engineering, operations, tech, or audit that matches your technical strengths.
              </p>
            </div>

            <div className="space-y-4 relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C5963D] transition-all">
              <span className="font-editorial text-4xl font-bold text-[#C5963D]">02</span>
              <h3 className="font-editorial text-xl font-bold text-white">Apply</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Submit your professional profile, resume, and operational accomplishments directly via the portal.
              </p>
            </div>

            <div className="space-y-4 relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C5963D] transition-all">
              <span className="font-editorial text-4xl font-bold text-[#C5963D]">03</span>
              <h3 className="font-editorial text-xl font-bold text-white">Connect</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Meet the engineering directors and operations heads behind the role for technical discussions.
              </p>
            </div>

            <div className="space-y-4 relative p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-[#C5963D] transition-all">
              <span className="font-editorial text-4xl font-bold text-[#C5963D]">04</span>
              <h3 className="font-editorial text-xl font-bold text-white">Build Together</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Join KRITISHA and start steering high-value infrastructure concessions across India.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. DON'T SEE YOUR ROLE? — OPEN APPLICATION */}
      {/* ============================================================ */}
      <section className="bg-white text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-xl">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                06. OPEN APPLICATION
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2341]">
              Your role may not exist yet.
            </h2>

            <p className="font-sans-ui text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
              If you believe your expertise in civil engineering, toll operations, FASTag technology, or financial due diligence can contribute to what KRITISHA is building, we’d still like to hear from you.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              onClick={() => {
                setSelectedJob(null);
                setIsOpenAppModal(true);
              }}
              className="inline-flex items-center gap-3 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs sm:text-sm font-sans-ui px-8 py-4 rounded-full transition-all shadow-xl hover:scale-105 cursor-pointer border border-[#C5963D]/40"
            >
              <span>Send Your Profile</span>
              <ArrowRight className="w-4 h-4 text-[#C5963D]" />
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. FINAL CTA */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#0B2341] to-[#07172c] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              07. START YOUR JOURNEY
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Your next chapter could start here.
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Explore active career opportunities or send your open application directly to KRITISHA leadership.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToPositions}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 100% MATCHED CAREER APPLICATION MODAL */}
      {/* ============================================================ */}
      <CareerApplicationModal
        isOpen={Boolean(selectedJob || isOpenAppModal)}
        onClose={() => { setSelectedJob(null); setIsOpenAppModal(false); }}
        job={selectedJob}
      />

    </div>
  );
}
