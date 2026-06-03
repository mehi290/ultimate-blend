import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Ticket, Calendar, CheckCircle2 } from "lucide-react";
import { SERVICES_FLAT, SERVICE_FILTERS } from "./data";

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
      { name: "2 Cornrows with Extensions", price: 120 },
      { name: "4 Cornrows with Extensions", price: 180 },
      { name: "6+ Cornrows with Extensions", price: 250 }
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
    name: "Hair Styling Services",
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
      { name: "Dreadlocks Repair - Big", price: 170 },
      { name: "Dreadlocks Repair - Medium", price: 200 },
      { name: "Dreadlocks Repair - Small", price: 230 },
      { name: "Dreadlocks Maintenance", price: 100 }
    ]
  },
  {
    id: "wigs-extensions",
    name: "Wigs & Hair Extensions",
    count: 11,
    category: "Hair",
    subservices: [
      { name: "Wig Installation - Big", price: 80 },
      { name: "Wig Installation - Medium", price: 130 },
      { name: "Wig Installation - Small", price: 180 },
      { name: "Wig Fix - Big", price: 70 },
      { name: "Wig Fix - Medium", price: 90 },
      { name: "Wig Fix - Small", price: 120 },
      { name: "Wig Wash & Style - Big", price: 70 },
      { name: "Wig Wash & Style - Medium", price: 90 },
      { name: "Wig Wash & Style - Small", price: 120 },
      { name: "Revamping of Human Hair", price: 200 },
      { name: "Weave / Sew-in", price: 100 }
    ]
  },
  {
    id: "skin",
    name: "Skin Services",
    count: 1,
    category: "Skin",
    subservices: [
      { name: "Signature Facial", price: 200 }
    ]
  }
];

