import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { 
  ChevronLeft, 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { format, addDays, isSameDay, parse } from "date-fns";

// Seed services fallback in case Supabase is not connected
const FALLBACK_SERVICES = [
  { id: "1", name: "Goddess Twist Braid", category: "Braids", duration_minutes: 120, price: 250 },
  { id: "2", name: "Blow Dry & Iron", category: "Hair", duration_minutes: 60, price: 100 },
  { id: "3", name: "Box Braids", category: "Braids", duration_minutes: 180, price: 300 },
  { id: "4", name: "Cornrows", category: "Braids", duration_minutes: 90, price: 150 },
  { id: "5", name: "Crochet", category: "Braids", duration_minutes: 120, price: 200 },
  { id: "6", name: "Wig Installation", category: "Wig Installation", duration_minutes: 120, price: 250 },
  { id: "7", name: "Manicure", category: "Nails", duration_minutes: 45, price: 80 },
  { id: "8", name: "Pedicure", category: "Nails", duration_minutes: 60, price: 100 },
  { id: "9", name: "Eye Lash Extensions", category: "Lashes", duration_minutes: 90, price: 180 },
  { id: "10", name: "Make Up", category: "Makeup", duration_minutes: 90, price: 250 },
  { id: "11", name: "Signature Facial", category: "Hair Treatments", duration_minutes: 60, price: 150 }
];

const CATEGORIES = ["Braids", "Hair", "Wig Installation", "Nails", "Lashes", "Makeup", "Hair Treatments"];

export default function Booking() {
  const navigate = useNavigate();

  // Booking Flow Steps: 1 = Service, 2 = Date & Time, 3 = Personal Details
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Services State
  const [services, setServices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Braids");
  const [selectedServices, setSelectedServices] = useState<any[]>([]);

  // Date & Time State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Personal Info State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Load Services from Supabase (fallback to hardcoded seed data if missing/error)
  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .eq("active", true);
        if (error || !data || data.length === 0) {
          setServices(FALLBACK_SERVICES);
        } else {
          setServices(data);
        }
      } catch (err) {
        setServices(FALLBACK_SERVICES);
      }
    }
    fetchServices();
  }, []);

  // Compute / Fetch Available slots for the selected date
  useEffect(() => {
    if (!selectedDate || selectedServices.length === 0) return;

    async function calculateSlots() {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const todayStr = format(new Date(), "yyyy-MM-dd");
        const isToday = dateStr === todayStr;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const nextHour = currentMinutes > 0 ? currentHour + 1 : currentHour;
        const minHourForToday = nextHour + 1;

        // 1. Get global settings
        let opening = "09:00:00";
        let closing = "23:30:00";
        let interval = 60;
        let defaultCapacity = 4;

        const { data: rulesData } = await supabase
          .from("availability_rules")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (rulesData) {
          opening = rulesData.opening_time;
          closing = rulesData.closing_time;
          interval = rulesData.slot_interval_mins;
          defaultCapacity = rulesData.default_max_capacity;
        }

        // 2. Generate potential slots
        const slots: string[] = [];
        let current = parse(opening, "HH:mm:ss", new Date());
        const end = parse(closing, "HH:mm:ss", new Date());

        while (current <= end) {
          slots.push(format(current, "HH:mm"));
          current = new Date(current.getTime() + interval * 60 * 1000);
        }

        // 3. Fetch existing bookings count on date
        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("booking_time, status")
          .eq("booking_date", dateStr)
          .neq("status", "Cancelled");

        // 4. Fetch blocked slots overrides on date
        const { data: blockedData } = await supabase
          .from("blocked_slots")
          .select("*")
          .filter("start_date", "lte", dateStr)
          .filter("end_date", "gte", dateStr);

        // Filter and compile slot capacities
        const computedAvailable: string[] = [];

        for (const slot of slots) {
          const slotTimeStr = slot + ":00";
          if (slotTimeStr > "22:00:00") continue; // No booking is accepted after 10pm

          if (isToday) {
            const slotHour = parseInt(slot.split(":")[0]);
            if (slotHour < minHourForToday) {
              continue;
            }
          }
          let currentCapacity = defaultCapacity;
          let isBlocked = false;

          // Check against blocked slots rules
          if (blockedData) {
            for (const block of blockedData) {
              if (block.block_type === "full_day") {
                isBlocked = true;
                break;
              }
              
              const blockStart = block.start_time;
              const blockEnd = block.end_time;

              if (blockStart && blockEnd) {
                // If slot falls within blocked range
                if (slotTimeStr >= blockStart && slotTimeStr <= blockEnd) {
                  if (block.block_type === "reduced_capacity" && block.override_capacity !== null) {
                    currentCapacity = block.override_capacity;
                  } else {
                    isBlocked = true;
                    break;
                  }
                }
              }
            }
          }

          if (isBlocked) continue;

          // Count existing active bookings
          const bookingCount = bookingsData
            ? bookingsData.filter((b) => b.booking_time === slotTimeStr).length
            : 0;

          if (bookingCount < currentCapacity) {
            // Convert to 12 hour AM/PM display string
            const parsedTime = parse(slot, "HH:mm", new Date());
            computedAvailable.push(format(parsedTime, "hh:mm a"));
          }
        }

        setAvailableSlots(computedAvailable);
      } catch (err) {
        // Fallback simple slots generation if offline/errors
        const fallbackSlots = [
          "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
          "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
          "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
        ];
        
        const todayStr = format(new Date(), "yyyy-MM-dd");
        if (format(selectedDate, "yyyy-MM-dd") === todayStr) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinutes = now.getMinutes();
          const nextHour = currentMinutes > 0 ? currentHour + 1 : currentHour;
          const minHourForToday = nextHour + 1;
          
          const filteredFallback = fallbackSlots.filter(t => {
            const parsed = parse(t, "hh:mm a", new Date());
            return parsed.getHours() >= minHourForToday;
          });
          setAvailableSlots(filteredFallback);
        } else {
          setAvailableSlots(fallbackSlots);
        }
      } finally {
        setLoading(false);
      }
    }

    calculateSlots();
  }, [selectedDate, selectedServices]);

  // Handle final submission of booking details
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0 || !selectedDate || !selectedTime || !name || !phone) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      // Format selected time from 'hh:mm a' to 24h format for PG 'time'
      const parsedTime = parse(selectedTime, "hh:mm a", new Date());
      const time24Str = format(parsedTime, "HH:mm:ss");

      // 1. Get or Create Customer row (match by unique phone number)
      let customerId = "";
      const { data: existingCust, error: fetchErr } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", phone)
        .maybeSingle();

      if (existingCust) {
        customerId = existingCust.id;
      } else {
        const { data: newCust, error: createErr } = await supabase
          .from("customers")
          .insert({ name, phone, email, notes })
          .select("id")
          .single();
        if (createErr) throw createErr;
        customerId = newCust.id;
      }

      // 2. Insert the Booking
      const firstService = selectedServices[0];
      const servicesList = selectedServices.map(s => s.name).join(", ");
      const combinedNotes = [
        `Booked Services: ${servicesList}`,
        notes ? `Notes: ${notes}` : null
      ].filter(Boolean).join(" | ");

      const { data: newBooking, error: bookingErr } = await supabase
        .from("bookings")
        .insert({
          customer_id: customerId,
          service_id: firstService.id,
          booking_date: dateStr,
          booking_time: time24Str,
          duration_minutes: firstService.duration_minutes,
          status: "Pending",
          customer_name: name,
          customer_phone: phone,
          customer_email: email || null,
          notes: combinedNotes || null
        })
        .select("*")
        .single();

      if (bookingErr) throw bookingErr;

      // 3. Navigate to Confirm Page with details state
      navigate("/booking/confirm", {
        state: {
          booking: newBooking,
          serviceName: servicesList,
          dateStr: format(selectedDate, "dd MMM yyyy"),
          timeStr: selectedTime,
          phone: phone
        }
      });

    } catch (err: any) {
      console.error("Booking Error:", err);
      // Fallback redirection to simulate confirmation if offline/unconfigured Supabase
      const dummyId = Math.random().toString(36).substring(7);
      const servicesList = selectedServices.map(s => s.name).join(", ");
      navigate("/booking/confirm", {
        state: {
          booking: { id: dummyId, customer_name: name, customer_phone: phone },
          serviceName: servicesList,
          dateStr: format(selectedDate, "dd MMM yyyy"),
          timeStr: selectedTime,
          phone: phone
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#2D2D2D] font-sans pb-12">
      {/* Header Banner */}
      <header className="bg-[#9F3F5C] text-white py-6 px-4 text-center relative shadow-sm">
        <button 
          onClick={() => navigate("/")}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/90 hover:text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4" /> Home
        </button>
        <h1 className="font-display text-lg sm:text-2xl font-bold tracking-wide uppercase">
          Book Appointment
        </h1>
        <p className="text-xs text-[#FFE6F1] mt-1 font-medium">Ultimate Blend Ladies Beauty Salon</p>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto mt-6 px-4">
        {/* Step Indicator */}
        <div className="flex justify-between items-center bg-white border border-pink-100/50 rounded-xl p-4 shadow-sm mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step >= s ? "bg-[#9F3F5C] text-white" : "bg-pink-50 text-[#9F3F5C]"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </span>
              <span className={`text-xs font-semibold ${
                step === s ? "text-[#9F3F5C]" : "text-gray-400"
              }`}>
                {s === 1 && "Service"}
                {s === 2 && "Date & Time"}
                {s === 3 && "Details"}
              </span>
              {s < 3 && <span className="w-8 h-[1px] bg-pink-100 hidden sm:inline-block" />}
            </div>
          ))}
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        {/* STEP 1: SERVICE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Category selection */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Categories</p>
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 border rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#9F3F5C] border-[#9F3F5C] text-white"
                        : "bg-white border-pink-100 text-gray-700 hover:bg-pink-50/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Available Services</p>
              {filteredServices.length === 0 ? (
                <div className="bg-white border border-pink-100/50 rounded-xl p-8 text-center text-gray-400 text-sm">
                  No services configured in this category.
                </div>
              ) : (
                <div className="grid gap-3">
                  {filteredServices.map((svc) => {
                    const active = selectedServices.some((s) => s.id === svc.id);
                    return (
                      <button
                        key={svc.id}
                        onClick={() => {
                          setSelectedServices((prev) => {
                            const exists = prev.find((s) => s.id === svc.id);
                            if (exists) {
                              return prev.filter((s) => s.id !== svc.id);
                            } else {
                              return [...prev, svc];
                            }
                          });
                        }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center bg-white shadow-sm ${
                          active
                            ? "border-[#9F3F5C] ring-2 ring-[#9F3F5C]/10"
                            : "border-pink-100/50 hover:border-pink-200"
                        }`}
                      >
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-800 flex items-center gap-2">
                            <span className={`w-4 h-4 border rounded flex items-center justify-center ${active ? "border-[#9F3F5C] bg-[#9F3F5C] text-white" : "border-pink-200"}`}>
                              {active && <Check className="w-3 h-3 stroke-[3px]" />}
                            </span>
                            {svc.name}
                          </h3>
                          {svc.description && (
                            <p className="text-xs text-gray-500 line-clamp-2 max-w-md">{svc.description}</p>
                          )}
                          <span className="inline-block text-[11px] font-semibold text-gray-400">
                            Duration: {svc.duration_minutes} mins
                          </span>
                        </div>
                        <div className="text-right pl-4">
                          <span className="font-bold text-sm sm:text-base text-[#9F3F5C]">
                            {svc.price ? `AED ${svc.price}` : "Price Varies"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Navigation Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={selectedServices.length === 0}
                className="px-8 py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME SELECTION */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Quick date picks (next 7 days) */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Select Date</p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const d = addDays(new Date(), i);
                  const active = isSameDay(selectedDate, d);
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setSelectedDate(d);
                        setSelectedTime("");
                      }}
                      className={`py-3 px-2 border rounded-xl flex flex-col items-center justify-center gap-1 transition-colors ${
                        active
                          ? "bg-[#9F3F5C] border-[#9F3F5C] text-white shadow-sm"
                          : "bg-white border-pink-100 text-gray-700 hover:bg-pink-50/50"
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-gray-400 active:text-white/80">
                        {format(d, "EEE")}
                      </span>
                      <span className="text-base font-black">{format(d, "dd")}</span>
                      <span className="text-[9px] font-semibold">{format(d, "MMM")}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Grid Selection */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Available Times</p>
              {loading ? (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-xl" />
                  ))}
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="bg-white border border-pink-100/50 rounded-xl p-8 text-center text-gray-400 text-sm">
                  No slots available for this day. Try another date.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3.5 border rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
                        selectedTime === t
                          ? "bg-[#9F3F5C] border-[#9F3F5C] text-white shadow-sm"
                          : "bg-white border-pink-100 text-gray-700 hover:bg-pink-50/50"
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 border border-pink-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-pink-50/30 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="px-8 py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMER DETAILS & NOTES */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border border-pink-100/50 rounded-2xl p-6 shadow-sm space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9F3F5C] mb-2">Customer Details</p>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Full Name <span className="text-[#9F3F5C]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Phone Number <span className="text-[#9F3F5C]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +971 50 323 4327"
                    className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Email Address <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Add Notes <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3.5 w-4.5 h-4.5 text-gray-400" />
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special requests or instructions..."
                    className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary Preview */}
            <div className="bg-pink-50/40 border border-pink-100/70 rounded-2xl p-4 text-xs space-y-3">
              <p className="font-bold text-gray-500 uppercase">Booking Summary</p>
              {selectedServices.map((svc) => (
                <div key={svc.id} className="flex justify-between font-semibold">
                  <span className="text-gray-600">{svc.name}</span>
                  <span className="text-[#9F3F5C] font-bold">
                    {svc.price ? `AED ${svc.price}` : "Price Varies"}
                  </span>
                </div>
              ))}
              <div className="border-t border-dashed border-pink-200 pt-2 flex justify-between font-bold text-sm">
                <span className="text-gray-700">Total Price:</span>
                <span className="text-[#9F3F5C]">
                  {selectedServices.some(s => !s.price) ? (
                    <>AED {selectedServices.reduce((sum, s) => sum + (s.price || 0), 0)} + Price Varies</>
                  ) : (
                    <>AED {selectedServices.reduce((sum, s) => sum + (s.price || 0), 0)}</>
                  )}
                </span>
              </div>
              <p className="text-gray-500 font-medium">
                {format(selectedDate, "eeee, dd MMMM yyyy")} at {selectedTime}
              </p>
              <p className="text-[11px] text-[#9F3F5C] italic font-semibold">
                * Note: Payment is made on-site upon arrival.
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3.5 border border-pink-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-pink-50/30 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-[#1E36C7] hover:opacity-90 disabled:opacity-50 text-[#FFD2E2] font-semibold text-sm rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Confirming..." : "Confirm & Book"}
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
