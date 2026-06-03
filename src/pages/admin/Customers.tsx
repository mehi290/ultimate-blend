import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Search, Phone, Mail, FileText, Calendar, Clock, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [bookingHistory, setBookingHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("customers").select("*");
      if (error || !data) throw error || new Error("No customers");
      setCustomers(data);
    } catch (err) {
      setCustomers([
        { id: "1", name: "Fatima Al Maktoum", phone: "+971 50 123 4567", email: "fatima@domain.ae", notes: "Regular VIP client. Prefers light blowdry." },
        { id: "2", name: "Sarah Jenkins", phone: "+971 55 987 6543", email: "sarah.j@email.com", notes: "Aways requests soft styling." },
        { id: "3", name: "Amina Yusuf", phone: "+971 56 345 6789", email: "amina.y@email.com", notes: "No specific requests." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const selectCustomer = async (customer: any) => {
    setSelectedCustomer(customer);
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name, price)")
        .eq("customer_id", customer.id)
        .order("booking_date", { ascending: false });

      if (error || !data) throw error;
      setBookingHistory(data);
    } catch (err) {
      // Mock history
      setBookingHistory([
        {
          id: "101",
          booking_date: "2026-06-04",
          booking_time: "09:00:00",
          status: "Confirmed",
          services: { name: "Goddess Twist Braid", price: 250 }
        },
        {
          id: "102",
          booking_date: "2026-05-15",
          booking_time: "14:30:00",
          status: "Completed",
          services: { name: "Manicure", price: 80 }
        }
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-800">
            Customers Registry
          </h2>
          <p className="text-sm text-gray-500 mt-1">View customer profiles and booking histories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Customers List Section */}
          <div className="lg:col-span-1 bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
                </div>
              ) : filteredCustomers.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No customers found.
                </div>
              ) : (
                filteredCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => selectCustomer(c)}
                    className={`w-full text-left p-4 hover:bg-gray-50 flex items-center justify-between transition-colors ${
                      selectedCustomer?.id === c.id ? "bg-pink-50/40 border-l-4 border-l-[#9F3F5C] pl-3" : ""
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{c.name}</h4>
                      <p className="text-xs text-gray-400 font-semibold mt-0.5">{c.phone}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Details & History Section */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCustomer ? (
              <div className="space-y-6">
                
                {/* Profile Card */}
                <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-display font-bold text-lg text-gray-800">
                    Customer Profile
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#9F3F5C] flex items-center justify-center font-bold">
                        {selectedCustomer.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{selectedCustomer.name}</h4>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">Client Since 2026</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600 sm:border-l sm:border-gray-100 sm:pl-6">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-semibold">{selectedCustomer.phone}</span>
                      </div>
                      {selectedCustomer.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCustomer.notes && (
                    <div className="pt-4 border-t border-gray-100 text-xs">
                      <div className="font-bold text-gray-400 uppercase mb-1.5 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> Notes
                      </div>
                      <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                        {selectedCustomer.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Booking History Card */}
                <div className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-display font-bold text-base text-gray-800 mb-4">
                    Booking History
                  </h3>

                  {loadingHistory ? (
                    <div className="py-8 text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
                    </div>
                  ) : bookingHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No past bookings logged.
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {bookingHistory.map((h) => (
                        <div key={h.id} className="py-3.5 flex justify-between items-center first:pt-0 last:pb-0">
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-gray-700">{h.services?.name}</h4>
                            <div className="text-xs text-gray-400 font-semibold flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(h.booking_date), "dd MMM yyyy")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {h.booking_time.substring(0, 5)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-800">
                              AED {h.services?.price || "Varies"}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              h.status === "Completed" ? "bg-emerald-50 text-emerald-700" :
                              h.status === "Cancelled" ? "bg-rose-50 text-rose-700" :
                              "bg-blue-50 text-blue-700"
                            }`}>
                              {h.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-white border border-gray-200/60 rounded-2xl p-12 text-center text-gray-400 text-sm shadow-sm h-[320px] flex flex-col justify-center items-center">
                Select a customer from the sidebar list to view details and booking logs.
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
