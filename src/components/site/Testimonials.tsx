import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "./data";

export const Testimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden bg-neutral-900"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="text-white text-2xl md:text-4xl font-black tracking-tight drop-shadow-lg font-display normal-case">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative group">
          <div
            ref={trackRef}
            className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {loop.map((t, idx) => (
                <article
                  key={idx}
                  className="w-[85vw] max-w-[300px] md:w-[360px] shrink-0 rounded-xl border border-white/15 bg-black/40 backdrop-blur-md p-6 md:p-7 flex flex-col items-center text-center"
                >
                  <h3 className="text-white text-lg font-medium tracking-wide capitalize">
                    {t.name}
                  </h3>
                  <div className="flex gap-1 mt-3 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t.quote}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <button
            onClick={() => nudge(-1)}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Next testimonials"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};