import React, { useState } from 'react';
import { Plus, Trash2, Edit, Check, X, Compass, Plane, Car, Users, Navigation, Eye, CheckSquare, TrendingUp, FileText, Briefcase, List, Columns3, Tag } from 'lucide-react';
import { getServices, saveServices, addService, updateService, deleteService, useCmsLiveStore } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import IconPickerInput, { ICON_MAP } from '../../components/IconPickerInput';

export default function ManageServices() {
  const services = useCmsLiveStore(getServices);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewMode, setViewMode] = useState('columns'); // 'table' | 'columns'

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Operations',
    short_description: '',
    full_description: '',
    image_url: '/images/hero_expertise.jpg',
    icon_name: 'Compass',
    is_featured: true
  });

  const handleOpenAdd = (defaultCat = 'Operations') => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      category: defaultCat,
      short_description: '',
      full_description: '',
      image_url: '/images/hero_expertise.jpg',
      icon_name: 'Compass',
      is_featured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (srv) => {
    setEditingService(srv);
    setFormData({
      title: srv.title || '',
      slug: srv.slug || '',
      category: srv.category || 'Operations',
      short_description: srv.short_description || '',
      full_description: srv.full_description || '',
      image_url: srv.image_url || '/images/hero_expertise.jpg',
      icon_name: srv.icon_name || 'Compass',
      is_featured: srv.is_featured ?? true
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateService(editingService.id, formData);
    } else {
      addService(formData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this service offering?')) {
      deleteService(id);
    }
  };

  // Categories list for Column view
  const categoriesList = ['Transportation', 'Operations', 'Consultancy'];
  const dynamicCategories = Array.from(new Set(services.map(s => s.category || 'Operations')));
  const allCategories = Array.from(new Set([...categoriesList, ...dynamicCategories]));

  const categoryColorMap = {
    'Transportation': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badgeBg: 'bg-blue-600', hoverBorder: 'hover:border-blue-300' },
    'Operations': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badgeBg: 'bg-[#C5963D]', hoverBorder: 'hover:border-amber-300' },
    'Consultancy': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', badgeBg: 'bg-purple-600', hoverBorder: 'hover:border-purple-300' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Services CMS Manager</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui mt-1">
            Manage operational capabilities, toll management, consultancy, and service offerings.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* VIEW MODE SWITCHER */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#0B2341] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('columns')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'columns'
                  ? 'bg-[#0B2341] text-[#C5963D] shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Column View"
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Columns</span>
            </button>
          </div>

          <button
            onClick={() => handleOpenAdd('Operations')}
            className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5963D]" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* 1. TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-slate-500 font-semibold uppercase border-b border-slate-200/80">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Short Description</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((srv) => (
                <tr key={srv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0B2341] text-[#C5963D] flex items-center justify-center shrink-0 font-bold border border-white/10 shadow-2xs">
                        {React.createElement(ICON_MAP[srv.icon_name] || ICON_MAP.Compass, { className: "w-4 h-4" })}
                      </div>
                      <div>
                        <div className="font-bold text-[#0B2341] text-xs">{srv.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono">/{srv.slug} • Icon: <span className="font-semibold text-slate-600">{srv.icon_name || 'Compass'}</span></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[10px]">
                      {srv.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-md truncate">
                    {srv.short_description}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(srv)}
                      className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. VERTICAL COLUMN KANBAN VIEW */}
      {viewMode === 'columns' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {allCategories.map((cat) => {
            const catServices = services.filter(s => (s.category || 'Operations') === cat);
            const style = categoryColorMap[cat] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', badgeBg: 'bg-slate-700', hoverBorder: 'hover:border-slate-300' };

            return (
              <div 
                key={cat}
                className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 flex flex-col space-y-4 min-h-[480px] shadow-2xs"
              >
                {/* COLUMN HEADER */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${style.badgeBg}`} />
                    <h3 className="font-editorial text-lg font-bold text-[#0B2341]">{cat}</h3>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
                    {catServices.length} {catServices.length === 1 ? 'Service' : 'Services'}
                  </span>
                </div>

                {/* SERVICE CARDS LIST IN COLUMN */}
                <div className="space-y-3 flex-1">
                  {catServices.map((srv) => (
                    <div
                      key={srv.id}
                      className={`bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 space-y-3 group ${style.hoverBorder}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#0B2341] text-[#C5963D] flex items-center justify-center shrink-0 font-bold group-hover:scale-105 transition-transform border border-white/10">
                            {React.createElement(ICON_MAP[srv.icon_name] || ICON_MAP.Compass, { className: "w-4 h-4" })}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0B2341] text-xs leading-snug group-hover:text-blue-600 transition-colors">
                              {srv.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              /{srv.slug}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEdit(srv)}
                            className="p-1 text-slate-500 hover:text-[#0B2341] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(srv.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {srv.short_description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="font-semibold text-slate-400 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{srv.category}</span>
                        </span>
                        <button
                          onClick={() => handleOpenEdit(srv)}
                          className="font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          Configure →
                        </button>
                      </div>
                    </div>
                  ))}

                  {catServices.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 bg-white/50 rounded-xl border border-dashed border-slate-200">
                      No services in {cat}
                    </div>
                  )}
                </div>

                {/* QUICK ADD BUTTON FOR COLUMN */}
                <button
                  type="button"
                  onClick={() => handleOpenAdd(cat)}
                  className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5963D]" />
                  <span>Add Service to {cat}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-slate-800 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2341]">
                  {editingService ? 'Edit Service Offering' : 'Add New Operational Service'}
                </h3>
                <p className="text-xs text-slate-500">Service updates appear on Expertise page and homepage.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Toll Plaza FASTag Operations"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  >
                    <option value="Transportation">Transportation</option>
                    <option value="Operations">Operations</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Audit & Inspection">Audit & Inspection</option>
                  </select>
                </div>
              </div>

              <div>
                <ImagePickerInput
                  label="Service Image *"
                  value={formData.image_url}
                  onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  placeholder="Upload file or paste URL..."
                  aspectRatio="landscape"
                />
              </div>

              <div>
                <IconPickerInput
                  label="Service Icon / Symbol *"
                  value={formData.icon_name}
                  onChange={(iconName) => setFormData(prev => ({ ...prev, icon_name: iconName }))}
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Concise overview shown in cards..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Details</label>
                <textarea
                  rows={3}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="In-depth operational scope and technical details..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B2341] hover:bg-[#163F68] text-white rounded-xl font-semibold text-xs shadow-md"
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
