import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit, 
  X, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Search, 
  Clock, 
  Save, 
  Filter,
  DollarSign
} from 'lucide-react';
import { 
  getTollPlazas, 
  addTollPlaza, 
  updateTollPlaza, 
  deleteTollPlaza, 
  useCmsLiveStore 
} from '../../lib/cmsStore';

export default function ManageTollPlazas() {
  const tollPlazas = useCmsLiveStore(getTollPlazas);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPlaza, setEditingPlaza] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    toll_name: '',
    consortium: 'M/s Preetee Builders',
    city: '',
    state: 'Maharashtra',
    project_stretch: '',
    authority: 'National Highway Authority Of India',
    operational_period: '2025 To 2026',
    contract_value: '',
    status: 'Ongoing'
  });

  const handleOpenAddModal = () => {
    setEditingPlaza(null);
    setFormData({
      toll_name: '',
      consortium: 'M/s Preetee Builders',
      city: '',
      state: 'Maharashtra',
      project_stretch: '',
      authority: 'National Highway Authority Of India',
      operational_period: '2025 To 2026',
      contract_value: '',
      status: 'Ongoing'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingPlaza(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.toll_name) return;

    if (editingPlaza) {
      updateTollPlaza(editingPlaza.id, {
        ...formData,
        contract_value: Number(formData.contract_value) || 0
      });
    } else {
      addTollPlaza({
        ...formData,
        contract_value: Number(formData.contract_value) || 0
      });
    }

    setShowModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete toll plaza record "${name}"?`)) {
      deleteTollPlaza(id);
    }
  };

  const filteredPlazas = tollPlazas.filter(item => 
    !searchTerm || 
    item.toll_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.city && item.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.consortium.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.project_stretch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-slate-800 bg-[#F8FAFC] -m-6 p-6 min-h-screen">
      {/* SUCCESS TOAST */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5" />
          <span>Toll Plaza operational record saved successfully!</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 rounded-3xl shadow-xs">
        <div>
          <h1 className="font-editorial text-2xl font-bold text-[#0B2341]">Manage Toll Plaza Portfolio</h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain verified user fee toll collection contracts, stretches, and contract values.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-[#0B2341] hover:bg-[#163F68] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Toll Plaza Record</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Filter by plaza name, state, entity, or stretch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* TABLE DATA LIST */}
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                <th className="p-4">Toll Plaza Name</th>
                <th className="p-4">Managing Entity</th>
                <th className="p-4">Location (City, State)</th>
                <th className="p-4">Project Stretch</th>
                <th className="p-4">Authority</th>
                <th className="p-4">Operational Period</th>
                <th className="p-4 text-right">Contract Value</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans-ui">
              {filteredPlazas.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-[#0B2341]">
                    {item.toll_name}
                  </td>
                  <td className="p-4 font-semibold text-[#C5963D]">
                    {item.consortium}
                  </td>
                  <td className="p-4 font-medium text-slate-700">
                    {item.city ? `${item.city}, ${item.state}` : item.state}
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">
                    {item.project_stretch}
                  </td>
                  <td className="p-4 text-slate-600 font-medium truncate max-w-[140px]">
                    {item.authority}
                  </td>
                  <td className="p-4 text-slate-500 whitespace-nowrap">
                    {item.operational_period}
                  </td>
                  <td className="p-4 text-right font-bold text-[#C5963D] whitespace-nowrap">
                    {item.contract_value > 0 ? `₹${item.contract_value.toFixed(2)} Cr` : 'N/A'}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Ongoing'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                        title="Edit Record"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.toll_name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT / ADD MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#0B2341]/80 backdrop-blur-xs" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-editorial text-lg font-bold text-[#0B2341]">
                {editingPlaza ? 'Edit Toll Plaza Record' : 'Add New Toll Plaza Record'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans-ui">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Toll Plaza Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Haivargaon Pawasa Toll Plaza"
                  value={formData.toll_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, toll_name: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Managing Entity / Firm</label>
                  <select
                    value={formData.consortium}
                    onChange={(e) => setFormData(prev => ({ ...prev, consortium: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  >
                    <option value="M/s Preetee Builders">M/s Preetee Builders</option>
                    <option value="M/s MAP Infra">M/s MAP Infra</option>
                    <option value="M/s JRR Infra">M/s JRR Infra</option>
                    <option value="M/s MSP Infra">M/s MSP Infra</option>
                    <option value="Khalatkar Construction Infra Pvt Ltd">Khalatkar Construction Infra Pvt Ltd</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nashik, Rajkot..."
                    value={formData.city || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Maharashtra, Gujarat..."
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Stretch / Highway Details</label>
                <input 
                  type="text" 
                  placeholder="e.g. NH60 Km 42+000 to KM179+946"
                  value={formData.project_stretch}
                  onChange={(e) => setFormData(prev => ({ ...prev, project_stretch: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Authority</label>
                  <input 
                    type="text" 
                    placeholder="e.g. National Highway Authority Of India"
                    value={formData.authority}
                    onChange={(e) => setFormData(prev => ({ ...prev, authority: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Operational Period</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2022 To 2027"
                    value={formData.operational_period}
                    onChange={(e) => setFormData(prev => ({ ...prev, operational_period: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contract Value (In Cr ₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    placeholder="e.g. 370.00"
                    value={formData.contract_value}
                    onChange={(e) => setFormData(prev => ({ ...prev, contract_value: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#C5963D]"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B2341] hover:bg-[#163F68] text-white font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
