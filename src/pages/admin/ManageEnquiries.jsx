import React, { useState } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Mail, 
  Phone, 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  Columns, 
  List, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  ExternalLink,
  X,
  UserCheck,
  Tag,
  Lock
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, addEnquiry, useCmsLiveStore } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';

const STATUS_ORDER = ['New', 'In Progress', 'Contacted', 'Resolved'];

export default function ManageEnquiries() {
  const enquiries = useCmsLiveStore(getEnquiries);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form state for adding manual lead
  const [newLead, setNewLead] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_interest: 'Toll Plaza Management & FASTag Lanes',
    message: '',
    status: 'New'
  });

  const handleStatusChange = (id, newStatus) => {
    const currentEnquiry = enquiries.find(e => e.id === id);
    if (currentEnquiry) {
      const currentIdx = STATUS_ORDER.indexOf(currentEnquiry.status || 'New');
      const targetIdx = STATUS_ORDER.indexOf(newStatus);
      if (targetIdx < currentIdx) {
        alert('One-Way Pipeline Rule: Enquiries that have been moved to a right column cannot be undone or moved back to a left column.');
        return;
      }
    }
    updateEnquiryStatus(id, newStatus);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this client enquiry record?')) {
      deleteEnquiry(id);
    }
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.email) {
      alert('Please provide client name and email.');
      return;
    }
    addEnquiry(newLead);
    setEnquiries(getEnquiries());
    setIsAddModalOpen(false);
    setNewLead({
      name: '',
      company: '',
      email: '',
      phone: '',
      service_interest: 'Toll Plaza Management & FASTag Lanes',
      message: '',
      status: 'New'
    });
  };

  // Filtered enquiries by search & dropdown
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      (enq.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (enq.company || '').toLowerCase().includes(search.toLowerCase()) ||
      (enq.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (enq.service_interest || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || enq.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pipeline Status Columns Configuration
  const KANBAN_COLUMNS = [
    {
      id: 'New',
      title: 'New Leads',
      color: 'bg-blue-500',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      headerBg: 'bg-blue-50/70 border-blue-200/80',
      icon: AlertCircle
    },
    {
      id: 'In Progress',
      title: 'In Progress',
      color: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      headerBg: 'bg-amber-50/70 border-amber-200/80',
      icon: Clock
    },
    {
      id: 'Contacted',
      title: 'Contacted',
      color: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      headerBg: 'bg-emerald-50/70 border-emerald-200/80',
      icon: UserCheck
    },
    {
      id: 'Resolved',
      title: 'Resolved / Closed',
      color: 'bg-purple-500',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      headerBg: 'bg-purple-50/70 border-purple-200/80',
      icon: CheckCircle2
    }
  ];

  const getInitials = (name = '') => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'EN';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. PAGE HEADER & CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Inbound Enquiries CMS</h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B2341] text-[#C5963D]">
              Vertical Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui mt-1">
            Organize, prioritize, and manage client submissions in vertical status columns.
          </p>
        </div>

        {/* TOP RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* VIEW SWITCHER TABS */}
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex items-center shadow-2xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-[#0B2341] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2341] hover:bg-slate-50'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Kanban Columns</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#0B2341] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B2341] hover:bg-slate-50'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Vertical List</span>
            </button>
          </div>

          {/* ADD NEW LEAD BUTTON */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#C5963D] hover:bg-[#b08432] text-[#0B2341] font-bold rounded-xl text-xs transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH & FILTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by client name, company, email, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] cursor-pointer"
          >
            <option value="All">All Statuses ({enquiries.length})</option>
            <option value="New">New ({enquiries.filter(e => e.status === 'New').length})</option>
            <option value="In Progress">In Progress ({enquiries.filter(e => e.status === 'In Progress').length})</option>
            <option value="Contacted">Contacted ({enquiries.filter(e => e.status === 'Contacted').length})</option>
            <option value="Resolved">Resolved ({enquiries.filter(e => e.status === 'Resolved').length})</option>
          </select>
        </div>
      </div>

      {/* 3. VERTICAL KANBAN COLUMN BOARD VIEW (100% EQUAL SIZE & HEIGHT) */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {KANBAN_COLUMNS.map((col) => {
            const ColumnIcon = col.icon;
            const colItems = filteredEnquiries.filter(e => (e.status || 'New') === col.id);

            return (
              <div 
                key={col.id} 
                className="bg-slate-100/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col space-y-3.5 min-h-[560px] h-full shadow-2xs"
              >
                {/* UNIFORM COLUMN HEADER */}
                <div className={`flex items-center justify-between px-3.5 py-3 rounded-xl border ${col.headerBg} shrink-0`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.color} shrink-0`} />
                    <h3 className="text-[11px] font-bold text-[#0B2341] tracking-wider uppercase truncate">
                      {col.title}
                    </h3>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-white text-[#0B2341] text-[10px] font-bold flex items-center justify-center shadow-2xs shrink-0 ml-2">
                    {colItems.length}
                  </span>
                </div>

                {/* VERTICAL CARDS FEED (EQUAL FLEX FILL) */}
                <div className="flex-1 flex flex-col space-y-3.5 overflow-y-auto max-h-[720px] pr-0.5">
                  {colItems.length === 0 ? (
                    <div className="flex-1 min-h-[420px] border-2 border-dashed border-slate-200/80 bg-white/40 rounded-xl flex flex-col items-center justify-center text-center p-6 space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <ColumnIcon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400">No {col.title}</span>
                      <p className="text-[10px] text-slate-400 max-w-[140px]">Leads assigned to this state will appear here.</p>
                    </div>
                  ) : (
                    colItems.map((enq) => (
                      <div
                        key={enq.id}
                        className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3 group"
                      >
                        {/* CARD HEADER: AVATAR + NAME + COMPANY */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-[#0B2341] text-[#C5963D] text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                              {getInitials(enq.name)}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#0B2341] leading-tight group-hover:text-blue-600 transition-colors">
                                {enq.name}
                              </h4>
                              <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{enq.company || 'Individual Client'}</span>
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="text-slate-300 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete enquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* SERVICE INTEREST TAG */}
                        <div>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-amber-50 text-[#C5963D] border border-amber-200/60 leading-tight">
                            <Tag className="w-2.5 h-2.5" />
                            <span>{enq.service_interest}</span>
                          </span>
                        </div>

                        {/* MESSAGE BOX */}
                        <div className="bg-[#F8FAFC] rounded-lg p-2.5 text-[11px] text-slate-600 leading-relaxed border border-slate-100 italic">
                          "{enq.message || 'No project message specified.'}"
                        </div>

                        {/* CONTACT DETAILS & QUICK LINKS */}
                        <div className="space-y-1 text-[10.5px] text-slate-600 border-t border-slate-100 pt-2.5">
                          <a
                            href={`mailto:${enq.email}`}
                            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors truncate"
                          >
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{enq.email}</span>
                          </a>
                          {enq.phone && (
                            <a
                              href={`tel:${enq.phone}`}
                              className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{enq.phone}</span>
                            </a>
                          )}
                        </div>

                        {/* CARD FOOTER: STATUS SELECTOR (ONE-WAY PIPELINE) */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[9.5px] font-semibold text-slate-400 flex items-center gap-1">
                            {STATUS_ORDER.indexOf(enq.status || 'New') > 0 && <Lock className="w-2.5 h-2.5 text-amber-500" />}
                            <span>Move Status:</span>
                          </span>
                          <select
                            value={enq.status || 'New'}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                            className="text-[10px] font-bold px-2 py-1 rounded-lg border bg-white focus:outline-none focus:border-[#C5963D] cursor-pointer"
                          >
                            {KANBAN_COLUMNS.map((col, idx) => {
                              const currentIdx = STATUS_ORDER.indexOf(enq.status || 'New');
                              const isPastStage = idx < currentIdx;
                              return (
                                <option 
                                  key={col.id} 
                                  value={col.id} 
                                  disabled={isPastStage}
                                >
                                  {isPastStage ? `🔒 ${col.title} (Locked)` : col.title}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. VERTICAL LIST FEED VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredEnquiries.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
              No matching enquiries found.
            </div>
          ) : (
            filteredEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start justify-between gap-5 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0B2341] text-[#C5963D] text-sm font-bold flex items-center justify-center shrink-0">
                      {getInitials(enq.name)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B2341] group-hover:text-blue-600 transition-colors">
                        {enq.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {enq.company || 'Individual Client'}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[#C5963D]">{enq.service_interest}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] p-3 rounded-xl text-xs text-slate-600 leading-relaxed border border-slate-100">
                    {enq.message}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <a href={`mailto:${enq.email}`} className="flex items-center gap-1.5 hover:text-blue-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {enq.email}
                    </a>
                    {enq.phone && (
                      <a href={`tel:${enq.phone}`} className="flex items-center gap-1.5 hover:text-blue-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {enq.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    {STATUS_ORDER.indexOf(enq.status || 'New') > 0 && (
                      <span className="text-[10px] font-semibold text-[#C5963D] flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-200" title="One-Way Pipeline Stage">
                        <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                        <span className="text-[9px]">Locked Left</span>
                      </span>
                    )}
                    <select
                      value={enq.status || 'New'}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        enq.status === 'New'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : enq.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : enq.status === 'Contacted'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {KANBAN_COLUMNS.map((col, idx) => {
                        const currentIdx = STATUS_ORDER.indexOf(enq.status || 'New');
                        const isPastStage = idx < currentIdx;
                        return (
                          <option 
                            key={col.id} 
                            value={col.id} 
                            disabled={isPastStage}
                          >
                            {isPastStage ? `🔒 ${col.title} (Locked)` : col.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <button
                    onClick={() => handleDelete(enq.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 5. ADD MANUAL LEAD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Add New Client Enquiry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manually record a client lead or inbound enquiry.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-[#0B2341] rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company / Authority</label>
                  <input
                    type="text"
                    placeholder="e.g. NHAI Concessionaire"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select
                    value={newLead.status}
                    onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@infra.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 9823011223"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Service Interest</label>
                <select
                  value={newLead.service_interest}
                  onChange={(e) => setNewLead({ ...newLead, service_interest: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                >
                  <option value="Toll Plaza Management & FASTag Lanes">Toll Plaza Management & FASTag Lanes</option>
                  <option value="Vigilance & Revenue Leakage Audits">Vigilance & Revenue Leakage Audits</option>
                  <option value="Infrastructure Advisory & Bidding">Infrastructure Advisory & Bidding</option>
                  <option value="Project Management & Feasibility Study">Project Management & Feasibility Study</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Project Message</label>
                <textarea
                  rows={3}
                  placeholder="Details about client requirements..."
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <ImagePickerInput
                  label="Attach Site Photo / Blueprint (Optional)"
                  value={newLead.site_image || ''}
                  onChange={(url) => setNewLead(prev => ({ ...prev, site_image: url }))}
                  placeholder="Upload file or paste image URL..."
                  aspectRatio="landscape"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2341] hover:bg-[#163F68] text-[#C5963D] font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

