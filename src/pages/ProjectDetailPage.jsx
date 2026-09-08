import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, MapPin, Ruler, Layers, Shield, Play, ChevronRight, CheckCircle2 } from 'lucide-react';
import { getProjects, useCmsLiveStore } from '../lib/cmsStore';
import SEO from '../components/SEO';

export default function ProjectDetailPage({ onOpenVideo, onOpenEnquire }) {
  const { slug } = useParams();
  const projects = useCmsLiveStore(getProjects);
  const project = projects.find(p => p.slug === slug) || projects[0] || {};

  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Gallery', 'Impact', 'Related Projects'];

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white pt-16 sm:pt-20">
      <SEO 
        title={project.title}
        description={`Kritisha Project: ${project.title}. Connecting Communities. Creating Opportunities.`}
        image={project.featured_image}
      />
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[55vh] flex items-center py-16 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.featured_image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341] via-[#0B2341]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-sans-ui">
              <Link to="/" className="hover:text-[#C5963D]">Home</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <Link to="/projects" className="hover:text-[#C5963D]">Projects</Link>
              <ChevronRight className="w-3 h-3 text-slate-500" />
              <span className="text-[#DDBB73]">{project.title}</span>
            </div>

            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#C5963D]" />
              <span className="text-xs font-sans-ui tracking-[0.2em] text-[#DDBB73] font-semibold uppercase">
                PROJECT LANDMARK
              </span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-white leading-tight">
              {project.title}
            </h1>

            <p className="font-sans-ui text-slate-300 text-base sm:text-lg max-w-xl font-light">
              Connecting Communities. Creating Opportunities.
            </p>
          </div>

          <div className="hidden lg:flex lg:col-span-4 flex-col items-end pr-4">
            <div className="flex flex-col items-center gap-6 text-xs tracking-[0.3em] font-sans-ui text-slate-300">
              <span>PEOPLE</span>
              <div className="w-[1px] h-8 bg-white/20" />
              <span>PLACES</span>
              <div className="w-[1px] h-8 bg-white/20" />
              <span>POSSIBILITIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB BAR NAVIGATION */}
      <section className="bg-[#163F68]/40 border-y border-white/10 px-4 sm:px-8 sticky top-[56px] sm:top-[64px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto py-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm font-sans-ui font-medium transition-all pb-1 whitespace-nowrap border-b-2 cursor-pointer ${
                activeTab === tab
                  ? 'border-[#C5963D] text-[#C5963D]'
                  : 'border-transparent text-slate-300 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* 3. OVERVIEW & METRICS GRID */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-white text-[#0B2341]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-sans-ui tracking-[0.2em] text-[#C5963D] font-bold uppercase">
                {project.tagline || "A NEW ERA OF CONNECTIVITY"}
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#0B2341]">
                {project.title}
              </h2>
              <p className="font-sans-ui text-slate-600 leading-relaxed text-sm sm:text-base">
                {project.full_description}
              </p>
            </div>

            {/* 4 Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-[#F5F7F9] p-4 rounded-xl border border-slate-200 space-y-1">
                <MapPin className="w-5 h-5 text-[#C5963D]" />
                <span className="text-[10px] font-sans-ui text-slate-500 uppercase">Location</span>
                <p className="font-editorial text-base font-bold text-[#0B2341]">{project.location}</p>
              </div>

              <div className="bg-[#F5F7F9] p-4 rounded-xl border border-slate-200 space-y-1">
                <Ruler className="w-5 h-5 text-[#C5963D]" />
                <span className="text-[10px] font-sans-ui text-slate-500 uppercase">Total Length</span>
                <p className="font-editorial text-base font-bold text-[#0B2341]">{project.total_length || '21.8 km'}</p>
              </div>

              <div className="bg-[#F5F7F9] p-4 rounded-xl border border-slate-200 space-y-1">
                <Layers className="w-5 h-5 text-[#C5963D]" />
                <span className="text-[10px] font-sans-ui text-slate-500 uppercase">Lanes</span>
                <p className="font-editorial text-base font-bold text-[#0B2341]">{project.lanes || '6 Lanes'}</p>
              </div>

              <div className="bg-[#F5F7F9] p-4 rounded-xl border border-slate-200 space-y-1">
                <Shield className="w-5 h-5 text-[#C5963D]" />
                <span className="text-[10px] font-sans-ui text-slate-500 uppercase">Scope</span>
                <p className="font-editorial text-xs font-semibold text-[#0B2341]">{project.scope}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROJECT IMPACT SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-[#F5F7F9] text-[#0B2341]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-sans-ui tracking-[0.2em] text-[#C5963D] font-bold uppercase">PROJECT IMPACT</span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0B2341]">Building a More Connected India.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Faster Connectivity</h3>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reduces travel time between South Mumbai and Navi Mumbai from 120 mins to 20 mins.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Economic Growth</h3>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed">
                Accelerates commercial and real estate development in Navi Mumbai and Raigad region.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-md">
              <div className="w-10 h-10 rounded-full bg-[#C5963D]/15 text-[#C5963D] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Improved Quality of Life</h3>
              <p className="font-sans-ui text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lower vehicle emissions and smooth signal-free transit over the sea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GALLERY GRID */}
      <section className="py-20 px-4 sm:px-8 bg-[#0B2341]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-2xl font-bold text-white">Project Gallery</h3>
            <span className="text-xs font-sans-ui text-[#DDBB73]">View All →</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(project.gallery || [
              "/images/hero_bridge.jpg",
              "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
            ]).map((img, i) => (
              <div key={i} className="h-56 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
