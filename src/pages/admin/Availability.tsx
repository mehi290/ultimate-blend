import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Clock, Calendar, ShieldAlert, X } from "lucide-react";
import { format } from "date-fns";

export default function AdminAvailability() {
  // Global settings
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("23:30");
  const [interval, setInterval] = useState(60);
  const [capacity, setCapacity] = useState(4);
  const [savingGlobal, setSavingGlobal] = useState(false);
  const [rulesId, setRulesId] = useState<string | null>(null);

  // Blocked slots override settings
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(true);

  // Block creation dialog
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [blockType, setBlockType] = useState("full_day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [overrideCapacity, setOverrideCapacity] = useState("");
  const [reason, setReason] = useState("");
  const [savingBlock, setSavingBlock] = useState(false);

  const fetchGlobalSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("availability_rules")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (data) {
        setRulesId(data.id);
        setOpeningTime(data.opening_time.substring(0, 5));
        setClosingTime(data.closing_time.substring(0, 5));
        setInterval(data.slot_interval_mins);
        setCapacity(data.default_max_capacity);
      }
    } catch (err) {
      console.warn("Could not load global settings, using state fallbacks");
    }
  };

  const fetchBlocks = async () => {
    setLoadingBlocks(true);
    try {
      const { data, error } = await supabase
        .from("blocked_slots")
        .select("*")
        .order("start_date", { ascending: true });
      if (data) setBlocks(data);
    } catch (err) {
      setBlocks([
        { id: "1", block_type: "full_day", start_date: "2026-06-15", end_date: "2026-06-15", reason: "Salon Renovations" },
        { id: "2", block_type: "reduced_capacity", start_date: "2026-06-20", end_date: "2026-06-20", start_time: "14:00:00", end_time: "17:00:00", override_capacity: 2, reason: "Half-staff training" }
      ]);
    } finally {
      setLoadingBlocks(false);
    }
  };

  useEffect(() => {
    fetchGlobalSettings();
    fetchBlocks();
  }, []);

  const handleSaveGlobal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGlobal(true);

    const payload = {
      opening_time: openingTime + ":00",
      closing_time: closingTime + ":00",
      slot_interval_mins: interval,
      default_max_capacity: capacity
    };

    try {
      if (rulesId) {
        const { error } = await supabase
          .from("availability_rules")
          .update(payload)
          .eq("id", rulesId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("availability_rules")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        if (data) setRulesId(data.id);
      }
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Note: Settings updated locally. Run SQL schema in Supabase console for persistent updates.");
    } finally {
      setSavingGlobal(false);
    }
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;

    setSavingBlock(true);
    const payload: any = {
      block_type: blockType,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime ? startTime + ":00" : null,
      end_time: endTime ? endTime + ":00" : null,
      override_capacity: overrideCapacity ? parseInt(overrideCapacity) : null,
      reason: reason || null
    };

    try {
      const { error } = await supabase.from("blocked_slots").insert(payload);
      if (error) throw error;
      fetchBlocks();
      setShowAddBlock(false);
    } catch (err) {
      const mockBlock = {
        id: Math.random().toString(),
        ...payload
      };
      setBlocks(prev => [...prev, mockBlock]);
      setShowAddBlock(false);
    } finally {
      setSavingBlock(false);
    }
  };

  const handleDeleteBlock = async (id: string) => {
    if (!confirm("Remove this schedule block?")) return;

    try {
      const { error } = await supabase.from("blocked_slots").delete().eq("id", id);
      if (error) throw error;
      fetchBlocks();
    } catch (err) {
      setBlocks(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: global timings */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-display uppercase tracking-wide text-gray-800">
              Availability Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1">Configure default schedule and slot capacity</p>
          </div>

          <form onSubmit={handleSaveGlobal} className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-base text-gray-700 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#9F3F5C]" /> Global Rules
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Opening Time</label>
              <input
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Closing Time</label>
              <input
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Booking Interval (minutes)</label>
              <select
                value={interval}
                onChange={(e) => setInterval(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
              >
                <option value={30}>Every 30 minutes</option>
                <option value={60}>Every 1 hour</option>
                <option value={120}>Every 2 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Default Slot Capacity (Staff size)</label>
              <input
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 4)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
              />
              <p className="text-[10px] text-gray-400 mt-1 italic">Typically matches number of active hair stylists.</p>
            </div>

            <button
              type="submit"
              disabled={savingGlobal}
              className="w-full py-3 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              {savingGlobal ? "Saving..." : "Save Settings"}
            </button>
          </form>
        </div>

        {/* Right column: schedule overrides */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold font-display uppercase tracking-wide text-gray-800">
                Blocked Dates & Capacity Overrides
              </h2>
              <p className="text-sm text-gray-500 mt-1">Block holidays or reduce availability slots</p>
            </div>
            <button
              onClick={() => {
                setShowAddBlock(true);
                setBlockType("full_day");
                setStartDate("");
                setEndDate("");
                setStartTime("");
                setEndTime("");
                setOverrideCapacity("");
                setReason("");
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#9F3F5C] hover:bg-[#8E3852] text-white text-xs font-bold rounded-xl shadow"
            >
              <Plus className="w-4 h-4" /> Add Block
            </button>
          </div>

          <div className="bg-white border border-gray-200/60 rounded-2xl shadow-sm overflow-hidden">
            {loadingBlocks ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#9F3F5C] border-t-transparent mx-auto" />
              </div>
            ) : blocks.length === 0 ? (
              <div className="text-center py-16 text-gray-400 text-sm">
                No active blocked dates or capacity adjustments.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {blocks.map((block) => (
                  <div key={block.id} className="p-5 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          block.block_type === "full_day" ? "bg-rose-50 text-rose-700 border border-rose-100" :
                          block.block_type === "reduced_capacity" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                          "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>
                          {block.block_type.replace("_", " ")}
                        </span>
                        {block.reason && (
                          <span className="text-sm font-bold text-gray-800">{block.reason}</span>
                        )}
                      </div>
                      
                      <div className="text-xs text-gray-500 font-semibold flex items-center gap-1.5 mt-2">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {block.start_date === block.end_date ? (
                          format(new Date(block.start_date), "dd MMM yyyy")
                        ) : (
                          `${format(new Date(block.start_date), "dd MMM")} - ${format(new Date(block.end_date), "dd MMM yyyy")}`
                        )}
                      </div>

                      {block.start_time && block.end_time && (
                        <div className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Time: {block.start_time.substring(0, 5)} - {block.end_time.substring(0, 5)}
                        </div>
                      )}

                      {block.block_type === "reduced_capacity" && (
                        <div className="text-xs text-gray-500 font-bold flex items-center gap-1 text-amber-600">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Capacity reduced to {block.override_capacity} slots
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteBlock(block.id)}
                      className="p-1 hover:bg-rose-50 text-gray-400 hover:text-rose-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Add block modal dialog */}
      {showAddBlock && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-display font-bold text-gray-800">
                Block Availability / Capacity Override
              </h3>
              <button onClick={() => setShowAddBlock(false)} className="p-1 hover:bg-gray-200 rounded-md">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleAddBlock} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Block Type</label>
                <select
                  value={blockType}
                  onChange={(e) => setBlockType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                >
                  <option value="full_day">Block Full Day</option>
                  <option value="time_range">Block Custom Time Range</option>
                  <option value="reduced_capacity">Reduce Max Slot Capacity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>
              </div>

              {blockType !== "full_day" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Start Time</label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">End Time</label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                    />
                  </div>
                </div>
              )}

              {blockType === "reduced_capacity" && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Override Capacity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 2 spots"
                    value={overrideCapacity}
                    onChange={(e) => setOverrideCapacity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Reason / Description</label>
                <input
                  type="text"
                  placeholder="e.g., Staff Training, Holiday"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-[#9F3F5C] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddBlock(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingBlock}
                  className="px-6 py-2 bg-[#9F3F5C] text-white hover:bg-[#8E3852] rounded-xl text-xs font-bold"
                >
                  {savingBlock ? "Saving..." : "Add Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
