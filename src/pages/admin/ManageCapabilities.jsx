import React, { useState } from 'react';
import { Plus, Trash2, Edit, X, Layers } from 'lucide-react';
import { getCapabilities, addCapability, updateCapability, deleteCapability } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import IconPickerInput, { ICON_MAP } from '../../components/IconPickerInput';

export default function ManageCapabilities() {
  const [capabilities, setCapabilities] = useState(getCapabilities());
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    full_description: '',
    image_url: '/images/hero_expertise.jpg',
    icon_name: 'Building2'
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      image_url: '/images/hero_expertise.jpg',
      icon_name: 'Building2'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (cap) => {
    setEditingItem(cap);
    setFormData({
      title: cap.title || '',
      slug: cap.slug || '',
      short_description: cap.short_description || '',
      full_description: cap.full_description || '',
      image_url: cap.image_url || '/images/hero_expertise.jpg',
      icon_name: cap.icon_name || 'Building2'
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = updateCapability(editingItem.id, formData);
      setCapabilities(updated);
    } else {
      const updated = addCapability(formData);
      setCapabilities(updated);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this capability pillar?')) {
      const updated = deleteCapability(id);
      setCapabilities(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Capabilities CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui mt-1">
            Manage core infrastructure capability pillars displayed across the website.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5963D]" />
          <span>Add New Capability</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <div key={cap.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={cap.image_url} alt={cap.title} className="w-14 h-14 rounded-xl object-cover border border-slate-100" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#0B2341] text-[#C5963D] flex items-center justify-center border border-white shadow-xs">
                      {React.createElement(ICON_MAP[cap.icon_name] || ICON_MAP.Building2, { className: "w-3.5 h-3.5" })}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-editorial text-lg font-bold text-[#0B2341]">{cap.title}</h3>
                    <span className="text-[10px] font-mono text-slate-400">/{cap.slug} • Icon: <span className="font-semibold text-slate-600">{cap.icon_name || 'Building2'}</span></span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{cap.short_description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(cap)}
                className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Edit Capability"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cap.id)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Capability"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-slate-800 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2341]">
                  {editingItem ? 'Edit Capability Pillar' : 'Add New Capability Pillar'}
                </h3>
                <p className="text-xs text-slate-500">Updates live across homepage impact sections.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Capability Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Highway & Civil Infrastructure"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <ImagePickerInput
                  label="Capability Image *"
                  value={formData.image_url}
                  onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  placeholder="Upload file or paste URL..."
                  aspectRatio="landscape"
                />
              </div>

              <div>
                <IconPickerInput
                  label="Capability Icon / Symbol *"
                  value={formData.icon_name}
                  onChange={(iconName) => setFormData(prev => ({ ...prev, icon_name: iconName }))}
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief description for capabilities grid..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="In-depth details..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-semibold text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#0B2341] text-white rounded-xl font-semibold text-xs shadow-md">
                  {editingItem ? 'Save Changes' : 'Create Capability'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
