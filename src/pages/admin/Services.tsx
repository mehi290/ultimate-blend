import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit3, X, Scissors, AlertCircle } from "lucide-react";

const CATEGORIES = ["Braids", "Hair", "Wig Installation", "Nails", "Lashes", "Makeup", "Hair Treatments"];

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state (add/edit)
  const [editingService, setEditingService] = useState<any>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Braids");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("services").select("*");
      if (error || !data) throw error || new Error("No services");
      setServices(data);
    } catch (err) {
      setServices([
        { id: "1", name: "Goddess Twist Braid", category: "Braids", description: "Standard Goddess Twist", duration_minutes: 120, price: 250, active: true },
        { id: "2", name: "Blow Dry & Iron", category: "Hair", description: "Standard wash blow", duration_minutes: 60, price: 100, active: true },
        { id: "3", name: "Box Braids", category: "Braids", description: "Box braids styling", duration_minutes: 180, price: 300, active: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService({ isNew: true });
    setName("");
    setCategory("Braids");
    setDescription("");
    setDuration(60);
    setPrice("");
    setActive(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setName(service.name);
    setCategory(service.category);
    setDescription(service.description || "");
    setDuration(service.duration_minutes);
    setPrice(service.price ? service.price.toString() : "");
    setActive(service.active);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const serviceData = {
      name,
      category,
      description: description || null,
      duration_minutes: duration,
      price: price ? parseFloat(price) : null,
      active
    };

    try {
      if (editingService.isNew) {
        const { error } = await supabase.from("services").insert(serviceData);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingService.id);
        if (error) throw error;
      }

      fetchServices();
      setEditingService(null);
    } catch (err) {
      // Mock update local state
      if (editingService.isNew) {
        const mockNew = {
          id: Math.random().toString(),
          ...serviceData
        };
        setServices(prev => [...prev, mockNew]);
      } else {
        setServices(prev =>
          prev.map(s => (s.id === editingService.id ? { ...s, ...serviceData } : s))
        );
      }
      setEditingService(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
      fetchServices();
    } catch (err) {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-800">
              Services Catalog
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configure salon treatments, pricing, and timing intervals</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-bold text-sm rounded-xl shadow self-start sm:self-center"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        {/* Services Table */}
        <div className="bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No services configured yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4">Service Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 font-bold text-gray-800">
                        {svc.name}
                        {svc.description && (
                          <div className="text-xs text-gray-400 font-normal line-clamp-1 mt-0.5">
                            {svc.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-600">{svc.category}</td>
                      <td className="px-6 py-4 font-medium text-gray-700">{svc.duration_minutes} mins</td>
                      <td className="px-6 py-4 font-bold text-[#9F3F5C]">
                        {svc.price ? `AED ${svc.price}` : "Varies"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          svc.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {svc.active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button
                          onClick={() => openEditModal(svc)}
                          className="text-[#9F3F5C] hover:text-[#8E3852]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Dialog */}
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-display font-bold text-gray-800">
                  {editingService.isNew ? "Add New Service" : "Edit Service Details"}
                </h3>
                <button onClick={() => setEditingService(null)} className="p-1 hover:bg-gray-200 rounded-md">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Service Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Medium Box Braids"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a brief description..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Duration (mins)</label>
                    <input
                      type="number"
                      required
                      min="5"
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Price (AED - Optional)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 250"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="active"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 text-[#9F3F5C] focus:ring-[#9F3F5C]"
                  />
                  <label htmlFor="active" className="text-sm font-semibold text-gray-700">
                    Active & Available for Booking
                  </label>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2 bg-[#9F3F5C] text-white hover:bg-[#8E3852] rounded-xl text-xs font-bold"
                  >
                    {saving ? "Saving..." : "Save Details"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
