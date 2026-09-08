import React, { useState } from 'react';
import { 
  Save, 
  CheckCircle2, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Sliders, 
  Globe, 
  ArrowLeft, 
  ExternalLink, 
  Edit3, 
  Image as ImageIcon, 
  Eye, 
  Lightbulb, 
  X, 
  Folder, 
  Clock,
  TrendingUp,
  Zap,
  ChevronDown,
  Lock,
  QrCode
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSiteSettings, saveSiteSettings, getHomepageStats, saveHomepageStats, getAdminProfile, saveAdminProfile } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import { QRCodeSVG } from 'qrcode.react';
import * as OTPAuth from 'otpauth';

export default function ManageSettings() {
  const [settings, setSettings] = useState(getSiteSettings());
  const [stats, setStats] = useState(getHomepageStats());
  const [adminProfile, setAdminProfile] = useState(getAdminProfile());
  const [saved, setSaved] = useState(false);
  
  // 2FA Setup State
  const [setup2FASecret, setSetup2FASecret] = useState('');
  const [setup2FAUrl, setSetup2FAUrl] = useState('');
  const [verify2FACode, setVerify2FACode] = useState('');
  const [twoFaError, setTwoFaError] = useState('');
  const [activeTab, setActiveTab] = useState('company'); // 'company' | 'hero' | 'metrics' | 'seo'
  const [showProTip, setShowProTip] = useState(true);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();
    saveSiteSettings(settings);
    saveHomepageStats(stats);
    saveAdminProfile(adminProfile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleStart2FASetup = () => {
    let newSecret = new OTPAuth.Secret({ size: 20 });
    let totp = new OTPAuth.TOTP({
      issuer: 'Kritisha',
      label: 'Admin',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: newSecret
    });
    setSetup2FASecret(newSecret.base32);
    setSetup2FAUrl(totp.toString());
    setVerify2FACode('');
    setTwoFaError('');
  };

  const handleVerifyAndEnable2FA = () => {
    let totp = new OTPAuth.TOTP({
      issuer: 'Kritisha',
      label: 'Admin',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(setup2FASecret)
    });

    let delta = totp.validate({ token: verify2FACode, window: 1 });
    if (delta !== null) {
      const updatedProfile = { ...adminProfile, is2FAEnabled: true, twoFactorSecret: setup2FASecret };
      setAdminProfile(updatedProfile);
      saveAdminProfile(updatedProfile);
      setSetup2FASecret('');
      setSetup2FAUrl('');
      setVerify2FACode('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setTwoFaError('Invalid verification code. Please try again.');
    }
  };

  const handleDisable2FA = () => {
    if (window.confirm("Are you sure you want to disable Two-Factor Authentication? Your account will be less secure.")) {
      const updatedProfile = { ...adminProfile, is2FAEnabled: false, twoFactorSecret: null };
      setAdminProfile(updatedProfile);
      saveAdminProfile(updatedProfile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  };

  return (
    <div className="space-y-6 pb-16 font-sans text-slate-800 bg-[#F8FAFC] -m-6 p-6 min-h-screen">
      {/* UPDATE LOGO MODAL */}
      {showLogoModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#0B2341]/80 backdrop-blur-xs" onClick={() => setShowLogoModal(false)} />
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#C5963D] flex items-center justify-center border border-amber-200">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-lg font-bold text-[#0B2341]">Update Company Logo</h3>
                  <p className="text-xs text-slate-500">Upload a custom logo or choose a stock corporate emblem</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLogoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <ImagePickerInput
                label="Company Logo / Brand Emblem *"
                value={settings.logo || ''}
                onChange={(url) => setSettings(prev => ({ ...prev, logo: url }))}
                placeholder="Upload logo file or paste logo URL..."
                aspectRatio="circle"
                helpText="Recommended: High-resolution PNG or SVG with transparent background."
              />

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLogoModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveSiteSettings(settings);
                    setSaved(true);
                    setShowLogoModal(false);
                    setTimeout(() => setSaved(false), 2500);
                  }}
                  className="px-5 py-2 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm transition-all flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5963D]" />
                  <span>Save & Apply Logo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP HEADER BAR */}
      <div className="space-y-3">
        {/* Back Link */}
        <Link 
          to="/admin" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B2341] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Settings</span>
        </Link>

        {/* Title & Top Right Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0B2341] tracking-tight">
              Site Settings & Hero CMS
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Manage your company details, homepage content and key information — all in one place.
            </p>
          </div>

          <div className="flex items-center gap-5 self-start sm:self-auto">
            <div className="hidden md:block text-right">
              <span className="text-[11px] text-slate-400 font-medium block">Last updated</span>
              <span className="text-xs font-semibold text-slate-600">5 Sep 2025, 10:24 AM</span>
            </div>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer shrink-0"
            >
              <Save className="w-4 h-4 text-white" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>

      {/* SAVED NOTIFICATION BADGE */}
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl flex items-center gap-2 shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Global site settings and hero content updated successfully!</span>
        </div>
      )}

      {/* 2. TABBED NAVIGATION BAR */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto shadow-2xs no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveTab('company')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'company'
              ? 'bg-[#FDF8EE] text-[#0B2341] border border-[#F0DFB7] shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Building2 className={`w-4 h-4 ${activeTab === 'company' ? 'text-[#C5963D]' : 'text-slate-400'}`} />
          <span>Company Info</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'hero'
              ? 'bg-[#FDF8EE] text-[#0B2341] border border-[#F0DFB7] shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ImageIcon className={`w-4 h-4 ${activeTab === 'hero' ? 'text-[#C5963D]' : 'text-slate-400'}`} />
          <span>Hero Content</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'metrics'
              ? 'bg-[#FDF8EE] text-[#0B2341] border border-[#F0DFB7] shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className={`w-4 h-4 ${activeTab === 'metrics' ? 'text-[#C5963D]' : 'text-slate-400'}`} />
          <span>Performance Metrics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'seo'
              ? 'bg-[#FDF8EE] text-[#0B2341] border border-[#F0DFB7] shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sliders className={`w-4 h-4 ${activeTab === 'seo' ? 'text-[#C5963D]' : 'text-slate-400'}`} />
          <span>SEO & Integrations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Lock className={`w-4 h-4 ${activeTab === 'security' ? 'text-rose-600' : 'text-slate-400'}`} />
          <span>Security & 2FA</span>
        </button>
      </div>

      {/* 3. MAIN CONTENT 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: FORM CARDS (7 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: COMPANY INFORMATION CARD */}
          {(activeTab === 'company' || activeTab === 'all') && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF8EE] text-[#C5963D] flex items-center justify-center shrink-0 border border-[#F0DFB7]">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Company Information</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      This information will be used across the website and communications.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLogoModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FBEFDD] text-[#0B2341] border border-[#F0DFB7] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#C5963D]" />
                  <span>Update Logo / Icon</span>
                </button>
              </div>

              {/* COMPANY LOGO SELECTION FIELD */}
              <div className="pt-2 pb-3 border-b border-slate-100">
                <ImagePickerInput
                  label="Company Logo / Crest Emblem"
                  value={settings.logo || ''}
                  onChange={(url) => setSettings(prev => ({ ...prev, logo: url }))}
                  placeholder="Upload logo file or paste URL..."
                  aspectRatio="circle"
                  helpText="Upload your custom logo or choose a stock corporate emblem."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={settings.company_name}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    placeholder="e.g. KRITISHA Infrastructure Private Limited"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Support Email *</label>
                  <input
                    type="email"
                    required
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    placeholder="admin@kritishainfra.com"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Primary Phone *</label>
                  <input
                    type="text"
                    required
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    placeholder="+91 9021904161 / 0712-2724493"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Working Hours</label>
                  <div className="relative flex items-center">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={settings.working_hours || 'Mon - Sat: 9:00 AM - 7:00 PM'}
                      onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                      placeholder="Mon - Sat: 9:00 AM - 7:00 PM"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-8 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
                    />
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Corporate Headquarters Address</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <textarea
                    rows={2}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    placeholder="R - 25, Reshimbagh, Umred Road, Nagpur - 440009, Maharashtra, India / Office No. 319, Commodity Exchange Bldg, Vashi, Navi Mumbai"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: HOMEPAGE HERO CONTENT CARD */}
          {(activeTab === 'hero' || activeTab === 'company') && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF8EE] text-[#C5963D] flex items-center justify-center shrink-0 border border-[#F0DFB7]">
                    <ImageIcon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Homepage Hero Content</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Update the main heading and description shown on the homepage.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowImagePicker(!showImagePicker)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FDF8EE] hover:bg-[#FBEFDD] text-[#0B2341] border border-[#F0DFB7] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#C5963D]" />
                  <span>Edit in Visual Editor</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Hero Main Title *</label>
                  <input
                    type="text"
                    required
                    value={settings.hero_title || "Building What's Next"}
                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                    placeholder="e.g. Building What's Next"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Hero Subtitle & Supporting Paragraph</label>
                  <textarea
                    rows={3}
                    value={settings.hero_description || "Over 40 years of pioneering excellence across nation-wide user fee toll collection, highway engineering, irrigation infrastructure, and smart transit operations in India."}
                    onChange={(e) => setSettings({ ...settings, hero_description: e.target.value })}
                    placeholder="Over 40 years of pioneering excellence across nation-wide user fee toll collection, highway engineering, irrigation infrastructure, and smart transit operations in India."
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors leading-relaxed"
                  />
                </div>

                {/* Optional Expandable Image Picker for Background */}
                {(showImagePicker || activeTab === 'hero') && (
                  <div className="pt-2 border-t border-slate-100 animate-in fade-in duration-200">
                    <ImagePickerInput
                      label="Homepage Hero Background / Banner Image"
                      value={settings.hero_image || '/images/hero_bridge.jpg'}
                      onChange={(url) => setSettings(prev => ({ ...prev, hero_image: url }))}
                      placeholder="Upload file or paste URL..."
                      aspectRatio="landscape"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION 3: PERFORMANCE METRICS CARD */}
          {(activeTab === 'metrics') && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FDF8EE] text-[#C5963D] flex items-center justify-center shrink-0 border border-[#F0DFB7]">
                  <TrendingUp className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Corporate Performance Metrics</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live counters displayed in the homepage impact section and live preview.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Projects Delivered</label>
                  <input
                    type="text"
                    value={stats.projects_count || '100+'}
                    onChange={(e) => setStats({ ...stats, projects_count: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Years of Experience</label>
                  <input
                    type="text"
                    value={stats.years_experience || '25+'}
                    onChange={(e) => setStats({ ...stats, years_experience: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">States</label>
                  <input
                    type="text"
                    value={stats.cities_count || '15+'}
                    onChange={(e) => setStats({ ...stats, cities_count: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Team Members</label>
                  <input
                    type="text"
                    value={stats.deployed_staff || '700+'}
                    onChange={(e) => setStats({ ...stats, deployed_staff: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: SEO & INTEGRATIONS CARD */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FDF8EE] text-[#C5963D] flex items-center justify-center shrink-0 border border-[#F0DFB7]">
                    <Sliders className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-[#0B2341]">SEO & Integrations</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure global search engine optimization keywords and meta descriptions.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Global SEO Keywords</label>
                    <input
                      type="text"
                      value={settings.seo_keywords || 'Toll Plaza Management, Highway Construction, FASTag Lanes, Infra Engineering'}
                      onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
                      placeholder="Toll Plaza Management, Highway Construction, FASTag Lanes"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Global Meta Description</label>
                    <textarea
                      rows={3}
                      value={settings.seo_description || 'Pioneering infrastructure, user-fee toll operations, highway engineering, and smart transit across India.'}
                      onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                      placeholder="Pioneering infrastructure, user-fee toll operations..."
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Google Analytics (GA4) Measurement ID</label>
                    <input
                      type="text"
                      value={settings.google_analytics_id || ''}
                      onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                      placeholder="e.g. G-XXXXXXXXXX"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Enter your "G-" measurement ID to enable Google Analytics pageview tracking.
                    </p>
                  </div>
                </div>
              </div>

              {/* GMAIL NOTIFICATION INTEGRATION CARD */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Enquiry Email Notifications (Gmail)</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Receive instant email alerts on your Gmail inbox whenever a new client submits an enquiry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Recipient Gmail Address *</label>
                    <input
                      type="email"
                      required
                      value={settings.notification_email || (settings.email ? settings.email : 'admin@kritishainfra.com')}
                      onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                      placeholder="e.g. yourname@gmail.com or admin@kritishainfra.com"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      All new project inquiries and website messages will be delivered directly to this Gmail inbox.
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">Web3Forms Access Key (Optional for Custom Domain)</label>
                    <input
                      type="text"
                      value={settings.web3forms_key || ''}
                      onChange={(e) => setSettings({ ...settings, web3forms_key: e.target.value })}
                      placeholder="Paste Web3Forms Access Key (e.g. 9d7a2fa2-43bb-4d57-...)"
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      Get a free instant access key from <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-[#C5963D] underline">web3forms.com</a> to connect your personal Gmail account directly.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const { sendEnquiryEmailNotification } = await import('../../lib/emailService');
                        const res = await sendEnquiryEmailNotification({
                          name: 'Demo Client (Test)',
                          company: 'KRITISHA Infrastructure Test Corp',
                          email: settings.notification_email || settings.email || 'test@example.com',
                          phone: '+91 9021904161',
                          service_interest: 'Toll Plaza Management & FASTag',
                          message: 'This is a test notification email from your KRITISHA Website CMS to verify Gmail delivery.',
                          created_at: new Date().toISOString()
                        });
                        if (res.success) {
                          alert(`✅ Test email notification sent successfully to ${settings.notification_email || settings.email}! Check your Gmail inbox.`);
                        } else {
                          alert(`⚠️ Test email dispatched. Check your inbox or Web3Forms status: ${res.message || 'Sent'}`);
                        }
                      }}
                      className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-[#0B2341] border border-amber-200 rounded-xl text-xs font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C5963D]" />
                      <span>Send Test Email to Gmail</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: SECURITY & 2FA CARD */}
          {activeTab === 'security' && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-bold text-[#0B2341]">Two-Factor Authentication (2FA)</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Enhance your admin account security by requiring a 6-digit code from your authenticator app during login.
                  </p>
                </div>
              </div>

              {!adminProfile?.is2FAEnabled ? (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                    <h4 className="text-sm font-semibold text-slate-700">Enable 2FA</h4>
                    
                    {!setup2FAUrl ? (
                      <button
                        type="button"
                        onClick={handleStart2FASetup}
                        className="px-4 py-2 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                      >
                        Start Setup
                      </button>
                    ) : (
                      <div className="space-y-4 animate-in fade-in duration-300">
                        <p className="text-xs text-slate-600">
                          1. Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.):
                        </p>
                        <div className="bg-white p-3 rounded-xl border border-slate-200 inline-block">
                          <QRCodeSVG value={setup2FAUrl} size={150} level="H" />
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Secret Key: {setup2FASecret}
                        </p>

                        <div className="pt-2">
                          <p className="text-xs text-slate-600 mb-2">
                            2. Enter the 6-digit code generated by your app to verify and enable 2FA:
                          </p>
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              maxLength={6}
                              value={verify2FACode}
                              onChange={(e) => setVerify2FACode(e.target.value.replace(/\D/g, ''))}
                              placeholder="000000"
                              className="w-32 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono tracking-widest text-center focus:outline-none focus:border-[#C5963D]"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyAndEnable2FA}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                              Verify & Enable
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSetup2FAUrl('');
                                setSetup2FASecret('');
                                setVerify2FACode('');
                                setTwoFaError('');
                              }}
                              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                          {twoFaError && (
                            <p className="text-xs text-rose-600 mt-2 font-medium">{twoFaError}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      2FA is Currently Enabled
                    </h4>
                    <p className="text-xs text-emerald-600 mt-1">
                      Your account is protected. You will be asked for a 6-digit code every time you log in.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDisable2FA}
                    className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Disable 2FA
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: LIVE PREVIEW & QUICK ACTIONS (5 COLS) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-6">
          
          {/* CARD 1: LIVE PREVIEW HERO CARD */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#0B2341]" />
                <h3 className="font-editorial text-lg font-bold text-[#0B2341]">Live Preview</h3>
              </div>
              <Link
                to="/"
                target="_blank"
                className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B2341] border border-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Open Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>

            {/* EXACT HERO PREVIEW CONTAINER MATCHING SCREENSHOT */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#F1E5D1] text-slate-800 relative flex flex-col justify-between min-h-[300px]">
              
              {/* Right Side Infrastructure / Highway Bridge Visual */}
              <div className="absolute right-0 top-0 bottom-0 w-3/5 z-0 overflow-hidden">
                <img
                  src={settings.hero_image || "/images/hero_bridge.jpg"}
                  alt="Live Hero Preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.target.src = "/images/hero_bridge.jpg";
                  }}
                />
                {/* Soft left-to-right fade gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EE] via-[#FAF6EE]/80 to-transparent" />
              </div>

              {/* Hero Banner Text Content */}
              <div className="relative z-10 p-6 space-y-3 max-w-[75%]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5963D] block">
                  {settings.company_name ? settings.company_name.split(' - ')[0] : 'KRITISHA'}
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight text-[#0B2341]">
                  Building <br /> What's Next
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  {settings.hero_description || "Over 40 years of pioneering excellence across nation-wide user fee toll collection, highway engineering, irrigation infrastructure, and smart transit operations in India."}
                </p>
              </div>

              {/* Bottom Live Stats Horizontal Bar with Vertical Divider Lines */}
              <div className="relative z-10 bg-white/90 backdrop-blur-xs border-t border-slate-200/80 p-3.5 grid grid-cols-4 divide-x divide-slate-200 text-center">
                <div className="px-1">
                  <span className="font-editorial text-base font-bold text-[#0B2341] block leading-none">
                    {stats.projects_count || '100+'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">Projects Delivered</span>
                </div>
                <div className="px-1">
                  <span className="font-editorial text-base font-bold text-[#0B2341] block leading-none">
                    {stats.years_experience || '25+'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">Years of Experience</span>
                </div>
                <div className="px-1">
                  <span className="font-editorial text-base font-bold text-[#0B2341] block leading-none">
                    {stats.cities_count || '15+'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">States</span>
                </div>
                <div className="px-1">
                  <span className="font-editorial text-base font-bold text-[#0B2341] block leading-none">
                    {stats.deployed_staff || '700+'}
                  </span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">Team Members</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: QUICK ACTIONS CARD */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <h3 className="font-editorial text-lg font-bold text-[#0B2341]">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoModal(true)}
                className="p-3 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-center transition-all cursor-pointer group flex flex-col items-center justify-center gap-1.5"
              >
                <ImageIcon className="w-4 h-4 text-slate-600 group-hover:text-[#0B2341] transition-colors" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#0B2341]">Update Logo / Icon</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('hero');
                  setShowImagePicker(true);
                }}
                className="p-3 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-center transition-all cursor-pointer group flex flex-col items-center justify-center gap-1.5"
              >
                <Folder className="w-4 h-4 text-slate-600 group-hover:text-[#0B2341] transition-colors" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#0B2341]">Manage Images</span>
              </button>

              <Link
                to="/"
                target="_blank"
                className="p-3 bg-slate-50/80 hover:bg-slate-100 border border-slate-200/80 rounded-xl text-center transition-all cursor-pointer group flex flex-col items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-slate-600 group-hover:text-[#0B2341] transition-colors" />
                <span className="text-[11px] font-semibold text-slate-700 group-hover:text-[#0B2341]">Preview Changes</span>
              </Link>
            </div>
          </div>

          {/* CARD 3: PRO TIP CALLOUT BANNER (LIGHT BLUE MATCHING SCREENSHOT) */}
          {showProTip && (
            <div className="bg-[#F0F7FF] border border-blue-100 rounded-2xl p-4 shadow-2xs relative flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100/90 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/80 shadow-2xs">
                <Lightbulb className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
              </div>
              <div className="space-y-0.5 pr-6">
                <h4 className="text-xs font-bold text-[#0B2341]">Pro Tip</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Keep your hero content clear and impactful. It's the first thing visitors see.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProTip(false)}
                className="absolute top-3.5 right-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
