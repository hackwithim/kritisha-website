import React, { useState, useEffect } from 'react';
import { 
  X, MapPin, Briefcase, BarChart3, CheckCircle2, 
  GraduationCap, Award, User, Mail, Phone, Upload, 
  FileText, Lightbulb, ArrowRight, Send, Pencil
} from 'lucide-react';
import { addApplication } from '../lib/cmsStore';

export default function CareerApplicationModal({ isOpen, onClose, job = null }) {
  const [appForm, setAppForm] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    resume_file: null,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setAppForm({
        applicant_name: '',
        applicant_email: '',
        applicant_phone: '',
        resume_file: null,
        message: ''
      });
    }
  }, [isOpen, job]);

  if (!isOpen) return null;

  const currentJob = job || {
    title: 'Senior Toll Plaza Operations Executive',
    department: 'Operations',
    location: 'Navi Mumbai / Pan India',
    employment_type: 'Full Time',
    experience_range: '5-8 Years',
    short_description: 'We are looking for a dynamic and experienced professional to manage toll plaza operations, ensuring smooth infrastructure management, operational efficiency, and regulatory compliance.',
    responsibilities: [
      'Oversee daily toll plaza operations',
      'Ensure compliance with regulatory standards',
      'Manage teams and vendor coordination',
      'Monitor performance and resolve operational issues'
    ],
    requirements: [
      'Degree / Diploma in Engineering, Logistics, or Infrastructure Management',
      '5+ years of hands-on experience in highway toll plaza management',
      'Strong leadership, audit reconciliation, and incident response capabilities'
    ]
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    let resumeData = null;
    if (appForm.resume_file) {
      try {
        resumeData = URL.createObjectURL(appForm.resume_file);
      } catch (err) {
        console.error('Failed to create object URL:', err);
      }
    }
    addApplication({
      career_id: currentJob.id || 'open-app',
      position_applied: currentJob.title,
      ...appForm,
      resume_url: appForm.resume_file ? appForm.resume_file.name : 'resume_document.pdf',
      resume_data: resumeData
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop with Blur */}
      <div 
        className="fixed inset-0 bg-[#071322]/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[1040px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto text-slate-800 border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-20 px-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-3xl font-bold text-[#0B2341]">Application Submitted!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-sans-ui">
              Thank you for applying for <span className="font-semibold text-[#0B2341]">{currentJob.title}</span>. Our HR team will review your application and reach out shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[620px]">
            
            {/* LEFT COLUMN: JOB DETAIL & REQUIREMENTS */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/80 bg-[#FAFAFC]">
              
              {/* Dark Navy Header Section */}
              <div className="relative bg-[#0B2341] p-6 sm:p-8 text-white overflow-hidden">
                {/* Decorative Topo / Grid Lines Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] font-sans-ui tracking-[0.25em] text-slate-300 font-semibold uppercase">
                      CAREERS AT KRITISHA
                    </span>
                    <span className="w-6 h-[1.5px] bg-[#C5963D]" />
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white leading-tight tracking-tight">
                    {currentJob.title}
                  </h2>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-sans-ui text-slate-200">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5963D] shrink-0" />
                      <span>{currentJob.location || 'Pan India'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#C5963D] shrink-0" />
                      <span>{currentJob.employment_type || 'Full Time'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-[#C5963D] shrink-0" />
                      <span>Exp: {currentJob.experience_range || '3-5 Years'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Left Body Scrollable Section */}
              <div className="p-6 sm:p-8 space-y-6 text-xs text-slate-600 leading-relaxed font-sans-ui flex-1 max-h-[500px] overflow-y-auto">
                
                {/* About the Role */}
                <div className="space-y-2">
                  <h3 className="font-bold text-[#0B2341] text-sm">About the Role</h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    {currentJob.short_description || currentJob.bio || 'We are looking for a dynamic and experienced professional to manage toll plaza operations, ensuring smooth infrastructure management, operational efficiency, and regulatory compliance.'}
                  </p>

                  {/* Callout Box */}
                  <div className="bg-[#FFF9EE] border border-[#FCEECB] rounded-2xl p-4 flex items-center gap-3.5 mt-3">
                    <div className="w-9 h-9 rounded-full bg-[#FCEECB]/80 text-[#C5963D] flex items-center justify-center shrink-0 shadow-2xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <p className="font-bold text-[#0B2341] text-xs leading-snug">
                      Be a part of building smarter infrastructure for a better tomorrow.
                    </p>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="space-y-2.5">
                  <h3 className="font-bold text-[#0B2341] text-sm">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {currentJob.responsibilities && currentJob.responsibilities.length > 0 ? (
                      currentJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" /><span>Oversee daily toll plaza operations</span></li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" /><span>Ensure compliance with regulatory standards</span></li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" /><span>Manage teams and vendor coordination</span></li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-[#C5963D] shrink-0 mt-0.5" /><span>Monitor performance and resolve operational issues</span></li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="space-y-2.5">
                  <h3 className="font-bold text-[#0B2341] text-sm">Requirements</h3>
                  <ul className="space-y-2.5">
                    {currentJob.requirements && currentJob.requirements.length > 0 ? (
                      currentJob.requirements.map((req, idx) => {
                        const icon = idx === 0 ? <GraduationCap className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                          : idx === 1 ? <Briefcase className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                          : <Award className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />;
                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            {icon}
                            <span>{req}</span>
                          </li>
                        );
                      })
                    ) : (
                      <>
                        <li className="flex items-start gap-2.5"><GraduationCap className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" /><span>Degree / Diploma in Engineering, Logistics, or Infrastructure Management</span></li>
                        <li className="flex items-start gap-2.5"><Briefcase className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" /><span>5+ years of hands-on experience in highway toll plaza management</span></li>
                        <li className="flex items-start gap-2.5"><Award className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" /><span>Strong leadership, audit reconciliation, and incident response capabilities</span></li>
                      </>
                    )}
                  </ul>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: APPLICATION FORM */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div>
                {/* Header */}
                <div className="mb-6 pr-8 space-y-1">
                  <div className="inline-flex items-center gap-2">
                    <span className="text-[10px] font-sans-ui tracking-[0.2em] text-[#C5963D] font-bold uppercase">
                      APPLY NOW
                    </span>
                    <span className="w-6 h-[1.5px] bg-[#C5963D]" />
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341] tracking-tight">
                    Submit Your Application
                  </h2>
                  <p className="text-xs text-slate-500 font-sans-ui font-light">
                    Fill in your details below and take the next step with us.
                  </p>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleApplySubmit} className="space-y-4 font-sans-ui">
                  
                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Full Name *
                      </label>
                      <div className="relative flex items-center">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={appForm.applicant_name}
                          onChange={(e) => setAppForm({ ...appForm, applicant_name: e.target.value })}
                          placeholder="e.g. Rajesh Kumar"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Email Address *
                      </label>
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="email"
                          required
                          value={appForm.applicant_email}
                          onChange={(e) => setAppForm({ ...appForm, applicant_email: e.target.value })}
                          placeholder="rajesh.k@example.com"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Resume */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative flex items-center">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={appForm.applicant_phone}
                          onChange={(e) => setAppForm({ ...appForm, applicant_phone: e.target.value })}
                          placeholder="+91 98211 00998"
                          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        Resume *
                      </label>
                      <div className="relative bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 flex items-center justify-between hover:border-[#C5963D] transition-colors cursor-pointer">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                          <span className="text-xs text-slate-600 truncate">
                            {appForm.resume_file ? appForm.resume_file.name : 'Upload Resume (PDF / DOCX)'}
                          </span>
                        </div>
                        <Upload className="w-4 h-4 text-[#C5963D] shrink-0" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={(e) => setAppForm({ ...appForm, resume_file: e.target.files[0] })}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-1">Max size: 5 MB</span>
                    </div>
                  </div>

                  {/* Row 3: Cover Note / Key Achievements */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      Cover Note / Key Achievements
                    </label>
                    <div className="relative">
                      <Pencil className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                      <textarea
                        rows={3}
                        maxLength={500}
                        value={appForm.message}
                        onChange={(e) => setAppForm({ ...appForm, message: e.target.value })}
                        placeholder="Briefly describe your site experience and key accomplishments..."
                        className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-all resize-none"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 text-right block mt-1">
                      {appForm.message.length}/500
                    </span>
                  </div>

                  {/* Tips Box */}
                  <div className="bg-[#F4F8FB] border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3 mt-2">
                    <Lightbulb className="w-5 h-5 text-[#C5963D] shrink-0 mt-0.5" />
                    <div className="space-y-1 text-slate-700">
                      <h4 className="text-xs font-bold text-slate-800">Tips for a strong application</h4>
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-0.5">
                        <li>Highlight relevant infrastructure or operations experience.</li>
                        <li>Mention key achievements with measurable impact.</li>
                        <li>Keep your resume updated and concise.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-lg transition-all cursor-pointer group"
                    >
                      <Send className="w-4 h-4 text-[#C5963D] rotate-45" />
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </form>

                {/* Footer Caption */}
                <p className="text-[11px] text-slate-400 text-center block mt-3 font-sans-ui font-light">
                  We value diverse talent and are an equal opportunity employer.
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
