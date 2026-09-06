import React, { useState } from 'react';
import { Upload, Link as LinkIcon, X, RefreshCw } from 'lucide-react';
import { compressImageFile } from '../lib/cmsStore';

export const PRESET_IMAGES = [];

export default function ImagePickerInput({
  label = 'Image *',
  value = '',
  onChange = () => {},
  placeholder = 'Upload file or paste image URL...',
  aspectRatio = 'landscape', // 'landscape' | 'circle' | 'square'
  helpText = 'Upload an image file from your device or paste a web image link.',
  dark = false,
  theme = 'light' // 'light' | 'dark'
}) {
  const isDark = dark || theme === 'dark';
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const maxDim = aspectRatio === 'circle' ? 600 : 1200;
      const compressed = await compressImageFile(file, maxDim, maxDim, 0.8);
      if (compressed) {
        onChange(compressed);
      }
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`space-y-2 font-sans-ui ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
      {/* Label and Option Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <label className={`block font-medium text-[11.5px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>

        {/* Input Mode Selector */}
        <div className={`flex items-center gap-1 p-0.5 rounded-lg border text-[11px] self-start sm:self-auto ${
          isDark ? 'bg-[#0A1A2E] border-[#1B385D]' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'upload'
                ? isDark
                  ? 'bg-[#E2AD4A] text-[#07172A] shadow-2xs'
                  : 'bg-[#0B2341] text-[#C5963D] shadow-2xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1 ${
              activeTab === 'url'
                ? isDark
                  ? 'bg-[#152E4D] text-[#E2AD4A] border border-[#244875] shadow-2xs'
                  : 'bg-white text-[#0B2341] shadow-2xs'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Image URL</span>
          </button>
        </div>
      </div>

      {/* INPUT CONTROLS BASED ON ACTIVE TAB */}
      <div className={`border rounded-xl p-3 space-y-3 transition-colors ${
        isDark ? 'bg-[#0A1B2F]/90 border-[#1B385D]' : 'bg-slate-50/80 border-slate-200'
      }`}>
        {/* 1. FILE UPLOAD IMPORT */}
        {activeTab === 'upload' && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <label className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer border shrink-0 ${
              isDark
                ? 'bg-[#152E4D] hover:bg-[#1C3E68] text-white border-[#244875]'
                : 'bg-[#0B2341] hover:bg-[#163F68] text-white border-[#C5963D]/40'
            }`}>
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 text-[#C5963D] animate-spin" />
                  <span>Processing Image...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 text-[#C5963D]" />
                  <span>Browse & Upload Local Image File</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            <span className={`text-[11px] text-center sm:text-left ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Import high-res PNG, JPG or WEBP from device (auto-optimized).
            </span>
          </div>
        )}

        {/* 2. URL INPUT */}
        {activeTab === 'url' && (
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={`w-full border rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:border-[#C5963D] ${
                isDark
                  ? 'bg-[#0D2545] border-[#1B385D] text-slate-100 placeholder-slate-500'
                  : 'bg-white border-slate-200 text-slate-800'
              }`}
            />
          </div>
        )}

        {/* LIVE PREVIEW BOX */}
        {value ? (
          <div className={`flex items-center gap-3 pt-2 border-t ${isDark ? 'border-[#1B385D]' : 'border-slate-200/60'}`}>
            <div
              className={`relative overflow-hidden bg-slate-900 border shadow-2xs shrink-0 ${
                isDark ? 'border-[#1B385D]' : 'border-slate-200'
              } ${
                aspectRatio === 'circle'
                  ? 'w-14 h-14 rounded-full border-2 border-[#C5963D]'
                  : 'w-24 h-14 rounded-xl'
              }`}
            >
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/hero_bridge.jpg';
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5963D] block">
                Active Selection Preview
              </span>
              <p className={`text-[11px] font-mono truncate max-w-full ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {value.startsWith('data:') ? 'Local Uploaded File (Base64 Data)' : value}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onChange('')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                isDark ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-950/40' : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
              }`}
              title="Remove Image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <p className={`text-[11px] italic pt-1 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            {helpText}
          </p>
        )}
      </div>
    </div>
  );
}
