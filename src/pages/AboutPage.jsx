import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Shield, Award, Users, Building2, MapPin, 
  ChevronRight, Globe, Mail, CheckCircle2, Cpu, Truck, 
  BarChart3, Layers, Compass, TrendingUp, FileText, Activity, X, Check
} from 'lucide-react';
import { getProjects, getLeadership, getHomepageStats, useCmsLiveStore } from '../lib/cmsStore';

export default function AboutPage({ onOpenEnquire }) {
  const projects = useCmsLiveStore(getProjects);
  const stats = useCmsLiveStore(getHomepageStats);
  const leadership = useCmsLiveStore(getLeadership);

  const [activeDiscipline, setActiveDiscipline] = useState('Infrastructure');
  const [selectedMember, setSelectedMember] = useState(null);

  // 04. KRITISHA ECOSYSTEM DISCIPLINES
  const disciplines = [
    {
      id: 'Infrastructure',
      title: 'Infrastructure',
      icon: <Building2 className="w-5 h-5 text-[#C5963D]" />,
      desc: 'Execution of high-speed state highways, Hybrid Annuity Model (HAM) projects, ROB bridges, and cement concrete urban road networks.',
      highlights: ['State & National Highways', 'HAM Annuity Models', 'Concrete Paving & Flyovers']
    },
    {
      id: 'Engineering',
      title: 'Engineering',
      icon: <Cpu className="w-5 h-5 text-[#C5963D]" />,
      desc: 'Structural load auditing, weigh-in-motion (WIM) sensor integration, civil due diligence, and earthwork lining for major irrigation works.',
      highlights: ['Structural Due Diligence', 'WIM Load Sensors', 'Irrigation & Canal Engineering']
    },
    {
      id: 'Operations',
      title: 'Operations',
      icon: <Truck className="w-5 h-5 text-[#C5963D]" />,
      desc: 'Turnkey management of toll plazas, 24/7 cashier shift supervision, FASTag lane control, and battery golf cart mass transit systems.',
      highlights: ['Nationwide Managed Plazas', 'FASTag Lane Management', 'Eco Transit Vehicles']
    },
    {
      id: 'Technology',
      title: 'Technology',
      icon: <Activity className="w-5 h-5 text-[#C5963D]" />,
      desc: 'High-definition ANPR camera surveillance, automated ticket dispensers, cloud data analytics, and real-time command center monitoring.',
      highlights: ['ANPR Camera Networks', 'Cloud Audit Analytics', 'Automated Kiosks']
    },
    {
      id: 'Audit',
      title: 'Audit & Vigilance',
      icon: <Shield className="w-5 h-5 text-[#C5963D]" />,
      desc: 'Independent revenue leakage audits, surprise field inspections, daily cashier reconciliation, and concession SLA enforcement.',
      highlights: ['Zero Revenue Leakage', 'Unscheduled Audits', 'Concession SLA Verification']
    },
    {
      id: 'Consultancy',
      title: 'Consultancy',
      icon: <TrendingUp className="w-5 h-5 text-[#C5963D]" />,
      desc: 'Strategic traffic demand modeling, PPP tender bidding advisory, user fee rate modeling, and asset valuation for government bodies.',
      highlights: ['PPP Tender Advisory', 'Traffic Forecasting', 'Asset Valuation']
    }
  ];

  // 05. OFFICIAL LEADERSHIP TEAM (Live from CMS Store)
  const defaultLeadershipList = [
    {
      id: 'team-1',
      name: 'Vinod A. Jadhav',
      role: 'Director',
      designation: 'Director',
      specialty: 'Strategic Business & Governance',
      bio: 'Provides strategic leadership and overall direction to the organization, with focus on business growth, client relationships, operational discipline and long-term infrastructure opportunities.',
      image: '/images/team/vinod-jadhav.jpg',
      badge: 'Director',
      highlights: [
        'Strategic business leadership',
        'Client and stakeholder coordination',
        'Business development',
        'Operational governance',
        'Long-term organizational growth'
      ]
    },
    {
      id: 'team-2',
      name: 'Shital V. Jadhav',
      role: 'Director',
      designation: 'Director',
      specialty: 'Management & Administrative Oversight',
      bio: 'Supports organizational management, administration, coordination and strategic initiatives while contributing to disciplined and professional service delivery.',
      image: '/images/team/shital-jadhav.jpg',
      badge: 'Director',
      highlights: [
        'Management coordination',
        'Administrative oversight',
        'Stakeholder support',
        'Organizational development',
        'Service delivery coordination'
      ]
    },
    {
      id: 'team-3',
      name: 'Ajeet Sindhe',
      role: 'Chief Financial Officer',
      designation: 'Chief Financial Officer',
      specialty: 'Financial Management & Commercial Controls',
      bio: 'Responsible for financial management, commercial controls, budgeting, financial reporting and supporting financially disciplined project execution.',
      image: '/images/team/ajeet-sindhe.jpg',
      badge: 'Chief Financial Officer',
      highlights: [
        'Financial planning',
        'Budget management',
        'Commercial controls',
        'Financial reporting',
        'Project cost monitoring',
        'Management decision support'
      ]
    },
    {
      id: 'team-4',
      name: 'Shard D. Bhor',
      role: 'Chief Operating Officer',
      designation: 'Chief Operating Officer',
      specialty: 'Operations & Workforce Deployment',
      bio: 'Leads operational execution and field coordination with focus on workforce deployment, service continuity, supervision, performance and client requirements.',
      image: '/images/team/shard-bhor.jpg',
      badge: 'Chief Operating Officer',
      highlights: [
        'Operations management',
        'Workforce deployment',
        'Site supervision',
        'Performance monitoring',
        'Operational continuity',
        'Client coordination'
      ]
    },
    {
      id: 'team-5',
      name: 'Ramkishor Bana',
      role: 'IT Head',
      designation: 'IT Head',
      specialty: 'IT Infrastructure & Digital Systems',
      bio: 'Leads technology, digital systems, IT infrastructure, operational technology support and information management initiatives across the organization.',
      image: '/images/team/ramkishor-bana.jpg',
      badge: 'IT Head',
      highlights: [
        'IT infrastructure',
        'Digital systems',
        'Technology support',
        'Data and information management',
        'Website and digital platforms',
        'Technology-driven operations'
      ]
    },
    {
      id: 'team-6',
      name: 'Ram Hema Dhanke',
      role: 'DGM – Internal Audit & Vigilance',
      designation: 'DGM – Internal Audit & Vigilance',
      specialty: 'Internal Audit, Vigilance & Compliance',
      bio: 'Responsible for internal audit, vigilance, process review, compliance monitoring, risk identification and structured reporting across projects and operational activities.',
      image: '/images/team/ram-dhanke.jpg',
      badge: 'DGM Audit & Vigilance',
      highlights: [
        'Internal audit',
        'Project inspection',
        'Vigilance activities',
        'Process compliance review',
        'Risk identification',
        'Operational control review',
        'Audit observations',
        'Detailed audit reporting',
        'Corrective action monitoring'
      ]
    }
  ];

  const rawLeadership = leadership && leadership.length > 0 ? leadership : defaultLeadershipList;

  const teamMembers = rawLeadership.map((item, index) => {
    let img = item.image || item.image_url;
    if (!img || img.includes('unsplash.com')) {
      const match = defaultLeadershipList.find(d => (d.name || '').toLowerCase() === (item.name || '').toLowerCase() || d.id === item.id);
      img = match ? match.image : '/images/team/vinod-jadhav.jpg';
    }
    const matchObj = defaultLeadershipList.find(d => (d.name || '').toLowerCase() === (item.name || '').toLowerCase() || d.id === item.id) || {};
    return {
      id: item.id || `lead-${index}`,
      name: item.name,
      role: item.designation || item.role || 'Executive Leadership',
      specialty: item.specialty || matchObj.specialty || 'Infrastructure & Operations',
      bio: item.bio || matchObj.bio,
      highlights: item.highlights || matchObj.highlights || [],
      image: img,
      badge: item.designation || item.role || 'Executive'
    };
  });

  // 06. WHAT WE BELIEVE (4 LARGE EDITORIAL STATEMENTS)
  const beliefs = [
    {
      num: '01',
      title: 'Enhancing Value',
      statement: 'We believe in adding value by uplifting not just ourselves, but the clients, commuters, and communities we work with through outstanding results.'
    },
    {
      num: '02',
      title: 'Exceptional Quality',
      statement: 'Getting the right results and delivering on time is the secret source to our success. We believe in going the extra mile to deliver nothing but the best.'
    },
    {
      num: '03',
      title: 'Delivery On the Dot',
      statement: 'In this fast-paced world, delivering projects on time takes top priority. We emerge cutting-edge technology with infrastructure to deliver on time every time.'
    },
    {
      num: '04',
      title: 'Powerful Workmanship',
      statement: 'In these 4 decades of working, the one thing that has set us apart is our team. We work with the best in the business to deliver nation-building projects.'
    }
  ];

  // 08. GEOGRAPHIC LOCATIONS
  const verifiedLocations = [
    { region: 'Nagpur & Vidarbha', role: 'Headquarters, Civil Roads, Irrigation & Sound/Laser Projects', stat: 'HQ Operations' },
    { region: 'Mumbai & Navi Mumbai', role: 'Kamothe & Kopra Toll Plazas (PWD), Sea Bridge Operations', stat: 'Regional Assets' },
    { region: 'Pune & Western MH', role: 'Expressway Toll Management, Vigilance & Route Operations', stat: 'Regional Assets' },
    { region: 'Agra & Mathura (UP)', role: 'Electric Golf Carts & Mass Transit (Agra & Mathura DA)', stat: 'Daily Commuters' },
    { region: 'Rajasthan & Northern Corridor', role: 'NHAI User Fee Toll Plazas & Manpower Supply (NHIPMPL)', stat: 'Toll Plazas' },
    { region: 'Kerala, MP & South India', role: 'KSRDC & MPRDC Toll Assets, Cantonment Board Entry Collection', stat: 'Regional Plazas' }
  ];

  const selectedDisciplineObj = disciplines.find(d => d.id === activeDiscipline) || disciplines[0];

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      
      {/* ============================================================ */}
      {/* 01. IMMERSIVE HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Background Image with Dual Navy Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_about.jpg"
            alt="KRITISHA Infrastructure 40-Year Story"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
                01. ABOUT KRITISHA — WHO WE ARE
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]">
              We don't just build infrastructure. <br />
              <span className="text-[#C5963D] italic font-normal">We keep it moving.</span>
            </h1>

            <p className="font-sans-ui text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm max-w-2xl">
              From founding in 1985 to becoming a national powerhouse, KRITISHA Infrastructure delivers end-to-end infrastructure, toll operations, and civil engineering excellence across India.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-sans-ui text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5963D]" />
                <span className="text-white font-semibold">1985</span> 40 Years Legacy
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">₹130 Cr</span> Net Worth
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-white font-semibold">Nationwide</span> Toll Plazas Managed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02. BIG BRAND STATEMENT */}
      {/* ============================================================ */}
      <section id="philosophy" className="scroll-mt-28 bg-white text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="inline-flex items-center gap-3">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
              02. OUR PHILOSOPHY
            </span>
            <span className="w-12 h-[1.5px] bg-[#C5963D]" />
          </div>

          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B2341] leading-[1.12] max-w-4xl">
            Infrastructure is more than steel, concrete and systems.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3 relative group hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-3xl font-bold text-[#C5963D]">It is people.</div>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Empowering deployed personnel, plaza collectors, security marshals, and daily commuters across Indian states.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3 relative group hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-3xl font-bold text-[#0B2341]">Movement.</div>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Ensuring seamless, signal-free transit across long-span sea bridges, toll plazas, and eco-friendly golf cart shuttles.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-3 relative group hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-3xl font-bold text-[#C5963D]">Opportunity.</div>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Connecting agricultural regions, industrial zones, and heritage landmarks to drive national economic prosperity.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 03. THE KRITISHA STORY */}
      {/* ============================================================ */}
      <section id="story" className="scroll-mt-28 bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                03. THE KRITISHA STORY
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              Built around complexity.
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              Founded in 1985 by the late Mr. Hemant Khalatkar and led today by Mr. Jayant Madhavrao Khalatkar, KRITISHA Group has grown over 4 decades into 12-14 specialized companies across national infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-2xl font-bold text-[#C5963D]">1985 – 2001</div>
              <h3 className="font-editorial text-xl font-bold text-white">The Beginning</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Laid the foundation in the irrigation sector, constructing river canals, dams, and water supply pipework for Vidarbha Irrigation Development Corporation.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-2xl font-bold text-[#C5963D]">2002 – 2012</div>
              <h3 className="font-editorial text-xl font-bold text-white">Phase of Transformation</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Expanded into industrial infrastructure, logistics parks, and power sector partnerships, executing major civil structures in Nagpur and Latur.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="font-editorial text-2xl font-bold text-[#C5963D]">2013 – 2025</div>
              <h3 className="font-editorial text-xl font-bold text-white">Period of Ascendancy</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Pioneered Pan-India user fee toll collection, HAM highway projects, and electric golf cart eco-transit contracts.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. ONE COMPANY. MANY DISCIPLINES. (INTERACTIVE ECOSYSTEM) */}
      {/* ============================================================ */}
      <section id="disciplines" className="scroll-mt-28 bg-[#F8FAFC] text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                04. THE KRITISHA ECOSYSTEM
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
              One Company. Many Disciplines.
            </h2>
          </div>

          {/* Interactive Discipline Filter Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-6">
            {disciplines.map((disc) => (
              <button
                key={disc.id}
                onClick={() => setActiveDiscipline(disc.id)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-sans-ui font-medium transition-all cursor-pointer ${
                  activeDiscipline === disc.id
                    ? 'bg-[#0B2341] text-white shadow-md font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#C5963D] hover:text-[#0B2341]'
                }`}
              >
                {disc.title}
              </button>
            ))}
          </div>

          {/* Selected Discipline Active Content Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B2341] text-[#C5963D] flex items-center justify-center">
                {selectedDisciplineObj.icon}
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0B2341]">
                {selectedDisciplineObj.title}
              </h3>
              <p className="font-sans-ui text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                {selectedDisciplineObj.desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {selectedDisciplineObj.highlights.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold bg-[#F8FAFC] text-[#0B2341] px-4 py-2 rounded-full border border-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5963D]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B2341] text-white space-y-4">
              <div className="text-xs font-sans-ui text-[#C5963D] uppercase tracking-wider font-semibold">
                Operational Compliance
              </div>
              <div className="font-editorial text-xl font-bold text-white">
                ISO Certified Execution
              </div>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Every discipline operates under strict ISO 9001 (Quality), ISO 14001 (Environment), and ISO 45001 (Safety) frameworks verified by international audit bodies.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. THE PEOPLE BEHIND THE WORK */}
      {/* ============================================================ */}
      <section id="leadership" className="scroll-mt-28 bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                  05. LEADERSHIP & EXCELLENCE
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
                The People Behind The Work
              </h2>
            </div>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-md">
              Expertise is human. Meet the directors and senior leaders steering KRITISHA's asset portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                onClick={() => setSelectedMember(member)}
                className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#C5963D] transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4 bg-[#0B2341]/90 text-[#C5963D] text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {member.badge}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-0.5">
                      <h3 className="font-editorial text-2xl font-bold text-white leading-tight">{member.name}</h3>
                      <div className="text-xs font-sans-ui text-[#C5963D] font-medium">{member.role}</div>
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] font-sans-ui font-bold text-slate-400 uppercase tracking-wider">
                      Specialty: <span className="text-white">{member.specialty}</span>
                    </div>
                    <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light line-clamp-3">{member.bio}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/10 mt-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Globe className="w-4 h-4 text-slate-400 group-hover:text-[#C5963D] transition-colors" />
                    <Mail className="w-4 h-4 text-slate-400 group-hover:text-[#C5963D] transition-colors" />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedMember(member); }}
                    className="text-[11px] font-sans-ui font-semibold text-white group-hover:text-[#C5963D] transition-colors flex items-center gap-1 cursor-pointer"
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
      {/* 06. WHAT WE BELIEVE */}
      {/* ============================================================ */}
      <section id="beliefs" className="scroll-mt-28 bg-[#F8FAFC] text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                06. OUR CORE BELIEFS
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
              What We Believe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((b) => (
              <div key={b.num} className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 hover:border-[#C5963D] transition-all">
                <div className="font-editorial text-4xl font-bold text-[#C5963D]">{b.num}</div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2341]">{b.title}</h3>
                <p className="font-sans-ui text-sm sm:text-base text-slate-600 leading-relaxed font-light">{b.statement}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 07. KRITISHA IN ACTION (SELECTED PROJECTS) */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                  07. PORTFOLIO SHOWCASE
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
                KRITISHA In Action
              </h2>
            </div>
            <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#C5963D] hover:text-white transition-colors">
              <span>View Full Work Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#C5963D] transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-[#0B2341]/90 text-white text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {proj.scope}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-sans-ui text-[#C5963D]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{proj.location}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-white group-hover:text-[#C5963D] transition-colors">{proj.title}</h3>
                    <p className="font-sans-ui text-xs text-slate-300 font-light line-clamp-2">{proj.short_description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link to={`/projects/${proj.slug}`} className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-white hover:text-[#C5963D] transition-colors">
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* OFFICIAL CLIENTS & GOVERNMENT AUTHORITIES */}
      {/* ============================================================ */}
      <section className="bg-white text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  TRUSTED BY NATION BUILDERS
                </span>
                <span className="w-12 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
                Our Government & Enterprise Clients
              </h2>
            </div>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-500 max-w-md">
              Numerous toll plazas operated across India serving major government entities and private concessionaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'NHAI',
                fullName: 'National Highways Authority of India',
                sector: 'National Highways',
                desc: 'Operated user fee toll plazas across states under Ministry of Road Transport & Highways.',
                badge: 'Federal Highway Authority'
              },
              {
                name: 'MSRDC',
                fullName: 'Maharashtra State Road Development Corp',
                sector: 'Expressways & Sea Bridges',
                desc: 'Operator for key expressways, sea bridges, and heavy transit toll corridors in Maharashtra.',
                badge: 'State Road Development'
              },
              {
                name: 'MPRDC',
                fullName: 'Madhya Pradesh Road Development Corp',
                sector: 'State Highway Network',
                desc: 'Turnkey toll collection and plaza vigilance operations across major MP road corridors.',
                badge: 'State Highway Authority'
              },
              {
                name: 'NHIT',
                fullName: 'National Highways Infra Trust',
                sector: 'Infrastructure Investment Trust',
                desc: 'Manpower supply, route operation services, and toll plaza management for NHIT asset portfolios.',
                badge: 'InvIT Asset Operator'
              },
              {
                name: 'IRCON',
                fullName: 'IRCON International Ltd (Ministry of Railways)',
                sector: 'Railway & Toll Infrastructure',
                desc: 'User fee collection, route operation vehicles, and deployed manpower for IRCON PB Tollway assets.',
                badge: 'Public Sector Enterprise'
              },
              {
                name: 'Agra & Mathura DA',
                fullName: 'Agra & Mathura Vrindavan Development Authorities',
                sector: 'Eco Mass Transit',
                desc: 'Electric golf carts serving daily visitors at Taj Mahal & Goverdhan Parikrama Marg.',
                badge: 'Urban Development Authorities'
              }
            ].map((client) => (
              <div key={client.name} className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-4 hover:border-[#C5963D] hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-sans-ui font-bold px-3 py-1 rounded-full bg-[#0B2341] text-white">
                    {client.badge}
                  </span>
                  <span className="text-xs font-sans-ui font-semibold text-[#C5963D]">{client.sector}</span>
                </div>
                <div>
                  <div className="font-editorial text-3xl font-bold text-[#0B2341]">{client.name}</div>
                  <div className="text-xs font-sans-ui font-semibold text-slate-500 mt-1">{client.fullName}</div>
                </div>
                <p className="font-sans-ui text-xs text-slate-600 leading-relaxed font-light">
                  {client.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 08. OUR PRESENCE (PAN-INDIA LOCATIONS) */}
      {/* ============================================================ */}
      <section className="bg-[#F8FAFC] text-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                08. GEOGRAPHIC FOOTPRINT
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#0B2341]">
              Pan-India Presence
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-500 font-light">
              Active operational presence across various states and cities in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedLocations.map((loc) => (
              <div key={loc.region} className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 hover:border-[#C5963D] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#C5963D] text-xs font-sans-ui font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span>PAN India Network</span>
                  </div>
                  <span className="text-[10px] font-sans-ui font-bold px-2.5 py-1 rounded-full bg-[#0B2341] text-white">
                    {loc.stat}
                  </span>
                </div>
                <h3 className="font-editorial text-xl font-bold text-[#0B2341]">{loc.region}</h3>
                <p className="font-sans-ui text-xs text-slate-500 font-light">{loc.role}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 09. LOOKING AHEAD */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-8 text-center max-w-4xl">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              09. THE FUTURE
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white leading-tight">
            The infrastructure of tomorrow...
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            As India transitions toward multi-modal logistics parks, autonomous toll plazas, and eco-friendly electric transit, KRITISHA Group is pioneering ISO-certified smart technologies to keep the nation moving efficiently and sustainably.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FINAL TRANSITION / CTA */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#0B2341] to-[#07172c] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              10. JOIN OUR JOURNEY
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white tracking-tight">
            We are building what comes next.
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Partner with KRITISHA for turnkey toll plaza operations, highway engineering, and eco-transit infrastructure solutions.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquire('About Page Consultation')}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans-ui font-medium text-slate-200 hover:text-white border border-white/20 hover:border-[#C5963D] px-7 py-3.5 rounded-full transition-all"
            >
              <span>Contact Us</span>
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
