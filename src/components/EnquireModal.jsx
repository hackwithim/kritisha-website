import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  User,
  Building2,
  Mail,
  Phone,
  ListFilter,
  ChevronDown,
  MessageSquare,
  Lock,
  ShieldCheck,
  Target,
  Award,
  Navigation
} from 'lucide-react';
import { addEnquiry } from '../lib/cmsStore';
import ImagePickerInput from './ImagePickerInput';

export default function EnquireModal({ isOpen, onClose, initialService = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_interest: initialService || 'General Infrastructure Inquiry',
    message: '',
    site_image: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

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
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#040C18]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-[960px] bg-[#07172A] border border-[#1A3456] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-slate-100 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#122742] hover:bg-[#1A385E] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-20 px-8 text-center space-y-4">
            <div className="w-16 h-16 bg-[#C5963D]/20 border border-[#C5963D] text-[#C5963D] rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-3xl font-bold text-white">Enquiry Received</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
              Thank you for connecting with KRITISHA Infrastructure. Our corporate team will reach out to you shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* LEFT SIDE BORDER & BANNER (Col 5) */}
            <div className="relative lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between overflow-hidden text-white border-b lg:border-b-0 lg:border-r border-[#1A3456]">
              {/* Background Image: Concrete Bridge & Sky */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/hero_expertise.jpg"
                  alt="KRITISHA Infrastructure Expressway Bridge"
                  className="w-full h-full object-cover object-center scale-105"
                />
                {/* Custom Gradient Overlays for perfect readability & reference match */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#091F38]/92 via-[#081B32]/85 to-[#061527]/96" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#091F38]/80 via-transparent to-[#07172A]" />
              </div>

              {/* TOP BRAND HEADER */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-3">
                  <span className="text-[10px] sm:text-[11px] font-sans-ui tracking-[0.24em] text-slate-300 font-semibold uppercase">
                    KRITISHA INFRASTRUCTURE
                  </span>
                  <span className="w-9 h-[1.5px] bg-[#C5963D]" />
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[40px] font-normal text-white leading-[1.12] pt-4 tracking-tight">
                  Let’s Build <br />
                  What’s <span className="text-[#C5963D] font-normal">Next</span>
                </h2>

                <p className="text-xs sm:text-[13px] text-slate-300 font-light leading-relaxed pt-3 max-w-[270px]">
                  Share your requirements and our team will get in touch with you shortly.
                </p>
              </div>

              {/* MIDDLE FEATURE POINTS */}
              <div className="relative z-10 space-y-3.5 my-8 sm:my-10 text-xs sm:text-[13px] font-sans-ui text-slate-200">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[#C5963D] shrink-0" />
                  <span className="font-medium">Infrastructure Expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#C5963D] shrink-0" />
                  <span className="font-medium">End-to-End Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-[#C5963D] shrink-0" />
                  <span className="font-medium">Pan-India Presence</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#C5963D] shrink-0" />
                  <span className="font-medium">Trusted Partnership</span>
                </div>
              </div>

              {/* BOTTOM LEFT CORNER BADGE */}
              <div className="relative z-10 pt-4 border-t border-white/15">
                <div className="flex flex-col text-[9px] sm:text-[9.5px] font-sans-ui tracking-[0.28em] text-slate-400 font-medium uppercase leading-snug">
                  <span>PEOPLE</span>
                  <span>PROJECTS</span>
                  <span>PROGRESS</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM CONTAINER (Col 7) */}
            <div className="relative lg:col-span-7 p-6 sm:p-9 bg-[#07172A] text-slate-100 flex flex-col justify-between">
              <div>
                {/* HEADER */}
                <div className="mb-6 pr-8">
                  <span className="text-[10px] sm:text-[10.5px] font-sans-ui tracking-[0.24em] text-[#C5963D] font-bold uppercase block mb-1">
                    START A CONVERSATION
                  </span>
                  <h3 className="font-editorial text-3xl sm:text-[34px] font-normal text-white tracking-tight">
                    Enquire Now
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-light mt-1 leading-relaxed">
                    Partner with India's leading infrastructure and operational solutions team.
                  </p>
                </div>

                {/* FORM FIELDS */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* ROW 1: NAME & COMPANY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rahul Mehta"
                          className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                        Company / Organisation
                      </label>
                      <div className="relative flex items-center">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. ABC Infra Ltd"
                          className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROW 2: EMAIL & PHONE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROW 3: SERVICE INTEREST */}
                  <div>
                    <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                      Service Interest
                    </label>
                    <div className="relative flex items-center">
                      <ListFilter className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                      <select
                        value={formData.service_interest}
                        onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                        className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all appearance-none cursor-pointer"
                      >
                        <option value="General Infrastructure Inquiry">General Infrastructure Inquiry</option>
                        <option value="Toll Plaza Management">Toll Plaza Management & FASTag</option>
                        <option value="Eco Transit & Golf Carts">Eco Transit & Golf Cart Operations</option>
                        <option value="Highways & HAM Construction">Highways & HAM Infrastructure Construction</option>
                        <option value="Manpower Supply">Infrastructure Manpower Supply</option>
                        <option value="Dams & Irrigation">Dams, Canals & Irrigation Works</option>
                        <option value="Vigilance & Audits">Vigilance & Revenue Leakage Audits</option>
                        <option value="Multimedia Laser Shows">Multimedia & Laser Show Project Delivery</option>
                        <option value="PPP Concession Bidding">PPP & Concession Bidding Consultancy</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* ROW 4: PROJECT MESSAGE */}
                  <div>
                    <label className="block text-[11.5px] font-sans-ui font-medium text-slate-300 mb-1.5">
                      Project Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <textarea
                        required
                        rows={3}
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your infrastructure project requirements..."
                        className="w-full bg-[#0D223B]/80 border border-[#1B385D] rounded-xl pl-10 pr-3.5 pt-2.5 pb-7 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all resize-none"
                      />
                      <span className="absolute right-3.5 bottom-2 text-[10px] text-slate-400 font-sans-ui">
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* ROW 5: OPTIONAL SITE PHOTO / BLUEPRINT ATTACHMENT */}
                  <div>
                    <ImagePickerInput
                      label="Attach Site Photo / Blueprint (Optional)"
                      value={formData.site_image}
                      onChange={(url) => setFormData(prev => ({ ...prev, site_image: url }))}
                      placeholder="Upload file or paste image URL..."
                      aspectRatio="landscape"
                      helpText="Attach a project site photo, technical diagram, or blueprint image to your enquiry."
                      dark={true}
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E2AD4A] hover:bg-[#F0BE5E] active:scale-[0.99] text-[#07172A] font-semibold text-sm sm:text-base rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer mt-1"
                  >
                    <span>Submit Enquiry</span>
                    <Navigation className="w-4 h-4 rotate-90 stroke-[2.2]" />
                  </button>
                </form>
              </div>

              {/* PRIVACY GUARANTEE */}
              <div className="flex items-center justify-center gap-1.5 pt-4 text-[11px] text-slate-400 font-light">
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Your information is secure and will only be used to respond to your enquiry.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
