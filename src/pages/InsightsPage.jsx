import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, BookOpen, Clock, Calendar, Search, ChevronRight, 
  Mail, Send, CheckCircle2, Shield, Compass, TrendingUp, Layers, FileText
} from 'lucide-react';
import { getInsights, useCmsLiveStore } from '../lib/cmsStore';

export default function InsightsPage({ onOpenEnquire }) {
  const allInsights = useCmsLiveStore(getInsights);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  const categories = [
    'All',
    'Infrastructure',
    'Engineering',
    'Operations',
    'Consultancy',
    'Audit & Inspection',
    'Industry Updates'
  ];

  // Featured Article (Visual Anchor)
  const featuredArticle = useMemo(() => {
    return allInsights.find(i => i.is_featured) || allInsights[0] || {};
  }, [allInsights]);

  // Filtered Grid Articles
  const filteredInsights = useMemo(() => {
    return allInsights.filter((item) => {
      const matchSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeCategory === 'All') return matchSearch;
      
      const matchCategory = item.category.toLowerCase() === activeCategory.toLowerCase();
      return matchSearch && matchCategory;
    });
  }, [allInsights, activeCategory, searchQuery]);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setEmailSubscribed(true);
    setTimeout(() => {
      setEmailSubscribed(false);
      setSubscribeEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      
      {/* ============================================================ */}
      {/* 01. IMMERSIVE HERO */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center pt-32 sm:pt-36 pb-20 px-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero_insights.jpg"
            alt="KRITISHA Infrastructure Intelligence Operations Center"
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/85 via-[#0B2341]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/20" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-sans-ui tracking-[0.25em] text-[#C5963D] font-bold uppercase">
                01. INFRASTRUCTURE INTELLIGENCE
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>

            <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05]">
              Insights
            </h1>

            <p className="font-sans-ui text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm max-w-2xl">
              Editorial perspectives, policy breakdowns, engineering audits, and operational intelligence for infrastructure concessionaires, developers, and government partners in India.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-sans-ui text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5963D]" />
                <span className="text-white font-semibold">Publication Hub</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-500" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white font-semibold">Updated Bi-Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02. FEATURED INSIGHT (VISUAL ANCHOR) */}
      {/* ============================================================ */}
      <section className="bg-white text-[#0B2341] py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <div className="inline-flex items-center gap-3">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
              02. FEATURED PUBLICATION
            </span>
            <span className="w-12 h-[1.5px] bg-[#C5963D]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center rounded-3xl overflow-hidden bg-[#F8FAFC] border border-slate-200/90 shadow-xl p-6 sm:p-10">
            {/* Left Image Anchor */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-lg group">
              <img
                src={featuredArticle.featured_image || '/images/hero_bridge.jpg'}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#0B2341]/90 backdrop-blur-md text-[#C5963D] text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                {featuredArticle.category || 'FEATURED REPORT'}
              </div>
            </div>

            {/* Right Story Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-4 text-xs font-sans-ui text-slate-500">
                <span className="flex items-center gap-1.5 text-[#C5963D] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {featuredArticle.publish_date || 'August 2026'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredArticle.read_time || '6 min read'}
                </span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#0B2341] leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="font-sans-ui text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                <div className="text-xs font-sans-ui text-slate-500">
                  By <span className="font-semibold text-[#0B2341]">{featuredArticle.author || 'Jayant Khalatkar'}</span>
                </div>

                <Link
                  to={`/insights/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-sans-ui font-semibold px-6 py-3 rounded-full transition-all shadow-md"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5963D]" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 03. EXPLORE INSIGHTS (CATEGORY FILTERS & SEARCH) */}
      {/* ============================================================ */}
      {/* 03. EXPLORE INSIGHTS (CATEGORY FILTERS & SEARCH) */}
      {/* ============================================================ */}
      <section id="brochures" className="scroll-mt-28 bg-[#F8FAFC] text-[#0B2341] py-16 sm:py-24 px-6 sm:px-12 lg:px-16 border-b border-slate-200">
        <span id="media" className="scroll-mt-28" />
        <span id="tenders" className="scroll-mt-28" />
        <div className="max-w-[1440px] mx-auto space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-3">
                <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#0B2341] font-bold uppercase">
                  03. EXPLORE INSIGHTS
                </span>
                <span className="w-10 h-[1.5px] bg-[#C5963D]" />
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341] mt-1">
                Knowledge & Editorial Directory
              </h2>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search publications or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-full pl-10 pr-4 py-2 text-xs font-sans-ui focus:outline-none focus:border-[#C5963D] shadow-sm text-[#0B2341]"
              />
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-sans-ui font-medium transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B2341] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-[#C5963D] hover:text-[#0B2341]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 04. INSIGHT GRID (EDITORIAL CARDS) */}
      {/* ============================================================ */}
      <section className="bg-[#F8FAFC] text-[#0B2341] py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto space-y-10">
          
          <div className="flex items-center justify-between">
            <div className="text-xs font-sans-ui text-slate-500">
              Showing <span className="font-bold text-[#0B2341]">{filteredInsights.length}</span> publications
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#C5963D]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#0B2341]/85 backdrop-blur-md text-white text-[10px] font-sans-ui font-semibold px-3 py-1 rounded-full border border-white/20">
                      {article.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] font-sans-ui text-slate-400">
                      <span className="text-[#C5963D] font-medium">{article.publish_date}</span>
                      <span>•</span>
                      <span>{article.read_time}</span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#0B2341] group-hover:text-[#C5963D] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="font-sans-ui text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                  <div className="text-[11px] font-sans-ui text-slate-400 font-medium">
                    By <span className="text-[#0B2341] font-semibold">{article.author}</span>
                  </div>

                  <Link
                    to={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-sans-ui font-semibold text-[#0B2341] hover:text-[#C5963D] transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 05. INDUSTRY PERSPECTIVES */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] text-white py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
                05. INDUSTRY PERSPECTIVES
              </span>
              <span className="w-12 h-[1.5px] bg-[#C5963D]" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-white">
              Thinking beyond the project.
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-slate-300 max-w-2xl font-light">
              Deep analytical breakdowns covering regulatory shifts, BOT & HAM concession structures, and long-term asset extension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="text-xs font-sans-ui text-[#C5963D] font-bold uppercase tracking-wider">Policy & Regulatory</div>
              <h3 className="font-editorial text-2xl font-bold text-white">NHAI Toll Concession Standards</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Evaluating recent MoRTH fee collection guidelines, FASTag satellite integration, and penalty structure updates for concessionaires.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="text-xs font-sans-ui text-[#C5963D] font-bold uppercase tracking-wider">Technical Analysis</div>
              <h3 className="font-editorial text-2xl font-bold text-white">Overload Tariff Enforcement</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                How Weigh-In-Motion (WIM) optical sensor data is protecting asphalt pavement life while ensuring 100% overload revenue recovery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-[#C5963D] transition-all">
              <div className="text-xs font-sans-ui text-[#C5963D] font-bold uppercase tracking-wider">Operational Audit</div>
              <h3 className="font-editorial text-2xl font-bold text-white">Zero-Leakage Assurance</h3>
              <p className="font-sans-ui text-xs text-slate-300 leading-relaxed font-light">
                Unscheduled field audit protocols and AI video log analytics maintaining strict financial accuracy across toll plazas.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 06. NEWSLETTER / UPDATES (RESTRAINED NAVY SECTION) */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#0B2341] to-[#07172c] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10 text-center relative">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              06. STAY INFORMED
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl font-normal text-white">
            Get the latest perspectives from KRITISHA.
          </h2>

          <p className="font-sans-ui text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            Subscribe to receive bi-weekly infrastructure intelligence reports, toll policy updates, and engineering audits directly in your inbox.
          </p>

          <form onSubmit={handleSubscribeSubmit} className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your professional email..."
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3.5 text-xs font-sans-ui text-white placeholder-slate-400 focus:outline-none focus:border-[#C5963D]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold text-xs font-sans-ui px-8 py-3.5 rounded-full transition-all shrink-0 cursor-pointer shadow-lg"
            >
              Subscribe
            </button>
          </form>

          {emailSubscribed && (
            <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-sans-ui bg-emerald-950/80 border border-emerald-500/30 px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed successfully to KRITISHA Insights!</span>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 07. FINAL CTA */}
      {/* ============================================================ */}
      <section className="bg-[#0B2341] py-20 sm:py-28 px-6 sm:px-12 lg:px-16 border-t border-white/10 text-center relative">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 justify-center">
            <span className="text-[11px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-semibold uppercase">
              07. PARTNER WITH US
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-6xl font-normal text-white tracking-tight">
            Have a project in mind?
          </h2>

          <p className="font-sans-ui text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Let’s discuss how KRITISHA can deliver turnkey toll operations, civil engineering, and strategic due diligence for your asset.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquire('Insights Consultation')}
              className="inline-flex items-center gap-3 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold px-8 py-3.5 rounded-full transition-all text-xs sm:text-sm shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans-ui font-medium text-slate-200 hover:text-white border border-white/20 hover:border-[#C5963D] px-7 py-3.5 rounded-full transition-all"
            >
              <span>Contact Publication Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
