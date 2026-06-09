import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Ticket, Calendar, CheckCircle2, Check } from "lucide-react";
import { SERVICES_FLAT, SERVICE_FILTERS } from "./data";
import { supabase } from "@/lib/supabase";
import { format, addDays, parse, isSameDay } from "date-fns";


const MAIN_SERVICES = [
  {
    id: "nails",
    name: "Nails Services",
    count: 11,
    category: "Nails",
    subservices: [
      { name: "Acrylic Extension", price: 150 },
      { name: "Basic Nail Art/Nail", price: 5 },
      { name: "Classic Pedicure", price: 50 },
      { name: "Classic Nail Polish", price: 40 },
      { name: "Classic Manicure", price: 50 },
      { name: "Extension Nail Polish", price: 70 },
      { name: "Extension Removal ", price: 30 },
      { name: "Gel Extensions", price: 180 },
      { name: "Gel Polish", price: 50 },
      { name: "Gel Removal", price: 20 },
      { name: "Refill Gel/Acrylic", price: 100 }
    ]
  },
  {
    id: "box-braids",
    name: "Box Braids",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Small Box Braids", price: 0 },
      { name: "Medium Box Braids", price: 0 },
      { name: "Big Box Braids", price: 0 }
    ]
  },
  {
    id: "knotless-braids",
    name: "Knotless Braids",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Small Knotless Braids", price: 0 },
      { name: "Medium Knotless Braids", price: 0 },
      { name: "Big Knotless Braids", price: 0 }
    ]
  },
  {
    id: "boho-french-curls",
    name: "Boho French Curls",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Small Boho French Curls", price: 0 },
      { name: "Medium Boho French Curls", price: 0 },
      { name: "Big Boho French Curls", price: 0 }
    ]
  },
  {
    id: "fulani-twist-braid",
    name: "Fulani Twist Braid",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Small Fulani Twist Braid", price: 0 },
      { name: "Medium Fulani Twist Braid", price: 0 },
      { name: "Big Fulani Twist Braid", price: 0 }
    ]
  },
  {
    id: "boho-stitch-braids",
    name: "Boho & Stitch Braids",
    count: 9,
    category: "Hair",
    subservices: [
      { name: "Goddess Boho Braids (Human Hair) - Small", price: 0 },
      { name: "Goddess Boho Braids (Human Hair) - Medium", price: 0 },
      { name: "Goddess Boho Braids (Human Hair) - Big", price: 0 },
      { name: "Goddess Boho Braids (Synthetic Hair) - Small", price: 0 },
      { name: "Goddess Boho Braids (Synthetic Hair) - Medium", price: 0 },
      { name: "Goddess Boho Braids (Synthetic Hair) - Big", price: 0 },
      { name: "Stitch Braids - Small", price: 0 },
      { name: "Stitch Braids - Medium", price: 0 },
      { name: "Stitch Braids - Big", price: 0 }
    ]
  },
  {
    id: "extension-cornrows",
    name: "Extension Cornrows",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Extension Cornrows - Small", price: 0 },
      { name: "Extension Cornrows - Medium", price: 0 },
      { name: "Extension Cornrows - Big", price: 0 }
    ]
  },
  {
    id: "crochet",
    name: "Crochet",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Twist Crochet", price: 150 },
      { name: "Locs Crochet", price: 160 },
      { name: "Curly Crochet", price: 180 }
    ]
  },
  {
    id: "eyelash",
    name: "Eyelash Services",
    count: 4,
    category: "Makeup",
    subservices: [
      { name: "Classic Eyelash Extensions", price: 100 },
      { name: "Hybrid Eyelash Extensions", price: 150 },
      { name: "Volume Eyelash Extensions", price: 200 },
      { name: "Mega Eyelash Extensions", price: 250 }
    ]
  },
  {
    id: "blow-dry",
    name: "Blow Dry and Iron",
    count: 1,
    category: "Hair",
    subservices: [
      { name: "Blow Dry & Iron", price: 50 }
    ]
  },
  {
    id: "color",
    name: "Hair Color Services",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Root Touch Up", price: 150 },
      { name: "Full Hair Color", price: 250 },
      { name: "Balayage", price: 450 }
    ]
  },
  {
    id: "styling",
    name: "Wig Installation",
    count: 3,
    category: "Hair",
    subservices: [
      { name: "Ponytail Styling", price: 100 },
      { name: "Human Hair Styling", price: 100 },
      { name: "Lace Wig Styling", price: 100 }
    ]
  },
  {
    id: "treatment",
    name: "Hair Treatment Services",
    count: 2,
    category: "Hair",
    subservices: [
      { name: "Hair Relaxing", price: 150 },
      { name: "Signature Hair Treatment", price: 100 }
    ]
  },
  {
    id: "dreadlocks",
    name: "Dreadlocks",
    count: 4,
    category: "Hair",
    subservices: [
      { name: "Dreadlocks - Big", price: 0 },
      { name: "Dreadlocks - Medium", price: 0 },
      { name: "Dreadlocks - Small", price: 0 },
      { name: "Dreadlocks Maintenance", price: 100 }
    ]
  },
  {
    id: "wigs-extensions",
    name: "Wigs & Hair Extensions",
    count: 9,
    category: "Hair",
    subservices: [
      { name: "Wig Installation - Big", price: 100 },
      { name: "Wig Fix - Big", price: 120 },
      { name: "Wig Fix - Medium", price: 100 },
      { name: "Wig Fix - Small", price: 70 },
      { name: "Wig Wash & Style - Big", price: 120 },
      { name: "Wig Wash & Style - Medium", price: 100 },
      { name: "Wig Wash & Style - Small", price: 90 },
      { name: "Revamping of Human Hair", price: 100 },
      { name: "Weave / Sew-in", price: 100 }
    ]
  },
  {
    id: "skin",
    name: "Skin Services",
    count: 1,
    category: "Skin",
    subservices: [
      { name: "Signature Facial", price: 70 }
    ]
  }
];

