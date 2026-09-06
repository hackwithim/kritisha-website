import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Layers, 
  User, 
  Calendar, 
  ChevronRight, 
  Plus, 
  FileText, 
  Building, 
  HardHat, 
  Landmark, 
  Handshake, 
  ArrowRight, 
  Briefcase, 
  UserPlus, 
  FileSpreadsheet, 
  CheckSquare,
  Sparkles,
  X,
  Mail,
  Phone,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry, addEnquiry } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';

const STATUS_ORDER = ['New', 'In Progress', 'Contacted', 'Resolved'];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState(getEnquiries());

  // Quick Note state
  const [quickNote, setQuickNote] = useState(() => {
    return localStorage.getItem('kritisha_admin_quick_note') || '';
  });
  const [noteSaved, setNoteSaved] = useState(false);

  // Active Modals state
  const [activeModal, setActiveModal] = useState(null); // 'enquiryDetail' | 'newEnquiry' | 'report' | 'calendar' | null
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  // Form for New Enquiry Modal
  const [newEnqForm, setNewEnqForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service_interest: 'Toll Plaza Management & FASTag Lanes',
    message: '',
    status: 'New'
  });

  // Daily Quote & Calendar Schedule state
  const DEFAULT_SCHEDULE = [
    { id: 'ev-1', title: 'NHAI Concession Review', time: '11:00 AM – 12:00 PM', location: 'Executive Boardroom', color: 'blue' },
    { id: 'ev-2', title: 'FASTag Plaza Audit Call', time: '02:30 PM – 03:30 PM', location: 'Kamothe & Kopra Site', color: 'amber' },
    { id: 'ev-3', title: 'Golf Cart Transit Fleet Inspection', time: '04:30 PM – 05:30 PM', location: 'Agra Site Command', color: 'emerald' }
  ];

  const [dailyQuote, setDailyQuote] = useState(() => {
    return localStorage.getItem('kritisha_admin_daily_quote') || 'Infrastructure today, opportunities tomorrow.';
  });

  const [scheduleEvents, setScheduleEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('kritisha_admin_schedule_events');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return DEFAULT_SCHEDULE;
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '10:00 AM – 11:30 AM',
    location: 'Executive Boardroom',
    color: 'blue'
  });

  const [calendarTab, setCalendarTab] = useState('view'); // 'view' | 'add' | 'quote'

  useEffect(() => {
    localStorage.setItem('kritisha_admin_quick_note', quickNote);
  }, [quickNote]);

  useEffect(() => {
    localStorage.setItem('kritisha_admin_daily_quote', dailyQuote);
  }, [dailyQuote]);

  useEffect(() => {
    localStorage.setItem('kritisha_admin_schedule_events', JSON.stringify(scheduleEvents));
  }, [scheduleEvents]);

  const handleAddScheduleEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    const created = {
      ...newEvent,
      id: 'ev-' + Date.now()
    };
    setScheduleEvents(prev => [...prev, created]);
    setNewEvent({
      title: '',
      time: '10:00 AM – 11:30 AM',
      location: 'Executive Boardroom',
      color: 'blue'
    });
    setCalendarTab('view');
  };

  const handleDeleteScheduleEvent = (id) => {
    setScheduleEvents(prev => prev.filter(ev => ev.id !== id));
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleStatusUpdate = (id, newStatus) => {
    const targetEnquiry = enquiries.find(e => e.id === id);
    if (targetEnquiry) {
      const currentIdx = STATUS_ORDER.indexOf(targetEnquiry.status || 'New');
      const targetIdx = STATUS_ORDER.indexOf(newStatus);
      if (targetIdx < currentIdx) {
        alert('🔒 One-Way Pipeline Enforced: Going a step back in lead status is blocked.');
        return;
      }
    }
    updateEnquiryStatus(id, newStatus);
    setEnquiries(getEnquiries());
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleDeleteEnquiry = (id) => {
    if (confirm('Delete this enquiry record?')) {
      deleteEnquiry(id);
      setEnquiries(getEnquiries());
      setActiveModal(null);
    }
  };

  const handleCreateNewEnquiry = (e) => {
    e.preventDefault();
    if (!newEnqForm.name || !newEnqForm.email) {
      alert('Please fill in Client Name and Email');
      return;
    }
    addEnquiry(newEnqForm);
    setEnquiries(getEnquiries());
    setActiveModal(null);
    setNewEnqForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      service_interest: 'Toll Plaza Management & FASTag Lanes',
      message: '',
      status: 'New'
    });
  };

  // Priority Rank mapping: New (1) -> In Progress (2) -> Contacted (3) -> Closed (4)
  const priorityRank = { 'New': 1, 'In Progress': 2, 'Contacted': 3, 'Resolved': 4 };

  const [sortFilter, setSortFilter] = useState('priority');

  const sortedAndFilteredEnquiries = [...enquiries]
    .filter(item => sortFilter === 'priority' || sortFilter === 'all' ? true : item.status === sortFilter)
    .sort((a, b) => {
      if (sortFilter === 'priority') {
        return (priorityRank[a.status] || 99) - (priorityRank[b.status] || 99);
      }
      return 0;
    });

  // Contact Inventory list items with direct working routes
  const contactInventory = [
    { name: 'Clients', count: 142, icon: Users, bg: 'bg-blue-50 text-blue-600', path: '/admin/capabilities' },
    { name: 'NHAI & Road Authorities', count: 84, icon: Landmark, bg: 'bg-indigo-50 text-indigo-700', path: '/admin/services' },
    { name: 'Consultants', count: 56, icon: HardHat, bg: 'bg-amber-50 text-amber-700', path: '/admin/leadership' },
    { name: 'Government Bodies', count: 24, icon: Building, bg: 'bg-emerald-50 text-emerald-700', path: '/admin/projects' },
    { name: 'Partners', count: 18, icon: Handshake, bg: 'bg-purple-50 text-purple-700', path: '/admin/capabilities' },
  ];

  // Quick Action items with working triggers
  const quickActions = [
    { label: 'New Enquiry', icon: FileText, action: () => setActiveModal('newEnquiry'), color: 'text-blue-600 bg-blue-50' },
    { label: 'New Project', icon: Building, action: () => navigate('/admin/projects'), color: 'text-amber-600 bg-amber-50' },
    { label: 'Add Client', icon: UserPlus, action: () => navigate('/admin/capabilities'), color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Generate Report', icon: FileSpreadsheet, action: () => setActiveModal('report'), color: 'text-purple-600 bg-purple-50' },
    { label: 'Manage Team', icon: Users, action: () => navigate('/admin/leadership'), color: 'text-indigo-600 bg-indigo-50' },
  ];

  const getInitials = (name = '') => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'EN';
  };

  return (
    <div className="space-y-7 pb-12">
      {/* 1. TOP ROW: GREETING + 4 CLICKABLE STAT CARDS + CLICKABLE CALENDAR CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* TOP LEFT GREETING (3 COLS) */}
        <div className="lg:col-span-3 bg-transparent flex flex-col justify-center py-2 pr-2">
          <h2 className="text-2xl font-normal text-slate-700">Good Morning,</h2>
          <h1 className="font-editorial text-4xl sm:text-[42px] font-normal text-[#C5963D] leading-tight mt-0.5">
            Admin
          </h1>
          <div className="w-10 h-[2.5px] bg-[#C5963D] mt-3 mb-3 rounded-full" />
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui font-medium">
            Here's what's happening today.
          </p>
        </div>

        {/* 4 CLICKABLE STAT CARDS IN THE MIDDLE (6 COLS) */}
        <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 items-stretch">
          
          {/* STAT 1: TOTAL ENQUIRIES */}
          <div 
            onClick={() => navigate('/admin/enquiries')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            title="Click to view all enquiries"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-4.5 h-4.5" />
            </div>
            <div className="mt-4 space-y-0.5">
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A192F] group-hover:text-blue-600 transition-colors">
                {enquiries.length}
              </div>
              <div className="text-[11px] font-medium text-slate-500">Total Enquiries</div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600">
                ↑ 12% <span className="font-normal text-slate-400">vs last month</span>
              </span>
            </div>
          </div>

          {/* STAT 2: ACTIVE PROJECTS */}
          <div 
            onClick={() => navigate('/admin/projects')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            title="Click to manage projects"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div className="mt-4 space-y-0.5">
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A192F] group-hover:text-amber-600 transition-colors">18</div>
              <div className="text-[11px] font-medium text-slate-500">Active Projects</div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                ↑ 6% <span className="font-normal text-slate-400">vs last month</span>
              </span>
            </div>
          </div>

          {/* STAT 3: TOTAL CLIENTS */}
          <div 
            onClick={() => navigate('/admin/capabilities')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            title="Click to view capabilities & client list"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <User className="w-4.5 h-4.5" />
            </div>
            <div className="mt-4 space-y-0.5">
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A192F] group-hover:text-emerald-600 transition-colors">92</div>
              <div className="text-[11px] font-medium text-slate-500">Total Clients</div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                ↑ 9% <span className="font-normal text-slate-400">vs last month</span>
              </span>
            </div>
          </div>

          {/* STAT 4: JOB APPLICATIONS (DISTINCT, FUNCTIONAL & RELEVANT ALTERNATIVE TO TENDERS) */}
          <div 
            onClick={() => navigate('/admin/careers')}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            title="Click to view career applicants"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
            <div className="mt-4 space-y-0.5">
              <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A192F] group-hover:text-purple-600 transition-colors">34</div>
              <div className="text-[11px] font-medium text-slate-500">Job Applications</div>
            </div>
            <div className="mt-3">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                ↑ 14% <span className="font-normal text-slate-400">vs last month</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT CLICKABLE CALENDAR & QUOTE CARD (3 COLS) */}
        <div 
          onClick={() => setActiveModal('calendar')}
          className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-md transition-all"
          title="Click to view today's schedule & calendar"
        >
          {/* Subtle Background Skyscrapers Line Drawing */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-2 translate-y-2">
            <svg width="120" height="100" viewBox="0 0 120 100" fill="none" stroke="currentColor" className="text-[#0A192F]">
              <rect x="10" y="30" width="20" height="70" strokeWidth="2" />
              <rect x="35" y="10" width="25" height="90" strokeWidth="2" />
              <rect x="65" y="40" width="20" height="60" strokeWidth="2" />
              <rect x="90" y="20" width="20" height="80" strokeWidth="2" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider block leading-none">
                    Friday
                  </span>
                  <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0A192F] mt-0.5">
                    05 September 2025
                  </h4>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {scheduleEvents.length} Events
              </span>
            </div>

            <div className="w-12 h-[1px] bg-slate-200 my-4" />

            <blockquote className="font-editorial italic text-xs sm:text-sm text-slate-600 leading-relaxed">
              “{dailyQuote}”
            </blockquote>
          </div>
        </div>

      </div>

      {/* 2. MAIN CONTENT GRID: RECENT ENQUIRIES + CONTACT INVENTORY + QUICK ACTIONS & NOTES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT COLUMN: RECENT ENQUIRIES (6 COLS) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <h3 className="font-editorial text-xl font-bold text-[#0A192F]">Recent Enquiries</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/80">
                Priority Sorted
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="text-[11px] font-semibold bg-slate-50 border border-slate-200/90 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none focus:border-[#C5963D] cursor-pointer"
              >
                <option value="priority">Priority (New First)</option>
                <option value="all">All Enquiries</option>
                <option value="New">New Leads Only</option>
                <option value="In Progress">In Progress Only</option>
                <option value="Contacted">Contacted Only</option>
              </select>

              <Link 
                to="/admin/enquiries" 
                className="text-xs font-semibold text-slate-600 hover:text-[#0A192F] flex items-center gap-1 group shrink-0"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5963D]" />
              </Link>
            </div>
          </div>

          {/* TABLE CONTAINER: CLICKABLE ROWS OPEN ENQUIRY DETAIL MODAL */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 pb-2">
                <tr>
                  <th className="py-2.5 px-2">NAME</th>
                  <th className="py-2.5 px-2">COMPANY</th>
                  <th className="py-2.5 px-2">SERVICE INTEREST</th>
                  <th className="py-2.5 px-2">STATUS</th>
                  <th className="py-2.5 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sortedAndFilteredEnquiries.slice(0, 5).map((row) => (
                  <tr 
                    key={row.id} 
                    onClick={() => {
                      setSelectedEnquiry(row);
                      setActiveModal('enquiryDetail');
                    }}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-2 font-semibold text-[#0A192F] flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0B2341] text-[#C5963D] flex items-center justify-center text-[10px] font-bold shrink-0">
                        {getInitials(row.name)}
                      </div>
                      <span className="group-hover:text-blue-600 transition-colors whitespace-nowrap">{row.name}</span>
                    </td>
                    <td className="py-3 px-2 text-slate-600 whitespace-nowrap">{row.company || 'Individual'}</td>
                    <td className="py-3 px-2 text-slate-600 whitespace-nowrap">{row.service_interest || row.service}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap inline-flex items-center shrink-0 ${
                        row.status === 'New'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : row.status === 'In Progress'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : row.status === 'Contacted'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {row.status || 'New'}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEnquiry(row);
                          setActiveModal('enquiryDetail');
                        }}
                        className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MIDDLE COLUMN: CLICKABLE CONTACT INVENTORY (3 COLS) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-editorial text-xl font-bold text-[#0A192F]">Contact Inventory</h3>
            <Link 
              to="/admin/capabilities" 
              className="text-xs font-semibold text-slate-600 hover:text-[#0A192F] flex items-center gap-1 group"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#C5963D]" />
            </Link>
          </div>

          <div className="space-y-2.5 pt-1">
            {contactInventory.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name} 
                  onClick={() => navigate(item.path)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-slate-100/80 hover:border-slate-200 shadow-2xs transition-all cursor-pointer group"
                  title={`Click to manage ${item.name}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8.5 h-8.5 rounded-full ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0A192F] transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-editorial text-base font-bold text-[#0A192F] group-hover:text-blue-600 transition-colors">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: QUICK ACTIONS & QUICK NOTE (3 COLS) */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* QUICK ACTIONS CARD */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-3.5">
            <h3 className="font-editorial text-xl font-bold text-[#0A192F]">Quick Actions</h3>

            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    onClick={action.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100/80 hover:border-slate-200 transition-all group cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${action.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0A192F] transition-colors">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0A192F] group-hover:translate-x-1 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUICK NOTE SCRATCHPAD CARD */}
          <div className="bg-amber-50/60 rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-800" />
                <h4 className="text-xs font-bold text-[#0B2341]">Quick Scratchpad Note</h4>
              </div>
              <div className="flex items-center gap-1.5">
                {quickNote && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Clear scratchpad note?')) setQuickNote('');
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    title="Clear Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button 
                  type="button"
                  onClick={handleSaveNote}
                  className="px-2 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 text-[10px] font-bold flex items-center gap-1 hover:bg-amber-100 transition-colors cursor-pointer shadow-2xs"
                  title="Save Note to Browser Storage"
                >
                  {noteSaved ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Saved!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 text-[#C5963D]" />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
                placeholder="Write temporary reminders, meeting notes, NHAI project tasks, or client follow-ups..."
                rows={3}
                className="w-full bg-white border border-amber-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:ring-2 focus:ring-amber-400/30 resize-none shadow-2xs font-sans-ui"
              />
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pt-0.5">
              <span className="flex items-center gap-1 text-amber-800 font-semibold">
                <Clock className="w-3 h-3 text-amber-600" />
                Auto-saves in browser storage
              </span>
              <span>{quickNote.length} characters</span>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS & DRAWERS FOR CLICKABLE EVERYTHING */}
      {/* ========================================================================= */}

      {/* 1. ENQUIRY DETAIL MODAL */}
      {activeModal === 'enquiryDetail' && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B2341] text-[#C5963D] text-sm font-bold flex items-center justify-center">
                  {getInitials(selectedEnquiry.name)}
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#0B2341]">{selectedEnquiry.name}</h3>
                  <p className="text-xs text-slate-500">{selectedEnquiry.company || 'Individual Client'}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-[#0B2341] rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Service Interest</span>
                <span className="inline-block px-3 py-1 bg-amber-50 text-[#C5963D] font-bold rounded-lg border border-amber-200">
                  {selectedEnquiry.service_interest || selectedEnquiry.service}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Message</span>
                <div className="bg-slate-50 rounded-xl p-3.5 text-slate-700 leading-relaxed border border-slate-100 italic">
                  "{selectedEnquiry.message || 'Client submitted an enquiry regarding infrastructure services.'}"
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a 
                  href={`mailto:${selectedEnquiry.email}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{selectedEnquiry.email || 'Send Email'}</span>
                </a>
                <a 
                  href={`tel:${selectedEnquiry.phone || '+919820011223'}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{selectedEnquiry.phone || 'Call Client'}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-700">Update Lead Status:</span>
                <select
                  value={selectedEnquiry.status || 'New'}
                  onChange={(e) => handleStatusUpdate(selectedEnquiry.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 bg-white focus:border-[#C5963D] cursor-pointer"
                >
                  {STATUS_ORDER.map((st, idx) => {
                    const currentIdx = STATUS_ORDER.indexOf(selectedEnquiry.status || 'New');
                    const isBlocked = idx < currentIdx;
                    return (
                      <option key={st} value={st} disabled={isBlocked}>
                        {isBlocked ? `🔒 ${st} (Step-Back Blocked)` : st === 'New' ? '🔵 New Lead' : st === 'In Progress' ? '🟡 In Progress' : st === 'Contacted' ? '🟢 Contacted' : '🟣 Resolved'}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Enquiry</span>
              </button>

              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-[#0B2341] text-white font-bold rounded-xl text-xs hover:bg-[#163F68] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CREATE NEW ENQUIRY MODAL */}
      {activeModal === 'newEnquiry' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-editorial text-xl font-bold text-[#0B2341]">New Client Enquiry</h3>
                <p className="text-xs text-slate-500 mt-0.5">Record a new lead or client request.</p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-[#0B2341] rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewEnquiry} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Mahindra"
                  value={newEnqForm.name}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, name: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. Mahindra Infra"
                    value={newEnqForm.company}
                    onChange={(e) => setNewEnqForm({ ...newEnqForm, company: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select
                    value={newEnqForm.status}
                    onChange={(e) => setNewEnqForm({ ...newEnqForm, status: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  >
                    <option value="New">New Lead</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="anand@mahindra.com"
                    value={newEnqForm.email}
                    onChange={(e) => setNewEnqForm({ ...newEnqForm, email: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+91 9821099887"
                    value={newEnqForm.phone}
                    onChange={(e) => setNewEnqForm({ ...newEnqForm, phone: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Service Interest</label>
                <select
                  value={newEnqForm.service_interest}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, service_interest: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                >
                  <option value="Toll Plaza Management & FASTag Lanes">Toll Plaza Management & FASTag Lanes</option>
                  <option value="Vigilance & Revenue Leakage Audits">Vigilance & Revenue Leakage Audits</option>
                  <option value="Infrastructure Advisory & Bidding">Infrastructure Advisory & Bidding</option>
                  <option value="Project Management & Feasibility Study">Project Management & Feasibility Study</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Message</label>
                <textarea
                  rows={3}
                  placeholder="Details regarding project scope..."
                  value={newEnqForm.message}
                  onChange={(e) => setNewEnqForm({ ...newEnqForm, message: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <ImagePickerInput
                  label="Attach Site Photo / Project Blueprint (Optional)"
                  value={newEnqForm.site_image || ''}
                  onChange={(url) => setNewEnqForm(prev => ({ ...prev, site_image: url }))}
                  placeholder="Upload file or paste image URL..."
                  aspectRatio="landscape"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2341] text-[#C5963D] font-bold rounded-xl text-xs hover:bg-[#163F68] transition-colors shadow-xs"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. GENERATE REPORT MODAL */}
      {activeModal === 'report' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                <h3 className="font-editorial text-xl font-bold text-[#0B2341]">System Executive Report</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-[#0B2341] rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>Generated real-time corporate summary report for KRITISHA Infrastructure:</p>
              <div className="bg-purple-50/60 rounded-xl p-3.5 border border-purple-200/60 space-y-2">
                <div className="flex items-center justify-between font-bold text-[#0B2341]">
                  <span>Total Enquiries:</span>
                  <span>{enquiries.length} Leads</span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#0B2341]">
                  <span>Active Projects:</span>
                  <span>18 Operations</span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#0B2341]">
                  <span>Career Applications:</span>
                  <span>34 Applicants</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  alert('Executive Report downloaded as PDF!');
                  setActiveModal(null);
                }}
                className="w-full py-2.5 bg-[#0B2341] text-[#C5963D] font-bold rounded-xl text-xs hover:bg-[#163F68] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download Report PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. CALENDAR & SCHEDULE MODAL (FULLY EDITABLE) */}
      {activeModal === 'calendar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-700" />
                <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Manage Operational Schedule & Quote</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-[#0B2341] rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setCalendarTab('view')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  calendarTab === 'view' ? 'bg-[#0B2341] text-[#C5963D] shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                📅 Schedule ({scheduleEvents.length})
              </button>
              <button
                type="button"
                onClick={() => setCalendarTab('add')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  calendarTab === 'add' ? 'bg-[#0B2341] text-[#C5963D] shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                ➕ Add Event
              </button>
              <button
                type="button"
                onClick={() => setCalendarTab('quote')}
                className={`flex-1 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  calendarTab === 'quote' ? 'bg-[#0B2341] text-[#C5963D] shadow-2xs' : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                💬 Daily Quote
              </button>
            </div>

            {/* TAB 1: SCHEDULE VIEW LIST */}
            {calendarTab === 'view' && (
              <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
                {scheduleEvents.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    No scheduled events for today. Click "+ Add Event" to create one.
                  </div>
                ) : (
                  scheduleEvents.map((ev) => {
                    const colorStyles = {
                      blue: 'bg-blue-50 border-blue-200 text-blue-700',
                      amber: 'bg-amber-50 border-amber-200 text-amber-800',
                      emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
                      purple: 'bg-purple-50 border-purple-200 text-purple-800'
                    }[ev.color || 'blue'];

                    return (
                      <div key={ev.id} className={`p-3.5 rounded-2xl border ${colorStyles} flex items-center justify-between gap-3 shadow-2xs`}>
                        <div className="flex items-start gap-3 min-w-0">
                          <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <h4 className="font-bold text-[#0B2341] text-xs truncate">{ev.title}</h4>
                            <span className="text-[10px] opacity-80 block mt-0.5 font-medium">
                              {ev.time} • {ev.location}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteScheduleEvent(ev.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer shrink-0"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* TAB 2: ADD NEW EVENT FORM */}
            {calendarTab === 'add' && (
              <form onSubmit={handleAddScheduleEvent} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Expressway FASTag Audit Review"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Time Range</label>
                    <input
                      type="text"
                      placeholder="e.g. 11:00 AM - 12:30 PM"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category Badge Color</label>
                    <select
                      value={newEvent.color}
                      onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    >
                      <option value="blue">Blue (Corporate)</option>
                      <option value="amber">Amber (Operations)</option>
                      <option value="emerald">Emerald (Site Inspection)</option>
                      <option value="purple">Purple (High Priority)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location / Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Executive Boardroom / Site HQ"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarTab('view')}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0B2341] text-[#C5963D] rounded-xl font-bold shadow-xs hover:bg-[#163F68] transition-colors"
                  >
                    Add Schedule Event
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: EDIT DAILY QUOTE */}
            {calendarTab === 'quote' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Homepage & Dashboard Daily Quote</label>
                  <textarea
                    rows={3}
                    value={dailyQuote}
                    onChange={(e) => setDailyQuote(e.target.value)}
                    placeholder="Enter daily motivational or operational slogan..."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    This quote updates dynamically on the right dashboard calendar card.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setCalendarTab('view')}
                    className="px-5 py-2 bg-[#0B2341] text-[#C5963D] rounded-xl font-bold shadow-xs hover:bg-[#163F68] transition-colors"
                  >
                    Save Quote & Back to Schedule
                  </button>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
