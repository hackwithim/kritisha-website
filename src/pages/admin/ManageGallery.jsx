import React, { useState } from 'react';
import { Camera, Plus, Trash2, Edit2, Check, X, Image as ImageIcon } from 'lucide-react';
import { getGallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, useCmsLiveStore } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import toast from 'react-hot-toast';

export default function ManageGallery() {
  const gallery = useCmsLiveStore(getGallery);
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    url: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.url || !formData.title) return;
    
    addGalleryItem(formData);
    toast.success('Photo added to gallery');
    setFormData({ title: '', category: '', url: '' });
    setIsFormOpen(false);
  };

  const handleUpdate = (id, e) => {
    e.preventDefault();
    updateGalleryItem(id, formData);
    toast.success('Photo updated successfully');
    setIsEditing(null);
    setFormData({ title: '', category: '', url: '' });
  };

  const handleDelete = (id) => {
    deleteGalleryItem(id);
    toast.success('Photo deleted');
  };

  const startEdit = (item) => {
    setIsEditing(item.id);
    setFormData({
      title: item.title || '',
      category: item.category || '',
      url: item.url || ''
    });
    setIsFormOpen(false);
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setFormData({ title: '', category: '', url: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#0B2341]">Manage Gallery</h2>
          <p className="text-slate-500 font-sans-ui mt-1">Upload and categorize photos for the public gallery.</p>
        </div>
        <button
          onClick={() => {
            setIsFormOpen(!isFormOpen);
            cancelEdit();
          }}
          className="flex items-center gap-2 bg-[#0B2341] text-white px-4 py-2 rounded-xl hover:bg-[#15345b] transition-colors"
        >
          {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isFormOpen ? 'Cancel' : 'Add Photo'}
        </button>
      </div>

      {(isFormOpen || isEditing) && (
        <form onSubmit={isEditing ? (e) => handleUpdate(isEditing, e) : handleAdd} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-medium text-[#0B2341] flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#C5963D]" />
            {isEditing ? 'Edit Photo' : 'Add New Photo'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title / Caption</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Highway Construction Phase 1"
                className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Projects, Events, Team"
                className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Photo Image</label>
              <ImagePickerInput
                value={formData.url}
                onChange={(val) => setFormData({ ...formData, url: val })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={isEditing ? cancelEdit : () => setIsFormOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#C5963D] text-white px-6 py-2 rounded-xl hover:bg-[#b38532] transition-colors"
            >
              <Check className="w-4 h-4" />
              {isEditing ? 'Save Changes' : 'Add to Gallery'}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group">
            <div className="aspect-[4/3] relative bg-slate-100">
              {item.url ? (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}
              {item.category && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 text-white text-[10px] font-medium uppercase tracking-wider rounded backdrop-blur-sm">
                  {item.category}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100">
              <h4 className="font-medium text-[#0B2341] line-clamp-1">{item.title}</h4>
              
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => startEdit(item)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => setItemToDelete(item)}
                  className="flex items-center justify-center p-1.5 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  title="Delete Photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {gallery.length === 0 && !isFormOpen && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed">
            <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-sans-ui text-center max-w-sm">No photos in the gallery. Click "Add Photo" to start building your media gallery.</p>
          </div>
        )}
      </div>

      <DeleteConfirmModal 
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={() => itemToDelete && handleDelete(itemToDelete.id)}
        itemName={itemToDelete?.title}
      />
    </div>
  );
}
