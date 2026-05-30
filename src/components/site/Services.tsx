import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SERVICES_FLAT, SERVICE_FILTERS } from "./data";

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

  const openBookingPanel = (category: string, image: string) => {
    setBookingCategory(category);
    setBookingScope(category);
    setBookingImage(image);
    setSelectedService("");
    setSelectedStylist("");
    setSelectedDate("");
    setSelectedTime("");
    setPeopleCount(1);
    setPhoneNumber("");
    setBookingStep(1);
    setBookingOpen(true);
  };

  const openGenericBookingPanel = () => {
    setBookingCategory("All Services");
    setBookingScope("All");
    setBookingImage(SERVICES_FLAT[0]?.image ?? "");
    setSelectedService("");
    setSelectedStylist("");
    setSelectedDate("");
    setSelectedTime("");
    setPeopleCount(1);
    setPhoneNumber("");
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
  const availableDates = ["15 Jul", "16 Jul", "17 Jul", "18 Jul"];
  const availableTimes = ["10:00 AM", "11:30 AM", "1:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];
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
          if (entry.intersectionRatio >= 0.5) {
            if (el.paused) {
              const playPromise = el.play();
              if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
            }
          } else {
            if (!el.paused) el.pause();
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
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
                    className={`font-display text-xs px-4 min-h-10 border transition-colors ${
                      active
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
                className="shrink-0 w-[82vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28vw] aspect-square relative overflow-hidden cursor-pointer"
              >
                {isVideoFile(item.image) ? (
                  <video
                    src={item.image}
                    data-autoplay
                    preload="metadata"
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
                <div className="absolute inset-0 bg-gradient-to-l from-foreground/15 to-transparent" />

                {/* Service label moved lower, no background panel */}
                <div className="absolute left-6 right-6 bottom-6 md:bottom-8 max-w-[72%]">
                  <p className="font-display normal-case tracking-normal font-bold text-base md:text-lg leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] mb-3">
                    {item.name}
                  </p>
                  <button
                    onClick={() => openBookingPanel(item.category, item.image)}
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
                <h3 className="font-display text-xl md:text-2xl text-foreground normal-case">
                  {bookingStep === 1 && bookingCategory}
                  {bookingStep === 2 && "Choose Your Stylist"}
                  {bookingStep === 3 && "Select Date & Time"}
                  {bookingStep === 4 && "How Many People"}
                  {bookingStep === 5 && "Review Your Booking"}
                  {bookingStep === 6 && "Booking Confirmed"}
                </h3>
                <button
                  onClick={closeBookingPanel}
                  className="w-10 h-10 flex items-center justify-center bg-[#c894ab] text-white hover:opacity-90"
                  aria-label="Close booking panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {bookingStep === 1 && (
                <>
                  <div className="grid grid-cols-[1fr_auto] gap-4 font-display text-xs text-foreground/70 mb-2">
                    <p>Services</p>
                    <p>Price</p>
                  </div>

                  <div className="overflow-y-auto pr-1 md:pr-2 space-y-2 flex-1 min-h-0">
                    {bookingItems.map((svc) => {
                      const active = selectedService === svc.name;
                      return (
                        <button
                          key={`booking-${svc.name}`}
                          onClick={() => setSelectedService(svc.name)}
                          className={`w-full text-left grid grid-cols-[1fr_auto] gap-4 px-3 py-3 border transition-colors ${
                            active
                              ? "border-[#9F3F5C] bg-white/70"
                              : "border-foreground/15 bg-white/40 hover:bg-white/55"
                          }`}
                        >
                          <span className="text-foreground">{svc.name}</span>
                          <span className="text-foreground">{getRandomPrice(svc.name)}</span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {bookingStep === 2 && (
                <div className="flex-1 min-h-0 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pr-1 md:pr-2">
                  {stylists.map((stylist) => {
                    const active = selectedStylist === stylist.name;
                    return (
                      <button
                        key={stylist.name}
                        onClick={() => setSelectedStylist(stylist.name)}
                        className={`p-4 border text-center transition-colors ${
                          active
                            ? "border-[#9F3F5C] bg-white/75"
                            : "border-foreground/15 bg-white/40 hover:bg-white/55"
                        }`}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#d8afc0] flex items-center justify-center font-display text-sm mb-2">
                          {stylist.avatar}
                        </div>
                        <p className="text-sm text-foreground">{stylist.name}</p>
                        <p className="text-xs text-foreground/60">{stylist.role}</p>
                      </button>
                    );
                  })}
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
                          className={`px-3 min-h-11 border text-sm ${
                            selectedDate === d
                              ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                              : "bg-white/45 border-foreground/15"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-xs text-foreground/70 mb-2">Available Times</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`px-3 min-h-11 border text-sm ${
                            selectedTime === t
                              ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                              : "bg-white/45 border-foreground/15"
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
                <div className="flex-1 min-h-0 overflow-y-auto">
                  <p className="font-display text-xs text-foreground/70 mb-3">How many people?</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setPeopleCount(n)}
                        className={`px-3 min-h-12 border text-base ${
                          peopleCount === n
                            ? "bg-[#9F3F5C] text-white border-[#9F3F5C]"
                            : "bg-white/45 border-foreground/15"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 5 && (
                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 md:pr-2">
                  <div className="bg-white/55 border border-foreground/15 p-4 space-y-2">
                    <div className="flex justify-between text-sm"><span>Service</span><span className="font-semibold">{selectedService}</span></div>
                    <div className="flex justify-between text-sm"><span>Stylist</span><span className="font-semibold">{selectedStylist}</span></div>
                    <div className="flex justify-between text-sm"><span>Date</span><span className="font-semibold">{selectedDate}</span></div>
                    <div className="flex justify-between text-sm"><span>Time</span><span className="font-semibold">{selectedTime}</span></div>
                    <div className="flex justify-between text-sm"><span>People</span><span className="font-semibold">{peopleCount}</span></div>
                    <div className="flex justify-between text-sm"><span>Price</span><span className="font-semibold">{selectedPrice}</span></div>
                  </div>
                  <div>
                    <p className="font-display text-xs text-foreground/70 mb-2">Phone number</p>
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+971 52 160 0013"
                      className="w-full px-3 py-3 border border-foreground/20 bg-white/65 outline-none focus:border-[#9F3F5C]"
                    />
                  </div>
                </div>
              )}

              {bookingStep === 6 && (
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white/55 border border-foreground/15 p-4 rounded-sm">
                    <p className="text-sm text-foreground mb-2">
                      Thank you for choosing Ultimate Blend Ladies Salon, we will be waiting for you.
                    </p>
                    <p className="text-xs text-foreground/70 mb-1">Service</p>
                    <p className="font-semibold">{selectedService}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 md:mt-6 flex items-center justify-between gap-3 shrink-0">
                {bookingStep > 1 && bookingStep < 6 ? (
                  <button
                    onClick={() => setBookingStep((s) => s - 1)}
                    className="px-5 min-h-11 border border-foreground/20 bg-white/35 text-foreground font-display text-xs"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {bookingStep < 6 ? (
                  <button
                    onClick={() => setBookingStep((s) => s + 1)}
                    disabled={
                      (bookingStep === 1 && !selectedService) ||
                      (bookingStep === 2 && !selectedStylist) ||
                      (bookingStep === 3 && (!selectedDate || !selectedTime)) ||
                      (bookingStep === 5 && !phoneNumber.trim())
                    }
                    className={`px-8 min-h-12 font-display text-xs transition-opacity ${
                      (bookingStep === 1 && selectedService) ||
                      (bookingStep === 2 && selectedStylist) ||
                      (bookingStep === 3 && selectedDate && selectedTime) ||
                      bookingStep === 4 ||
                      (bookingStep === 5 && phoneNumber.trim())
                        ? "bg-[#1E36C7] text-[#FFD2E2] hover:opacity-90"
                        : "bg-[#1E36C7]/40 text-[#FFD2E2]/70 cursor-not-allowed"
                    }`}
                  >
                    {bookingStep === 5 ? "Confirm Booking" : "Next"}
                  </button>
                ) : (
                  <button
                    onClick={closeBookingPanel}
                    className="px-8 min-h-12 bg-[#b89553] text-black font-display text-xs hover:opacity-90"
                  >
                    Book Another Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};