import { useEffect, useState } from "react";
import { HERO_TILES } from "./data";

export const Hero = () => {
  const title = "Ultimate Blend Ladies Beauty Salon Dubai";
  const subtitle = "Discover The New You";
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
      className="relative w-full min-h-[100svh] min-h-[100dvh] md:min-h-[640px] overflow-hidden bg-background"
    >
      {/* 6-tile mosaic: 3x2 desktop, 2x3 mobile */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-0">
        {HERO_TILES.map((tile, i) => (
          <div key={i} className="relative overflow-hidden">
            <img
              src={tile.src}
              alt={tile.alt}
              loading={i < 4 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* subtle dark overlay so the tagline reads on every tile */}
      <div className="absolute inset-0 bg-foreground/15 pointer-events-none" />

      {/* Desktop top-right booking strip */}
      <div className="hidden md:flex fixed top-0 right-0 z-50 h-16 min-w-[320px] bg-transparent">
        <button
          onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
          className="w-full h-full bg-[#9F3F5C] text-white font-display text-[20px] tracking-[0.08em] [text-shadow:0_2px_10px_rgba(0,0,0,0.45)] hover:bg-[#8E3852] transition-colors"
        >
          BOOK NOW
        </button>
      </div>

      {/* Tagline centered across the horizontal seam */}
      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-6 pointer-events-none">
        <div className="text-center text-background text-shadow-hero max-w-5xl">
          <h1 className="font-display font-black md:font-bold leading-[1.15] text-[21px] sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
            {typedTitle}
            {typedTitle.length < title.length ? (
              <span className="inline-block w-[0.08em] h-[0.95em] ml-[0.08em] bg-background align-[-0.08em] animate-pulse" />
            ) : null}
          </h1>
          <p className="mt-3 sm:mt-4 font-editorial font-semibold md:font-normal text-[#FFE6F1] [text-shadow:0_2px_14px_rgba(0,0,0,0.75)] text-3xl sm:text-3xl md:text-5xl lg:text-6xl max-w-[18ch] mx-auto leading-[1.2]">
            {typedSubtitle}
            {typedTitle.length >= title.length && typedSubtitle.length < subtitle.length ? (
              <span className="inline-block w-[0.08em] h-[0.9em] ml-[0.08em] bg-[#FFE6F1] align-[-0.08em] animate-pulse" />
            ) : null}
          </p>
        </div>
      </div>
    </section>
  );
};