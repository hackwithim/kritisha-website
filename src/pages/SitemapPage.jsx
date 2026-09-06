import React from 'react';
import { Link } from 'react-router-dom';

export default function SitemapPage() {
  const sitemapLinks = [
    {
      title: "Main Pages",
      links: [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Our Projects", path: "/projects" },
        { label: "Services", path: "/services" },
        { label: "News & Insights", path: "/insights" },
        { label: "Careers", path: "/careers" },
        { label: "Contact Us", path: "/contact" },
      ]
    },
    {
      title: "Services Overview",
      links: [
        { label: "Road Infrastructure", path: "/services#toll-plaza-operations" },
        { label: "Urban Development", path: "/services#airport-operations" },
        { label: "Industrial Infrastructure", path: "/services#airport-parking" },
        { label: "Advisory & Consulting", path: "/services#consultancy-services" },
        { label: "Sustainable Solutions", path: "/services#manpower-solutions" },
      ]
    },
    {
      title: "Legal & Policies",
      links: [
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms of Use", path: "/terms-of-use" },
        { label: "Sitemap", path: "/sitemap" },
      ]
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#0B2341] mb-8">Sitemap</h1>
        <p className="font-sans-ui text-slate-600 mb-12">
          Navigate through the KRITISHA Infrastructure website using the links below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {sitemapLinks.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-[#0B2341] pb-2 border-b border-slate-200">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.path}
                      className="font-sans-ui text-slate-700 hover:text-[#C5963D] transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-[#C5963D] rounded-full"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
