import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User, ChevronRight, Share2, Tag, BookOpen, MapPin } from 'lucide-react';
import { getInsights, useCmsLiveStore } from '../lib/cmsStore';

export default function InsightDetailPage({ onOpenEnquire }) {
  const { slug } = useParams();
  const allInsights = useCmsLiveStore(getInsights);
  const article = allInsights.find(i => i.slug === slug) || allInsights[0] || {};

  const relatedArticles = allInsights
    .filter(i => i.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white">
      
      {/* HERO BANNER */}
      <section className="relative min-h-[60vh] flex items-center pt-32 sm:pt-36 pb-16 px-6 sm:px-12 lg:px-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={article.featured_image || '/images/hero_bridge.jpg'}
            alt={article.title}
            className="w-full h-full object-cover object-center scale-102 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B2341]/95 via-[#0B2341]/75 to-[#0B2341]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341] via-transparent to-[#0B2341]/40" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full space-y-6">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-sans-ui">
            <Link to="/" className="hover:text-[#C5963D]">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <Link to="/insights" className="hover:text-[#C5963D]">Insights</Link>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-[#C5963D] font-medium line-clamp-1">{article.category}</span>
          </div>

          <div className="inline-block px-3.5 py-1 rounded-full bg-[#C5963D]/20 text-[#C5963D] border border-[#C5963D]/30 text-xs font-sans-ui font-semibold uppercase tracking-wider">
            {article.category || 'PUBLICATION'}
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-sans-ui text-slate-300 pt-2 border-t border-white/10 max-w-4xl">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#C5963D]" />
              <span>By <strong className="text-white">{article.author || 'Jayant Khalatkar'}</strong> ({article.author_role || 'Managing Director'})</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C5963D]" />
              <span>{article.publish_date || 'August 2026'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5963D]" />
              <span>{article.read_time || '6 min read'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY & SIDEBAR */}
      <section className="bg-white text-[#0B2341] py-16 sm:py-24 px-6 sm:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Editorial Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-6 rounded-2xl bg-[#F8FAFC] border-l-4 border-[#C5963D] font-sans-ui text-base sm:text-lg text-slate-700 italic leading-relaxed">
              "{article.excerpt}"
            </div>

            <div className="prose prose-lg max-w-none text-slate-700 font-sans-ui leading-relaxed space-y-6">
              {article.content ? (
                article.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="font-editorial text-2xl font-bold text-[#0B2341] pt-4">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  return <p key={index} className="text-sm sm:text-base text-slate-700 leading-relaxed">{paragraph}</p>;
                })
              ) : (
                <p>Full publication content currently under editorial review.</p>
              )}
            </div>

            {/* Author Footer Card */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-sans-ui text-slate-400 uppercase tracking-wider font-semibold">Author</div>
                <div className="font-editorial text-xl font-bold text-[#0B2341]">{article.author}</div>
                <div className="text-xs font-sans-ui text-[#C5963D] font-medium">{article.author_role}</div>
              </div>
              <button
                onClick={() => onOpenEnquire(`Inquiry regarding article: ${article.title}`)}
                className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-sans-ui font-semibold px-6 py-3 rounded-full transition-all"
              >
                <span>Consult Author</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5963D]" />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Consultation Callout */}
            <div className="p-8 rounded-2xl bg-[#0B2341] text-white space-y-4">
              <div className="text-xs font-sans-ui text-[#C5963D] uppercase tracking-wider font-semibold">
                INFRASTRUCTURE CONSULTANCY
              </div>
              <h3 className="font-editorial text-2xl font-bold text-white">
                Have a similar operational challenge?
              </h3>
              <p className="font-sans-ui text-xs text-slate-300 font-light leading-relaxed">
                Consult with KRITISHA senior directors on toll plaza management, revenue audits, and ITS technology integration.
              </p>
              <button
                onClick={() => onOpenEnquire(article.title)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-semibold text-xs py-3 px-6 rounded-full transition-all shadow-lg cursor-pointer"
              >
                <span>Schedule Discussion</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Related Insights */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="font-editorial text-xl font-bold text-[#0B2341]">Related Publications</h4>
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/insights/${rel.slug}`}
                  className="group block p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 hover:border-[#C5963D] transition-all space-y-2"
                >
                  <div className="text-[10px] font-sans-ui text-[#C5963D] font-bold uppercase">{rel.category}</div>
                  <h5 className="font-editorial text-base font-bold text-[#0B2341] group-hover:text-[#C5963D] transition-colors leading-snug">
                    {rel.title}
                  </h5>
                  <div className="text-[11px] font-sans-ui text-slate-400">{rel.publish_date}</div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
