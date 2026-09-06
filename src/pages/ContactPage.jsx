import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { addEnquiry, getSiteSettings, useCmsLiveStore } from '../lib/cmsStore';

export default function ContactPage() {
  const settings = useCmsLiveStore(getSiteSettings);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_interest: 'General Infrastructure Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addEnquiry(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_interest: 'General Infrastructure Inquiry',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0B2341] text-slate-100 selection:bg-[#C5963D] selection:text-white pt-28 sm:pt-36 pb-20 px-4 sm:px-8">
      {/* CONTACT FORM CONTAINER */}
      <section id="contact-form" className="scroll-mt-28">
        <div id="faq" className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          
          {/* 1. FORM COLUMN (FIRST) */}
          <div className="lg:col-span-7 bg-white text-[#0B2341] p-8 sm:p-12 flex flex-col justify-center">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#C5963D]/20 border border-[#C5963D] text-[#C5963D] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-3xl font-bold text-[#0B2341]">Message Sent Successfully</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for writing to KRITISHA Infrastructure. Our representative will contact you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Send us a message</h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Fill out the form below and our team will get back to you within 24 business hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name"
                        className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@company.com"
                        className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                        className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Service Required</label>
                    <select
                      value={formData.service_interest}
                      onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                      className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                    >
                      <option value="Toll Plaza Operations">Toll Plaza Operations</option>
                      <option value="Airport Operations">Airport Operations</option>
                      <option value="Airport Parking">Airport Parking</option>
                      <option value="Manpower Solutions">Manpower Solutions</option>
                      <option value="Ropeway / Trolley Operations">Ropeway / Trolley Operations</option>
                      <option value="Surveillance & Storage">Surveillance & Storage</option>
                      <option value="Project Audit & Inspection">Project Audit & Inspection</option>
                      <option value="Consultancy Services">Consultancy Services</option>
                      <option value="Detailed Audit Reporting">Detailed Audit Reporting</option>
                      <option value="General Infrastructure Inquiry">General Infrastructure Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-sans-ui font-medium text-slate-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can KRITISHA assist your infrastructure goals?"
                      className="w-full bg-[#F5F7F9] border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-[#0B2341] focus:outline-none focus:border-[#C5963D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#C5963D] hover:bg-[#DDBB73] text-[#0B2341] font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-2"
                  >
                    <span>Send Enquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* 2. CONTACT INFO COLUMN (SECOND) */}
          <div className="lg:col-span-5 bg-[#0B2341] p-8 sm:p-12 flex flex-col justify-between space-y-12 border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[#C5963D]" />
                <span className="text-xs font-sans-ui tracking-[0.2em] text-[#DDBB73] font-semibold uppercase">
                  CONTACT US
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-white leading-tight">
                Let's build <br />
                what's next <br />
                <span className="text-[#C5963D] italic font-normal">together.</span>
              </h2>

              <div className="pt-6 space-y-6 text-sm text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#163F68] text-[#C5963D] flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-sans-ui mb-1">Corporate Office</h4>
                    <p className="leading-relaxed">
                      {settings.address || 'Office No. 319, Commodity Exchange Building, Sector 19, Vashi, Navi Mumbai, Maharashtra, India'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#163F68] text-[#C5963D] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-sans-ui mb-1">Phone</h4>
                    <a href={`tel:${settings.phone || '+91 7678050277'}`} className="hover:text-[#C5963D] transition-colors font-mono">
                      {settings.phone || '+91 7678050277'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#163F68] text-[#C5963D] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-sans-ui mb-1">Email</h4>
                    <a href={`mailto:${settings.email || 'info@kritishainfra.com'}`} className="hover:text-[#C5963D] transition-colors">
                      {settings.email || 'info@kritishainfra.com'}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-white/10 flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-[#163F68] hover:bg-[#C5963D] hover:text-[#0B2341] flex items-center justify-center transition-all text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-[#163F68] hover:bg-[#C5963D] hover:text-[#0B2341] flex items-center justify-center transition-all text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X Twitter" className="w-9 h-9 rounded-full bg-[#163F68] hover:bg-[#C5963D] hover:text-[#0B2341] flex items-center justify-center transition-all text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#163F68] hover:bg-[#C5963D] hover:text-[#0B2341] flex items-center justify-center transition-all text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
