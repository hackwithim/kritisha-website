import React, { useState } from 'react';
import { 
  Compass, Plane, Car, Users, Navigation, Eye, CheckSquare, 
  TrendingUp, FileText, Building2, Shield, Cpu, Activity, 
  Truck, Briefcase, Tag, Sparkles, Layers, Award, Zap, 
  Globe, Heart, Star, Info, Settings, HelpCircle, Check, Search, X
} from 'lucide-react';

export const ICON_MAP = {
  Compass: Compass,
  Building2: Building2,
  Plane: Plane,
  Car: Car,
  Truck: Truck,
  Users: Users,
  Navigation: Navigation,
  Eye: Eye,
  CheckSquare: CheckSquare,
  TrendingUp: TrendingUp,
  FileText: FileText,
  Shield: Shield,
  Cpu: Cpu,
  Activity: Activity,
  Briefcase: Briefcase,
  Award: Award,
  Zap: Zap,
  Globe: Globe,
  Sparkles: Sparkles,
  Layers: Layers
};

const CATEGORIZED_ICONS = [
  {
    category: 'Infrastructure & Transport',
    icons: ['Building2', 'Car', 'Truck', 'Plane', 'Compass', 'Navigation']
  },
  {
    category: 'Tech & Operations',
    icons: ['Cpu', 'Shield', 'Activity', 'Eye', 'Zap', 'Globe', 'Sparkles']
  },
  {
    category: 'Business & Management',
    icons: ['Briefcase', 'Users', 'CheckSquare', 'TrendingUp', 'FileText', 'Award', 'Layers']
  }
];

export function getLucideIcon(iconName, defaultClassName = "w-5 h-5") {
  const IconComponent = ICON_MAP[iconName] || ICON_MAP.Building2 || Compass;
  return <IconComponent className={defaultClassName} />;
}

export default function IconPickerInput({ 
  label = "Select Icon", 
  value = "Building2", 
  onChange,
  dark = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedIconName = value && ICON_MAP[value] ? value : 'Building2';
  const CurrentIconComponent = ICON_MAP[selectedIconName] || ICON_MAP.Building2;

  const filteredIcons = Object.keys(ICON_MAP).filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (iconName) => {
    if (onChange) {
      onChange(iconName);
    }
    setIsOpen(false);
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className={`block font-semibold text-xs ${dark ? 'text-slate-200' : 'text-slate-700'}`}>
          {label}
        </label>
      )}

      {/* Main trigger button displaying current icon + "Update Icon" button */}
      <div className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
        dark 
          ? 'bg-slate-900/90 border-slate-700/80 text-white' 
          : 'bg-[#F8FAFC] border-slate-200 text-slate-800'
      }`}>
        <div className="w-10 h-10 rounded-lg bg-[#0B2341] text-[#C5963D] flex items-center justify-center shrink-0 shadow-xs border border-white/10">
          <CurrentIconComponent className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="font-bold text-xs truncate">{selectedIconName}</div>
          <div className="text-[10px] text-slate-400">Selected Icon Symbol</div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 bg-[#C5963D] hover:bg-[#b08432] text-[#0B2341] font-bold text-xs rounded-lg transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Update Icon</span>
        </button>
      </div>

      {/* ICON PICKER MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className={`relative w-full max-w-md rounded-2xl p-6 shadow-2xl z-10 border my-auto transition-all ${
            dark ? 'bg-[#0B1E36] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/20 mb-4">
              <div>
                <h3 className="font-editorial text-xl font-bold">Choose Icon</h3>
                <p className="text-xs text-slate-400">Select an icon symbol for your CMS card</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-500/20 hover:bg-slate-500/30 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search icon name (e.g. Compass, Car, Cpu)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#C5963D] ${
                  dark ? 'bg-slate-900/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              />
            </div>

            {/* Icons Grid */}
            <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
              {searchTerm ? (
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Search Results ({filteredIcons.length})</div>
                  <div className="grid grid-cols-4 gap-2">
                    {filteredIcons.map((name) => {
                      const IconComp = ICON_MAP[name];
                      const isSelected = selectedIconName === name;
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => handleSelect(name)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#C5963D]/20 border-[#C5963D] text-[#C5963D] font-bold shadow-xs' 
                              : dark
                                ? 'bg-slate-900/50 border-slate-800 hover:border-slate-600 text-slate-300'
                                : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <IconComp className="w-5 h-5 mb-1" />
                          <span className="text-[10px] truncate max-w-full">{name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                CATEGORIZED_ICONS.map((catGroup) => (
                  <div key={catGroup.category}>
                    <div className="text-[11px] font-semibold text-slate-400 mb-2">{catGroup.category}</div>
                    <div className="grid grid-cols-4 gap-2">
                      {catGroup.icons.map((name) => {
                        const IconComp = ICON_MAP[name];
                        if (!IconComp) return null;
                        const isSelected = selectedIconName === name;
                        return (
                          <button
                            key={name}
                            type="button"
                            onClick={() => handleSelect(name)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-[#C5963D]/20 border-[#C5963D] text-[#C5963D] font-bold shadow-xs' 
                                : dark
                                  ? 'bg-slate-900/50 border-slate-800 hover:border-slate-600 text-slate-300'
                                  : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <IconComp className="w-5 h-5 mb-1" />
                            <span className="text-[10px] truncate max-w-full">{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Close / Action Footer */}
            <div className="mt-5 pt-3 border-t border-slate-200/20 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-slate-500/20 hover:bg-slate-500/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
