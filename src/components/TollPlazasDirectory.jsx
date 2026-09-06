import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Clock
} from 'lucide-react';
import { getTollPlazas, useCmsLiveStore } from '../lib/cmsStore';

export default function TollPlazasDirectory({ title = "National Toll Plaza Operations Portfolio", dark = true }) {
  const tollPlazas = useCmsLiveStore(getTollPlazas);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedConsortium, setSelectedConsortium] = useState('ALL');

  // Extract unique states and consortiums
  const uniqueStates = useMemo(() => {
    const states = tollPlazas.map(t => (t.state || '').trim()).filter(Boolean);
    return ['ALL', ...Array.from(new Set(states))];
  }, [tollPlazas]);

  const uniqueConsortiums = useMemo(() => {
    const items = tollPlazas.map(t => (t.consortium || '').trim()).filter(Boolean);
    return ['ALL', ...Array.from(new Set(items))];
  }, [tollPlazas]);

  // Calculate state plaza counts for quick filter pills
  const stateCounts = useMemo(() => {
    const counts = {};
    tollPlazas.forEach(t => {
      const st = (t.state || '').trim();
      if (st) counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  }, [tollPlazas]);

  // Filtered List
  const filteredPlazas = useMemo(() => {
    return tollPlazas.filter(item => {
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !searchLower || 
        (item.toll_name && item.toll_name.toLowerCase().includes(searchLower)) ||
        (item.city && item.city.toLowerCase().includes(searchLower)) ||
        (item.project_stretch && item.project_stretch.toLowerCase().includes(searchLower)) ||
        (item.state && item.state.toLowerCase().includes(searchLower)) ||
        (item.consortium && item.consortium.toLowerCase().includes(searchLower)) ||
        (item.authority && item.authority.toLowerCase().includes(searchLower));

      const matchesState = selectedState === 'ALL' || 
        (item.state && item.state.trim().toLowerCase() === selectedState.trim().toLowerCase());
      
      const matchesStatus = selectedStatus === 'ALL' || 
        (item.status && item.status.trim().toLowerCase() === selectedStatus.trim().toLowerCase());
      
      const matchesConsortium = selectedConsortium === 'ALL' || 
        (item.consortium && item.consortium.trim().toLowerCase() === selectedConsortium.trim().toLowerCase());

      return matchesSearch && matchesState && matchesStatus && matchesConsortium;
    });
  }, [tollPlazas, searchTerm, selectedState, selectedStatus, selectedConsortium]);

  // Group by Consortium
  const groupedPlazas = useMemo(() => {
    const groups = {};
    filteredPlazas.forEach(item => {
      const firm = item.consortium || 'Other Entities';
      if (!groups[firm]) groups[firm] = [];
      groups[firm].push(item);
    });
    return groups;
  }, [filteredPlazas]);

  // Calculate portfolio totals
  const totalValue = useMemo(() => {
    return tollPlazas.reduce((acc, curr) => acc + (Number(curr.contract_value) || 0), 0);
  }, [tollPlazas]);

  const ongoingCount = useMemo(() => {
    return tollPlazas.filter(t => t.status === 'Ongoing').length;
  }, [tollPlazas]);

  const completedCount = useMemo(() => {
    return tollPlazas.filter(t => t.status === 'Completed').length;
  }, [tollPlazas]);

  return (
    <div className="space-y-8 text-slate-900">
      
      {/* SECTION HEADER & KPI CARDS */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-[#7A540E] text-xs font-bold uppercase tracking-widest mb-3 font-sans-ui">
              <ShieldCheck className="w-4 h-4 text-[#9A7023]" />
              <span>Verified Concession Portfolio</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2341]">
              {title}
            </h2>
            <p className="text-base max-w-3xl mt-2 font-sans-ui text-slate-700 leading-relaxed">
              Systematic concession database of Pan-India user fee toll plaza contracts across Maharashtra, Gujarat, Chhattisgarh, Jharkhand, Punjab, and Rajasthan.
            </p>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-[#9A7023] text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Portfolio Value</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-[#9A7023]">
              ₹{totalValue.toFixed(2)} Cr+
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Total Concession Value</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Ongoing Operations</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-[#0B2341]">
              {ongoingCount} Plazas
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Active Concession Period</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed Contracts</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-[#0B2341]">
              {completedCount} Plazas
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">Successfully Delivered</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Geographic Reach</span>
            </div>
            <div className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 text-[#0B2341]">
              6 States
            </div>
            <div className="text-xs text-slate-600 font-medium mt-1">MH, GJ, PB, CG, JH, RJ</div>
          </div>
        </div>
      </div>

      {/* FILTER BAR & SEARCH */}
      <div className="space-y-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search plaza, state, or highway corridor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#C5963D] focus:bg-white"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-sm">
            {/* State Filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="py-2 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#C5963D]"
              >
                {uniqueStates.map(st => (
                  <option key={st} value={st}>{st === 'ALL' ? 'All States' : st}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="py-2 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#C5963D]"
              >
                <option value="ALL">All Status</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Consortium Filter */}
            <div className="flex items-center gap-2">
              <span className="text-slate-600 font-semibold">Firm:</span>
              <select
                value={selectedConsortium}
                onChange={(e) => setSelectedConsortium(e.target.value)}
                className="py-2 px-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#C5963D]"
              >
                {uniqueConsortiums.map(c => (
                  <option key={c} value={c}>{c === 'ALL' ? 'All Entities' : c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* QUICK STATE FILTER PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => setSelectedState('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-bold font-sans-ui transition-all shrink-0 cursor-pointer ${
              selectedState === 'ALL'
                ? 'bg-[#0B2341] text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-300 hover:border-[#C5963D] hover:text-[#0B2341]'
            }`}
          >
            All States ({tollPlazas.length})
          </button>
          {Object.entries(stateCounts).map(([st, count]) => {
            const isActive = selectedState.trim().toLowerCase() === st.toLowerCase();
            return (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-sans-ui transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0B2341] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-[#C5963D] hover:text-[#0B2341]'
                }`}
              >
                <span>{st}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-[#C5963D] text-[#0B2341]' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENT AREA: SYSTEMATIC DATA TABLES */}
      {filteredPlazas.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Search className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
          <p className="text-base font-semibold text-slate-800">No toll plaza records match your search filters.</p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedState('ALL'); setSelectedStatus('ALL'); setSelectedConsortium('ALL'); }}
            className="text-sm text-[#9A7023] hover:underline mt-3 cursor-pointer font-bold inline-block"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        /* SYSTEMATIC DATA TABLES VIEW (IRB / INDUSTRY STANDARD WHITE THEME) */
        <div className="space-y-12">
          {Object.entries(groupedPlazas).map(([firm, plazas]) => (
            <div key={firm} className="space-y-4 pt-4 first:pt-0">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#0B2341]" />
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">
                    {firm}
                  </h3>
                </div>
                <span className="text-xs sm:text-sm font-sans-ui text-[#9A7023] font-bold uppercase tracking-wider px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                  {plazas.length} {plazas.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-md w-full">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans-ui">
                  <thead>
                    <tr className="bg-slate-100 text-[#0B2341] border-b-2 border-slate-300 uppercase font-bold tracking-wider text-[11px] sm:text-xs">
                      <th className="py-3.5 px-3 text-center w-12 border-r border-slate-200">S.No.</th>
                      <th className="py-3.5 px-4 border-r border-slate-200">Toll Name</th>
                      <th className="py-3.5 px-4 border-r border-slate-200">State</th>
                      <th className="py-3.5 px-4 border-r border-slate-200 min-w-[200px]">Project Stretch</th>
                      <th className="py-3.5 px-4 border-r border-slate-200">Authority</th>
                      <th className="py-3.5 px-3 border-r border-slate-200 text-center">Operational Period</th>
                      <th className="py-3.5 px-4 border-r border-slate-200 text-right">Contract Value (In Cr)</th>
                      <th className="py-3.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-800 bg-white">
                    {plazas.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-amber-50/60 transition-colors group">
                        <td className="py-3.5 px-3 text-center font-mono text-slate-500 font-bold text-xs border-r border-slate-200 bg-slate-50/50">
                          {index + 1}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#0B2341] text-sm group-hover:text-[#9A7023] transition-colors border-r border-slate-200">
                          {item.toll_name}
                        </td>
                        <td className="py-3.5 px-4 border-r border-slate-200">
                          <span className="inline-flex items-center gap-1.5 text-slate-900 font-bold text-xs sm:text-sm">
                            <MapPin className="w-3.5 h-3.5 text-[#9A7023] shrink-0" />
                            <span>{item.state}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 text-xs sm:text-sm leading-relaxed border-r border-slate-200">
                          {item.project_stretch}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800 text-xs sm:text-sm border-r border-slate-200">
                          {item.authority}
                        </td>
                        <td className="py-3.5 px-3 text-center text-slate-800 font-mono text-xs sm:text-sm font-semibold border-r border-slate-200 whitespace-nowrap">
                          {item.operational_period}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-xs sm:text-sm text-[#9A7023] border-r border-slate-200 font-mono whitespace-nowrap">
                          {item.contract_value > 0 ? `₹ ${item.contract_value.toFixed(2)}` : '-'}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap border ${
                            item.status?.toLowerCase() === 'ongoing' 
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
