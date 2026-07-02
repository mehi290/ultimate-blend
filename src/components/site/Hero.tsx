import { useEffect, useState, useRef } from "react";
import { HERO_TILES } from "./data";

export const Hero = () => {
  const title = "Ultimate Blend Ladies Beauty Salon Dubai";
  const subtitle = "Never Be Too Busy To Be Beautiful";
  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let timeoutId: number | undefined;

    const typeTitle = (index: number) => {
      if (index <= title.length) {
        setTypedTitle(title.slice(0, index));
        timeoutId = window.setTimeout(() => typeTitle(index + 1), 90);
        return;
      }
      timeoutId = window.setTimeout(() => typeSubtitle(1), 180);
    };

    const typeSubtitle = (index: number) => {
      if (index <= subtitle.length) {
        setTypedSubtitle(subtitle.slice(0, index));
        timeoutId = window.setTimeout(() => typeSubtitle(index + 1), 70);
      }
    };

    typeTitle(1);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");

  // Lazy‑load hero background video when it enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && videoRef.current && !videoSrc) {
          setVideoSrc("/final%20hero%20ultimate%20compressed%20final.mp4");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "200px" });

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] min-h-[100dvh] md:min-h-[640px] overflow-hidden bg-black"
    >
      {/* Lazy-loaded full-screen background video */}
      <video
        ref={videoRef}
        src={videoSrc}
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Desktop top-right booking strip */}
      <div className="hidden md:flex fixed top-0 right-0 z-50 h-16 min-w-[260px] bg-transparent">
        <button
          onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
          className="flex-1 h-full bg-[#9F3F5C] text-white font-display text-[20px] tracking-[0.08em] [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] hover:bg-[#8E3852] transition-colors"
        >
          BOOK NOW
        </button>
      </div>

      {/* Floating WhatsApp & Call icons – bottom-right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="https://wa.me/971556173486"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-200"
        >
          {/* WhatsApp SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
        <a
          href="tel:+971556173486"
          aria-label="Call us"
          className="w-12 h-12 rounded-full bg-[#34B7F1] text-white flex items-center justify-center shadow-lg hover:bg-[#0A94D8] hover:scale-110 transition-all duration-200"
        >
          {/* Phone SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        </a>
      </div>

      {/* Tagline centered */}
      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 pointer-events-none">
        <div className="text-center text-white text-shadow-hero max-w-5xl">
          <h1 className="font-display font-black md:font-bold leading-[1.15] text-[21px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
            {typedTitle}
            {typedTitle.length < title.length ? (
              <span className="inline-block w-[0.08em] h-[0.95em] ml-[0.08em] bg-white align-[-0.08em] animate-pulse" />
            ) : null}
          </h1>
          <p className="mt-3 sm:mt-4 font-sans font-black text-pink-500 [text-shadow:0_3px_12px_rgba(0,0,0,0.9)] text-xl sm:text-xl md:text-3xl lg:text-4xl max-w-[18ch] mx-auto leading-[1.2]">
            {typedSubtitle}
            {typedTitle.length >= title.length && typedSubtitle.length < subtitle.length ? (
              <span className="inline-block w-[0.08em] h-[0.9em] ml-[0.08em] bg-pink-500 align-[-0.08em] animate-pulse" />
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
};