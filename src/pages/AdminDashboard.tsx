import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Users,
  Scissors,
  BookOpen,
  Search,
  Filter,
  XCircle,
  Clock,
  Phone,
  LogOut,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Check,
  Trash2,
  Edit2
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, addDays, parse } from "date-fns";

// Helper: convert minutes to human-readable hours
const formatDuration = (mins: number): string => {
  if (mins < 60) return `${mins} mins`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m === 0) return `${h} hr${h > 1 ? "s" : ""}`;
  return `${h} hr${h > 1 ? "s" : ""} ${m} min`;
};

// Helper: get clear booked services text for a booking with prices
const getBookingServicesText = (b: any, serviceVariants: any[] = []): string => {
  let itemsText = "";
  let totalPrice = 0;
  let hasPriceVaries = false;

  if (b.booking_items && b.booking_items.length > 0) {
    itemsText = b.booking_items.map((bi: any) => {
      const vName = bi.variant_name;
      const sName = bi.service_name;
      totalPrice += Number(bi.price || 0);
      if (bi.price_varies) hasPriceVaries = true;

      // In detail: if variant is not standard/classic/per nail and not equal to service name, append it
      if (!vName || /^(standard|classic|per nail)$/i.test(vName) || vName === sName) {
        return sName;
      }
      return `${sName} - ${vName}`;
    }).join(", ");
  } else {
    // Fallback if no booking items
    if (b.notes) {
      const match = b.notes.match(/Booked Services:\s*([^|]+)/i);
      if (match) {
        itemsText = match[1].trim();
      }
    }
    if (!itemsText && b.service_name) {
      if (b.variant_name && !/^(standard|classic|per nail)$/i.test(b.variant_name) && b.variant_name !== b.service_name) {
        itemsText = `${b.service_name} - ${b.variant_name}`;
      } else {
        itemsText = b.service_name;
      }
    }
    if (!itemsText) {
      itemsText = "Salon Services";
    }

    // Attempt to look up the price in the loaded serviceVariants list
    if (b.variant_id && serviceVariants.length > 0) {
      const variant = serviceVariants.find(v => v.id === b.variant_id);
      if (variant) {
        totalPrice = Number(variant.price || 0);
        hasPriceVaries = variant.price_varies || false;
      }
    }
  }

  // Format price
  let priceStr = "";
  if (hasPriceVaries) {
    priceStr = totalPrice > 0 ? ` (AED ${totalPrice} + Price Varies)` : ` (Price Varies)`;
  } else {
    priceStr = ` (AED ${totalPrice})`;
  }

  return `${itemsText}${priceStr}`;
};

// Helper: calculate category-based max duration dynamically for dashboard presentation override
const getBookingDuration = (b: any): number => {
  const items = b.booking_items || [];
  const categories = new Set<string>();

  if (items.length > 0) {
    items.forEach((item: any) => {
      categories.add(item.category_name || "Hair");
    });
  } else {
    // Detect categories from notes or fields
    const text = ((b.category_name || "") + " " + (b.service_name || "") + " " + (b.notes || "")).toLowerCase();
    if (text.includes("nail") || text.includes("manicure") || text.includes("pedicure") || text.includes("acrylic") || text.includes("gel")) {
      categories.add("Nails");
    }
    if (text.includes("braid") || text.includes("hair") || text.includes("crochet") || text.includes("dread") || text.includes("wig") || text.includes("cornrow") || text.includes("blow") || text.includes("twist")) {
      categories.add("Hair");
    }
    if (text.includes("lash") || text.includes("makeup") || text.includes("make up")) {
      categories.add("Makeup");
    }
    if (text.includes("facial") || text.includes("skin")) {
      categories.add("Skin");
    }
  }

  if (categories.size === 0) {
    return b.duration_minutes || 60;
  }

  let maxDuration = 60;
  categories.forEach(cat => {
    let catDuration = 60;
    const cLower = cat.toLowerCase();
    if (cLower === "nails" || cLower === "nail") {
      catDuration = 120; // 2 hours
    } else if (cLower === "hair" || cLower === "braids" || cLower === "braid") {
      catDuration = 180; // 3 hours
    } else if (cLower === "makeup" || cLower === "make up") {
      catDuration = 90;  // 1.5 hours
    } else if (cLower === "skin" || cLower === "skincare") {
      catDuration = 60;  // 1 hour
    }
    if (catDuration > maxDuration) {
      maxDuration = catDuration;
    }
  });

  return maxDuration;
};

