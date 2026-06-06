import { useEffect, useState } from "react";
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

  return (
    <section
      id="home"
      className="relative w-full min-h-[100svh] min-h-[100dvh] md:min-h-[640px] overflow-hidden bg-black"
    >
      {/* Full-screen background video */}
      <video
        src="/hero ultiamte.mp4"
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
      <div className="hidden md:flex fixed top-0 right-0 z-50 h-16 min-w-[320px] bg-transparent">
        <button
          onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
          className="w-full h-full bg-[#9F3F5C] text-white font-display text-[20px] tracking-[0.08em] [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] hover:bg-[#8E3852] transition-colors"
        >
          BOOK NOW
        </button>
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