export const Services = () => {
  const navigate = useNavigate();
  const servicesTitle = "Services";
  const [typedServicesTitle, setTypedServicesTitle] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingCategory, setBookingCategory] = useState<string>("");
  const [bookingScope, setBookingScope] = useState<string>("");
  const [bookingImage, setBookingImage] = useState<string>("");
  const [selectedServices, setSelectedServices] = useState<{ name: string; price: number; category?: string }[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>( "");
  const [availableSpotsForSlot, setAvailableSpotsForSlot] = useState<number>(5);
  const [existingCountA, setExistingCountA] = useState<number>(0);
  const [existingCountB, setExistingCountB] = useState<number>(0);
  const [slotCapacity, setSlotCapacity] = useState<number>(5);
  const [debugStatus, setDebugStatus] = useState<string>("Initializing...");

  // New customized states
  const [dbMainServices, setDbMainServices] = useState<any[]>(MAIN_SERVICES);
  const [selectedMainServices, setSelectedMainServices] = useState<any[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [coupon, setCoupon] = useState("");
  const [isOtherPeople, setIsOtherPeople] = useState(false);
  const [otherPeopleVal, setOtherPeopleVal] = useState("5");
  const [orderedServices, setOrderedServices] = useState<any[]>(MAIN_SERVICES);

  const [isSameService, setIsSameService] = useState<boolean>(true);
  const [personServices, setPersonServices] = useState<Record<number, { name: string; price: number; category?: string }[]>>({});
  const [activePersonTab, setActivePersonTab] = useState<number>(2);
  const [appointmentType, setAppointmentType] = useState<"salon" | "home">("salon");

  const nudge = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.5), behavior: "smooth" });
  };

  const items = useMemo(
    () =>
      filter === "All"
        ? SERVICES_FLAT
        : SERVICES_FLAT.filter((s) => s.category === filter),
    [filter]
  );

  const loop = [...items, ...items];

  const openBookingPanel = (category: string, image: string, serviceName?: string) => {
    setBookingCategory(category);
    setBookingScope(category);
    setBookingImage(image);
    setSelectedServices([]);
    setSelectedMainServices([]);
    setSelectedStylist("");
    setSelectedDate("");
    setSelectedTime("");
    setPeopleCount(1);
    setIsOtherPeople(false);
    setOtherPeopleVal("5");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCoupon("");
    setIsSameService(true);
    setPersonServices({});
    setActivePersonTab(2);
    setAppointmentType("salon");

    // Determine the clicked main service ID
    let matchId = "";
    const nameUpper = (serviceName || "").toUpperCase();
    const catUpper = (category || "").toUpperCase();

    if (catUpper === "NAILS" || nameUpper.includes("NAIL") || nameUpper.includes("MANICURE") || nameUpper.includes("PEDICURE")) {
      matchId = "nails";
    } else if (nameUpper.includes("FRENCH CURLS")) {
      matchId = "boho-french-curls";
    } else if (nameUpper.includes("FULANI")) {
      matchId = "fulani-twist-braid";
    } else if (nameUpper.includes("BOHO") || nameUpper.includes("STITCH") || nameUpper.includes("GODDESS")) {
      matchId = "boho-stitch-braids";
    } else if (nameUpper.includes("BOX BRAIDS") || (nameUpper.includes("BOX") && nameUpper.includes("BRAID"))) {
      matchId = "box-braids";
    } else if (nameUpper.includes("KNOTLESS")) {
      matchId = "knotless-braids";
    } else if (nameUpper.includes("DREADLOCK")) {
      matchId = "dreadlocks";
    } else if (nameUpper.includes("WIG") || nameUpper.includes("REVAMP") || nameUpper.includes("HAIR EXTENSION") || nameUpper.includes("REVAMPERING") || nameUpper.includes("WEAVE") || nameUpper.includes("SEW-IN")) {
      matchId = "wigs-extensions";
    } else if (nameUpper.includes("CORNROW") || nameUpper.includes("BRAID")) {
      // Check if it specifically matches Box Braids or Knotless Braids
      if (nameUpper.includes("BOX")) {
        matchId = "box-braids";
      } else if (nameUpper.includes("KNOTLESS")) {
        matchId = "knotless-braids";
      } else {
        matchId = "extension-cornrows";
      }
    } else if (nameUpper.includes("CROCHET")) {
      matchId = "crochet";
    } else if (nameUpper.includes("EYE LASH") || nameUpper.includes("EYELASH")) {
      matchId = "eyelash";
    } else if (nameUpper.includes("BLOW DRY") || nameUpper.includes("IRON")) {
      matchId = "blow-dry";
    } else if (nameUpper.includes("COLOR") || nameUpper.includes("BALAYAGE")) {
      matchId = "color";
    } else if (nameUpper.includes("STYLING") || nameUpper.includes("PONYTAIL")) {
      matchId = "styling";
    } else if (catUpper === "SKIN" || nameUpper.includes("FACIAL") || nameUpper.includes("SKIN")) {
      matchId = "skin";
    } else {
      matchId = "treatment";
    }

    const matched = dbMainServices.find(s => s.id === matchId);
    const others = dbMainServices.filter(s => s.id !== matchId);
    const ordered = matched ? [matched, ...others] : dbMainServices;

    setSelectedMainServices(matched ? [matched] : []);
    setOrderedServices(ordered);
    setBookingStep(1);
    setBookingOpen(true);
    window.history.pushState({ bookingOpen: true }, "", "/booking");
  };

  const openGenericBookingPanel = () => {
    setBookingCategory("All Services");
    setBookingScope("All");
    setBookingImage(SERVICES_FLAT[0]?.image ?? "");
    setSelectedServices([]);
    setSelectedMainServices([]);
    setSelectedStylist("");
    setSelectedDate("");
    setSelectedTime("");
    setPeopleCount(1);
    setIsOtherPeople(false);
    setOtherPeopleVal("5");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCoupon("");
    setIsSameService(true);
    setPersonServices({});
    setActivePersonTab(2);
    setAppointmentType("salon");
    setOrderedServices(dbMainServices);
    setBookingStep(1);
    setBookingOpen(true);
    window.history.pushState({ bookingOpen: true }, "", "/booking");
  };

  const closeBookingPanel = () => {
    setBookingOpen(false);
    setBookingStep(1);
    // Restore URL back to home
    if (window.location.pathname === "/booking") {
      window.history.replaceState(null, "", "/");
    }
  };

  const bookingItems = useMemo(() => {
    const scoped =
      bookingScope === "All"
        ? SERVICES_FLAT
        : SERVICES_FLAT.filter((s) => s.category === bookingScope);
    const uniq = Array.from(new Map(scoped.map((s) => [s.name, s])).values());
    return uniq;
  }, [bookingScope]);

  useEffect(() => {
    async function syncServices() {
      try {
        const { data, error } = await supabase
          .from("service_variants")
          .select(`
            id,
            name,
            price,
            price_varies,
            duration_minutes,
            services (
              name,
              active,
              categories (
                name
              )
            )
          `);

        if (error) {
          console.error("Supabase error fetching service_variants:", error);
          setDebugStatus(`Error: ${error.message || JSON.stringify(error)}`);
          return;
        }
        if (!data) {
          console.error("No data returned for service_variants");
          setDebugStatus("Error: No data returned");
          return;
        }
        const updated = MAIN_SERVICES.map(main => {
          const updatedSubservices = main.subservices.map(sub => {
            const match = data.find(v => {
              const sName = v.services?.name?.toLowerCase().trim() || "";
              const vName = v.name?.toLowerCase().trim() || "";
              const uiName = sub.name.toLowerCase().trim();
              const isMatch = uiName === vName || uiName === sName || uiName === `${sName} - ${vName}` || (uiName.includes(sName) && (vName === "standard" || vName === "classic" || vName === "per nail"));
              if (isMatch) {
                console.log(`Matched subservice "${sub.name}" with db variant "${v.name}" (price_varies: ${v.price_varies})`);
              }
              return isMatch;
            });

            if (match) {
              return {
                ...sub,
                price: match.price_varies ? 0 : (match.price ? parseFloat(match.price) : 0),
                duration: match.duration_minutes || 60
              };
            }
            return sub;
          });

          return {
            ...main,
            subservices: updatedSubservices
          };
        });

        const crochetPrice = updated.find(s => s.id === "crochet")?.subservices.find(sub => sub.name === "Twist Crochet")?.price;
        setDebugStatus(`Loaded ${data.length} variants. Twist Crochet price: ${crochetPrice}`);
        console.log("Fetched service variants successfully:", data);

        console.log("Updated dbMainServices mapped result:", updated);
        setDbMainServices(updated);
        setOrderedServices(updated);
      } catch (err) {
        console.error("Error syncing services from DB:", err);
      }
    }
    syncServices();
  }, []);

  useEffect(() => {
    setSelectedMainServices(prev => {
      return prev.map(p => {
        const fresh = dbMainServices.find(s => s.id === p.id);
        return fresh || p;
      });
    });
    setOrderedServices(prev => {
      return prev.map(p => {
        const fresh = dbMainServices.find(s => s.id === p.id);
        return fresh || p;
      });
    });
  }, [dbMainServices]);

  useEffect(() => {
    const handleOpenBooking = () => {
      openGenericBookingPanel();
    };
    window.addEventListener("open-booking-flow", handleOpenBooking);

    // Close popup when user presses browser back button
    const handlePopState = () => {
      if (window.location.pathname !== "/booking") {
        setBookingOpen(false);
        setBookingStep(1);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("open-booking-flow", handleOpenBooking);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    let timeoutId: number | undefined;

    const typeTitle = (index: number) => {
      if (index <= servicesTitle.length) {
        setTypedServicesTitle(servicesTitle.slice(0, index));
        timeoutId = window.setTimeout(() => typeTitle(index + 1), 90);
      }
    };

    typeTitle(1);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const getRandomPrice = (serviceName: string) => {
    let seed = 0;
    for (let i = 0; i < serviceName.length; i += 1) seed += serviceName.charCodeAt(i);
    const value = 180 + ((seed * 37) % 521);
    return `${value} AED`;
  };

  const stylists = [
    { name: "Sofia Martinez", role: "Senior Stylist", avatar: "SM" },
    { name: "Marco Rossi", role: "Color Specialist", avatar: "MR" },
    { name: "Aisha Khan", role: "Makeup Artist", avatar: "AK" },
    { name: "Nina Chen", role: "Nail Artist", avatar: "NC" },
  ];

  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [dateMap, setDateMap] = useState<Record<string, Date>>({});

  // Dynamic Date List Setup
  useEffect(() => {
    const tempDates: string[] = [];
    const tempMap: Record<string, Date> = {};
    for (let i = 0; i < 7; i++) {
      const d = addDays(new Date(), i);
      const label = format(d, "dd MMM");
      tempDates.push(label);
      tempMap[label] = d;
    }
    setAvailableDates(tempDates);
    setDateMap(tempMap);
    if (tempDates.length > 0) {
      setSelectedDate(tempDates[0]);
    }
  }, []);

  // Dynamic Time List calculation based on booking capacities
  useEffect(() => {
    if (!selectedDate || !dateMap[selectedDate]) return;

    async function calculateSlots() {
      try {
        const dateObj = dateMap[selectedDate];
        const dateStr = format(dateObj, "yyyy-MM-dd");
        const todayStr = format(new Date(), "yyyy-MM-dd");
        const isToday = dateStr === todayStr;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const nextHour = currentMinutes > 0 ? currentHour + 1 : currentHour;
        const minHourForToday = nextHour + 1;

        let opening = "09:00:00";
        let closing = "23:30:00";
        let interval = 60;
        let defaultCapacity = 5;

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

        const slots: string[] = [];
        let current = parse(opening, "HH:mm:ss", new Date());
        const end = parse(closing, "HH:mm:ss", new Date());

        while (current <= end) {
          slots.push(format(current, "HH:mm"));
          current = new Date(current.getTime() + interval * 60 * 1000);
        }

        const isProspectiveGroupB = selectedServices.some((s: any) => {
          const cat = (s.category || "Hair").toLowerCase();
          const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
          return !isGroupA;
        });

        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("booking_time, status, category_name, people_count")
          .eq("booking_date", dateStr)
          .neq("status", "Cancelled");

        const { data: blockedData } = await supabase
          .from("blocked_slots")
          .select("*")
          .filter("start_date", "lte", dateStr)
          .filter("end_date", "gte", dateStr);

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

          if (blockedData) {
            for (const block of blockedData) {
              if (block.block_type === "full_day") {
                isBlocked = true;
                break;
              }
              const blockStart = block.start_time;
              const blockEnd = block.end_time;
              if (blockStart && blockEnd) {
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

          // Count existing active bookings for Group A vs Group B
          const slotBookings = bookingsData
            ? bookingsData.filter((b) => b.booking_time === slotTimeStr)
            : [];
          
          let countA = 0;
          let countB = 0;
          for (const b of slotBookings) {
            const cat = (b.category_name || "Hair").toLowerCase();
            const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
            const pCount = b.people_count || 1;
            if (isGroupA) {
              countA += pCount;
            } else {
              countB += pCount;
            }
          }

          let nextCountA = countA;
          let nextCountB = countB;
          if (isProspectiveGroupB) {
            nextCountB += peopleCount;
          } else {
            nextCountA += peopleCount;
          }

          if (nextCountB <= 2 && (nextCountA + nextCountB) <= currentCapacity) {
            const parsedTime = parse(slot, "HH:mm", new Date());
            computedAvailable.push(format(parsedTime, "h:mm a").toUpperCase());
          }
        }
        setAvailableTimes(computedAvailable);
      } catch (err) {
        const fallback = [
          "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
        ];
        const dateObj = dateMap[selectedDate];
        const dateStr = dateObj ? format(dateObj, "yyyy-MM-dd") : "";
        const todayStr = format(new Date(), "yyyy-MM-dd");
        if (dateStr === todayStr) {
          const now = new Date();
          const currentHour = now.getHours();
          const currentMinutes = now.getMinutes();
          const nextHour = currentMinutes > 0 ? currentHour + 1 : currentHour;
          const minHourForToday = nextHour + 1;

          const filteredFallback = fallback.filter(t => {
            const parsed = parse(t, "h:mm a", new Date());
            return parsed.getHours() >= minHourForToday;
          });
          setAvailableTimes(filteredFallback);
        } else {
          setAvailableTimes(fallback);
        }
      }
    }

    calculateSlots();
  }, [selectedDate, dateMap]);

  useEffect(() => {
    if (!selectedDate || !dateMap[selectedDate] || !selectedTime) return;

    async function fetchAvailableSpots() {
      try {
        const dateObj = dateMap[selectedDate];
        const dateStr = format(dateObj, "yyyy-MM-dd");

        let parsedTime;
        try {
          parsedTime = parse(selectedTime, "h:mm a", new Date());
          if (isNaN(parsedTime.getTime())) {
            parsedTime = parse(selectedTime, "hh:mm a", new Date());
          }
        } catch (e) {
          parsedTime = parse(selectedTime, "hh:mm a", new Date());
        }
        const time24Str = format(parsedTime, "HH:mm:ss");

        let defaultCapacity = 5;
        const { data: rulesData } = await supabase
          .from("availability_rules")
          .select("*")
          .limit(1)
          .maybeSingle();

        if (rulesData) {
          defaultCapacity = rulesData.default_max_capacity;
        }

        const { data: bookingsData } = await supabase
          .from("bookings")
          .select("booking_time, status, category_name, people_count")
          .eq("booking_date", dateStr)
          .eq("booking_time", time24Str)
          .neq("status", "Cancelled");

        const { data: blockedData } = await supabase
          .from("blocked_slots")
          .select("*")
          .filter("start_date", "lte", dateStr)
          .filter("end_date", "gte", dateStr);

        let currentCapacity = defaultCapacity;
        let isBlocked = false;

        if (blockedData) {
          for (const block of blockedData) {
            if (block.block_type === "full_day") {
              isBlocked = true;
              break;
            }
            const blockStart = block.start_time;
            const blockEnd = block.end_time;
            if (blockStart && blockEnd) {
              if (time24Str >= blockStart && time24Str <= blockEnd) {
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

        if (isBlocked) {
          setAvailableSpotsForSlot(0);
          return;
        }

        // Count existing active bookings for Group A vs Group B
        let countA = 0;
        let countB = 0;
        if (bookingsData) {
          for (const b of bookingsData) {
            const cat = (b.category_name || "Hair").toLowerCase();
            const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
            const pCount = b.people_count || 1;
            if (isGroupA) {
              countA += pCount;
            } else {
              countB += pCount;
            }
          }
        }

        setExistingCountA(countA);
        setExistingCountB(countB);
        setSlotCapacity(currentCapacity);

        const isProspectiveGroupB = selectedServices.some((s: any) => {
          const cat = (s.category || "Hair").toLowerCase();
          const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
          return !isGroupA;
        });

        if (isProspectiveGroupB) {
          // Nails/Lashes (Group B) limit is 2
          const spotsB = 2 - countB;
          const totalSpots = currentCapacity - (countA + countB);
          const available = Math.max(0, Math.min(spotsB, totalSpots));
          setAvailableSpotsForSlot(available);
        } else {
          // Hair (Group A) limit is 5
          const spotsA = 5 - countA;
          const totalSpots = currentCapacity - (countA + countB);
          const available = Math.max(0, Math.min(spotsA, totalSpots));
          setAvailableSpotsForSlot(available);
        }
      } catch (err) {
        console.error("Error fetching available spots:", err);
        setAvailableSpotsForSlot(5);
      }
    }

    fetchAvailableSpots();
  }, [selectedDate, selectedTime, selectedServices, bookingStep]);

  const prospectiveCounts = useMemo(() => {
    let reqA = 0;
    let reqB = 0;

    // Person 1
    const p1GroupB = selectedServices.some((s: any) => {
      const cat = (s.category || "Hair").toLowerCase();
      const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
      return !isGroupA;
    });
    if (p1GroupB) reqB++; else reqA++;

    // Person 2 to N
    for (let i = 2; i <= peopleCount; i++) {
      const services = personServices[i] || [];
      if (services.length > 0) {
        const hasGroupB = services.some((s: any) => {
          const cat = (s.category || "Hair").toLowerCase();
          const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
          return !isGroupA;
        });
        if (hasGroupB) reqB++; else reqA++;
      }
    }

    return { reqA, reqB };
  }, [selectedServices, personServices, peopleCount]);

  const isCustomConfigInvalid = useMemo(() => {
    if (isSameService) return false;
    const { reqA, reqB } = prospectiveCounts;
    
    // Check if configuration is complete (all people have at least 1 service)
    const incomplete = Array.from({ length: peopleCount - 1 }).some((_, idx) => {
      const pId = idx + 2;
      return !personServices[pId] || personServices[pId].length === 0;
    });
    if (incomplete) return false;

    if (existingCountB + reqB > 2) return true;
    if (existingCountA + reqA > 5) return true;
    if ((existingCountA + reqA) + (existingCountB + reqB) > slotCapacity) return true;

    return false;
  }, [isSameService, prospectiveCounts, existingCountA, existingCountB, slotCapacity, peopleCount, personServices]);

  const sameServiceWarning = useMemo(() => {
    if (!isSameService || peopleCount <= availableSpotsForSlot) return null;

    return (
      <div className="mt-4 p-4 bg-pink-100 border border-pink-400 text-pink-700 rounded-md">
        <p className="font-bold text-sm text-pink-800">
          The same time spot for this service is not available for {peopleCount} people.
        </p>
        <p className="text-xs text-pink-705 mt-1 font-semibold">
          Only <span className="font-bold text-[#9F3F5C] text-sm">{availableSpotsForSlot}</span> spot(s) are available for this service category at {selectedTime}.
        </p>
        <p className="text-xs text-pink-705 mt-1">
          Please select "No, select different" to choose different services for some clients, or choose a different time slot.
        </p>
      </div>
    );
  }, [isSameService, peopleCount, availableSpotsForSlot, selectedTime]);

  const customConfigWarning = useMemo(() => {
    if (!isCustomConfigInvalid) return null;
    const { reqA, reqB } = prospectiveCounts;

    const availA = Math.max(0, Math.min(5 - existingCountA, slotCapacity - (existingCountA + existingCountB)));
    const availB = Math.max(0, Math.min(2 - existingCountB, slotCapacity - (existingCountA + existingCountB)));

    return (
      <div className="mt-4 p-4 bg-pink-100 border border-pink-400 text-pink-700 rounded-md">
        <p className="font-bold text-sm text-pink-800">
          The selected services configuration exceeds the slot capacity.
        </p>
        <p className="text-xs text-pink-700 mt-1 font-semibold">
          For this time slot:
          {availA < reqA && (
            <span className="block mt-1">• Hair services: requested {reqA}, but only {availA} spot(s) are available.</span>
          )}
          {availB < reqB && (
            <span className="block mt-1">• Nails/Lashes services: requested {reqB}, but only {availB} spot(s) are available.</span>
          )}
        </p>
        <p className="text-xs text-pink-700 mt-2">
          Please adjust the services for some clients so they fit the available spots, or choose another time slot.
        </p>
      </div>
    );
  }, [isCustomConfigInvalid, prospectiveCounts, existingCountA, existingCountB, slotCapacity]);

  const selectedPrice = selectedServices.length > 0 ? getRandomPrice(selectedServices[0].name) : "";
  const isVideoFile = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src);


  useEffect(() => {
    const root = scrollRef.current ?? document;
    const videos: HTMLVideoElement[] = Array.from(
      (root as Element).querySelectorAll?.("video[data-autoplay]") || []
    );

    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (el.paused) {
              const playPromise = el.play();
              if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => { });
            }
          } else {
            if (!el.paused) el.pause();
          }
        });
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );

    videos.forEach((v) => {
      v.pause();
      observer.observe(v);
    });

    return () => {
      observer.disconnect();
    };
  }, [filter, loop]);

  const [bookingLoading, setBookingLoading] = useState(false);

  const sendWhatsAppConfirmation = async (params: {
    customerName: string;
    phoneNumber: string;
    servicesList: string;
    dateStr: string;
    timeStr: string;
    peopleCount: number;
  }) => {
    const token = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN || "";
    const phoneId = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID || "";
    if (!token || !phoneId) {
      console.warn("WhatsApp API token or Phone Number ID not configured in environment variables.");
      return;
    }

    const messageText = `✅ Booking Confirmed!
Hi ${params.customerName}!
Services: ${params.servicesList}
Date: ${params.dateStr}
Time: ${params.timeStr}
People: ${params.peopleCount}
Thank you for choosing Ultimate Blend Ladies Beauty Salon Dubai 💇‍♀️`;

    let formattedPhone = params.phoneNumber.replace(/[^0-9]/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "971" + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith("971") && formattedPhone.length === 9) {
      formattedPhone = "971" + formattedPhone;
    }

    try {
      const res = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: formattedPhone,
          type: "text",
          text: {
            body: messageText
          }
        })
      });
      const resData = await res.json();
      if (!res.ok) {
        console.error("Meta WhatsApp Cloud API error response:", resData);
      } else {
        console.log("WhatsApp confirmation sent successfully:", resData);
      }
    } catch (err) {
      console.error("Error calling Meta WhatsApp Cloud API:", err);
    }
  };

  const handleCreateBooking = async () => {
    setBookingLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      let customerId = "";

      const { data: existingCust } = await supabase
        .from("customers")
        .select("id")
        .eq("phone", phoneNumber)
        .maybeSingle();

      if (existingCust) {
        customerId = existingCust.id;
      } else {
        const { data: newCust, error: createErr } = await supabase
          .from("customers")
          .insert({ name: fullName, phone: phoneNumber, email: null })
          .select("id")
          .single();
        if (createErr) throw createErr;
        if (newCust) customerId = newCust.id;
      }

      const dateObj = dateMap[selectedDate] || new Date();
      const dateStr = format(dateObj, "yyyy-MM-dd");

      const parsedTime = parse(selectedTime, "hh:mm a", new Date());
      const time24Str = format(parsedTime, "HH:mm:ss");

      // Load all variants to perform robust matching
      const { data: dbVariants } = await supabase
        .from("service_variants")
        .select(`
          id,
          name,
          price,
          price_varies,
          duration_minutes,
          services (
            name,
            categories (
              name
            )
          )
        `);

      const matchVariant = (uiNameRaw: string, categoryRaw?: string) => {
        if (!dbVariants || dbVariants.length === 0) return null;
        const uiName = uiNameRaw.toLowerCase().trim();
        const category = categoryRaw?.toLowerCase().trim() || "";

        // Filter variants that match the category (if category is provided)
        const categoryVariants = dbVariants.filter((v: any) => {
          if (!category) return true;
          const vCat = v.services?.categories?.name?.toLowerCase().trim() || "";
          return vCat === category || vCat.includes(category) || category.includes(vCat);
        });

        const pool = categoryVariants.length > 0 ? categoryVariants : dbVariants;

        let bestMatch = pool.find((v: any) => {
          const sName = v.services?.name?.toLowerCase().trim() || "";
          const vName = v.name?.toLowerCase().trim() || "";
          return uiName === sName && (vName === "standard" || vName === "classic" || vName === "per nail");
        });
        if (bestMatch) return bestMatch;

        bestMatch = pool.find((v: any) => {
          const sName = v.services?.name?.toLowerCase().trim() || "";
          return uiName === sName;
        });
        if (bestMatch) return bestMatch;

        bestMatch = pool.find((v: any) => {
          const sName = v.services?.name?.toLowerCase().trim() || "";
          const vName = v.name?.toLowerCase().trim() || "";
          const normUi = uiName.replace(/[^a-z0-9]/g, "");
          const normS = sName.replace(/[^a-z0-9]/g, "");
          const normV = vName.replace(/[^a-z0-9]/g, "");
          if (normUi.includes(normS) && normUi.includes(normV)) return true;
          return false;
        });
        if (bestMatch) return bestMatch;

        bestMatch = pool.find((v: any) => {
          const sName = v.services?.name?.toLowerCase().trim() || "";
          const normUi = uiName.replace(/[^a-z0-9]/g, "");
          const normS = sName.replace(/[^a-z0-9]/g, "");
          return normUi.includes(normS) || normS.includes(normUi);
        });
        if (bestMatch) return bestMatch;

        const defaultVar = pool.find((v: any) => {
          const vName = v.name?.toLowerCase().trim() || "";
          return vName === "standard" || vName === "classic" || vName === "per nail";
        });
        if (defaultVar) return defaultVar;

        return pool[0] || dbVariants[0];
      };

      const allServicesBooked: string[] = [];
      for (let pIndex = 0; pIndex < peopleCount; pIndex++) {
        // Resolve services for this person
        const currentPersonServices = pIndex === 0 
          ? selectedServices 
          : (isSameService ? selectedServices : (personServices[pIndex + 1] && personServices[pIndex + 1].length > 0 ? personServices[pIndex + 1] : selectedServices));

        currentPersonServices.forEach(s => {
          if (!allServicesBooked.includes(s.name)) {
            allServicesBooked.push(s.name);
          }
        });

        const matchedItems = currentPersonServices.map(s => {
          const mv = matchVariant(s.name, s.category);
          return {
            uiService: s,
            variant: mv
          };
        });

        // Prepare main booking fields based on the first matched item
        const firstMatched = matchedItems[0];
        const categoryName = firstMatched?.variant?.services?.categories?.name || null;
        const serviceName = firstMatched?.variant?.services?.name || firstMatched?.uiService?.name || null;
        const variantName = firstMatched?.variant?.name || null;
        const variantId = firstMatched?.variant?.id || null;

        let totalDuration = 0;
        matchedItems.forEach(item => {
          totalDuration += item.variant?.duration_minutes || 60;
        });
        if (totalDuration === 0) {
          totalDuration = 60;
        }

        const servicesList = currentPersonServices.map(s => s.name).join(", ");
        const notesContent = [
          `Booked Services: ${servicesList}`,
          coupon ? `Coupon: ${coupon}` : null
        ].filter(Boolean).join(" | ");

        // Determine if this booking is Group B (Nails/Lashes/etc.)
        const isProspectiveGroupB = currentPersonServices.some((s: any) => {
          const cat = (s.category || "Hair").toLowerCase();
          const isGroupA = cat.includes("hair") || cat.includes("braid") || cat.includes("wig") || cat.includes("treatment");
          return !isGroupA;
        });
        // Query active bookings at the selected slot to find occupied staff indexes
        const { data: existingSlotBookings } = await supabase
          .from("bookings")
          .select("calendar_index")
          .eq("booking_date", dateStr)
          .eq("booking_time", time24Str)
          .neq("status", "Cancelled");

        const occupiedIndexes = existingSlotBookings ? existingSlotBookings.map(b => b.calendar_index || 1) : [];

        let assignedStaff = 1;
        if (isProspectiveGroupB) {
          if (!occupiedIndexes.includes(1)) {
            assignedStaff = 1;
          } else if (!occupiedIndexes.includes(2)) {
            assignedStaff = 2;
          } else {
            assignedStaff = 1;
          }
        } else {
          if (!occupiedIndexes.includes(3)) {
            assignedStaff = 3;
          } else if (!occupiedIndexes.includes(4)) {
            assignedStaff = 4;
          } else if (!occupiedIndexes.includes(5)) {
            assignedStaff = 5;
          } else if (!occupiedIndexes.includes(1)) {
            assignedStaff = 1;
          } else if (!occupiedIndexes.includes(2)) {
            assignedStaff = 2;
          } else {
            assignedStaff = 3;
          }
        }

        // Insert parent booking
        const suffix = peopleCount > 1 ? ` (Person ${pIndex + 1})` : "";
        const { data: newBooking, error: bookingErr } = await supabase
          .from("bookings")
          .insert({
            customer_id: customerId,
            booking_date: dateStr,
            booking_time: time24Str,
            duration_minutes: totalDuration,
            status: "Confirmed",
            customer_name: `${fullName}${suffix}`,
            customer_phone: phoneNumber,
            notes: notesContent || null,
            coupon: coupon || null,
            people_count: 1,
            category_name: categoryName,
            service_name: serviceName,
            variant_name: variantName,
            variant_id: variantId,
            calendar_index: assignedStaff
          })
          .select("id")
          .single();

        if (bookingErr) throw bookingErr;

        const bookingId = newBooking.id;

        // Insert booking items
        if (bookingId && matchedItems.length > 0) {
          const itemsToInsert = matchedItems.map(item => ({
            booking_id: bookingId,
            category_name: item.variant?.services?.categories?.name || "Hair",
            service_name: item.variant?.services?.name || item.uiService.name,
            variant_name: item.variant?.name || "Standard",
            variant_id: item.variant?.id || null,
            duration_minutes: item.variant?.duration_minutes || 60,
            price: item.variant?.price || item.uiService.price || 0,
            price_varies: item.variant?.price_varies || false
          }));

          const { error: itemsErr } = await supabase
            .from("booking_items")
            .insert(itemsToInsert);

          if (itemsErr) {
            console.error("Error inserting booking items:", itemsErr);
          }
        }
      }

      const servicesList = allServicesBooked.join(", ") || "Salon Services";

      // Send Meta WhatsApp confirmation
      await sendWhatsAppConfirmation({
        customerName: fullName,
        phoneNumber: phoneNumber,
        servicesList: servicesList,
        dateStr: format(dateObj, "dd-MM-yyyy"),
        timeStr: selectedTime,
        peopleCount: peopleCount
      });

      // Redirect to confirm page
      navigate("/booking/confirm", {
        state: {
          booking: newBooking || { id: "fallback" },
          customerName: fullName,
          serviceName: servicesList,
          dateStr: format(dateObj, "dd MMM yyyy"),
          timeStr: selectedTime,
          phone: phoneNumber
        }
      });

    } catch (err) {
      console.error("Booking db error: ", err);
      // Fallback redirection
      const dummyId = Math.random().toString(36).substring(7);
      const servicesList = allServicesBooked.join(", ") || "Salon Services";
      navigate("/booking/confirm", {
        state: {
          booking: { id: dummyId, customer_name: fullName, customer_phone: phoneNumber },
          customerName: fullName,
          serviceName: servicesList,
          dateStr: format(dateObj, "dd MMM yyyy"),
          timeStr: selectedTime,
          phone: phoneNumber
        }
      });
    } finally {
      setBookingLoading(false);
      setBookingOpen(false);
    }
  };

  const handlePrevStep = () => {
    if (bookingStep === 5) {
      if (peopleCount > 1) {
        setBookingStep(4.5);
      } else {
        setBookingStep(4);
      }
    } else if (bookingStep === 4.5) {
      setBookingStep(4);
    } else {
      setBookingStep((s) => s - 1);
    }
  };

  const handleNextStep = async () => {
    if (bookingStep === 4) {
      if (peopleCount > 1) {
        setBookingStep(4.5);
      } else {
        setBookingStep(5);
      }
    } else if (bookingStep === 4.5) {
      setBookingStep(5);
    } else if (bookingStep === 6) {
      await handleCreateBooking();
    } else {
      setBookingStep((s) => s + 1);
    }
  };

  const getBookingTotal = () => {
    let total = 0;
    let hasPriceVaries = false;

    // Person 1
    selectedServices.forEach(s => {
      if (s.price === 0) hasPriceVaries = true;
      total += s.price;
    });

    // Person 2 to N
    for (let i = 2; i <= peopleCount; i++) {
      const services = isSameService ? selectedServices : (personServices[i] && personServices[i].length > 0 ? personServices[i] : selectedServices);
      services.forEach(s => {
        if (s.price === 0) hasPriceVaries = true;
        total += s.price;
      });
    }

    return { total, hasPriceVaries };
  };

  const getBookingTotalText = () => {
    const { total, hasPriceVaries } = getBookingTotal();
    
    if (!hasPriceVaries) {
      return `AED ${total}`;
    }
    
    const priceVariesServices = new Set<string>();
    
    selectedServices.forEach(s => {
      if (s.price === 0) {
        priceVariesServices.add(s.name);
      }
    });
    
    for (let i = 2; i <= peopleCount; i++) {
      const services = isSameService ? selectedServices : (personServices[i] && personServices[i].length > 0 ? personServices[i] : selectedServices);
      services.forEach(s => {
        if (s.price === 0) {
          priceVariesServices.add(s.name);
        }
      });
    }
    
    const serviceNames = Array.from(priceVariesServices).map(name => {
      const lower = name.toLowerCase();
      if (lower.includes("boho")) {
        return "Boho";
      }
      if (lower.includes("box braid")) {
        return "Box Braid";
      }
      return name;
    });

    if (total === 0) {
      return "Price Varies";
    }

    if (serviceNames.length > 0) {
      return `AED ${total} + ${serviceNames.join(" & ")}`;
    }
    
    return `AED ${total} + Price Varies`;
  };

  return (
    <>
      <section id="services" className="bg-lavender py-20 md:py-28">
        <div className="px-6 md:px-16 mb-10 md:mb-14">
          <div>
            {/* Services heading */}
            <h2 className="relative inline-block">
              <span className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-tight normal-case">
                {typedServicesTitle}
                {typedServicesTitle.length < servicesTitle.length ? (
                  <span className="inline-block w-[0.08em] h-[0.95em] ml-[0.08em] bg-[#9F3F5C] align-[-0.08em] animate-pulse" />
                ) : null}
              </span>
            </h2>

            {/* Filter chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {SERVICE_FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`font-display text-xs px-4 min-h-10 border transition-colors ${active
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-foreground/20 hover:border-foreground"
                      }`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Auto-scrolling marquee + manual horizontal scroll */}
        <div className="group relative">
          <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar"
          >
            <div
              key={filter}
              className="flex gap-5 w-max animate-marquee group-hover:[animation-play-state:paused] pl-6 md:pl-16 pr-6 md:pr-16"
            >
              {loop.map((item, idx) => (
                <article
                  key={`${item.category}-${item.name}-${idx}`}
                  className="shrink-0 w-[82vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28vw] aspect-[4/5] relative overflow-hidden cursor-pointer bg-neutral-900"
                >
                  {isVideoFile(item.image) ? (
                    <video
                      src={item.image}
                      data-autoplay
                      preload="metadata"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={`[PHOTO ${item.name}]`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-8">
                    <p className="font-display normal-case tracking-normal font-bold text-sm md:text-lg leading-snug text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.9)] mb-3">
                      {item.name}
                    </p>
                    <div>
                      <button
                        onClick={() => openBookingPanel(item.category, item.image, item.name)}
                        className="px-5 py-2.5 bg-[#9F3F5C] text-white text-[11px] md:text-xs font-display font-semibold hover:bg-[#8E3852] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F3F5C] focus-visible:ring-offset-2"
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Manual prev/next arrows */}
          <button
            onClick={() => nudge(-1)}
            aria-label="Scroll services left"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background border border-foreground/20 text-foreground items-center justify-center backdrop-blur transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Scroll services right"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background border border-foreground/20 text-foreground items-center justify-center backdrop-blur transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {bookingOpen && (
        <div className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm p-0 md:p-6 h-[100dvh] overflow-y-auto">
          <div className="bg-[#e4cad6] w-full min-h-[100dvh] md:h-[88vh] md:max-w-6xl mx-auto grid md:grid-cols-2 md:overflow-hidden">
            <div className="hidden md:block relative min-h-[26dvh] md:min-h-full">
              <img
                src="/booking slot background.jpeg"
                alt="Booking Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="bg-[#e5cad8] p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:p-8 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-display text-xl md:text-2xl text-foreground normal-case flex items-center gap-2">
                  {bookingStep === 6 && (
                    <button
                      onClick={handlePrevStep}
                      className="mr-1 p-1 hover:bg-black/10 rounded"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground inline" />
                    </button>
                  )}
                  {bookingStep === 1 && "Select Service"}
                  {bookingStep === 2 && (selectedMainServices.length === 1 ? selectedMainServices[0].name : "Select Subservices")}
                  {bookingStep === 3 && "Select Date & Time"}
                  {bookingStep === 4 && "How Many People"}
                  {bookingStep === 4.5 && "Service Assignment per Person"}
                  {bookingStep === 5 && "User Details"}
                  {bookingStep === 6 && "Payments"}
                  {bookingStep === 7 && "Booking Confirmed"}
                </h3>
                <div className="flex items-center gap-3">
                  <img
                    src="/ULTIMATE_LOGO-removebg-preview.png"
                    alt="Logo"
                    className="w-12 h-12 object-contain"
                  />
                  <button
                    onClick={closeBookingPanel}
                    className="w-10 h-10 flex items-center justify-center bg-[#c894ab] text-white hover:opacity-90"
                    aria-label="Close booking panel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {bookingStep === 1 && (
                <div className="flex-1 flex flex-col min-h-0">
                  {/* Appointment Type Choices */}
                  <div className="mb-4 px-1 space-y-2">
                    <button
                      onClick={() => setAppointmentType("salon")}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 border transition-all text-sm font-semibold rounded-lg ${
                        appointmentType === "salon"
                          ? "border-[#9F3F5C] bg-[#9F3F5C]/5 text-[#9F3F5C]"
                          : "border-foreground/10 bg-white/40 hover:bg-white/60 text-foreground/80"
                      }`}
                    >
                      <span className="text-base font-bold select-none leading-none">
                        {appointmentType === "salon" ? "●" : "○"}
                      </span>
                      Salon Appointment
                    </button>
                    <button
                      onClick={() => setAppointmentType("home")}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 border transition-all text-sm font-semibold rounded-lg ${
                        appointmentType === "home"
                          ? "border-[#9F3F5C] bg-[#9F3F5C]/5 text-[#9F3F5C]"
                          : "border-foreground/10 bg-white/40 hover:bg-white/60 text-foreground/80"
                      }`}
                    >
                      <span className="text-base font-bold select-none leading-none">
                        {appointmentType === "home" ? "●" : "○"}
                      </span>
                      Home Service Appointment
                    </button>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] gap-4 font-display text-xs text-foreground/70 mb-2 px-1">
                    <p>Main Services</p>
                  </div>

                  <div className="overflow-y-auto pr-1 md:pr-2 space-y-2 flex-1 min-h-0">
                    {orderedServices.map((svc) => {
                      const active = selectedMainServices.some(s => s.id === svc.id);
                      return (
                        <button
                          key={`main-svc-${svc.id}`}
                          onClick={() => {
                            setSelectedMainServices(prev => {
                              const exists = prev.find(s => s.id === svc.id);
                              if (exists) {
                                return prev.filter(s => s.id !== svc.id);
                              } else {
                                return [...prev, svc];
                              }
                            });
                          }}
                          className={`w-full text-left flex items-center justify-between px-4 py-4 border transition-colors ${active
                            ? "border-[#9F3F5C] bg-white/70"
                            : "border-foreground/15 bg-white/40 hover:bg-white/55"
                            }`}
                        >
                          <span className="text-foreground font-medium text-sm flex items-center gap-2">
                            <span className={`w-4 h-4 border rounded flex items-center justify-center ${active ? "border-[#9F3F5C] bg-[#9F3F5C] text-white" : "border-foreground/30"}`}>
                              {active && <Check className="w-3 h-3 stroke-[3px]" />}
                            </span>
                            {svc.name}
                          </span>
                          <span className="text-foreground/40 text-sm font-display font-medium">({svc.count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-[1fr_auto] gap-4 font-display text-xs text-foreground/70 mb-2 px-1">
                    <p>Service</p>
                  </div>

                  <div className="overflow-y-auto pr-1 md:pr-2 space-y-4 flex-1 min-h-0">
                    {selectedMainServices.map((mainSvc) => (
                      <div key={`group-${mainSvc.id}`} className="space-y-2">
                        <p className="font-display font-bold text-xs text-[#9F3F5C] uppercase tracking-wider px-1">
                          {mainSvc.name}
                        </p>
                        {mainSvc.subservices.map((sub: any) => {
                          const active = selectedServices.some(s => s.name === sub.name);
                          return (
                            <button
                              key={`subservice-${sub.name}`}
                              onClick={() => {
                                setSelectedServices(prev => {
                                  const exists = prev.find(s => s.name === sub.name);
                                  if (exists) {
                                    return prev.filter(s => s.name !== sub.name);
                                  } else {
                                    return [...prev, { name: sub.name, price: sub.price, category: mainSvc.category }];
                                  }
                                });
                              }}
                              className={`w-full text-left grid grid-cols-[1fr_auto] gap-4 px-4 py-4 border transition-colors ${active
                                ? "border-[#9F3F5C] bg-white/70 font-semibold"
                                : "border-foreground/15 bg-white/40 hover:bg-white/55"
                                }`}
                            >
                              <span className="text-foreground text-sm flex items-center gap-2">
                                <span className={`w-4 h-4 border rounded flex items-center justify-center ${active ? "border-[#9F3F5C] bg-[#9F3F5C] text-white" : "border-foreground/30"}`}>
                                  {active && <Check className="w-3 h-3 stroke-[3px]" />}
                                </span>
                                {sub.name}
                              </span>
                              {sub.price > 0 ? (
                                <span className="text-foreground text-sm">AED {sub.price}</span>
                              ) : (
                                <span className="text-foreground/50 text-xs italic">Price varies based on size</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pr-1 md:pr-2">
                  <div>
                    <p className="font-display text-xs text-foreground/70 mb-2">Available Dates</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {availableDates.map((d) => (
                        <button
                          key={d}
                          onClick={() => setSelectedDate(d)}
                          className={`px-3 min-h-11 border text-sm transition-all ${selectedDate === d
                            ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                            : "bg-white/45 border-foreground/15 hover:bg-white/60"
                            }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-xs text-foreground/70 mb-2">Available Times</p>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`px-3 min-h-11 border text-sm transition-all ${selectedTime === t
                            ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                            : "bg-white/45 border-foreground/15 hover:bg-white/60"
                            }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 4 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-4">
                  <p className="font-display text-xs text-foreground/70 mb-3 uppercase">Specify Number of People</p>
                  <div className="bg-white/40 p-4 border border-foreground/15 max-w-[220px]">
                    <input
                      type="number"
                      min="1"
                      value={peopleCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setPeopleCount(val);
                      }}
                      className="w-full px-3 py-2 border border-foreground/20 bg-white/85 outline-none focus:border-[#9F3F5C] text-lg font-semibold text-foreground text-center"
                    />
                  </div>
                </div>
              )}

              {bookingStep === 4.5 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1 md:pr-2">
                  <div>
                    <p className="font-display text-xs text-foreground/70 mb-3 uppercase">Is it the same services for all people?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsSameService(true)}
                        className={`flex-1 py-3 border text-sm font-semibold transition-all ${isSameService
                          ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                          : "bg-white/45 border-foreground/15 hover:bg-white/60 text-foreground"
                        }`}
                      >
                        Yes, same services
                      </button>
                      <button
                        onClick={() => {
                          setIsSameService(false);
                          // Initialize default selections for other people if empty
                          const initialPersonServices = { ...personServices };
                          for (let i = 2; i <= peopleCount; i++) {
                            if (!initialPersonServices[i] || initialPersonServices[i].length === 0) {
                              initialPersonServices[i] = [];
                            }
                          }
                          setPersonServices(initialPersonServices);
                          setActivePersonTab(2);
                        }}
                        className={`flex-1 py-3 border text-sm font-semibold transition-all ${!isSameService
                          ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                          : "bg-white/45 border-foreground/15 hover:bg-white/60 text-foreground"
                        }`}
                      >
                        No, select different
                      </button>
                    </div>
                  </div>

                  {sameServiceWarning}
                  {customConfigWarning}

                  {!isSameService && (
                    <div className="space-y-4">
                      {/* Tabs for Person 2, Person 3, etc. */}
                      <div className="flex gap-2 border-b border-foreground/10 pb-2 overflow-x-auto no-scrollbar">
                        {Array.from({ length: peopleCount - 1 }).map((_, idx) => {
                          const pId = idx + 2;
                          const isActive = activePersonTab === pId;
                          const hasSelection = personServices[pId] && personServices[pId].length > 0;
                          return (
                            <button
                              key={`tab-person-${pId}`}
                              onClick={() => setActivePersonTab(pId)}
                              className={`px-4 py-2 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${isActive
                                ? "border-[#9F3F5C] text-[#9F3F5C]"
                                : "border-transparent text-foreground/60 hover:text-foreground"
                              }`}
                            >
                              Person {pId} {hasSelection && "✓"}
                            </button>
                          );
                        })}
                      </div>

                      {/* Service selector checklist for activePersonTab */}
                      <div>
                        <p className="font-display text-xs text-foreground/70 mb-3">Select Services for Person {activePersonTab}:</p>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                          {dbMainServices.map((mainSvc) => (
                            <div key={`p-${activePersonTab}-group-${mainSvc.id}`} className="space-y-2">
                              <p className="font-display font-bold text-[11px] text-[#9F3F5C] uppercase tracking-wider px-1">
                                {mainSvc.name}
                              </p>
                              {mainSvc.subservices.map((sub: any) => {
                                const currentSelections = personServices[activePersonTab] || [];
                                const active = currentSelections.some(s => s.name === sub.name);
                                return (
                                  <button
                                    key={`p-${activePersonTab}-subservice-${sub.name}`}
                                    onClick={() => {
                                      setPersonServices(prev => {
                                        const selections = prev[activePersonTab] || [];
                                        const exists = selections.find(s => s.name === sub.name);
                                        const newSelections = exists
                                          ? selections.filter(s => s.name !== sub.name)
                                          : [...selections, { name: sub.name, price: sub.price, category: mainSvc.category }];
                                        return { ...prev, [activePersonTab]: newSelections };
                                      });
                                    }}
                                    className={`w-full text-left grid grid-cols-[1fr_auto] gap-4 px-3 py-2.5 border transition-colors text-xs ${active
                                      ? "border-[#9F3F5C] bg-white/70 font-semibold"
                                      : "border-foreground/15 bg-white/40 hover:bg-white/55"
                                    }`}
                                  >
                                    <span className="text-foreground flex items-center gap-2">
                                      <span className={`w-3.5 h-3.5 border rounded flex items-center justify-center ${active ? "border-[#9F3F5C] bg-[#9F3F5C] text-white" : "border-foreground/30"}`}>
                                        {active && <Check className="w-2.5 h-2.5 stroke-[3px]" />}
                                      </span>
                                      {sub.name}
                                    </span>
                                    {sub.price > 0 ? (
                                      <span className="text-foreground font-semibold">AED {sub.price}</span>
                                    ) : (
                                      <span className="text-foreground/50 italic">Price varies</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {bookingStep === 5 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 md:pr-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        <span className="text-[#9F3F5C]">*</span> First Name:
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        className="w-full px-3 py-3 border border-foreground/20 bg-white/65 outline-none focus:border-[#9F3F5C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1">
                        <span className="text-[#9F3F5C]">*</span> Last Name:
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        className="w-full px-3 py-3 border border-foreground/20 bg-white/65 outline-none focus:border-[#9F3F5C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      <span className="text-[#9F3F5C]">*</span> Phone number:
                    </label>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+97155617 3486"
                      className="w-full px-3 py-3 border border-foreground/20 bg-white/65 outline-none focus:border-[#9F3F5C]"
                    />
                  </div>
                </div>
              )}

              {bookingStep === 6 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 md:pr-2">
                  <div className="border border-foreground/15 rounded-xl bg-white/40 p-5 space-y-4 shadow-sm">
                    <h4 className="font-display text-sm font-bold text-foreground">Summary</h4>

                    <div className="border border-foreground/10 rounded-lg p-4 bg-white/80 space-y-3">
                      <p className="text-xs text-foreground/50">Services</p>
                      {isSameService ? (
                        selectedServices.map((s) => (
                          <div key={s.name} className="flex justify-between items-center text-sm font-semibold text-foreground">
                            <span>{s.name} x {peopleCount} {peopleCount === 1 ? "person" : "people"}</span>
                            <span>{s.price > 0 ? `AED ${s.price * peopleCount}` : "Price Varies"}</span>
                          </div>
                        ))
                      ) : (
                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 text-xs">
                          {/* Person 1 */}
                          <div className="border-b border-foreground/5 pb-2">
                            <p className="font-bold text-[#9F3F5C] mb-1">Person 1:</p>
                            {selectedServices.map(s => (
                              <div key={`summary-p1-${s.name}`} className="flex justify-between ml-2 font-medium text-foreground/80">
                                <span>- {s.name}</span>
                                <span>{s.price > 0 ? `AED ${s.price}` : "Price Varies"}</span>
                              </div>
                            ))}
                          </div>
                          {/* Person 2..N */}
                          {Array.from({ length: peopleCount - 1 }).map((_, idx) => {
                            const pId = idx + 2;
                            const services = personServices[pId] && personServices[pId].length > 0 ? personServices[pId] : selectedServices;
                            return (
                              <div key={`summary-group-p${pId}`} className="border-b border-foreground/5 pb-2 last:border-b-0 last:pb-0">
                                <p className="font-bold text-[#9F3F5C] mb-1">Person {pId}:</p>
                                {services.map(s => (
                                  <div key={`summary-p${pId}-${s.name}`} className="flex justify-between ml-2 font-medium text-foreground/80">
                                    <span>- {s.name}</span>
                                    <span>{s.price > 0 ? `AED ${s.price}` : "Price Varies"}</span>
                                  </div>
                                ))}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground/80 whitespace-nowrap">Coupon:</span>
                      <div className="relative flex-1">
                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                        <input
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-foreground/20 bg-white/70 outline-none focus:border-[#9F3F5C]"
                          placeholder=""
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (coupon.trim()) {
                            alert("Coupon applied successfully!");
                          }
                        }}
                        className="px-4 py-2 bg-[#9F3F5C] text-white text-xs font-semibold hover:bg-[#8E3852] transition-colors"
                      >
                        Add
                      </button>
                    </div>

                    <div className="border-t border-dashed border-foreground/20 pt-4 flex justify-between items-center text-base font-bold text-foreground">
                      <span>Total Price:</span>
                      <span>{getBookingTotalText()}</span>
                    </div>
                  </div>

                  <p className="text-center text-xs text-foreground/60 mt-4 italic">
                    The payment will be done on-site.
                  </p>
                </div>
              )}

              {bookingStep === 7 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-5 px-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                  <div>
                    <h4 className="font-display text-2xl font-bold text-foreground">Congratulations!</h4>
                    <p className="text-sm text-foreground/80 mt-2">
                      Your appointment has been booked successfully for {selectedDate} at {selectedTime}.
                    </p>
                    <p className="text-sm text-foreground/80 mt-1 font-semibold">
                      Services: {selectedServices.map(s => s.name).join(", ")}
                    </p>
                    <p className="text-sm text-foreground/85 mt-2 font-medium">
                      Thank you for choosing Ultimate Blend Ladies Beauty Salon
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
                    <button
                      onClick={() => {
                        const serviceNames = selectedServices.map(s => s.name).join(", ") || "Salon Services";
                        let datePart = selectedDate || "";
                        if (datePart && !datePart.includes("202")) {
                          const year = new Date().getFullYear();
                          datePart = `${datePart} ${year}`;
                        }
                        
                        let googleUrl = "";
                        try {
                          const parsedDate = new Date(`${datePart} ${selectedTime}`);
                          if (!isNaN(parsedDate.getTime())) {
                            const startStr = parsedDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                            const endStr = new Date(parsedDate.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
                            googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ultimate Blend - " + serviceNames)}&dates=${startStr}/${endStr}&details=${encodeURIComponent("Appointment for " + peopleCount + " people at Ultimate Blend Ladies Beauty Salon")}&location=${encodeURIComponent("Ultimate Blend Ladies Beauty Salon, Dubai")}`;
                          }
                        } catch (e) {}

                        if (!googleUrl) {
                          googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Ultimate Blend - " + serviceNames)}&details=${encodeURIComponent("Appointment for " + peopleCount + " people at Ultimate Blend Ladies Beauty Salon")}&location=${encodeURIComponent("Ultimate Blend Ladies Beauty Salon, Dubai")}`;
                        }

                        window.open(googleUrl, "_blank");
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#9F3F5C] hover:bg-[#8E3852] text-white text-xs font-semibold shadow transition-all"
                    >
                      <Calendar className="w-4 h-4" />
                      Add to Calendar
                    </button>
                    <button
                      onClick={closeBookingPanel}
                      className="flex-1 px-5 py-3 border border-foreground/20 bg-white/35 text-foreground hover:bg-white/50 text-xs font-semibold transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 md:mt-6 flex items-center justify-between gap-3 shrink-0">
                {bookingStep > 1 && bookingStep < 7 ? (
                  <button
                    onClick={handlePrevStep}
                    className="px-5 min-h-11 border border-foreground/20 bg-white/35 text-foreground font-display text-xs"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {bookingStep < 7 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={
                      bookingLoading ||
                      (bookingStep === 1 && selectedMainServices.length === 0) ||
                      (bookingStep === 2 && selectedServices.length === 0) ||
                      (bookingStep === 3 && (!selectedDate || !selectedTime)) ||
                      (bookingStep === 4 && peopleCount < 1) ||
                      (bookingStep === 4.5 && (
                        (isSameService && peopleCount > availableSpotsForSlot) ||
                        (!isSameService && (
                          isCustomConfigInvalid ||
                          Array.from({ length: peopleCount - 1 }).some((_, idx) => {
                            const pId = idx + 2;
                            return !personServices[pId] || personServices[pId].length === 0;
                          })
                        ))
                      )) ||
                      (bookingStep === 5 && (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()))
                    }
                    className={`px-8 min-h-12 font-display text-xs transition-opacity ${(bookingStep === 1 && selectedMainServices.length > 0) ||
                      (bookingStep === 2 && selectedServices.length > 0) ||
                      (bookingStep === 3 && selectedDate && selectedTime) ||
                      (bookingStep === 4 && peopleCount >= 1) ||
                      (bookingStep === 4.5 && (
                        (isSameService && peopleCount <= availableSpotsForSlot) ||
                        (!isSameService && !isCustomConfigInvalid && !Array.from({ length: peopleCount - 1 }).some((_, idx) => {
                          const pId = idx + 2;
                          return !personServices[pId] || personServices[pId].length === 0;
                        }))
                      )) ||
                      (bookingStep === 5 && firstName.trim() && lastName.trim() && phoneNumber.trim()) ||
                      bookingStep === 6
                      ? "bg-[#1E36C7] text-[#FFD2E2] hover:opacity-90"
                      : "bg-[#1E36C7]/40 text-[#FFD2E2]/70 cursor-not-allowed"
                      }`}
                  >
                    {bookingStep === 6 ? "Confirm & Book" : "Next"}
                  </button>
                ) : null}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};