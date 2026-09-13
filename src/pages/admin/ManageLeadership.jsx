import React, { useState } from 'react';
import { Plus, Trash2, Edit, X, UserCheck, ShieldCheck, Upload, Image as ImageIcon, Camera, Copy, ExternalLink, Search, Link2 } from 'lucide-react';
import { getLeadership, addLeadership, updateLeadership, deleteLeadership, useCmsLiveStore, compressImageFile } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import toast from 'react-hot-toast';

export default function ManageLeadership() {
  const leadership = useCmsLiveStore(getLeadership);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const defaultAvatar = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85';

  const [formData, setFormData] = useState({
    id: '',
    slug: '',
    name: '',
    designation: '',
    bio: '',
    image: defaultAvatar
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      id: '',
      slug: '',
      name: '',
      designation: 'Executive Director',
      bio: '',
      image: defaultAvatar
    });
    setShowModal(true);
  };

  const handleOpenEdit = (person) => {
    setEditingItem(person);
    setFormData({
      id: person.id || '',
      slug: person.slug || '',
      name: person.name || '',
      designation: person.designation || person.role || '',
      bio: person.bio || '',
      image: person.image || person.image_url || defaultAvatar
    });
    setShowModal(true);
  };

  const copyToClipboard = (text, label = 'Unique ID') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied: ${text}`);
  };

  const copyDirectLink = (lead) => {
    const origin = window.location.origin;
    const url = `${origin}/about#${lead.slug || lead.id}`;
    navigator.clipboard.writeText(url);
    toast.success(`Direct link copied: ${url}`);
  };

  // Handle local image file upload with automatic canvas compression
  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressed = await compressImageFile(file, 800, 800, 0.75);
      if (compressed) {
        setFormData(prev => ({ ...prev, image: compressed }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      updateLeadership(editingItem.id, formData);
      toast.success('Executive profile updated');
    } else {
      addLeadership(formData);
      toast.success('Executive profile added');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteLeadership(id);
    toast.success('Executive profile deleted');
  };

  const filteredLeadership = leadership.filter(lead => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (lead.id && lead.id.toLowerCase().includes(q)) ||
      (lead.slug && lead.slug.toLowerCase().includes(q)) ||
      (lead.name && lead.name.toLowerCase().includes(q)) ||
      ((lead.designation || lead.role || '').toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0B2341]">Leadership CMS</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-sans-ui mt-1">
            Manage Directors and Executive Leadership displayed on the About page.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#C5963D]" />
          <span>Add Executive Member</span>
        </button>
      </div>

      {/* SEARCH / FILTER & STATS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or unique ID (e.g. lead-1, vinod)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="text-xs text-slate-500 font-sans-ui flex items-center gap-2">
          <span>Showing <strong>{filteredLeadership.length}</strong> of <strong>{leadership.length}</strong> executive members</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLeadership.map((lead) => (
          <div key={lead.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#C5963D] shrink-0 shadow-sm bg-slate-100 relative">
                  <img
                    src={lead.image || lead.image_url || defaultAvatar}
                    alt={lead.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => { e.target.src = defaultAvatar; }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-editorial text-base font-bold text-[#0B2341] truncate">{lead.name}</h3>
                  <span className="text-xs text-[#C5963D] font-semibold block mt-0.5 truncate">{lead.designation || lead.role}</span>
                  
                  {/* UNIQUE ID & QUICK ACCESS PILL */}
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span 
                      onClick={() => copyToClipboard(lead.id, 'Unique ID')}
                      title="Click to copy ID"
                      className="font-mono text-[10px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 cursor-pointer inline-flex items-center gap-1 transition-colors"
                    >
                      <span>ID: {lead.id}</span>
                      <Copy className="w-2.5 h-2.5 text-slate-400" />
                    </span>
                    {lead.slug && lead.slug !== lead.id && (
                      <span 
                        onClick={() => copyToClipboard(lead.slug, 'Slug')}
                        title="Click to copy Slug"
                        className="font-mono text-[10px] text-slate-500 bg-slate-50 hover:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 cursor-pointer inline-flex items-center gap-1 transition-colors"
                      >
                        <span>#{lead.slug}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">{lead.bio}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <a 
                href={`/about#${lead.slug || lead.id}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition-colors"
                title="View directly on About page"
              >
                <span>View on Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => copyDirectLink(lead)}
                  className="p-1.5 text-slate-500 hover:text-[#C5963D] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Copy Direct Link URL"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOpenEdit(lead)}
                  className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Edit Leadership Profile"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setItemToDelete(lead)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Leadership Profile"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL WITH PROFILE PHOTO UPLOAD & PREVIEW */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-slate-800 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="font-editorial text-2xl font-bold text-[#0B2341]">
                  {editingItem ? 'Edit Executive Profile' : 'Add Executive Member'}
                </h3>
                <p className="text-xs text-slate-500">Executive profiles appear on About & Leadership sections.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* UNIQUE ID DISPLAY / CUSTOM INPUT */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Unique Member ID</span>
                  <span className="font-mono text-xs font-bold text-[#0B2341]">{formData.id || (editingItem ? editingItem.id : 'Will be auto-generated upon saving')}</span>
                </div>
                {formData.id && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(formData.id, 'Unique ID')}
                    className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>Copy</span>
                  </button>
                )}
              </div>
              {/* PROFILE PHOTO SELECTION */}
              <div>
                <ImagePickerInput
                  label="Executive Profile Photo *"
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  placeholder="Upload photo or paste image URL..."
                  aspectRatio="circle"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rajesh Shaikh"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Designation *</label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g. Managing Director & CEO"
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Executive Bio</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Over 25+ years of leadership driving mega infrastructure projects..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#0B2341] hover:bg-[#163F68] text-white rounded-xl font-semibold text-xs shadow-md">
                  {editingItem ? 'Save Changes' : 'Add Executive'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => itemToDelete && handleDelete(itemToDelete.id)}
        itemName={itemToDelete?.name}
      />
    </div>
  );
}
