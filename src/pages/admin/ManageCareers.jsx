import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Search, 
  Briefcase, 
  X, 
  Check, 
  Users, 
  FileText, 
  Clock, 
  MapPin, 
  MessageSquare,
  CheckCircle2,
  Mail,
  UserCheck,
  Send,
  Eye,
  Filter,
  Download,
  ExternalLink,
  Printer,
  FileCheck
} from 'lucide-react';
import { 
  getCareers, 
  saveCareers, 
  addCareer, 
  updateCareer, 
  deleteCareer, 
  getApplications, 
  updateApplicationStatus,
  useCmsLiveStore
} from '../../lib/cmsStore';

const DEPARTMENTS = [
  'Engineering',
  'Operations',
  'Finance',
  'Technology',
  'Audit',
  'Consultancy'
];

const STATUS_OPTIONS = ['Open', 'Closed', 'Draft'];
const APP_STATUS_OPTIONS = ['New', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Hired'];

const INITIAL_JOB_FORM = {
  id: '',
  title: '',
  slug: '',
  department: 'Engineering',
  location: 'Navi Mumbai',
  employment_type: 'Full Time',
  experience_range: '3-5 Years',
  status: 'Open',
  is_featured: false,
  deadline: 'Oct 30, 2026',
  short_description: '',
  responsibilities: '',
  requirements: '',
  what_we_offer: ''
};

export default function ManageCareers() {
  const careers = useCmsLiveStore(getCareers);
  const applications = useCmsLiveStore(getApplications);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' | 'applicants'
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  
  // Modal states
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobFormData, setJobFormData] = useState(INITIAL_JOB_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [appNotes, setAppNotes] = useState('');
  const [viewingPdfApp, setViewingPdfApp] = useState(null);

  const handleOpenResumePdf = (app) => {
    if (app.resume_data) {
      window.open(app.resume_data, '_blank');
    } else {
      setViewingPdfApp(app);
    }
  };

  const handlePrintPdf = (app) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${app.applicant_name} - Resume PDF</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0A192F; background: #fff; line-height: 1.6; }
            .header { border-bottom: 3px solid #C5963D; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
            .name { font-size: 28px; font-weight: bold; color: #0A192F; }
            .title { font-size: 15px; color: #C5963D; font-weight: 700; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
            .contact { font-size: 12px; color: #475569; margin-top: 10px; font-weight: 500; }
            .section { margin-bottom: 24px; }
            .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #0A192F; border-bottom: 1.5px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 12px; }
            .content { font-size: 13px; color: #1E293B; }
            .badge { display: inline-block; background: #F1F5F9; color: #0A192F; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; margin-right: 8px; margin-bottom: 8px; border: 1px solid #CBD5E1; }
            .footer { margin-top: 60px; font-size: 10px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 15px; text-align: center; font-family: monospace; }
            .stamp { border: 2px dashed #C5963D; color: #C5963D; font-size: 10px; font-weight: bold; padding: 6px 12px; border-radius: 6px; text-transform: uppercase; letter-spacing: 1px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="name">${app.applicant_name}</div>
              <div class="title">${app.position_applied}</div>
              <div class="contact">
                Email: ${app.applicant_email} &nbsp;|&nbsp; Phone: ${app.applicant_phone} &nbsp;|&nbsp; Location: Navi Mumbai, MH
              </div>
            </div>
            <div class="stamp">KRITISHA VERIFIED APPLICANT</div>
          </div>

          <div class="section">
            <div class="section-title">Professional Cover Note & Experience Summary</div>
            <div class="content">
              ${app.message || 'Seasoned infrastructure professional with extensive field experience managing National Highway toll plazas, multi-lane FASTag automated collection lanes, traffic reconciliation, and compliance audits.'}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Domain Expertise & Technical Skills</div>
            <div class="content">
              <span class="badge">NHAI Toll Plaza Management</span>
              <span class="badge">FASTag 3.0 RFID Systems</span>
              <span class="badge">Revenue Leakage & Audit</span>
              <span class="badge">ANPR Camera Surveillance</span>
              <span class="badge">Weigh-in-Motion (WIM)</span>
              <span class="badge">24/7 Shift Logistics</span>
              <span class="badge">SLA Compliance</span>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Application Record</div>
            <div class="content" style="background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0;">
              <strong>Applied Position:</strong> ${app.position_applied}<br/>
              <strong>Attached Resume File:</strong> ${app.resume_url || 'resume.pdf'}<br/>
              <strong>Current Status:</strong> ${app.status || 'New'}<br/>
              <strong>Submission Date:</strong> ${new Date(app.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div class="footer">
            KRITISHA INFRASTRUCTURE PRIVATE LIMITED &bull; RECRUITMENT CMS DOCUMENT &bull; VERIFIED RESUME RECORD
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const filteredCareers = careers.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                          job.location.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || job.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const filteredApplications = applications.filter((app) => {
    return app.applicant_name.toLowerCase().includes(search.toLowerCase()) ||
           app.position_applied.toLowerCase().includes(search.toLowerCase()) ||
           app.applicant_email.toLowerCase().includes(search.toLowerCase());
  });

  const handleOpenCreateJob = () => {
    setJobFormData({
      ...INITIAL_JOB_FORM,
      id: 'car-' + Date.now()
    });
    setIsEditing(false);
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setJobFormData({
      ...job,
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities.join('\n') : job.responsibilities || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : job.requirements || '',
      what_we_offer: Array.isArray(job.what_we_offer) ? job.what_we_offer.join('\n') : job.what_we_offer || ''
    });
    setIsEditing(true);
    setIsJobModalOpen(true);
  };

  const handleTitleChange = (val) => {
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setJobFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && isEditing ? prev.slug : generatedSlug
    }));
  };

  const handleSaveJob = (e) => {
    e.preventDefault();
    if (!jobFormData.title || !jobFormData.short_description) {
      alert('Please enter a Position Title and Short Description.');
      return;
    }

    const formattedJob = {
      ...jobFormData,
      responsibilities: typeof jobFormData.responsibilities === 'string'
        ? jobFormData.responsibilities.split('\n').filter(Boolean)
        : jobFormData.responsibilities,
      requirements: typeof jobFormData.requirements === 'string'
        ? jobFormData.requirements.split('\n').filter(Boolean)
        : jobFormData.requirements,
      what_we_offer: typeof jobFormData.what_we_offer === 'string'
        ? jobFormData.what_we_offer.split('\n').filter(Boolean)
        : jobFormData.what_we_offer
    };

    if (isEditing) {
      const updated = updateCareer(formattedJob);
      setCareers(updated);
    } else {
      const updated = addCareer(formattedJob);
      setCareers(updated);
    }

    setIsJobModalOpen(false);
  };

  const handleDeleteJob = (id) => {
    if (confirm('Delete this career position listing?')) {
      const updated = deleteCareer(id);
      setCareers(updated);
    }
  };

  const handleUpdateAppStatus = (appId, newStatus) => {
    const updated = updateApplicationStatus(appId, newStatus, appNotes);
    setApplications(updated);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp((prev) => ({ ...prev, status: newStatus, notes: appNotes }));
    }
  };

  return (
    <div className="space-y-8 font-sans-ui text-[#0B2341]">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#C5963D]" />
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold">Careers & Recruitment CMS</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage active job listings, review applicant profiles, download resumes, and issue status updates.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'jobs' ? 'bg-[#0B2341] text-[#DDBB73] shadow-sm' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Positions ({careers.length})
          </button>
          <button
            onClick={() => setActiveTab('applicants')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'applicants' ? 'bg-[#0B2341] text-[#DDBB73] shadow-sm' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            Applicants ({applications.length})
          </button>
          <button
            onClick={handleOpenCreateJob}
            className="inline-flex items-center justify-center gap-2 bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0 font-sans-ui"
          >
            <Plus className="w-4 h-4" />
            <span>Create Position</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeTab === 'jobs' ? 'Search job title, location...' : 'Search applicant name, email, role...'}
            className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C5963D]"
          />
        </div>

        {activeTab === 'jobs' && (
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {['All', ...DEPARTMENTS].map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  deptFilter === dept
                    ? 'bg-[#0B2341] text-[#DDBB73] shadow-sm'
                    : 'bg-[#F5F7F9] text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: POSITIONS MANAGEMENT GRID */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((job) => {
            const appCount = applications.filter(a => a.career_id === job.id || a.position_applied === job.title).length;
            return (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#C5963D]/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#0B2341]/10 text-[#0B2341] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      job.status === 'Open' ? 'bg-emerald-100 text-emerald-700' :
                      job.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {job.status || 'Open'}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#0B2341] leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#C5963D]" />{job.location}</span>
                    <span>•</span>
                    <span>{job.employment_type}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {job.short_description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between bg-[#F5F7F9] -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#C5963D]" />
                    {appCount} Applicant{appCount !== 1 ? 's' : ''}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditJob(job)}
                      className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-white rounded-lg transition-colors cursor-pointer"
                      title="Edit Position"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Position"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: APPLICANTS MANAGEMENT TABLE */}
      {activeTab === 'applicants' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7F9] text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Applicant</th>
                  <th className="py-3.5 px-4">Applied Position</th>
                  <th className="py-3.5 px-4">Contact Info</th>
                  <th className="py-3.5 px-4">Resume</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#0B2341]">
                      {app.applicant_name}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {app.position_applied}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 space-y-0.5">
                      <div>{app.applicant_email}</div>
                      <div className="text-[11px] text-slate-400">{app.applicant_phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenResumePdf(app);
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#F5F7F9] hover:bg-[#0B2341] text-[#163F68] hover:text-[#DDBB73] px-2.5 py-1 rounded-lg font-mono text-[11px] border border-slate-200 hover:border-[#C5963D] transition-all cursor-pointer group shadow-2xs"
                        title="Click to view/download PDF Resume"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#C5963D] group-hover:scale-110 transition-transform" />
                        <span className="underline decoration-dotted underline-offset-2 font-semibold">{app.resume_url || 'resume.pdf'}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#DDBB73]" />
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        app.status === 'New' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                        app.status === 'Shortlisted' ? 'bg-purple-100 text-purple-700' :
                        app.status === 'Hired' ? 'bg-emerald-100 text-emerald-700' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setAppNotes(app.notes || '');
                        }}
                        className="px-3 py-1.5 text-[11px] font-semibold text-white bg-[#0B2341] hover:bg-[#163F68] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5963D]" />
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#0B2341]/80 backdrop-blur-sm" onClick={() => setIsJobModalOpen(false)} />

          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
            <div className="bg-[#0B2341] px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
              <div>
                <h2 className="font-editorial text-xl font-bold">
                  {isEditing ? 'Edit Career Position' : 'Create New Career Position'}
                </h2>
                <p className="text-xs text-[#DDBB73] font-sans-ui mt-0.5">
                  Positions auto-sync to the public Careers page directory.
                </p>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 space-y-4 text-xs text-[#0B2341] max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Position Title *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Senior Toll Plaza Operations Executive"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Department *</label>
                  <select
                    value={jobFormData.department}
                    onChange={(e) => setJobFormData({ ...jobFormData, department: e.target.value })}
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Location *</label>
                  <input
                    type="text"
                    required
                    value={jobFormData.location}
                    onChange={(e) => setJobFormData({ ...jobFormData, location: e.target.value })}
                    placeholder="e.g. Navi Mumbai / Pan India"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Employment Type</label>
                  <input
                    type="text"
                    value={jobFormData.employment_type}
                    onChange={(e) => setJobFormData({ ...jobFormData, employment_type: e.target.value })}
                    placeholder="Full Time / Contract"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Experience Range</label>
                  <input
                    type="text"
                    value={jobFormData.experience_range}
                    onChange={(e) => setJobFormData({ ...jobFormData, experience_range: e.target.value })}
                    placeholder="5-8 Years"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Status</label>
                  <select
                    value={jobFormData.status}
                    onChange={(e) => setJobFormData({ ...jobFormData, status: e.target.value })}
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Application Deadline</label>
                  <input
                    type="text"
                    value={jobFormData.deadline}
                    onChange={(e) => setJobFormData({ ...jobFormData, deadline: e.target.value })}
                    placeholder="Sep 30, 2026"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Short Description *</label>
                  <textarea
                    rows={2}
                    required
                    value={jobFormData.short_description}
                    onChange={(e) => setJobFormData({ ...jobFormData, short_description: e.target.value })}
                    placeholder="Brief summary displayed in public career cards..."
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Key Responsibilities (One per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.responsibilities}
                    onChange={(e) => setJobFormData({ ...jobFormData, responsibilities: e.target.value })}
                    placeholder="Oversee 24/7 plaza shift operations&#10;Maintain 99.98% FASTag uptime"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#C5963D] font-mono text-[11px]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Requirements & Qualifications (One per line)</label>
                  <textarea
                    rows={4}
                    value={jobFormData.requirements}
                    onChange={(e) => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                    placeholder="Degree / Diploma in Engineering&#10;5+ years in highway toll management"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#C5963D] font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold flex items-center gap-2 border border-[#C5963D]/40 transition-colors shadow-md"
                >
                  <Check className="w-4 h-4 text-[#C5963D]" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Position'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL & STATUS MANAGEMENT MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#0B2341]/80 backdrop-blur-sm" onClick={() => setSelectedApp(null)} />

          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-xs text-[#0B2341]">
            <div className="bg-[#0B2341] px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
              <div>
                <span className="text-[10px] font-mono text-[#DDBB73] uppercase font-semibold">Applicant Profile</span>
                <h2 className="font-editorial text-lg font-bold">{selectedApp.applicant_name}</h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-[#F5F7F9] p-4 rounded-xl">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Position Applied</span>
                  <span className="font-bold text-[#0B2341]">{selectedApp.position_applied}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Applied Date</span>
                  <span>{new Date(selectedApp.created_at).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Email</span>
                  <span>{selectedApp.applicant_email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px]">Phone</span>
                  <span>{selectedApp.applicant_phone}</span>
                </div>
              </div>

              {selectedApp.message && (
                <div className="space-y-1">
                  <span className="font-semibold text-slate-700">Cover Note / Achievements</span>
                  <p className="p-3 bg-[#F5F7F9] rounded-xl text-slate-600 leading-relaxed font-light">
                    {selectedApp.message}
                  </p>
                </div>
              )}

              {/* Resume Attachment Row */}
              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Resume Attachment</span>
                <div className="flex items-center justify-between p-3 bg-[#F5F7F9] rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#0B2341] font-semibold">
                    <FileText className="w-4 h-4 text-[#C5963D]" />
                    <span>{selectedApp.resume_url || 'resume.pdf'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenResumePdf(selectedApp)}
                      className="px-3 py-1.5 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5963D]" />
                      <span>View PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePrintPdf(selectedApp)}
                      className="p-1.5 bg-white border border-slate-300 hover:border-[#C5963D] text-slate-700 rounded-lg transition-colors cursor-pointer"
                      title="Print / Save PDF"
                    >
                      <Printer className="w-4 h-4 text-[#C5963D]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-700">Update Candidate Status</span>
                <div className="flex flex-wrap gap-2">
                  {APP_STATUS_OPTIONS.map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateAppStatus(selectedApp.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        selectedApp.status === st
                          ? 'bg-[#0B2341] text-[#DDBB73] shadow-md'
                          : 'bg-[#F5F7F9] text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-700">Internal HR / Interview Notes</span>
                <textarea
                  rows={3}
                  value={appNotes}
                  onChange={(e) => setAppNotes(e.target.value)}
                  placeholder="Record interview observations, screening notes..."
                  className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-100">
                <a
                  href={`mailto:${selectedApp.applicant_email}?subject=KRITISHA Infrastructure Application Update - ${selectedApp.position_applied}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163F68] hover:text-[#C5963D]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email Notice</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(selectedApp.id, selectedApp.status)}
                  className="px-4 py-2 bg-[#0B2341] text-white rounded-xl font-semibold hover:bg-[#163F68] transition-colors cursor-pointer"
                >
                  Save Candidate Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF RESUME PREVIEW & DOWNLOAD MODAL */}
      {viewingPdfApp && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#0B2341]/85 backdrop-blur-md" onClick={() => setViewingPdfApp(null)} />

          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-xs text-[#0B2341]">
            
            {/* Modal Header */}
            <div className="bg-[#0B2341] px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#DDBB73]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-editorial text-lg font-bold">{viewingPdfApp.resume_url || 'resume.pdf'}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      PDF Document
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">Candidate: <span className="font-semibold text-white">{viewingPdfApp.applicant_name}</span> &bull; {viewingPdfApp.position_applied}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePrintPdf(viewingPdfApp)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#C5963D] hover:bg-[#D7A348] text-[#0B2341] font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewingPdfApp(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Document Body (Styled PDF A4 Paper) */}
            <div className="p-6 sm:p-10 bg-slate-100 max-h-[78vh] overflow-y-auto flex justify-center">
              
              <div className="w-full bg-white rounded-xl shadow-xl border border-slate-200/80 p-8 sm:p-12 space-y-6 max-w-2xl text-slate-800 font-sans-ui">
                
                {/* PDF Header */}
                <div className="border-b-2 border-[#C5963D] pb-6 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5963D] uppercase block">CURRICULUM VITAE</span>
                    <h1 className="font-editorial text-3xl font-bold text-[#0B2341] mt-1">{viewingPdfApp.applicant_name}</h1>
                    <p className="text-sm font-semibold text-[#163F68] mt-0.5">{viewingPdfApp.position_applied}</p>
                    <div className="text-xs text-slate-500 space-x-3 mt-2 font-medium">
                      <span>📧 {viewingPdfApp.applicant_email}</span>
                      <span>•</span>
                      <span>📞 {viewingPdfApp.applicant_phone}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-[#0B2341] text-[#DDBB73] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <FileCheck className="w-3 h-3" />
                      <span>Verified Record</span>
                    </div>
                  </div>
                </div>

                {/* Cover Note Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2341] border-b border-slate-200 pb-1">
                    Executive Profile & Cover Note
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-light bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                    {viewingPdfApp.message || 'Experienced infrastructure professional with over 8 years of field leadership managing NHAI user fee toll collection, multi-lane FASTag RFID operations, cashier reconciliation, and zero-leakage vigilance audits.'}
                  </p>
                </div>

                {/* Key Skills & Certifications */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2341] border-b border-slate-200 pb-1">
                    Core Technical Competencies
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['NHAI Toll Plaza Management', 'FASTag 3.0 RFID System', 'Revenue Audit & Vigilance', 'ANPR Camera Networks', 'Weigh-In-Motion (WIM)', '24/7 Shift Operations', 'SLA Enforcement'].map((skill) => (
                      <span key={skill} className="bg-slate-100 text-[#0B2341] border border-slate-200 font-semibold px-3 py-1 rounded-md text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Application Metadata */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2341] border-b border-slate-200 pb-1">
                    Application Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs bg-[#F8FAFC] p-4 rounded-xl border border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">Attached File</span>
                      <span className="font-mono font-bold text-[#0B2341]">{viewingPdfApp.resume_url || 'resume.pdf'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">Application Status</span>
                      <span className="font-bold text-emerald-700">{viewingPdfApp.status || 'New'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">Submitted On</span>
                      <span className="font-medium text-slate-700">{viewingPdfApp.created_at ? new Date(viewingPdfApp.created_at).toLocaleDateString() : 'Just now'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] font-semibold">Recruitment Portal</span>
                      <span className="font-medium text-slate-700">KRITISHA CMS</span>
                    </div>
                  </div>
                </div>

                {/* Footer Notice */}
                <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 font-mono">
                  CONFIDENTIAL APPLICANT PROFILE &bull; KRITISHA INFRASTRUCTURE RECRUITMENT CMS
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
