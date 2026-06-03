import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { 
  Calendar as CalendarIcon, 
  Search, 
  Filter, 
  Edit3, 
  Check, 
  X, 
  Phone, 
  User, 
  AlertCircle 
} from "lucide-react";
import { format } from "date-fns";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Edit Modal State
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data: bookingsData, error } = await supabase
        .from("bookings")
        .select("*, services(name, price)");
      if (error || !bookingsData) throw error || new Error("No data");
      setBookings(bookingsData);
    } catch (err) {
      // Mock fallback data
      setBookings([
        {
          id: "1",
          customer_name: "Fatima Al Maktoum",
          customer_phone: "+971 50 123 4567",
          customer_email: "fatima@domain.ae",
          booking_date: "2026-06-04",
          booking_time: "09:00:00",
          duration_minutes: 120,
          status: "Confirmed",
          notes: "Need length to chest",
          admin_notes: "Regular client",
          services: { name: "Goddess Twist Braid", price: 250 }
        },
        {
          id: "2",
          customer_name: "Sarah Jenkins",
          customer_phone: "+971 55 987 6543",
          customer_email: "sarah.j@email.com",
          booking_date: "2026-06-04",
          booking_time: "11:30:00",
          duration_minutes: 60,
          status: "Pending",
          notes: "Wash hair beforehand",
          admin_notes: "",
          services: { name: "Blow Dry & Iron", price: 100 }
        },
        {
          id: "3",
          customer_name: "Amina Yusuf",
          customer_phone: "+971 56 345 6789",
          customer_email: "amina.y@email.com",
          booking_date: "2026-06-05",
          booking_time: "14:00:00",
          duration_minutes: 180,
          status: "Pending",
          notes: "BO Braid synthetic extension",
          admin_notes: "",
          services: { name: "Box Braids", price: 300 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    async function fetchServices() {
      try {
        const { data } = await supabase.from("services").select("id, name");
        if (data) setServices(data);
      } catch (err) {
        setServices([
          { id: "1", name: "Goddess Twist Braid" },
          { id: "2", name: "Blow Dry & Iron" },
          { id: "3", name: "Box Braids" }
        ]);
      }
    }
    fetchServices();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
      fetchBookings();
    } catch (err) {
      // Mock state update
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  const openEditModal = (booking: any) => {
    setEditingBooking(booking);
    setAdminNotes(booking.admin_notes || "");
    setRescheduleDate(booking.booking_date);
    // Remove seconds for time input
    setRescheduleTime(booking.booking_time.substring(0, 5));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBooking) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          admin_notes: adminNotes,
          booking_date: rescheduleDate,
          booking_time: rescheduleTime + ":00"
        })
        .eq("id", editingBooking.id);

      if (error) throw error;
      fetchBookings();
      setEditingBooking(null);
    } catch (err) {
      // Mock state update
      setBookings(prev =>
        prev.map(b =>
          b.id === editingBooking.id
            ? {
                ...b,
                admin_notes: adminNotes,
                booking_date: rescheduleDate,
                booking_time: rescheduleTime + ":00"
              }
            : b
        )
      );
      setEditingBooking(null);
    } finally {
      setUpdating(false);
    }
  };

  // Filter computation
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_phone.includes(searchQuery);
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    const matchesService = serviceFilter === "All" || b.services?.name === serviceFilter;
    const matchesDate = !dateFilter || b.booking_date === dateFilter;

    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-800">
              Bookings Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">Review, approve, and reschedule client appointments</p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-5 border border-gray-200/60 rounded-2xl shadow-sm">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Search Customer</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Name or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Filter Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="No-show">No-show</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Filter Service</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
            >
              <option value="All">All Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Filter Date</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
            />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              No matching bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date & Time</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-800">{b.customer_name}</div>
                        <div className="text-xs text-gray-400 font-semibold">{b.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-700">{b.services?.name}</div>
                        <div className="text-xs text-gray-400">AED {b.services?.price || "Varies"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-700">
                          {format(new Date(b.booking_date), "dd MMM yyyy")}
                        </div>
                        <div className="text-xs text-gray-400 font-semibold">
                          {b.booking_time.substring(0, 5)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border outline-none ${
                            b.status === "Confirmed" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            b.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                            b.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            b.status === "Cancelled" ? "bg-rose-50 text-rose-700 border-rose-200" :
                            "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="No-show">No-show</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openEditModal(b)}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#9F3F5C] hover:text-[#8E3852]"
                        >
                          <Edit3 className="w-4 h-4" /> Edit / Reschedule
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal Dialog */}
        {editingBooking && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-display font-bold text-gray-800">
                  Reschedule / Edit Notes
                </h3>
                <button onClick={() => setEditingBooking(null)} className="p-1 hover:bg-gray-200 rounded-md">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Date</label>
                  <input
                    type="date"
                    required
                    value={rescheduleDate}
                    onChange={(e) => setRescheduleDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Time</label>
                  <input
                    type="time"
                    required
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Admin Notes</label>
                  <textarea
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Internal staff notes, e.g., VIP, requests long locks..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 bg-[#9F3F5C] text-white hover:bg-[#8E3852] rounded-xl text-xs font-bold"
                  >
                    {updating ? "Saving..." : "Save Changes"}
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
