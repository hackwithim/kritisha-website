import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FolderKanban, 
  Briefcase, 
  Users, 
  Layers, 
  Sparkles, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
  Key,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { getAdminAuth, logoutAdmin, getEnquiries, getSiteSettings, useCmsLiveStore, getAdminProfile, saveAdminProfile, compressImageFile, getCapabilities, getApplications, getProjects, getServices, getInsights, hashPassword } from '../lib/cmsStore';
import KritishaLogo from './KritishaLogo';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAdminAuth();
  const enquiriesCount = getEnquiries().length;
  const settings = useCmsLiveStore(getSiteSettings);
  const profile = getAdminProfile();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newName, setNewName] = useState(profile.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const searchRef = useRef(null);

  // --- Auth Guard: redirect to login if session is expired or not authenticated ---
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/admin/login', { replace: true });
      return;
    }
    // Periodically re-check session every 30 seconds to catch inactivity expiry
    const interval = setInterval(() => {
      const currentAuth = getAdminAuth();
      if (!currentAuth.isAuthenticated) {
        navigate('/admin/login', { replace: true });
      }
    }, 30_000);
    return () => clearInterval(interval);
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render anything while redirecting unauthenticated users
  if (!auth.isAuthenticated) return null;

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare, badge: enquiriesCount || 12 },
    { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { label: 'Clients', path: '/admin/capabilities', icon: Layers },
    { label: 'Services', path: '/admin/services', icon: Briefcase },
    { label: 'Team', path: '/admin/leadership', icon: Users },
    { label: 'Insights', path: '/admin/insights', icon: Sparkles },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { label: 'Careers', path: '/admin/careers', icon: FileText },
    { label: 'Toll Plazas', path: '/admin/toll-plazas', icon: ShieldCheck },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const allProjects = getProjects() || [];
  const allServices = getServices() || [];
  const allInsights = getInsights() || [];
  const allEnquiries = getEnquiries() || [];

  const searchResults = searchQuery.trim() ? [
    ...navItems.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map(item => ({ id: `tab-${item.label}`, type: 'Tab', title: item.label, link: item.path })),
    ...allEnquiries.filter(e => (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (e.company_name || '').toLowerCase().includes(searchQuery.toLowerCase())).map(e => ({ id: e.id, type: 'Enquiry', title: `${e.name} (${e.company_name})`, link: '/admin/enquiries' })),
    ...allProjects.filter(p => (p.title || '').toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ id: p.id, type: 'Project', title: p.title, link: '/admin/projects' })),
    ...allServices.filter(s => (s.title || '').toLowerCase().includes(searchQuery.toLowerCase())).map(s => ({ id: s.id, type: 'Service', title: s.title, link: '/admin/services' })),
    ...allInsights.filter(i => (i.title || '').toLowerCase().includes(searchQuery.toLowerCase())).map(i => ({ id: i.id, type: 'Insight', title: i.title, link: '/admin/insights' }))
  ].slice(0, 6) : [];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };


  return (
    <div className="min-h-screen bg-[#EEF4F9] text-[#0A192F] flex flex-col font-sans-ui selection:bg-[#C5963D] selection:text-white relative pb-28 sm:pb-32">
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: '14px', borderRadius: '12px' } }} />
      {/* 1. FULL-WIDTH TOP ADMIN HEADER BAR */}
      <header className="bg-white border-b border-slate-200/80 px-6 sm:px-10 py-4 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-[1540px] mx-auto flex items-center justify-between gap-4">
          
          {/* TOP LEFT: BRANDING & CONTROL CENTER LOGO */}
          <Link to="/" className="flex items-center group">
              <div className="flex items-center gap-3.5">
                <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img src="/Infrastructure - 3 - Edited.png" alt="KRITISHA Logo" className="h-full w-auto object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-editorial text-xl font-bold tracking-[0.14em] text-[#0A192F] leading-none uppercase">
                    KRITISHA
                  </span>
                  <span className="text-[10px] font-sans-ui tracking-[0.24em] text-[#C5963D] uppercase font-bold mt-1">
                    ADMIN CONTROL CENTER
                  </span>
                </div>
              </div>
          </Link>

          {/* TOP CENTER: SEARCH INPUT */}
          <div className="hidden md:flex relative w-full max-w-md" ref={searchRef}>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search enquiries, projects, services, insights..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#C5963D] focus:ring-2 focus:ring-[#C5963D]/20 transition-all shadow-2xs"
            />
            
            {/* Search Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-200/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Search Results</span>
                  <span className="text-[10px] font-medium text-slate-400">{searchResults.length} found</span>
                </div>
                <div className="max-h-64 overflow-y-auto p-1">
                  {searchResults.length > 0 ? (
                    searchResults.map(res => (
                      <Link
                        key={`${res.type}-${res.id}`}
                        to={res.link}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 text-slate-500">
                          {res.type === 'Tab' && <LayoutDashboard className="w-3 h-3" />}
                          {res.type === 'Enquiry' && <MessageSquare className="w-3 h-3" />}
                          {res.type === 'Project' && <FolderKanban className="w-3 h-3" />}
                          {res.type === 'Service' && <Briefcase className="w-3 h-3" />}
                          {res.type === 'Insight' && <FileText className="w-3 h-3" />}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-slate-700 truncate">{res.title}</span>
                          <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">{res.type}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-slate-500 text-xs">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* TOP RIGHT: LIVE SITE LINK, NOTIFICATION BELL & USER BADGE */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 hover:text-[#0A192F] transition-all hover:scale-105"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C5963D]" />
            </Link>



            {/* User Profile Pill */}
            <div className="relative" ref={dropdownRef}>
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 bg-[#F8FAFC] hover:bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs transition-all cursor-pointer select-none"
              >
                <div className="w-7 h-7 rounded-full bg-[#0A192F] text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                  {auth.user?.avatar ? (
                    <img src={auth.user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    auth.user?.name ? auth.user.name.substring(0, 2).toUpperCase() : 'AM'
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-[#0A192F] leading-tight">{auth.user?.name || 'Admin'}</span>
                  <span className="text-[9.5px] font-medium text-slate-500 leading-tight">Super Admin</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* DROPDOWN MENU */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        const compressed = await compressImageFile(e.target.files[0], 200, 200);
                        if (compressed) {
                          saveAdminProfile({ ...profile, avatar: compressed });
                        }
                        setIsDropdownOpen(false);
                      }
                    }}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#C5963D] transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Change Profile Photo
                  </button>
                  <button 
                    onClick={() => { setIsNameModalOpen(true); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#C5963D] transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    Change Name
                  </button>
                  <button 
                    onClick={() => { setIsPasswordModalOpen(true); setIsDropdownOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#C5963D] transition-colors"
                  >
                    <Key className="w-4 h-4" />
                    Change Password
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <main className="flex-1 p-6 sm:p-10 max-w-[1540px] w-full mx-auto">
        <Outlet />
      </main>

      {/* 3. PROMINENT ENLARGED FLOATING ADMIN DOCK NAVBAR */}
      <div className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto max-w-[96vw] px-2">
        <nav className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 bg-[#0A192F]/96 backdrop-blur-2xl shadow-2xl ring-1 ring-white/10 transition-all duration-300 max-w-full overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-300 group ${
                  isActive
                    ? 'bg-white/15 text-[#C5963D] font-bold shadow-inner border border-[#C5963D]/40 scale-105 ring-1 ring-[#C5963D]/30'
                    : 'text-slate-200 hover:text-white hover:bg-white/10 hover:scale-105'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-[#C5963D]' : 'text-slate-300 group-hover:text-white'}`} />
                <span className="hidden md:inline tracking-wide whitespace-nowrap">{item.label}</span>

                {/* Badge count for enquiries */}
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${isActive ? 'bg-[#C5963D] text-[#0A192F]' : 'bg-white/20 text-white'}`}>
                    {item.badge}
                  </span>
                )}

                {/* Glowing Active Dot */}
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#C5963D] animate-pulse shadow-[0_0_10px_#C5963D] shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 4. MODALS */}
      {isNameModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A192F]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold text-[#0A192F]">Change Name</h3>
              <button onClick={() => setIsNameModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">New Name</label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={e => setNewName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D]"
                  autoFocus
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsNameModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">Cancel</button>
                <button onClick={() => {
                  saveAdminProfile({ ...profile, name: newName });
                  setIsNameModalOpen(false);
                }} className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-[#0A192F] hover:bg-[#C5963D] rounded-xl transition-colors cursor-pointer">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A192F]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-editorial text-lg font-bold text-[#0A192F]">Change Password</h3>
              <button onClick={() => setIsPasswordModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">New Password</label>
                <input 
                  type="password" 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                <input 
                  type="password" 
                  value={confirmPassword} 
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setIsPasswordModalOpen(false)} className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer">Cancel</button>
                <button onClick={async () => {
                  if (newPassword && newPassword === confirmPassword) {
                    const hashed = await hashPassword(newPassword);
                    saveAdminProfile({ ...profile, password: hashed });
                    setIsPasswordModalOpen(false);
                    setNewPassword('');
                    setConfirmPassword('');
                  } else {
                    alert("Passwords do not match!");
                  }
                }} className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-[#0A192F] hover:bg-[#C5963D] rounded-xl transition-colors cursor-pointer">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
