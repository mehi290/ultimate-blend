import { useEffect, useState } from "react";
import { ABOUT_PORTRAIT } from "./data";

export const About = () => {
  const aboutTitle = "About Ultimate Blend Ladies Beauty Salon";
  const aboutImageSrc = "/about.mp4";
  const [mobilePlaying, setMobilePlaying] = useState(false);
  const [typedAboutTitle, setTypedAboutTitle] = useState("");

  useEffect(() => {
    let timeoutId: number | undefined;

    const typeTitle = (index: number) => {
      if (index <= aboutTitle.length) {
        setTypedAboutTitle(aboutTitle.slice(0, index));
        timeoutId = window.setTimeout(() => typeTitle(index + 1), 80);
      }
    };

    typeTitle(1);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const sel = document.querySelector('#about video[data-autoplay]') as HTMLVideoElement | null;
    if (!sel) return;

    sel.pause();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            const p = el.play();
            if (p && typeof p.catch === 'function') p.catch(() => { });
          } else {
            if (!el.paused) el.pause();
          }
        });
      },
      { rootMargin: "200px 0px", threshold: 0 }
    );

    obs.observe(sel);
    return () => obs.disconnect();
  }, [mobilePlaying]);

  return (
    <section
      id="about"
      className="relative bg-background py-20 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto md:hidden">
        <h2 className="inline-block mb-8">
          <span className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-tight normal-case">
            {typedAboutTitle}
            {typedAboutTitle.length < aboutTitle.length ? (
              <span className="inline-block w-[0.08em] h-[0.95em] ml-[0.08em] bg-[#9F3F5C] align-[-0.08em] animate-pulse" />
            ) : null}
          </span>
        </h2>

        <h2 className="font-editorial text-[#8F3E59] text-2xl leading-[1.15] tracking-tight mb-8">
          Luxury Beauty Salon in
          <br />
          Dubai
        </h2>

        <div className="mb-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            {mobilePlaying ? (
              <video
                src={aboutImageSrc}
                aria-label="About video"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <button
                onClick={() => setMobilePlaying(true)}
                className="w-full h-full block relative"
                aria-label="Play about video"
              >
                <img
                  src={ABOUT_PORTRAIT}
                  alt="About poster"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 bg-white/80 rounded-full drop-shadow flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-[#9F3F5C]"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-5 text-muted-foreground text-base leading-relaxed max-w-xl">
          <p>
            Where beauty meets precision, with a signature touch of luxury.
            Ultimate Blend Ladies Beauty Salon is a sanctuary where craft meets care. Our stylists,
            colorists, and artists collaborate with each guest to create looks
            that feel honest, modern, and entirely their own.
          </p>
        </div>

        <button className="mt-8 px-8 py-4 bg-[#9F3F5C] text-white font-display text-sm tracking-[0.06em] hover:bg-[#8E3852] transition-colors">
          Book a Visit
        </button>
      </div>

      <div className="hidden max-w-7xl mx-auto md:grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <h2 className="inline-block mb-8">
            <span className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-tight normal-case">
              {typedAboutTitle}
              {typedAboutTitle.length < aboutTitle.length ? (
                <span className="inline-block w-[0.08em] h-[0.95em] ml-[0.08em] bg-[#9F3F5C] align-[-0.08em] animate-pulse" />
              ) : null}
            </span>
          </h2>

          <h2 className="font-editorial text-[#8F3E59] text-2xl md:text-4xl leading-[1.15] tracking-tight mb-8">
            Luxury Beauty Salon in
            <br />
            Dubai
          </h2>

          <div className="space-y-5 text-muted-foreground text-base leading-relaxed max-w-xl">
            <p>
              Where beauty meets precision, with a signature touch of luxury.
              Ultimate Blend Ladies Beauty Salon is a sanctuary where craft meets care. Our stylists,
              colorists, and artists collaborate with each guest to create looks
              that feel honest, modern, and entirely their own.
            </p>
          </div>

          <button className="mt-8 px-8 py-4 bg-[#9F3F5C] text-white font-display text-sm tracking-[0.06em] hover:bg-[#8E3852] transition-colors">
            Book a Visit
          </button>
        </div>

        <div className="w-full md:max-w-lg md:justify-self-end">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <video
              src={aboutImageSrc}
              data-autoplay
              preload="metadata"
              autoPlay
              aria-label="About video"
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};