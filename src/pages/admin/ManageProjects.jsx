import React, { useState } from 'react';
import { Plus, Trash2, Edit, MapPin, Check, X, FolderKanban, Eye, List, Columns3, LayoutGrid } from 'lucide-react';
import { getProjects, saveProjects, addProject, updateProject, deleteProject, useCmsLiveStore } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';

export default function ManageProjects() {
  const projects = useCmsLiveStore(getProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewMode, setViewMode] = useState('columns'); // 'table' | 'columns'

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    tagline: '',
    short_description: '',
    full_description: '',
    location: '',
    total_length: '',
    lanes: '',
    scope: '',
    featured_image: '/images/hero_work.jpg',
    status: 'Active Operational',
    is_featured: true
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      tagline: 'HIGHWAY & INFRASTRUCTURE ASSET',
      short_description: '',
      full_description: '',
      location: 'Maharashtra, India',
      total_length: '25 km Corridor',
      lanes: '4-6 Lanes',
      scope: 'Turnkey Construction & Operations',
      featured_image: '/images/hero_work.jpg',
      status: 'Active Operational',
      is_featured: true
    });
    setShowModal(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      tagline: proj.tagline || '',
      short_description: proj.short_description || '',
      full_description: proj.full_description || '',
      location: proj.location || '',
      total_length: proj.total_length || '',
      lanes: proj.lanes || '',
      scope: proj.scope || '',
      featured_image: proj.featured_image || '/images/hero_work.jpg',
      status: proj.status || 'Active Operational',
      is_featured: proj.is_featured ?? true
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      addProject(formData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this project landmark from the site?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Projects CMS Manager</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui mt-1">
            Create, update, or remove landmark infrastructure projects shown on the Work page.
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
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C5963D]" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="relative h-48 bg-slate-900">
              <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2341]/80 via-transparent to-transparent" />
              
              <span className="absolute top-3 right-3 bg-[#0B2341]/90 text-[#C5963D] border border-[#C5963D]/40 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                {proj.status}
              </span>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5963D] block">
                  {proj.location}
                </span>
                <h3 className="font-editorial text-base font-bold truncate">{proj.title}</h3>
              </div>
            </div>

            <div className="p-5 space-y-2 flex-1">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {proj.short_description || proj.full_description}
              </p>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-between items-center bg-[#F8FAFC]">
              <span className="text-xs font-semibold text-slate-600 truncate max-w-[160px]">
                {proj.total_length || proj.scope || 'Infrastructure'}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-slate-800 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2341]">
                  {editingProject ? 'Edit Project Landmark' : 'Add New Infrastructure Project'}
                </h3>
                <p className="text-xs text-slate-500">Form updates live across Work and Home portfolio displays.</p>
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
                  <label className="block font-medium text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Bandra-Worli Sea Link Operations"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. HIGH-DENSITY MARITIME CORRIDOR"
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                  >
                    <option value="Active Operational">Active Operational</option>
                    <option value="Under Execution">Under Execution</option>
                    <option value="Completed Contract">Completed Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <ImagePickerInput
                  label="Featured Project Image *"
                  value={formData.featured_image}
                  onChange={(url) => setFormData(prev => ({ ...prev, featured_image: url }))}
                  placeholder="Upload file or paste URL..."
                  aspectRatio="landscape"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Short Description *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Summary shown on project card grid..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.full_description}
                  onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                  placeholder="Detailed project breakdown shown on detail page..."
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
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
