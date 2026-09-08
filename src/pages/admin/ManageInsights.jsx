import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Search, 
  FileText, 
  X, 
  Check, 
  Eye, 
  Sparkles,
  Calendar,
  User,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getInsights, saveInsights, addInsight, updateInsight, deleteInsight, useCmsLiveStore } from '../../lib/cmsStore';
import ImagePickerInput from '../../components/ImagePickerInput';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Infrastructure',
  'Engineering',
  'Operations',
  'Consultancy',
  'Audit & Inspection',
  'Industry Updates'
];

const INITIAL_FORM = {
  id: '',
  title: '',
  slug: '',
  category: 'Infrastructure',
  cover_image: '',
  excerpt: '',
  content: '',
  author: 'KRITISHA Editorial Team',
  publish_date: new Date().toISOString().split('T')[0],
  read_time: '5 min read',
  featured: false,
  seo_keywords: '',
  seo_description: ''
};

export default function ManageInsights() {
  const insights = useCmsLiveStore(getInsights);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [insightToDelete, setInsightToDelete] = useState(null);

  const filteredInsights = insights.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.excerpt.toLowerCase().includes(search.toLowerCase()) ||
                          item.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setFormData({
      ...INITIAL_FORM,
      id: 'ins-' + Date.now(),
      publish_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      ...item,
      cover_image: item.cover_image || item.featured_image || '',
      author: typeof item.author === 'string' ? item.author : (item.author?.name || 'KRITISHA Editorial Team')
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val) => {
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug && isEditing ? prev.slug : generatedSlug
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) {
      toast.error('Please fill in at least the Title and Excerpt.');
      return;
    }

    if (formData.featured) {
      // Ensure only one article is marked as primary featured
      const updated = insights.map((item) => 
        item.id === formData.id ? { ...formData } : { ...item, featured: false }
      );
      saveInsights(updated);
    } else {
      if (isEditing) {
        updateInsight(formData.id, formData);
        toast.success('Insight updated');
      } else {
        addInsight(formData);
        toast.success('Insight published');
      }
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteInsight(id);
    toast.success('Insight deleted');
  };

  const handleToggleFeatured = (item) => {
    const updated = insights.map((ins) => ({
      ...ins,
      featured: ins.id === item.id ? !ins.featured : false
    }));
    saveInsights(updated);
  };

  return (
    <div className="space-y-8 font-sans-ui text-[#0B2341]">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5963D]" />
            <h1 className="font-editorial text-2xl sm:text-3xl font-bold">Insights & Publications CMS</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Publish engineering reports, operational whitepapers, and industry perspectives.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer border border-[#C5963D]/30 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#C5963D]" />
          <span>New Article</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search titles, authors, excerpts..."
            className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C5963D]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {['All', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B2341] text-[#DDBB73] shadow-sm'
                  : 'bg-[#F5F7F9] text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* INSIGHTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsights.map((item) => (
          <div
            key={item.id}
            className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all ${
              item.featured ? 'border-[#C5963D] ring-2 ring-[#C5963D]/20' : 'border-slate-200'
            }`}
          >
            <div>
              {/* Cover Image & Badges */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={item.cover_image || item.featured_image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'}
                  alt=""
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-[#0B2341]/90 text-[#DDBB73] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase border border-[#C5963D]/30 backdrop-blur-sm shadow-xs">
                    {item.category}
                  </span>
                </div>

                <button
                  onClick={() => handleToggleFeatured(item)}
                  title={item.featured ? 'Featured Hero Article' : 'Mark as Featured Hero'}
                  className={`absolute top-3 right-3 p-1.5 rounded-full transition-all cursor-pointer ${
                    item.featured
                      ? 'bg-[#C5963D] text-[#0B2341] shadow-lg'
                      : 'bg-[#0B2341]/70 text-slate-300 hover:text-white'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-[#C5963D]" />
                    {item.publish_date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {item.read_time}
                  </span>
                </div>

                <h3 className="font-editorial text-base font-bold text-[#0B2341] line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>

                <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500 font-medium border-t border-slate-100">
                  <User className="w-3 h-3 text-[#C5963D]" />
                  <span className="truncate">{typeof item.author === 'string' ? item.author : (item.author?.name || 'KRITISHA Editorial Team')}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-slate-100 bg-[#F5F7F9] flex items-center justify-between">
              <Link
                to={`/insights/${item.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#163F68] hover:text-[#C5963D] transition-colors"
              >
                <span>Preview</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 text-slate-600 hover:text-[#0B2341] hover:bg-white rounded-lg transition-colors cursor-pointer"
                  title="Edit Article"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setInsightToDelete(item)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Insight"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInsights.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-editorial text-lg font-bold text-slate-700">No Insights Found</h3>
          <p className="text-xs text-slate-500">Try clearing your search query or selecting another category.</p>
        </div>
      )}

      {/* EDIT / CREATE CMS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="fixed inset-0 bg-[#0B2341]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
            {/* Modal Header */}
            <div className="bg-[#0B2341] px-6 py-4 border-b border-white/10 flex items-center justify-between text-white">
              <div>
                <h2 className="font-editorial text-xl font-bold">
                  {isEditing ? 'Edit Insight Publication' : 'Create New Insight Publication'}
                </h2>
                <p className="text-xs text-[#DDBB73] font-sans-ui mt-0.5">
                  Fields format automatically for high editorial readability.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs text-[#0B2341]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Publication Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Next-Gen FASTag 3.0 & Multi-Lane Free-Flow Infrastructure"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium focus:outline-none focus:border-[#C5963D]"
                    required
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">URL Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="fastag-3-mlff-expressway-toll-technology"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D] font-mono text-[11px]"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D] font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Author */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Author Name *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Kritisha Leadership"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                    required
                  />
                </div>

                {/* Read Time */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Estimated Reading Time</label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                {/* Publish Date */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Publish Date</label>
                  <input
                    type="text"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                    placeholder="Sep 2026"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3 pt-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C5963D]"></div>
                  </label>
                  <span className="font-semibold text-slate-700">Make Featured Visual Anchor Article</span>
                </div>

                {/* Cover Image Selection */}
                <div className="sm:col-span-2">
                  <ImagePickerInput
                    label="Cover Image *"
                    value={formData.cover_image}
                    onChange={(url) => setFormData(prev => ({ ...prev, cover_image: url }))}
                    placeholder="Upload file or paste URL..."
                    aspectRatio="landscape"
                    helpText="Upload an image file from your device or enter a web URL."
                  />
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Short Excerpt / Summary (2-3 lines) *</label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Concise publication summary shown in hero & editorial grid cards..."
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-[#C5963D] leading-relaxed"
                    required
                  />
                </div>

                {/* Rich Content */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-slate-700">Rich Article Content *</label>
                  <textarea
                    rows={10}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write or paste paragraph text, HTML tags, or markdown headers..."
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl p-3.5 font-mono text-[11px] leading-relaxed focus:outline-none focus:border-[#C5963D]"
                    required
                  />
                </div>

                {/* SEO Keywords */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">SEO Keywords</label>
                  <input
                    type="text"
                    value={formData.seo_keywords}
                    onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                    placeholder="FASTag 3.0, Highway Audits, Tolling"
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>

                {/* SEO Description */}
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">SEO Meta Description</label>
                  <input
                    type="text"
                    value={formData.seo_description}
                    onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                    placeholder="Technical perspective on MLFF tolling systems across expressways."
                    className="w-full bg-[#F5F7F9] border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B2341] hover:bg-[#163F68] text-white font-semibold flex items-center gap-2 border border-[#C5963D]/40 transition-colors cursor-pointer shadow-md"
                >
                  <Check className="w-4 h-4 text-[#C5963D]" />
                  <span>{isEditing ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmModal 
        isOpen={!!insightToDelete}
        onClose={() => setInsightToDelete(null)}
        onConfirm={() => insightToDelete && handleDelete(insightToDelete.id)}
        itemName={insightToDelete?.title}
      />
    </div>
  );
}
