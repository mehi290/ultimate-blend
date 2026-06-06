import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "./data";
import { cn } from "@/lib/utils";

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    const idToPathMap: Record<string, string> = {
      "home": "/",
      "about": "/about",
      "services": "/services",
      "testimonials": "/testimonials",
      "our-work": "/ourwork",
      "contact": "/contactus",
    };
    const path = idToPathMap[id] || "/";
    navigate(path);
    scrollTo(id);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-5 h-[calc(3.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] bg-background/85 backdrop-blur border-b border-border">
        <div className="flex items-center gap-2">
          <img
            src="/ULTIMATE_LOGO-removebg-preview.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <button
            onClick={() => handleNav("home")}
            className="font-display font-bold text-sm tracking-tight text-left leading-tight"
            aria-label="Ultimate Blend Ladies Beauty Salon home"
          >
            Ultimate Blend
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
            className="px-4 min-h-10 bg-[#9F3F5C] text-white text-xs font-display tracking-[0.08em] hover:bg-[#8E3852] transition-colors"
            aria-label="Book now"
          >
            Book Now
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2"
            aria-label="Toggle navigation"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background transition-opacity duration-300 overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))]",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-start gap-6 px-8 pt-[calc(3.5rem+env(safe-area-inset-top)+1.5rem)] min-h-full">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className="font-editorial text-4xl text-foreground"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contact")}
            className="mt-4 px-8 py-4 bg-primary text-primary-foreground font-display text-xs"
          >
            Book Appointment
          </button>
        </nav>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 w-[88px] flex-col items-center justify-between py-8 border-r border-border bg-background">
        <div className="mb-4">
          <img
            src="/ULTIMATE_LOGO-removebg-preview.png"
            alt="Logo"
            className="w-16 h-16 object-contain mx-auto"
          />
        </div>
        {/* Vertical rotated nav */}
        <nav className="flex-1 flex flex-col items-center justify-center gap-10">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={cn(
                "font-display font-semibold text-[11px] transition-colors",
                active === l.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              {l.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};