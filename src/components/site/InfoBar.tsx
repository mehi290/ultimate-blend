import { Home, MapPin, Star, Calendar } from "lucide-react";

export const InfoBar = () => {
  const items = [
    { icon: Home, text: "Home Service Available", action: "home-services" },
    { icon: MapPin, text: "Dubai", action: "contact" },
    { icon: Star, text: "4.6 Google Rating", action: "testimonials" },
    { icon: Calendar, text: "Online Booking", action: "booking" },
  ];

  const handleScrollToSection = (sectionId: string) => {
    if (sectionId === "booking") {
      window.dispatchEvent(new Event("open-booking-flow"));
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-[#EAD0DC] border-y border-[#D8BDCD] py-4 md:py-0 md:h-[70px] flex items-center justify-center shrink-0">
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 md:gap-8 items-center justify-items-center">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => handleScrollToSection(item.action)}
              className="flex items-center justify-center gap-2.5 md:gap-3 group transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-[#F0E6EA] flex items-center justify-center shadow-sm group-hover:border-[#9F3F5C]/40 group-hover:shadow-md transition-all duration-300">
                <Icon className="w-4 h-4 text-[#9F3F5C] stroke-[1.5] transition-transform duration-300 group-hover:scale-110" />
              </div>
              <span className="font-display text-xs sm:text-[13px] font-semibold tracking-wide text-foreground/80 group-hover:text-[#9F3F5C] transition-colors duration-300 text-left">
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