// Booking block color palette (Sleek dark theme pastel colors)
const BLOCK_COLORS = [
  { bg: "#FDEBD0", border: "#F0B27A", text: "#7E5109" },  // warm peach
  { bg: "#D5F5E3", border: "#82E0AA", text: "#1E8449" },  // soft green
  { bg: "#D6EAF8", border: "#85C1E9", text: "#1B4F72" },  // sky blue
  { bg: "#FADBD8", border: "#F1948A", text: "#922B21" },  // blush pink
  { bg: "#E8DAEF", border: "#BB8FCE", text: "#6C3483" },  // lavender
  { bg: "#FCF3CF", border: "#F9E79F", text: "#7D6608" },  // lemon
  { bg: "#D1F2EB", border: "#76D7C4", text: "#0E6655" },  // teal
  { bg: "#FDEDEC", border: "#F5B7B1", text: "#943126" },  // rose
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Sidebar navigation and UI states
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "calendar" | "clients" | "services">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [bookings, setBookings] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [serviceVariants, setServiceVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter states
  const [bookingSearch, setBookingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date>(new Date());
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<Date>(new Date());

  // Dashboard multi-date selection
  const [selectedDashDates, setSelectedDashDates] = useState<string[]>([format(new Date(), "yyyy-MM-dd")]);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  // Blocked slots data state
  const [blockedSlots, setBlockedSlots] = useState<any[]>([]);

  // Booking Edit Modal states
  const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<any | null>(null);
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editStatus, setEditStatus] = useState("Confirmed");
  const [editSelectedVariants, setEditSelectedVariants] = useState<string[]>([]);
  const [editNotes, setEditNotes] = useState("");
  const [isSavingEditBooking, setIsSavingEditBooking] = useState(false);
  const [isBookingDetailsReadOnly, setIsBookingDetailsReadOnly] = useState(false);
  const [walkinCalendarIndex, setWalkinCalendarIndex] = useState(1);
  const [blockCalendarIndex, setBlockCalendarIndex] = useState(1);
  const [editCalendarIndex, setEditCalendarIndex] = useState(1);

  // Services Edit Modal states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceModalMode, setServiceModalMode] = useState<"add_service" | "add_variant" | "edit_variant">("add_service");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [formServiceName, setFormServiceName] = useState("");
  const [formVariantName, setFormVariantName] = useState("");
  const [formPrice, setFormPrice] = useState<string | number>("");
  const [formPriceVaries, setFormPriceVaries] = useState(false);
  const [formDuration, setFormDuration] = useState<string | number>(60);
  const [isSavingService, setIsSavingService] = useState(false);

  // Manual Booking & Block Slot Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalTab, setBookingModalTab] = useState<"walkin" | "block">("walkin");
  const [walkinName, setWalkinName] = useState("");
  const [walkinPhone, setWalkinPhone] = useState("");
  const [walkinEmail, setWalkinEmail] = useState("");
  const [walkinDate, setWalkinDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [walkinTime, setWalkinTime] = useState("09:00:00");
  const [walkinSelectedVariants, setWalkinSelectedVariants] = useState<string[]>([]);
  const [walkinNotes, setWalkinNotes] = useState("");
  const [blockDate, setBlockDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [blockStartTime, setBlockStartTime] = useState("09:00:00");
  const [blockEndTime, setBlockEndTime] = useState("10:00:00");
  const [blockReason, setBlockReason] = useState("Blocked");
  const [isSavingBooking, setIsSavingBooking] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(e.target as Node)) {
        setDateDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDashDate = (dateStr: string) => {
    setSelectedDashDates(prev => {
      if (prev.includes(dateStr)) {
        if (prev.length === 1) return prev; // keep at least one
        return prev.filter(d => d !== dateStr);
      }
      return [...prev, dateStr].sort();
    });
  };

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      const auth = sessionStorage.getItem("admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      const mockSession = localStorage.getItem("ub_admin_session");
      if (mockSession === "mock-session-active") {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        } else {
          navigate("/admin/login");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("admin_auth");
    localStorage.removeItem("ub_admin_session");
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPassword("");
    navigate("/admin/login");
  };

  // Fetch all dashboard data live from Supabase
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch bookings with their nested booking_items
      const { data: bookingsData, error: bookingsErr } = await supabase
        .from("bookings")
        .select(`
          *,
          booking_items (*)
        `)
        .order("booking_date", { ascending: false })
        .order("booking_time", { ascending: false });

      if (bookingsErr) throw bookingsErr;
      if (bookingsData) setBookings(bookingsData);

      // 2. Fetch customers/clients
      const { data: customersData, error: customersErr } = await supabase
        .from("customers")
        .select("*");
      if (customersErr) throw customersErr;
      if (customersData) setCustomers(customersData);

      // 3. Fetch categories
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .order("display_order", { ascending: true });
      if (categoriesData) setCategories(categoriesData);

      // 4. Fetch services
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (servicesData) setServices(servicesData);

      // 5. Fetch service variants
      const { data: variantsData } = await supabase
        .from("service_variants")
        .select("*");
      if (variantsData) setServiceVariants(variantsData);

      // 6. Fetch blocked slots
      const { data: blockedData } = await supabase
        .from("blocked_slots")
        .select("*");
      if (blockedData) setBlockedSlots(blockedData);

    } catch (err) {
      console.error("Error fetching dashboard admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "Cancelled" })
        .eq("id", bookingId);

      if (error) throw error;
      
      // Refresh local state
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  // Save Services/Variants logic
  const handleSaveServiceVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingService(true);
    try {
      if (serviceModalMode === "add_service") {
        // 1. Insert service
        const { data: newSvc, error: svcErr } = await supabase
          .from("services")
          .insert({
            category_id: selectedCategoryId,
            name: formServiceName,
            display_order: 0,
            active: true
          })
          .select("id")
          .single();

        if (svcErr) throw svcErr;

        // 2. Insert default variant for service
        const { error: varErr } = await supabase
          .from("service_variants")
          .insert({
            service_id: newSvc.id,
            name: formVariantName || "Standard",
            price: Number(formPrice) || 0,
            price_varies: formPriceVaries,
            duration_minutes: Number(formDuration) || 60,
            display_order: 0,
            active: true
          });

        if (varErr) throw varErr;
      } else if (serviceModalMode === "add_variant") {
        // Insert new variant
        const { error: varErr } = await supabase
          .from("service_variants")
          .insert({
            service_id: selectedServiceId,
            name: formVariantName,
            price: Number(formPrice) || 0,
            price_varies: formPriceVaries,
            duration_minutes: Number(formDuration) || 60,
            display_order: 0,
            active: true
          });

        if (varErr) throw varErr;
      } else if (serviceModalMode === "edit_variant") {
        // Update variant
        const { error: varErr } = await supabase
          .from("service_variants")
          .update({
            name: formVariantName,
            price: Number(formPrice) || 0,
            price_varies: formPriceVaries,
            duration_minutes: Number(formDuration) || 60
          })
          .eq("id", selectedVariantId);

        if (varErr) throw varErr;
      }

      setIsServiceModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      console.error("Error saving service/variant:", err);
      alert("Failed to save service. Please check fields and try again.");
    } finally {
      setIsSavingService(false);
    }
  };

  const handleDeleteVariant = async (variantId: string) => {
    if (!window.confirm("Are you sure you want to remove this service variant?")) return;
    try {
      const { error } = await supabase
        .from("service_variants")
        .update({ active: false })
        .eq("id", variantId);
      if (error) throw error;
      fetchDashboardData();
    } catch (err) {
      console.error("Error deleting variant:", err);
      alert("Failed to delete variant.");
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm("Are you sure you want to remove this entire service and all its variants?")) return;
    try {
      // Deactivate service
      const { error: svcErr } = await supabase
        .from("services")
        .update({ active: false })
        .eq("id", serviceId);
      if (svcErr) throw svcErr;

      // Deactivate all its variants
      const { error: varErr } = await supabase
        .from("service_variants")
        .update({ active: false })
        .eq("service_id", serviceId);
      if (varErr) throw varErr;

      fetchDashboardData();
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service.");
    }
  };

  // Walk-in booking duration calculator
  const calculateWalkinDuration = (variantIds: string[], variants: any[]): number => {
    const categoriesSet = new Set<string>();
    variantIds.forEach(vid => {
      const variant = variants.find(v => v.id === vid);
      if (variant) {
        const service = services.find(s => s.id === variant.service_id);
        if (service) {
          const cat = categories.find(c => c.id === service.category_id);
          if (cat) {
            categoriesSet.add(cat.name);
          }
        }
      }
    });

    if (categoriesSet.size === 0) return 60;

    let maxDuration = 60;
    categoriesSet.forEach(cat => {
      let catDuration = 60;
      const cLower = cat.toLowerCase();
      if (cLower === "nails" || cLower === "nail") {
        catDuration = 120; // 2 hours
      } else if (cLower === "hair" || cLower === "braids" || cLower === "braid") {
        catDuration = 180; // 3 hours
      } else if (cLower === "makeup" || cLower === "make up") {
        catDuration = 90;  // 1.5 hours
      } else if (cLower === "skin" || cLower === "skincare") {
        catDuration = 60;  // 1 hour
      }
      if (catDuration > maxDuration) {
        maxDuration = catDuration;
      }
    });
    return maxDuration;
  };

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName || !walkinPhone || walkinSelectedVariants.length === 0 || !walkinTime) {
      alert("Please fill in name, phone, time, and select at least one service.");
      return;
    }
    setIsSavingBooking(true);
    try {
      // Find or create customer
      let customerId = "";
      const { data: existingCust } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", walkinPhone)
        .maybeSingle();

      if (existingCust) {
        customerId = existingCust.id;
      } else {
        const { data: newCust, error: custErr } = await supabase
          .from("customers")
          .insert({ name: walkinName, phone: walkinPhone, email: walkinEmail || null, notes: "Walk-in customer" })
          .select("id")
          .single();
        if (custErr) throw custErr;
        customerId = newCust.id;
      }

      // Map selected variants
      const selectedVarObjs = walkinSelectedVariants.map(vid => {
        const variant = serviceVariants.find(v => v.id === vid);
        const service = services.find(s => s.id === variant?.service_id);
        const cat = categories.find(c => c.id === service?.category_id);
        return { variant, service, category: cat };
      }).filter(x => x.variant && x.service);

      if (selectedVarObjs.length === 0) throw new Error("No variants found.");

      const firstVarObj = selectedVarObjs[0];
      const servicesListText = selectedVarObjs.map(x => 
        !x.variant?.name || /^(standard|classic|per nail)$/i.test(x.variant?.name) || x.variant?.name === x.service?.name
          ? x.service?.name
          : `${x.service?.name} - ${x.variant?.name}`
      ).join(", ");
      
      const combinedNotes = `Booked Services: ${servicesListText}${walkinNotes ? ` | Notes: ${walkinNotes}` : ""}`;
      const totalDuration = calculateWalkinDuration(walkinSelectedVariants, serviceVariants);

      // Insert booking
      const { data: newBooking, error: bookingErr } = await supabase
        .from("bookings")
        .insert({
          customer_id: customerId,
          booking_date: walkinDate,
          booking_time: walkinTime,
          duration_minutes: totalDuration,
          status: "Confirmed",
          customer_name: walkinName,
          customer_phone: walkinPhone,
          customer_email: walkinEmail || null,
          notes: combinedNotes,
          category_name: firstVarObj.category?.name || "Hair",
          service_name: firstVarObj.service?.name,
          variant_name: firstVarObj.variant?.name || "Standard",
          variant_id: firstVarObj.variant?.id
        })
        .select("*")
        .single();

      if (bookingErr) throw bookingErr;

      // Insert booking items
      const itemsToInsert = selectedVarObjs.map(x => ({
        booking_id: newBooking.id,
        category_name: x.category?.name || "Hair",
        service_name: x.service?.name,
        variant_name: x.variant?.name || "Standard",
        variant_id: x.variant?.id,
        duration_minutes: x.variant?.duration_minutes || 60,
        price: x.variant?.price || 0,
        price_varies: x.variant?.price_varies || false
      }));

      const { error: itemsErr } = await supabase
        .from("booking_items")
        .insert(itemsToInsert);

      if (itemsErr) throw itemsErr;

      setIsBookingModalOpen(false);
      fetchDashboardData();
      // Reset forms
      setWalkinName("");
      setWalkinPhone("");
      setWalkinEmail("");
      setWalkinNotes("");
      setWalkinSelectedVariants([]);
      setWalkinCalendarIndex(1);
    } catch (err) {
      console.error("Error creating walk-in booking:", err);
      alert("Failed to create booking.");
    } finally {
      setIsSavingBooking(false);
    }
  };

  const handleCreateBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockStartTime || !blockEndTime) {
      alert("Please select start and end times.");
      return;
    }
    if (blockStartTime >= blockEndTime) {
      alert("Start time must be before end time.");
      return;
    }
    setIsSavingBooking(true);
    try {
      const { error } = await supabase
        .from("blocked_slots")
        .insert({
          start_date: blockDate,
          end_date: blockDate,
          start_time: blockStartTime,
          end_time: blockEndTime,
          block_type: blockReason || "Blocked",
          override_capacity: 0,
          calendar_index: Number(blockCalendarIndex)
        });

      if (error) throw error;

      setIsBookingModalOpen(false);
      fetchDashboardData();
      setBlockReason("Blocked");
      setBlockCalendarIndex(1);
    } catch (err) {
      console.error("Error creating blocked slot:", err);
      alert("Failed to block slot.");
    } finally {
      setIsSavingBooking(false);
    }
  };

  const openBookingDetails = (b: any, readOnly = false) => {
    setIsBookingDetailsReadOnly(readOnly);
    setSelectedBookingForDetails(b);
    setEditName(b.customer_name || "");
    setEditPhone(b.customer_phone || "");
    setEditEmail(b.customer_email || "");
    setEditDate(b.booking_date || "");
    setEditTime(b.booking_time || "09:00:00");
    setEditStatus(b.status || "Confirmed");
    setEditNotes("");
    setEditCalendarIndex(b.calendar_index || 1);
    
    if (b.notes) {
      const notesParts = b.notes.split(" | Notes: ");
      if (notesParts.length > 1) {
        setEditNotes(notesParts[1]);
      } else if (!b.notes.startsWith("Booked Services:")) {
        setEditNotes(b.notes);
      }
    }

    if (b.booking_items && b.booking_items.length > 0) {
      setEditSelectedVariants(b.booking_items.map((bi: any) => bi.variant_id).filter(Boolean));
    } else if (b.variant_id) {
      setEditSelectedVariants([b.variant_id]);
    } else {
      setEditSelectedVariants([]);
    }

    setIsBookingDetailsModalOpen(true);
  };

  const handleUpdateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForDetails) return;
    if (!editName || !editPhone || editSelectedVariants.length === 0 || !editTime) {
      alert("Name, phone, time, and at least one service are required.");
      return;
    }

    setIsSavingEditBooking(true);
    try {
      const bId = selectedBookingForDetails.id;

      // Update/check customer
      let customerId = selectedBookingForDetails.customer_id;
      if (customerId) {
        await supabase
          .from("customers")
          .update({ name: editName, phone: editPhone, email: editEmail || null })
          .eq("id", customerId);
      } else {
        const { data: existingCust } = await supabase
          .from("customers")
          .select("id")
          .eq("phone", editPhone)
          .maybeSingle();

        if (existingCust) {
          customerId = existingCust.id;
        } else {
          const { data: newCust } = await supabase
            .from("customers")
            .insert({ name: editName, phone: editPhone, email: editEmail || null, notes: "Created during booking edit" })
            .select("id")
            .single();
          if (newCust) customerId = newCust.id;
        }
      }

      // Map selected variants
      const selectedVarObjs = editSelectedVariants.map(vid => {
        const variant = serviceVariants.find(v => v.id === vid);
        const service = services.find(s => s.id === variant?.service_id);
        const cat = categories.find(c => c.id === service?.category_id);
        return { variant, service, category: cat };
      }).filter(x => x.variant && x.service);

      if (selectedVarObjs.length === 0) throw new Error("No services selected.");

      const firstVarObj = selectedVarObjs[0];
      const servicesListText = selectedVarObjs.map(x => 
        !x.variant?.name || /^(standard|classic|per nail)$/i.test(x.variant?.name) || x.variant?.name === x.service?.name
          ? x.service?.name
          : `${x.service?.name} - ${x.variant?.name}`
      ).join(", ");
      
      const combinedNotes = `Booked Services: ${servicesListText}${editNotes ? ` | Notes: ${editNotes}` : ""}`;
      const totalDuration = calculateWalkinDuration(editSelectedVariants, serviceVariants);

      // Update booking
      const { error: bookingErr } = await supabase
        .from("bookings")
        .update({
          customer_id: customerId || null,
          booking_date: editDate,
          booking_time: editTime,
          duration_minutes: totalDuration,
          status: editStatus,
          customer_name: editName,
          customer_phone: editPhone,
          customer_email: editEmail || null,
          notes: combinedNotes,
          category_name: firstVarObj.category?.name || "Hair",
          service_name: firstVarObj.service?.name,
          variant_name: firstVarObj.variant?.name || "Standard",
          variant_id: firstVarObj.variant?.id,
          calendar_index: Number(editCalendarIndex)
        })
        .eq("id", bId);

      if (bookingErr) throw bookingErr;

      // Sync booking items
      const { error: deleteErr } = await supabase
        .from("booking_items")
        .delete()
        .eq("booking_id", bId);

      if (deleteErr) throw deleteErr;

      const itemsToInsert = selectedVarObjs.map(x => ({
        booking_id: bId,
        category_name: x.category?.name || "Hair",
        service_name: x.service?.name,
        variant_name: x.variant?.name || "Standard",
        variant_id: x.variant?.id,
        duration_minutes: x.variant?.duration_minutes || 60,
        price: x.variant?.price || 0,
        price_varies: x.variant?.price_varies || false
      }));

      const { error: itemsErr } = await supabase
        .from("booking_items")
        .insert(itemsToInsert);

      if (itemsErr) throw itemsErr;

      setIsBookingDetailsModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      console.error("Error updating booking:", err);
      alert("Failed to save booking edits. Please try again.");
    } finally {
      setIsSavingEditBooking(false);
    }
  };

  // Stats Calculations
  const stats = React.useMemo(() => {
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const activeBookings = bookings.filter(b => b.status !== "Cancelled");
    
    // Today's bookings
    const todayCount = activeBookings.filter(b => b.booking_date === todayStr).length;

    // This week's bookings
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekCount = activeBookings.filter(b => {
      const bDate = new Date(b.booking_date);
      return bDate >= oneWeekAgo && bDate <= new Date();
    }).length;

    // Upcoming bookings (today and later)
    const upcomingCount = activeBookings.filter(b => b.booking_date >= todayStr).length;

    // Total unique clients
    const totalClients = customers.length;

    return { todayCount, thisWeekCount, upcomingCount, totalClients };
  }, [bookings, customers]);

  // Calendar calculations
  const calendarDays = React.useMemo(() => {
    const start = startOfMonth(currentCalendarMonth);
    const end = endOfMonth(currentCalendarMonth);
    return eachDayOfInterval({ start, end });
  }, [currentCalendarMonth]);

  const hasBookingOnDay = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookings.some(b => b.booking_date === formattedDate && b.status !== "Cancelled");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex items-center justify-center p-6 text-white font-sans">
        <div className="w-full max-w-md bg-[#18181C] border border-[#2D2D35] p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#9F3F5C]" />
          
          <div className="flex flex-col items-center text-center mb-8">
            <img src="/ULTIMATE_LOGO-removebg-preview.png" alt="Logo" className="w-16 h-16 object-contain mb-4" />
            <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-white">
              Salon Admin Access
            </h1>
            <p className="text-xs text-gray-400 mt-1">Ultimate Blend Ladies Beauty Salon Dubai</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Administrator Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] focus:ring-1 focus:ring-[#9F3F5C] text-center tracking-widest font-semibold text-lg transition-all"
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-semibold text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-semibold text-sm rounded-xl transition-all shadow-md uppercase tracking-wider font-display"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter Bookings List
  const filteredBookings = bookings.filter(b => {
    const matchSearch =
      b.customer_name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customer_phone?.includes(bookingSearch) ||
      (b.notes && b.notes.toLowerCase().includes(bookingSearch.toLowerCase()));

    const matchStatus =
      statusFilter === "all" ||
      b.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#E3E3E6] font-sans flex flex-col md:flex-row">
      
      {/* Mobile Header Banner */}
      <header className="md:hidden bg-[#18181C] border-b border-[#2D2D35] px-4 py-3 flex items-center justify-between text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src="/ULTIMATE_LOGO-removebg-preview.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-xs uppercase tracking-wide">Salon Scheduler</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-[#222228] rounded">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`bg-[#18181C] border-r border-[#2D2D35] w-64 shrink-0 flex flex-col fixed md:sticky top-[53px] md:top-0 bottom-0 left-0 z-40 transition-transform duration-300 md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-[#2D2D35]">
          <img src="/ULTIMATE_LOGO-removebg-preview.png" alt="Logo" className="w-10 h-10 object-contain" />
          <div>
            <h2 className="font-display font-bold text-sm tracking-wide text-white uppercase">Salon Scheduler</h2>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">Dubai Admin</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => { setActiveTab("dashboard"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "dashboard" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => { setActiveTab("bookings"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "bookings" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Bookings
          </button>
          <button
            onClick={() => { setActiveTab("calendar"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "calendar" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            Calendar
          </button>
          <button
            onClick={() => { setActiveTab("clients"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "clients" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            Clients
          </button>
          <button
            onClick={() => { setActiveTab("services"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "services" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
            }`}
          >
            <Scissors className="w-5 h-5" />
            Services
          </button>
        </nav>

        <div className="p-4 border-t border-[#2D2D35] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#9F3F5C]/20 text-[#9F3F5C] flex items-center justify-center font-bold text-sm">
              A
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Administrator</p>
              <p className="text-[10px] text-gray-500">Live Server</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {loading ? (
          <div className="h-[70vh] flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-t-transparent border-[#9F3F5C] rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Loading Dashboard...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: DASHBOARD — Timeline */}
            {activeTab === "dashboard" && (
              <div className="space-y-5">
                {/* Top Bar: Today btn + date nav + stats summary */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-black text-white">SCHEDULE</h1>
                    <p className="text-xs text-gray-400 mt-1">Daily appointment timeline scheduler</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setBookingModalTab("walkin");
                        setWalkinDate(selectedDashDates[0] || format(new Date(), "yyyy-MM-dd"));
                        setBlockDate(selectedDashDates[0] || format(new Date(), "yyyy-MM-dd"));
                        setIsBookingModalOpen(true);
                      }}
                      className="px-4 py-2 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-bold text-xs rounded-xl shadow-md uppercase tracking-wider transition-all"
                    >
                      + Add Booking / Block
                    </button>

                    {/* Quick stats pills */}
                    <div className="hidden md:flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-[#18181C] border border-[#2D2D35] rounded-lg text-[10px] font-bold text-gray-400">
                        <span className="text-white text-sm mr-1">{stats.todayCount}</span>Today
                      </span>
                      <span className="px-3 py-1.5 bg-[#18181C] border border-[#2D2D35] rounded-lg text-[10px] font-bold text-gray-400">
                        <span className="text-white text-sm mr-1">{stats.upcomingCount}</span>Upcoming
                      </span>
                      <span className="px-3 py-1.5 bg-[#18181C] border border-[#2D2D35] rounded-lg text-[10px] font-bold text-gray-400">
                        <span className="text-white text-sm mr-1">{stats.totalClients}</span>Clients
                      </span>
                    </div>
                  </div>
                </div>

                {/* Date Navigation Bar */}
                <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#2D2D35]">
                    <div className="flex items-center gap-2">
                      {/* Today button */}
                      <button
                        onClick={() => setSelectedDashDates([format(new Date(), "yyyy-MM-dd")])}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
                          selectedDashDates.length === 1 && selectedDashDates[0] === format(new Date(), "yyyy-MM-dd")
                            ? "bg-[#9F3F5C] border-[#9F3F5C] text-white"
                            : "border-[#2D2D35] text-gray-400 hover:text-white hover:bg-[#222228]"
                        }`}
                      >
                        Today
                      </button>

                      {/* Prev / Next day arrows */}
                      <button
                        onClick={() => {
                          const first = selectedDashDates[0];
                          const prev = format(addDays(new Date(first), -1), "yyyy-MM-dd");
                          setSelectedDashDates([prev]);
                        }}
                        className="p-1.5 border border-[#2D2D35] rounded-lg hover:bg-[#222228] transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const last = selectedDashDates[selectedDashDates.length - 1];
                          const next = format(addDays(new Date(last), 1), "yyyy-MM-dd");
                          setSelectedDashDates([next]);
                        }}
                        className="p-1.5 border border-[#2D2D35] rounded-lg hover:bg-[#222228] transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* Current date display */}
                      <span className="text-sm font-bold text-white px-2">
                        {selectedDashDates.length === 1
                          ? format(new Date(selectedDashDates[0]), "EEEE, dd MMMM yyyy")
                          : `${selectedDashDates.length} days selected`}
                      </span>
                    </div>

                    {/* Multi-date dropdown */}
                    <div className="relative" ref={dateDropdownRef}>
                      <button
                        onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border border-[#2D2D35] rounded-lg text-gray-400 hover:text-white hover:bg-[#222228] transition-colors"
                      >
                        <CalendarIcon className="w-3.5 h-3.5" />
                        Select Dates
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dateDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {dateDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-[260px] bg-[#1A1A1F] border border-[#2D2D35] rounded-xl shadow-2xl z-50 overflow-hidden">
                          <div className="px-3 py-2 border-b border-[#2D2D35] flex items-center justify-between">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pick multiple days</span>
                            <button
                              onClick={() => setSelectedDashDates([format(new Date(), "yyyy-MM-dd")])}
                              className="text-[10px] text-[#9F3F5C] font-bold hover:underline"
                            >
                              Reset
                            </button>
                          </div>
                          <div className="max-h-[280px] overflow-y-auto py-1">
                            {Array.from({ length: 30 }, (_, i) => {
                              const d = addDays(new Date(), i);
                              const dateStr = format(d, "yyyy-MM-dd");
                              const isSelected = selectedDashDates.includes(dateStr);
                              const dayCount = bookings.filter(b => b.booking_date === dateStr && b.status !== "Cancelled").length;
                              return (
                                <button
                                  key={dateStr}
                                  onClick={() => toggleDashDate(dateStr)}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                                    isSelected ? "bg-[#9F3F5C]/10 text-white" : "text-gray-400 hover:bg-[#222228] hover:text-white"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                      isSelected ? "bg-[#9F3F5C] border-[#9F3F5C]" : "border-[#2D2D35]"
                                    }`}>
                                      {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className="font-semibold">
                                      {i === 0 ? "Today" : i === 1 ? "Tomorrow" : format(d, "EEE")},{" "}
                                      {format(d, "dd MMM")}
                                    </span>
                                  </div>
                                  {dayCount > 0 && (
                                    <span className="bg-[#2D2D35] text-gray-300 px-1.5 py-0.5 rounded text-[9px] font-bold">
                                      {dayCount}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TIMELINE VIEW GRID */}
                  <div className="overflow-x-auto">
                    {(() => {
                      // Get all bookings for selected dates
                      const timelineBookings = bookings
                        .filter(b => selectedDashDates.includes(b.booking_date) && b.status !== "Cancelled")
                        .sort((a, b) => {
                          if (a.booking_date !== b.booking_date) return a.booking_date.localeCompare(b.booking_date);
                          return (a.booking_time || "").localeCompare(b.booking_time || "");
                        });

                      if (timelineBookings.length === 0) {
                        return (
                          <div className="py-16 text-center">
                            <CalendarIcon className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No appointments for selected date{selectedDashDates.length > 1 ? "s" : ""}.</p>
                          </div>
                        );
                      }

                      // Build timeline hours (8 AM to 10 PM)
                      const timelineHours = Array.from({ length: 15 }, (_, i) => i + 8); // 8..22

                      // Parse booking start hour
                      const getBookingHour = (b: any) => {
                        const parts = (b.booking_time || "09:00").split(":");
                        return parseInt(parts[0], 10);
                      };

                      const getBookingMinute = (b: any) => {
                        const parts = (b.booking_time || "09:00").split(":");
                        return parseInt(parts[1], 10);
                      };

                      // Assign colors to bookings by index
                      const colorMap = new Map<string, typeof BLOCK_COLORS[0]>();
                      let colorIdx = 0;
                      timelineBookings.forEach(b => {
                        if (!colorMap.has(b.id)) {
                          colorMap.set(b.id, BLOCK_COLORS[colorIdx % BLOCK_COLORS.length]);
                          colorIdx++;
                        }
                      });

                      const HOUR_HEIGHT = 80; // px per hour slot

                      return (
                        <div className="flex min-w-[600px]">
                          {/* Time labels column */}
                          <div className="w-[60px] shrink-0 border-r border-[#2D2D35]">
                            {timelineHours.map(hour => (
                              <div
                                key={hour}
                                className="flex items-start justify-end pr-3 text-[10px] font-bold text-gray-500"
                                style={{ height: `${HOUR_HEIGHT}px`, paddingTop: "4px" }}
                              >
                                {hour <= 12 ? `${hour}:00` : `${hour}:00`}
                              </div>
                            ))}
                          </div>

                          {/* Timeline body (one or more day columns) */}
                          <div className="flex-1 flex">
                            {selectedDashDates.map(dateStr => {
                              const dayBookings = timelineBookings.filter(b => b.booking_date === dateStr);
                              const dayBlocked = blockedSlots.filter(bs => bs.start_date <= dateStr && bs.end_date >= dateStr);
                              return (
                                <div key={dateStr} className="flex-1 relative border-r border-[#2D2D35] last:border-r-0 min-w-[300px]">
                                  {/* Day header if multi-day */}
                                  {selectedDashDates.length > 1 && (
                                    <div className="sticky top-0 bg-[#222228] border-b border-[#2D2D35] px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10">
                                      {format(new Date(dateStr), "EEE dd MMM")}
                                    </div>
                                  )}

                                  {/* 5 Calendar sub-headers */}
                                  <div className="sticky bg-[#1D1D22] border-b border-[#2D2D35] grid grid-cols-5 text-center text-[9px] font-black text-gray-400 uppercase tracking-wider z-10 py-1.5" style={{ top: selectedDashDates.length > 1 ? "29px" : "0px" }}>
                                    <div className="border-r border-[#2D2D35]/30">Staff 1</div>
                                    <div className="border-r border-[#2D2D35]/30">Staff 2</div>
                                    <div className="border-r border-[#2D2D35]/30">Staff 3</div>
                                    <div className="border-r border-[#2D2D35]/30">Staff 4</div>
                                    <div>Staff 5</div>
                                  </div>

                                  {/* Subtle vertical column gridlines background */}
                                  <div className="absolute inset-0 flex pointer-events-none" style={{ top: selectedDashDates.length > 1 ? "53px" : "24px" }}>
                                    <div className="flex-1 border-r border-[#2D2D35]/20" />
                                    <div className="flex-1 border-r border-[#2D2D35]/20" />
                                    <div className="flex-1 border-r border-[#2D2D35]/20" />
                                    <div className="flex-1 border-r border-[#2D2D35]/20" />
                                    <div className="flex-1" />
                                  </div>

                                  {/* Hour grid lines */}
                                  {timelineHours.map(hour => (
                                    <div
                                      key={hour}
                                      className="border-b border-[#2D2D35]/40"
                                      style={{ height: `${HOUR_HEIGHT}px` }}
                                    />
                                  ))}

                                  {/* Booking blocks overlay */}
                                  <div className="absolute inset-0" style={{ top: selectedDashDates.length > 1 ? "53px" : "24px" }}>
                                    {/* Blocked slots overlay */}
                                    {dayBlocked.map((bs) => {
                                      const startParts = (bs.start_time || "09:00").split(":");
                                      const startH = parseInt(startParts[0], 10);
                                      const startM = parseInt(startParts[1], 10);
                                      
                                      const endParts = (bs.end_time || "10:00").split(":");
                                      const endH = parseInt(endParts[0], 10);
                                      const endM = parseInt(endParts[1], 10);

                                      const durationMins = (endH - startH) * 60 + (endM - startM);
                                      
                                      const topPx = (startH - 8) * HOUR_HEIGHT + (startM / 60) * HOUR_HEIGHT;
                                      const heightPx = Math.max((durationMins / 60) * HOUR_HEIGHT, 42);

                                      const startStr = bs.start_time?.slice(0, 5) || "09:00";
                                      const endStr = bs.end_time?.slice(0, 5) || "10:00";

                                      const calIdx = bs.calendar_index || 1;
                                      const leftOffset = (calIdx - 1) * 20;

                                      return (
                                        <div
                                          key={bs.id}
                                          className="absolute rounded-lg px-2.5 py-1 border-l-4 border-red-500 bg-[#1D1D22] shadow z-20 flex flex-col justify-center overflow-hidden"
                                          style={{
                                            top: `${topPx}px`,
                                            height: `${heightPx}px`,
                                            left: `calc(${leftOffset}% + 4px)`,
                                            width: "calc(20% - 8px)",
                                            backgroundImage: "repeating-linear-gradient(45deg, #2D2D35 0px, #2D2D35 10px, #25252B 10px, #25252B 20px)"
                                          }}
                                          title={`Blocked: ${bs.block_type}\n${startStr} - ${endStr}`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-bold text-red-400">
                                              {startStr} - {endStr}
                                            </span>
                                            <button
                                              onClick={async (e) => {
                                                e.stopPropagation();
                                                if (window.confirm("Delete this blocked slot?")) {
                                                  try {
                                                    const { error } = await supabase
                                                      .from("blocked_slots")
                                                      .delete()
                                                      .eq("id", bs.id);
                                                    if (error) throw error;
                                                    fetchDashboardData();
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                }
                                              }}
                                              className="p-0.5 hover:bg-red-500/20 rounded text-gray-500 hover:text-red-400"
                                            >
                                              <X className="w-3 h-3" />
                                            </button>
                                          </div>
                                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-wider truncate">
                                            BLOCKED: {bs.block_type}
                                          </p>
                                        </div>
                                      );
                                    })}

                                    {dayBookings.map((b) => {
                                      const startH = getBookingHour(b);
                                      const startM = getBookingMinute(b);
                                      const durationMins = getBookingDuration(b);
                                      const topPx = (startH - 8) * HOUR_HEIGHT + (startM / 60) * HOUR_HEIGHT;
                                      const heightPx = Math.max((durationMins / 60) * HOUR_HEIGHT, 42);
                                      const color = colorMap.get(b.id) || BLOCK_COLORS[0];

                                      const endH = startH + Math.floor((startM + durationMins) / 60);
                                      const endM = (startM + durationMins) % 60;
                                      const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;

                                      const servicesText = getBookingServicesText(b, serviceVariants);

                                      const calIdx = b.calendar_index || 1;
                                      const leftOffset = (calIdx - 1) * 20;

                                      return (
                                        <div
                                          key={b.id}
                                          onClick={() => openBookingDetails(b, true)}
                                          className="absolute rounded-lg px-2.5 py-1.5 overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
                                          style={{
                                            top: `${topPx}px`,
                                            height: `${heightPx}px`,
                                            left: `calc(${leftOffset}% + 4px)`,
                                            width: "calc(20% - 8px)",
                                            backgroundColor: color.bg,
                                            borderLeft: `4px solid ${color.border}`,
                                          }}
                                          title={`${b.customer_name}\n${servicesText}\n${b.booking_time?.slice(0, 5)} – ${endTime} (${formatDuration(durationMins)})\n${b.customer_phone}`}
                                        >
                                          <p className="text-[10px] font-bold" style={{ color: color.text }}>
                                            {b.booking_time?.slice(0, 5)} - {endTime}
                                          </p>
                                          <p className="text-[11px] font-bold truncate" style={{ color: color.text }}>
                                            {b.customer_name}
                                          </p>
                                          {heightPx > 44 && (
                                            <p className="text-[9px] truncate mt-0.5" style={{ color: color.text, opacity: 0.75 }}>
                                              {servicesText}
                                            </p>
                                          )}
                                          {heightPx > 60 && (
                                            <p className="text-[9px] mt-0.5" style={{ color: color.text, opacity: 0.6 }}>
                                              {formatDuration(durationMins)}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Right sidebar — day summary list */}
                          <div className="w-[240px] shrink-0 border-l border-[#2D2D35] bg-[#18181C] hidden lg:block">
                            <div className="px-3 py-2.5 border-b border-[#2D2D35]">
                              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                {selectedDashDates.length === 1
                                  ? format(new Date(selectedDashDates[0]), "EEE dd MMM")
                                  : "All Selected"}
                              </p>
                            </div>
                            <div className="overflow-y-auto" style={{ maxHeight: `${HOUR_HEIGHT * 15}px` }}>
                              {timelineBookings.length === 0 ? (
                                <p className="text-xs text-gray-500 text-center py-8">No appointments</p>
                              ) : (
                                timelineBookings.map((b) => {
                                  const color = colorMap.get(b.id) || BLOCK_COLORS[0];
                                  const durationMins = getBookingDuration(b);
                                  const servicesText = getBookingServicesText(b, serviceVariants);
                                  return (
                                    <div key={b.id} onClick={() => openBookingDetails(b, true)} className="px-3 py-2.5 border-b border-[#2D2D35]/50 hover:bg-[#222228]/30 cursor-pointer transition-colors">
                                      <div className="flex items-start gap-2">
                                        <div className="w-1 self-stretch rounded-full mt-0.5" style={{ backgroundColor: color.border }} />
                                        <div className="flex-1 min-w-0">
                                          <p className="text-[11px] font-bold text-white truncate">{b.customer_name}</p>
                                          <p className="text-[10px] text-gray-500 truncate">{servicesText}</p>
                                          <p className="text-[9px] text-gray-500 mt-0.5">
                                            {b.booking_time?.slice(0, 5)} • {formatDuration(durationMins)}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BOOKINGS LIST VIEW */}
            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-black text-white">APPOINTMENTS</h1>
                    <p className="text-xs text-gray-400 mt-1">Manage, search, and cancel bookings</p>
                  </div>
                  
                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={bookingSearch}
                        onChange={(e) => setBookingSearch(e.target.value)}
                        placeholder="Search customer, phone..."
                        className="pl-9 pr-4 py-2 border border-[#2D2D35] bg-[#18181C] text-sm text-white rounded-xl outline-none focus:border-[#9F3F5C] w-[200px]"
                      />
                    </div>

                    <div className="relative flex items-center">
                      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="pl-9 pr-8 py-2 border border-[#2D2D35] bg-[#18181C] text-sm text-white rounded-xl outline-none focus:border-[#9F3F5C] appearance-none"
                      >
                        <option value="all">All Status</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Compact Bookings Table */}
                <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-[#222228]/30 border-b border-[#2D2D35]">
                        <tr>
                          <th className="px-4 py-3">Date & Time</th>
                          <th className="px-4 py-3">Client</th>
                          <th className="px-4 py-3 hidden sm:table-cell">Services</th>
                          <th className="px-4 py-3 hidden md:table-cell">Phone</th>
                          <th className="px-4 py-3 text-center">Status</th>
                          <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D2D35]/60">
                        {filteredBookings.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="px-4 py-12 text-center text-xs text-gray-500">
                              No matching appointments found.
                            </td>
                          </tr>
                        ) : (
                          filteredBookings.map((b) => {
                            const servicesText = getBookingServicesText(b, serviceVariants);
                            const itemCount = b.booking_items?.length || 0;
                            return (
                              <tr key={b.id} onClick={() => openBookingDetails(b, false)} className="hover:bg-[#222228]/40 transition-colors group relative cursor-pointer">
                                {/* Left color accent */}
                                <td className="px-4 py-3 relative">
                                  <div className={`absolute left-0 top-1 bottom-1 w-[3px] rounded-r ${
                                    b.status === "Cancelled" ? "bg-red-600" : "bg-green-500"
                                  }`} />
                                  <p className="text-xs font-bold text-white">{format(new Date(b.booking_date), "dd MMM")}</p>
                                  <p className="text-[10px] text-gray-500">{b.booking_time?.slice(0, 5)}</p>
                                </td>
                                <td className="px-4 py-3">
                                  <div>
                                    <p className="text-xs font-bold text-white">{b.customer_name}</p>
                                    <p className="text-[10px] text-gray-500 sm:hidden mt-0.5 truncate max-w-[130px]">{servicesText}</p>
                                  </div>
                                </td>
                                <td className="px-4 py-3 hidden sm:table-cell max-w-[250px]">
                                  <p className="text-[11px] text-[#9F3F5C] font-medium truncate" title={servicesText}>{servicesText}</p>
                                  {itemCount > 0 && (
                                    <span className="text-[9px] text-gray-500">{itemCount} item{itemCount > 1 ? "s" : ""}</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 hidden md:table-cell">
                                  <span className="text-[11px] text-gray-400 font-mono">{b.customer_phone}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                                    b.status === "Cancelled" ? "bg-red-955 text-red-400" : "bg-green-955 text-green-400"
                                  }`}>
                                    {b.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {b.status !== "Cancelled" ? (
                                    <button
                                      onClick={(e) => { e.stopPropagation(); handleCancelBooking(b.id); }}
                                      className="opacity-40 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all p-1"
                                      title="Cancel"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  ) : (
                                    <span className="text-[10px] text-gray-600">—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CALENDAR VIEW */}
            {activeTab === "calendar" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-display text-2xl md:text-3xl font-black text-white">CALENDAR</h1>
                    <p className="text-xs text-gray-400 mt-1">Review day-by-day bookings</p>
                  </div>
                  
                  {/* Calendar controller */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentCalendarMonth(subMonths(currentCalendarMonth, 1))}
                      className="p-2 border border-[#2D2D35] bg-[#18181C] rounded-xl hover:bg-[#222228] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-bold text-white px-2">
                      {format(currentCalendarMonth, "MMMM yyyy")}
                    </span>
                    <button
                      onClick={() => setCurrentCalendarMonth(addMonths(currentCalendarMonth, 1))}
                      className="p-2 border border-[#2D2D35] bg-[#18181C] rounded-xl hover:bg-[#222228] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Monthly Calendar Card */}
                  <div className="lg:col-span-2 bg-[#18181C] border border-[#2D2D35] rounded-2xl p-5">
                    <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase tracking-wider text-gray-400 mb-2">
                      <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {/* Empty slots for starting alignment */}
                      {Array.from({ length: startOfMonth(currentCalendarMonth).getDay() }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square" />
                      ))}

                      {/* Actual Month Days */}
                      {calendarDays.map((day) => {
                        const isSelected = isSameDay(selectedCalendarDate, day);
                        const hasBookings = hasBookingOnDay(day);
                        return (
                          <button
                            key={day.toString()}
                            onClick={() => setSelectedCalendarDate(day)}
                            className={`aspect-square rounded-xl border flex flex-col items-center justify-between p-2 relative transition-all ${
                              isSelected
                                ? "bg-[#9F3F5C] border-[#9F3F5C] text-white"
                                : "bg-[#222228]/40 border-[#2D2D35] hover:bg-[#222228] text-white"
                            }`}
                          >
                            <span className="text-xs font-black self-start">{format(day, "d")}</span>
                            {hasBookings && (
                              <span className={`w-2 h-2 rounded-full absolute bottom-2 ${isSelected ? "bg-white" : "bg-[#9F3F5C]"}`} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Day's appointments side view */}
                  <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl p-5">
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider border-b border-[#2D2D35] pb-3">
                      Appointments for {format(selectedCalendarDate, "dd MMMM")}
                    </h3>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                      {bookings.filter(b => b.booking_date === format(selectedCalendarDate, "yyyy-MM-dd")).length === 0 ? (
                        <p className="text-xs text-gray-500 text-center py-8">No appointments scheduled for this day.</p>
                      ) : (
                        bookings
                          .filter(b => b.booking_date === format(selectedCalendarDate, "yyyy-MM-dd"))
                          .map((b) => (
                            <div key={b.id} onClick={() => openBookingDetails(b, true)} className="bg-[#222228] p-4 rounded-xl border border-[#2D2D35] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#222228]/80 transition-colors">
                              <div className="space-y-1">
                                <p className="text-sm font-bold text-white">{b.customer_name}</p>
                                <p className="text-xs text-[#9F3F5C] font-semibold">
                                  {getBookingServicesText(b, serviceVariants)}
                                </p>
                                <span className="inline-block text-[10px] text-gray-400">
                                  {b.booking_time.slice(0, 5)} • {b.people_count} {b.people_count === 1 ? "person" : "people"}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                  b.status === "Cancelled" ? "bg-red-955 text-red-400" : "bg-green-955 text-green-400"
                                }`}>
                                  {b.status}
                                </span>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CLIENTS LIST VIEW */}
            {activeTab === "clients" && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-black text-white">CLIENT RECORDS</h1>
                  <p className="text-xs text-gray-400 mt-1">Review registered customers and reservation counts</p>
                </div>

                <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                      <thead className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#2D2D35] bg-[#222228]/35">
                        <tr>
                          <th className="p-4">Customer Name</th>
                          <th className="p-4">Phone Number</th>
                          <th className="p-4 text-center">Total Bookings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D2D35]">
                        {customers.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="p-4 text-center text-xs text-gray-500">No customer records in database.</td>
                          </tr>
                        ) : (
                          customers.map((c) => {
                            const clientBookingsCount = bookings.filter(b => b.customer_phone === c.phone || b.customer_id === c.id).length;
                            return (
                              <tr key={c.id} className="hover:bg-[#222228]/15">
                                <td className="p-4 font-bold text-white">{c.name}</td>
                                <td className="p-4 font-mono text-xs">{c.phone}</td>
                                <td className="p-4 text-center font-bold text-[#9F3F5C]">{clientBookingsCount}</td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SERVICES CONFIG LIST */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-black text-white">SERVICES GROUPING</h1>
                  <p className="text-xs text-gray-400 mt-1">Review active salon services configuration grouped by categories</p>
                </div>

                <div className="grid gap-6">
                  {categories.map((cat) => {
                    const catServices = services.filter(s => s.category_id === cat.id && s.active !== false);
                    return (
                      <div key={cat.id} className="bg-[#18181C] border border-[#2D2D35] rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-[#2D2D35]/50 pb-3">
                          <h3 className="font-display text-sm font-black text-[#9F3F5C] uppercase tracking-wider">
                            {cat.name} ({catServices.length} active services)
                          </h3>
                          <button
                            onClick={() => {
                              setSelectedCategoryId(cat.id);
                              setServiceModalMode("add_service");
                              setFormServiceName("");
                              setFormVariantName("Standard");
                              setFormPrice("");
                              setFormPriceVaries(false);
                              setFormDuration(60);
                              setIsServiceModalOpen(true);
                            }}
                            className="px-3 py-1 bg-[#9F3F5C]/10 border border-[#9F3F5C]/35 text-[#9F3F5C] hover:bg-[#9F3F5C] hover:text-white font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wider"
                          >
                            + Add Service
                          </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {catServices.length === 0 ? (
                            <p className="text-xs text-gray-500 py-3">No services configured inside this category.</p>
                          ) : (
                            catServices.map((svc) => {
                              const variants = serviceVariants.filter(v => v.service_id === svc.id && v.active !== false);
                              return (
                                <div key={svc.id} className="bg-[#222228]/55 border border-[#2D2D35]/50 rounded-xl p-4 space-y-2 group/svc relative">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-xs font-bold text-white uppercase">{svc.name}</h4>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover/svc:opacity-100 transition-opacity">
                                      <button
                                        onClick={() => {
                                          setSelectedServiceId(svc.id);
                                          setServiceModalMode("add_variant");
                                          setFormVariantName("");
                                          setFormPrice("");
                                          setFormPriceVaries(false);
                                          setFormDuration(60);
                                          setIsServiceModalOpen(true);
                                        }}
                                        className="text-[9px] text-[#9F3F5C] hover:underline font-bold border border-[#9F3F5C]/20 px-1 py-0.5 rounded hover:bg-[#9F3F5C]/10 transition-all"
                                        title="Add Variant"
                                      >
                                        + Add Variant
                                      </button>
                                      <button
                                        onClick={() => handleDeleteService(svc.id)}
                                        className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                                        title="Remove Service"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  {variants.length > 0 ? (
                                    <div className="space-y-1.5 pt-1.5 border-t border-[#2D2D35]/40">
                                      {variants.map(v => (
                                        <div key={v.id} className="flex justify-between items-center text-[11px] text-gray-400 group/var py-0.5 hover:bg-[#1C1C22]/20 rounded px-1 -mx-1">
                                          <span>{v.name} • {formatDuration(v.duration_minutes)}</span>
                                          <div className="flex items-center gap-2">
                                            <span className="font-bold text-white">
                                              {v.price > 0 ? `AED ${v.price}` : "Price Varies"}
                                            </span>
                                            <div className="flex items-center gap-1 opacity-0 group-hover/var:opacity-100 transition-opacity">
                                              <button
                                                onClick={() => {
                                                  setSelectedVariantId(v.id);
                                                  setServiceModalMode("edit_variant");
                                                  setFormVariantName(v.name);
                                                  setFormPrice(v.price);
                                                  setFormPriceVaries(v.price_varies || false);
                                                  setFormDuration(v.duration_minutes);
                                                  setIsServiceModalOpen(true);
                                                }}
                                                className="text-[#9F3F5C] hover:text-[#b04a69] p-0.5 transition-colors"
                                                title="Edit Variant Price/Duration"
                                              >
                                                <Edit2 className="w-3 h-3" />
                                              </button>
                                              <button
                                                onClick={() => handleDeleteVariant(v.id)}
                                                className="text-gray-500 hover:text-red-400 p-0.5 transition-colors"
                                                title="Remove Variant"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-[10px] text-gray-500 italic">No variants configured.</p>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL 1: ADD/EDIT SERVICES & VARIANTS */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#9F3F5C]" />
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D2D35]">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                {serviceModalMode === "add_service" && "Add New Service"}
                {serviceModalMode === "add_variant" && "Add Service Variant"}
                {serviceModalMode === "edit_variant" && "Edit Service Variant"}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="p-1 hover:bg-[#222228] text-gray-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveServiceVariant} className="p-6 space-y-4">
              {serviceModalMode === "add_service" && (
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formServiceName}
                    onChange={(e) => setFormServiceName(e.target.value)}
                    placeholder="e.g. Acrylic Extension"
                    className="w-full px-4 py-2.5 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  {serviceModalMode === "add_service" ? "Default Variant Name" : "Variant Name"}
                </label>
                <input
                  type="text"
                  required
                  value={formVariantName}
                  onChange={(e) => setFormVariantName(e.target.value)}
                  placeholder="e.g. Standard, Small, Medium, Hair Wash"
                  className="w-full px-4 py-2.5 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Price (AED)
                  </label>
                  <input
                    type="number"
                    disabled={formPriceVaries}
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 150"
                    className="w-full px-4 py-2.5 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    placeholder="e.g. 60"
                    className="w-full px-4 py-2.5 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="formPriceVaries"
                  checked={formPriceVaries}
                  onChange={(e) => {
                    setFormPriceVaries(e.target.checked);
                    if (e.target.checked) setFormPrice("");
                  }}
                  className="w-4 h-4 rounded border-[#2D2D35] bg-[#222228] text-[#9F3F5C] focus:ring-0"
                />
                <label htmlFor="formPriceVaries" className="text-xs font-bold text-gray-400 select-none cursor-pointer">
                  Price Varies (Quote on arrival)
                </label>
              </div>

              <div className="pt-4 border-t border-[#2D2D35] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2 border border-[#2D2D35] text-gray-400 hover:text-white rounded-xl text-xs hover:bg-[#222228] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingService}
                  className="px-6 py-2 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all"
                >
                  {isSavingService ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: MANUAL BOOKINGS / BLOCK SLOTS */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden text-left flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#9F3F5C]" />
            
            {/* Modal Header & Tabs */}
            <div className="px-6 pt-5 pb-3 border-b border-[#2D2D35] flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Create Calendar Slot
                </h3>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-1 hover:bg-[#222228] text-gray-400 hover:text-white rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs selector */}
              <div className="flex bg-[#222228] rounded-xl p-1 text-xs">
                <button
                  onClick={() => setBookingModalTab("walkin")}
                  className={`flex-1 py-2 font-bold rounded-lg transition-colors uppercase tracking-wider ${
                    bookingModalTab === "walkin" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Walk-In Booking
                </button>
                <button
                  onClick={() => setBookingModalTab("block")}
                  className={`flex-1 py-2 font-bold rounded-lg transition-colors uppercase tracking-wider ${
                    bookingModalTab === "block" ? "bg-[#9F3F5C] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Block Time Slot
                </button>
              </div>
            </div>

            {/* TAB CONTENT A: WALK-IN BOOKING */}
            {bookingModalTab === "walkin" ? (
              <form onSubmit={handleCreateWalkin} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Customer Name <span className="text-[#9F3F5C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={walkinName}
                      onChange={(e) => setWalkinName(e.target.value)}
                      placeholder="e.g. mehi get"
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Phone Number <span className="text-[#9F3F5C]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={walkinPhone}
                      onChange={(e) => setWalkinPhone(e.target.value)}
                      placeholder="e.g. 0583234327"
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={walkinEmail}
                      onChange={(e) => setWalkinEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Start Time
                    </label>
                    <select
                      value={walkinTime}
                      onChange={(e) => setWalkinTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    >
                      {Array.from({ length: 29 }, (_, i) => {
                        const h = Math.floor(i / 2) + 8;
                        const m = i % 2 === 0 ? "00" : "30";
                        const tStr = `${String(h).padStart(2, "0")}:${m}:00`;
                        const displayT = `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? "PM" : "AM"}`;
                        return (
                          <option key={tStr} value={tStr}>
                            {displayT}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={walkinDate}
                      onChange={(e) => setWalkinDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Assigned Staff
                    </label>
                    <select
                      value={walkinCalendarIndex}
                      onChange={(e) => setWalkinCalendarIndex(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all font-bold"
                    >
                      <option value="1">Staff 1</option>
                      <option value="2">Staff 2</option>
                      <option value="3">Staff 3</option>
                      <option value="4">Staff 4</option>
                      <option value="5">Staff 5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={walkinNotes}
                      onChange={(e) => setWalkinNotes(e.target.value)}
                      placeholder="e.g. Small, Medium"
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>
                </div>

                {/* Services checklist */}
                <div className="space-y-2.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Select Services <span className="text-[#9F3F5C]">*</span>
                  </label>
                  <div className="border border-[#2D2D35] bg-[#141417] rounded-xl p-3 max-h-[160px] overflow-y-auto space-y-4">
                    {categories.map(cat => {
                      const catSvc = services.filter(s => s.category_id === cat.id && s.active !== false);
                      if (catSvc.length === 0) return null;
                      return (
                        <div key={cat.id} className="space-y-1.5">
                          <p className="text-[10px] font-extrabold text-[#9F3F5C] uppercase tracking-widest">
                            {cat.name}
                          </p>
                          <div className="grid grid-cols-1 gap-1.5 pl-1">
                            {catSvc.map(svc => {
                              const vars = serviceVariants.filter(v => v.service_id === svc.id && v.active !== false);
                              return vars.map(v => {
                                const isChecked = walkinSelectedVariants.includes(v.id);
                                const displayName = !v.name || /^(standard|classic|per nail)$/i.test(v.name) || v.name === svc.name
                                  ? svc.name
                                  : `${svc.name} - ${v.name}`;
                                return (
                                  <label
                                    key={v.id}
                                    className="flex items-center justify-between text-[11px] text-gray-300 hover:text-white cursor-pointer select-none py-0.5"
                                  >
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setWalkinSelectedVariants(prev => [...prev, v.id]);
                                          } else {
                                            setWalkinSelectedVariants(prev => prev.filter(x => x !== v.id));
                                          }
                                        }}
                                        className="w-3.5 h-3.5 rounded border-[#2D2D35] bg-[#222228] text-[#9F3F5C] focus:ring-0"
                                      />
                                      <span className="truncate max-w-[220px]">{displayName}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400 font-bold">
                                      {v.price > 0 ? `AED ${v.price}` : "Varies"} • {formatDuration(v.duration_minutes)}
                                    </span>
                                  </label>
                                );
                              });
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Walk-in summary block */}
                {walkinSelectedVariants.length > 0 && (
                  <div className="bg-[#9F3F5C]/10 border border-[#9F3F5C]/25 rounded-xl p-3 text-[11px] flex justify-between items-center text-white">
                    <div>
                      <p className="font-bold text-[#9F3F5C] uppercase tracking-wider">Summary Preview</p>
                      <p className="text-[10px] text-gray-400">
                        Total Duration: <span className="text-white font-bold">{formatDuration(calculateWalkinDuration(walkinSelectedVariants, serviceVariants))} (Capped Max)</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-[#9F3F5C]">
                        {(() => {
                          const total = walkinSelectedVariants.reduce((sum, vid) => {
                            const v = serviceVariants.find(x => x.id === vid);
                            return sum + Number(v?.price || 0);
                          }, 0);
                          const varies = walkinSelectedVariants.some(vid => {
                            const v = serviceVariants.find(x => x.id === vid);
                            return v?.price_varies;
                          });
                          return varies ? `AED ${total} + Varies` : `AED ${total}`;
                        })()}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-[#2D2D35] flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 border border-[#2D2D35] text-gray-400 hover:text-white rounded-xl text-xs hover:bg-[#222228] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingBooking}
                    className="px-6 py-2 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    {isSavingBooking ? "Creating Booking..." : "Book Appointment"}
                  </button>
                </div>
              </form>
            ) : (
              /* TAB CONTENT B: BLOCK SLOT */
              <form onSubmit={handleCreateBlock} className="flex-1 p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={blockDate}
                      onChange={(e) => setBlockDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Start Time
                      </label>
                      <select
                        value={blockStartTime}
                        onChange={(e) => setBlockStartTime(e.target.value)}
                        className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                      >
                        {Array.from({ length: 29 }, (_, i) => {
                          const h = Math.floor(i / 2) + 8;
                          const m = i % 2 === 0 ? "00" : "30";
                          const tStr = `${String(h).padStart(2, "0")}:${m}:00`;
                          const displayT = `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? "PM" : "AM"}`;
                          return (
                            <option key={tStr} value={tStr}>
                              {displayT}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        End Time
                      </label>
                      <select
                        value={blockEndTime}
                        onChange={(e) => setBlockEndTime(e.target.value)}
                        className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                      >
                        {Array.from({ length: 29 }, (_, i) => {
                          const h = Math.floor(i / 2) + 8;
                          const m = i % 2 === 0 ? "00" : "30";
                          const tStr = `${String(h).padStart(2, "0")}:${m}:00`;
                          const displayT = `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? "PM" : "AM"}`;
                          return (
                            <option key={tStr} value={tStr}>
                              {displayT}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Assigned Staff
                      </label>
                      <select
                        value={blockCalendarIndex}
                        onChange={(e) => setBlockCalendarIndex(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all font-bold"
                      >
                        <option value="1">Staff 1</option>
                        <option value="2">Staff 2</option>
                        <option value="3">Staff 3</option>
                        <option value="4">Staff 4</option>
                        <option value="5">Staff 5</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Reason / Block Type
                      </label>
                      <input
                        type="text"
                        required
                        value={blockReason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        placeholder="e.g. Lunch Break, Maintenance, Closed"
                        className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2D2D35] flex items-center justify-end gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 border border-[#2D2D35] text-gray-400 hover:text-white rounded-xl text-xs hover:bg-[#222228] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingBooking}
                    className="px-6 py-2 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    {isSavingBooking ? "Blocking slot..." : "Block Time"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* MODAL 3: VIEW & EDIT BOOKING DETAILS */}
      {isBookingDetailsModalOpen && selectedBookingForDetails && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#18181C] border border-[#2D2D35] rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden text-left flex flex-col max-h-[90vh]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#9F3F5C]" />
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D2D35]">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                {isBookingDetailsReadOnly ? "Booking Details" : "Booking Details & Editing"}
              </h3>
              <button
                onClick={() => setIsBookingDetailsModalOpen(false)}
                className="p-1 hover:bg-[#222228] text-gray-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBooking} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Customer Name <span className="text-[#9F3F5C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isBookingDetailsReadOnly}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Phone Number <span className="text-[#9F3F5C]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={isBookingDetailsReadOnly}
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    disabled={isBookingDetailsReadOnly}
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Start Time
                  </label>
                  <select
                    disabled={isBookingDetailsReadOnly}
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {Array.from({ length: 29 }, (_, i) => {
                      const h = Math.floor(i / 2) + 8;
                      const m = i % 2 === 0 ? "00" : "30";
                      const tStr = `${String(h).padStart(2, "0")}:${m}:00`;
                      const displayT = `${h > 12 ? h - 12 : h}:${m} ${h >= 12 ? "PM" : "AM"}`;
                      return (
                        <option key={tStr} value={tStr}>
                          {displayT}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    disabled={isBookingDetailsReadOnly}
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Assigned Staff
                  </label>
                  <select
                    disabled={isBookingDetailsReadOnly}
                    value={editCalendarIndex}
                    onChange={(e) => setEditCalendarIndex(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="1">Staff 1</option>
                    <option value="2">Staff 2</option>
                    <option value="3">Staff 3</option>
                    <option value="4">Staff 4</option>
                    <option value="5">Staff 5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    disabled={isBookingDetailsReadOnly}
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Notes / Special Requests
                </label>
                <input
                  type="text"
                  disabled={isBookingDetailsReadOnly}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Notes from customer..."
                  className="w-full px-3 py-2 border border-[#2E2E38] bg-[#222228] text-white rounded-xl outline-none focus:border-[#9F3F5C] text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              {/* Services checklist */}
              <div className="space-y-2.5">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Select Services <span className="text-[#9F3F5C]">*</span>
                </label>
                <div className="border border-[#2D2D35] bg-[#141417] rounded-xl p-3 max-h-[160px] overflow-y-auto space-y-4">
                  {categories.map(cat => {
                    const catSvc = services.filter(s => s.category_id === cat.id && s.active !== false);
                    if (catSvc.length === 0) return null;
                    return (
                      <div key={cat.id} className="space-y-1.5">
                        <p className="text-[10px] font-extrabold text-[#9F3F5C] uppercase tracking-widest">
                          {cat.name}
                        </p>
                        <div className="grid grid-cols-1 gap-1.5 pl-1">
                          {catSvc.map(svc => {
                            const vars = serviceVariants.filter(v => v.service_id === svc.id && v.active !== false);
                            return vars.map(v => {
                              const isChecked = editSelectedVariants.includes(v.id);
                              const displayName = !v.name || /^(standard|classic|per nail)$/i.test(v.name) || v.name === svc.name
                                ? svc.name
                                : `${svc.name} - ${v.name}`;
                              return (
                                <label
                                  key={v.id}
                                  className={`flex items-center justify-between text-[11px] text-gray-300 py-0.5 select-none ${isBookingDetailsReadOnly ? "cursor-default" : "hover:text-white cursor-pointer"}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      disabled={isBookingDetailsReadOnly}
                                      checked={isChecked}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setEditSelectedVariants(prev => [...prev, v.id]);
                                        } else {
                                          setEditSelectedVariants(prev => prev.filter(x => x !== v.id));
                                        }
                                      }}
                                      className="w-3.5 h-3.5 rounded border-[#2D2D35] bg-[#222228] text-[#9F3F5C] focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <span className="truncate max-w-[220px]">{displayName}</span>
                                  </div>
                                  <span className="text-[10px] text-gray-400 font-bold">
                                    {v.price > 0 ? `AED ${v.price}` : "Varies"} • {formatDuration(v.duration_minutes)}
                                  </span>
                                </label>
                              );
                            });
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Edit summary block */}
              {editSelectedVariants.length > 0 && (
                <div className="bg-[#9F3F5C]/10 border border-[#9F3F5C]/25 rounded-xl p-3 text-[11px] flex justify-between items-center text-white">
                  <div>
                    <p className="font-bold text-[#9F3F5C] uppercase tracking-wider">Summary Preview</p>
                    <p className="text-[10px] text-gray-400">
                      Total Duration: <span className="text-white font-bold">{formatDuration(calculateWalkinDuration(editSelectedVariants, serviceVariants))} (Capped Max)</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-[#9F3F5C]">
                      {(() => {
                        const total = editSelectedVariants.reduce((sum, vid) => {
                          const v = serviceVariants.find(x => x.id === vid);
                          return sum + Number(v?.price || 0);
                        }, 0);
                        const varies = editSelectedVariants.some(vid => {
                          const v = serviceVariants.find(x => x.id === vid);
                          return v?.price_varies;
                        });
                        return varies ? `AED ${total} + Varies` : `AED ${total}`;
                      })()}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[#2D2D35] flex items-center justify-end gap-3 shrink-0">
                {isBookingDetailsReadOnly ? (
                  <button
                    type="button"
                    onClick={() => setIsBookingDetailsModalOpen(false)}
                    className="px-6 py-2 bg-[#2D2D35] hover:bg-[#3D3D45] text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Close
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsBookingDetailsModalOpen(false)}
                      className="px-4 py-2 border border-[#2D2D35] text-gray-400 hover:text-white rounded-xl text-xs hover:bg-[#222228] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingEditBooking}
                      className="px-6 py-2 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all"
                    >
                      {isSavingEditBooking ? "Saving Changes..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
