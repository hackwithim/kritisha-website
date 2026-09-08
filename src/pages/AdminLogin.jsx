import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { loginAdmin } from '../lib/cmsStore';
import KritishaLogo from '../components/KritishaLogo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginAdmin(email, password, requires2FA ? totpCode : null);
    if (res.requires2FA) {
      setRequires2FA(true);
      setErrorMsg('');
      return;
    }
    if (res.success) {
      navigate('/admin');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex items-center justify-center p-4 selection:bg-[#C5963D] selection:text-white font-sans-ui">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <KritishaLogo variant="icon" size="xl" />
          </div>
          <div className="inline-flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#C5963D] tracking-[0.24em] uppercase">
              KRITISHA INFRASTRUCTURE
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Admin Control Portal</h2>
          <p className="text-xs text-slate-500 font-sans-ui">
            Sign in to manage website content, operations & enquiries
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {!requires2FA ? (
            <>
              <div>
                <label className="block font-medium text-slate-700 mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in duration-300">
              <label className="block font-medium text-slate-700 mb-1.5">6-Digit Authenticator Code</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-lg tracking-widest text-center text-slate-800 focus:outline-none focus:border-[#C5963D] focus:ring-1 focus:ring-[#C5963D] transition-all font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2 text-center">
                Open your authenticator app to view your 2FA code.
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#0B2341] hover:bg-[#163F68] active:scale-[0.99] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md"
            >
              <span>{requires2FA ? "Verify & Sign In" : "Continue to Verify"}</span>
              <ArrowRight className="w-4 h-4 text-[#C5963D]" />
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-1.5">
          <div className="pt-2">
            <Link to="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#C5963D] text-[11px] font-medium transition-colors">
              <span>Return to Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