export const Services = () => {
  const servicesTitle = "Services";
  const [typedServicesTitle, setTypedServicesTitle] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingCategory, setBookingCategory] = useState<string>("");
  const [bookingScope, setBookingScope] = useState<string>("");
  const [bookingImage, setBookingImage] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedStylist, setSelectedStylist] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // New customized states
  const [selectedMainService, setSelectedMainService] = useState<any>(null);
  const [selectedServicePrice, setSelectedServicePrice] = useState<number>(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [coupon, setCoupon] = useState("");
  const [isOtherPeople, setIsOtherPeople] = useState(false);
  const [otherPeopleVal, setOtherPeopleVal] = useState("5");
  const [orderedServices, setOrderedServices] = useState<any[]>(MAIN_SERVICES);

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
    setSelectedService("");
    setSelectedMainService(null);
    setSelectedServicePrice(0);
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

    const matched = MAIN_SERVICES.find(s => s.id === matchId);
    const others = MAIN_SERVICES.filter(s => s.id !== matchId);
    const ordered = matched ? [matched, ...others] : MAIN_SERVICES;

    setOrderedServices(ordered);
    setBookingStep(1);
    setBookingOpen(true);
  };

  const openGenericBookingPanel = () => {
    setBookingCategory("All Services");
    setBookingScope("All");
    setBookingImage(SERVICES_FLAT[0]?.image ?? "");
    setSelectedService("");
    setSelectedMainService(null);
    setSelectedServicePrice(0);
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
    setOrderedServices(MAIN_SERVICES);
    setBookingStep(1);
    setBookingOpen(true);
  };

  const closeBookingPanel = () => {
    setBookingOpen(false);
    setBookingStep(1);
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
    const handleOpenBooking = () => {
      openGenericBookingPanel();
    };
    window.addEventListener("open-booking-flow", handleOpenBooking);
    return () => window.removeEventListener("open-booking-flow", handleOpenBooking);
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
  const availableDates = ["03 Jun", "04 Jun", "05 Jun", "06 Jun"];
  const availableTimes = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];
  const selectedPrice = selectedService ? getRandomPrice(selectedService) : "";
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

                  <div className="absolute left-6 right-6 bottom-6 md:bottom-8 z-10">
                    <p className="font-display normal-case tracking-normal font-bold text-base md:text-lg leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] mb-3">
                      {item.name}
                    </p>
                    <button
                      onClick={() => openBookingPanel(item.category, item.image, item.name)}
                      className="px-4 min-h-10 bg-[#9F3F5C] text-white text-xs font-display hover:bg-[#8E3852] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F3F5C] focus-visible:ring-offset-2"
                    >
                      Book now
                    </button>
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
              {isVideoFile(bookingImage) ? (
                <video
                  src={bookingImage}
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <img
                  src={bookingImage}
                  alt={`[PHOTO ${bookingCategory}]`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>

            <div className="bg-[#e5cad8] p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] md:p-8 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="font-display text-xl md:text-2xl text-foreground normal-case flex items-center gap-2">
                  {bookingStep === 6 && (
                    <button
                      onClick={() => setBookingStep(5)}
                      className="mr-1 p-1 hover:bg-black/10 rounded"
                    >
                      <ChevronLeft className="w-5 h-5 text-foreground inline" />
                    </button>
                  )}
                  {bookingStep === 1 && "Select Service"}
                  {bookingStep === 2 && (selectedMainService ? selectedMainService.name : "Select Subservice")}
                  {bookingStep === 3 && "Select Date & Time"}
                  {bookingStep === 4 && "How Many People"}
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
                  <div className="grid grid-cols-[1fr_auto] gap-4 font-display text-xs text-foreground/70 mb-2 px-1">
                    <p>Main Services</p>
                  </div>

                  <div className="overflow-y-auto pr-1 md:pr-2 space-y-2 flex-1 min-h-0">
                    {orderedServices.map((svc) => {
                      const active = selectedMainService?.id === svc.id;
                      return (
                        <button
                          key={`main-svc-${svc.id}`}
                          onClick={() => {
                            setSelectedMainService(svc);
                            setBookingStep(2);
                          }}
                          className={`w-full text-left flex items-center justify-between px-4 py-4 border transition-colors ${active
                            ? "border-[#9F3F5C] bg-white/70"
                            : "border-foreground/15 bg-white/40 hover:bg-white/55"
                            }`}
                        >
                          <span className="text-foreground font-medium text-sm">{svc.name}</span>
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

                  <div className="overflow-y-auto pr-1 md:pr-2 space-y-2 flex-1 min-h-0">
                    {selectedMainService?.subservices.map((sub: any) => {
                      const active = selectedService === sub.name;
                      return (
                        <button
                          key={`subservice-${sub.name}`}
                          onClick={() => {
                            setSelectedService(sub.name);
                            setSelectedServicePrice(sub.price);
                          }}
                          className={`w-full text-left grid grid-cols-[1fr_auto] gap-4 px-4 py-4 border transition-colors ${active
                            ? "border-[#9F3F5C] bg-white/70 font-semibold"
                            : "border-foreground/15 bg-white/40 hover:bg-white/55"
                            }`}
                        >
                          <span className="text-foreground text-sm">{sub.name}</span>
                          {sub.price > 0 && (
                            <span className="text-foreground text-sm">AED {sub.price}</span>
                          )}
                        </button>
                      );
                    })}
                    {selectedMainService?.subservices.some((s: any) => s.price === 0) && (
                      <p className="text-center text-xs text-[#9F3F5C] mt-4 font-bold italic">
                        Prices vary based on size
                      </p>
                    )}
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

                    <div className="border border-foreground/10 rounded-lg p-4 bg-white/80 space-y-1">
                      <p className="text-xs text-foreground/50">Services</p>
                      <div className="flex justify-between items-center text-sm font-semibold text-foreground">
                        {selectedServicePrice > 0 ? (
                          <>
                            <span>{selectedService} (AED {selectedServicePrice}) x {peopleCount} {peopleCount === 1 ? "person" : "people"}</span>
                            <span>AED {selectedServicePrice * peopleCount}</span>
                          </>
                        ) : (
                          <>
                            <span>{selectedService} x {peopleCount} {peopleCount === 1 ? "person" : "people"}</span>
                            <span>Price Varies</span>
                          </>
                        )}
                      </div>
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
                      <span>Total Amount:</span>
                      <span>{selectedServicePrice > 0 ? `AED ${selectedServicePrice * peopleCount}` : "Price Varies"}</span>
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
                    <p className="text-sm text-foreground/85 mt-2 font-medium">
                      Thank you for choosing Ultimate Blend Ladies Beauty Salon
                    </p>
                    <div className="bg-[#9F3F5C]/10 border border-[#9F3F5C]/20 rounded-md p-3 mt-4 max-w-md mx-auto">
                      <p className="text-xs text-foreground/90 font-medium">
                        A confirmation SMS has been sent to <span className="font-bold">{phoneNumber}</span>.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm pt-4">
                    <button
                      onClick={() => {
                        const serviceName = selectedService || "Salon Service";
                        const icsContent = [
                          "BEGIN:VCALENDAR",
                          "VERSION:2.0",
                          "PRODID:-//Ultimate Blend//Appointment//EN",
                          "BEGIN:VEVENT",
                          `SUMMARY:Ultimate Blend - ${serviceName}`,
                          `DESCRIPTION:Appointment for ${peopleCount} people. Payment will be done on-site.`,
                          "LOCATION:Ultimate Blend Ladies Beauty Salon, Dubai",
                          "STATUS:CONFIRMED",
                          "END:VEVENT",
                          "END:VCALENDAR"
                        ].join("\r\n");

                        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", "appointment.ics");
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
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
                    onClick={() => setBookingStep((s) => s - 1)}
                    className="px-5 min-h-11 border border-foreground/20 bg-white/35 text-foreground font-display text-xs"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {bookingStep < 7 ? (
                  <button
                    onClick={() => setBookingStep((s) => s + 1)}
                    disabled={
                      (bookingStep === 1 && !selectedMainService) ||
                      (bookingStep === 2 && !selectedService) ||
                      (bookingStep === 3 && (!selectedDate || !selectedTime)) ||
                      (bookingStep === 5 && (!firstName.trim() || !lastName.trim() || !phoneNumber.trim()))
                    }
                    className={`px-8 min-h-12 font-display text-xs transition-opacity ${(bookingStep === 1 && selectedMainService) ||
                      (bookingStep === 2 && selectedService) ||
                      (bookingStep === 3 && selectedDate && selectedTime) ||
                      bookingStep === 4 ||
                      (bookingStep === 5 && firstName.trim() && lastName.trim() && phoneNumber.trim()) ||
                      bookingStep === 6
                      ? "bg-[#1E36C7] text-[#FFD2E2] hover:opacity-90"
                      : "bg-[#1E36C7]/40 text-[#FFD2E2]/70 cursor-not-allowed"
                      }`}
                  >
                    {bookingStep === 6 ? "Continue" : "Next"}
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