import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WORK_ITEMS = [
  { name: "Loose Weave Boho Braid", video: "/loose%20weave%20boho%20braid.mp4" },
  { name: "Braid", video: "/cornrow%20braids%20our%20work.mp4" },
  { name: "Knotless Box Braids", video: "/knotlessboxbraids_dubai.mp4" },
  { name: "Boho Braids", video: "/boho%20raids%20middle.mp4" },
  { name: "French Curls Boho Braids", video: "/French%20curls%20Boho%20braids.mp4" },
  { name: "Gel Extension", video: "/gelsih%20extension.mp4" },
  { name: "Crochet", video: "/crochet.mp4" },
];

export const OurWork = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.5), behavior: "smooth" });
  };

  const loop = WORK_ITEMS;

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const videos: HTMLVideoElement[] = Array.from(root.querySelectorAll("video[data-autoplay]"));
    if (!videos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            if (el.paused) {
              el.play().catch(() => {});
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

    return () => observer.disconnect();
  }, []);

  return (
    <section id="our-work" className="bg-background py-20 md:py-28 border-t border-border">
      <div className="px-6 md:px-16 mb-10 md:mb-14">
        <div>
          <h2 className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-tight uppercase">
            Our Work
          </h2>
          <p className="mt-3 font-editorial text-xl text-muted-foreground">
            A showcase of our signature styles and client creations
          </p>
        </div>
      </div>

      {/* Manual horizontal scroll track */}
      <div className="group relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex gap-5 w-max pl-6 md:pl-16 pr-6 md:pr-16">
            {loop.map((item, idx) => (
              <article
                key={`${item.name}-${idx}`}
                className="shrink-0 w-[82vw] sm:w-[60vw] md:w-[44vw] lg:w-[34vw] xl:w-[28vw] aspect-[4/5] relative overflow-hidden bg-neutral-900"
              >
                <video
                  src={item.video}
                  data-autoplay
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  aria-label={`${item.name} showcase video`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                {/* Card labels and booking button */}
                <div className="absolute left-6 right-6 bottom-6 md:bottom-8 z-10">
                  <p className="font-display normal-case tracking-normal font-bold text-base md:text-lg leading-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] mb-3">
                    {item.name}
                  </p>
                  <button
                    onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
                    className="px-5 py-2.5 bg-[#9F3F5C] text-white text-xs font-display font-semibold hover:bg-[#8E3852] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9F3F5C] focus-visible:ring-offset-2"
                  >
                    Book this look
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Manual prev/next arrows */}
        <button
          onClick={() => nudge(-1)}
          aria-label="Scroll work left"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background border border-foreground/20 text-foreground items-center justify-center backdrop-blur transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => nudge(1)}
          aria-label="Scroll work right"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-background/80 hover:bg-background border border-foreground/20 text-foreground items-center justify-center backdrop-blur transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
