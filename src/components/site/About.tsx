import { useEffect, useRef, useState } from "react";

export const About = () => {
  const aboutTitle = "About Ultimate Blend Ladies Beauty Salon";
  const aboutImageSrc = "/about.mp4";
  const [typedAboutTitle, setTypedAboutTitle] = useState("");
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);

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

  // IntersectionObserver for mobile video
  useEffect(() => {
    const el = mobileVideoRef.current;
    if (!el) return;

    el.pause();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            const p = target.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            if (!target.paused) target.pause();
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // IntersectionObserver for desktop video
  useEffect(() => {
    const el = desktopVideoRef.current;
    if (!el) return;

    el.pause();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            const p = target.play();
            if (p && typeof p.catch === 'function') p.catch(() => {});
          } else {
            if (!target.paused) target.pause();
          }
        });
      },
      { rootMargin: "0px", threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);



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
            <video
              ref={mobileVideoRef}
              src={aboutImageSrc}
              aria-label="About video"
              className="w-full h-full object-cover"
              preload="none"
              muted
              loop
              playsInline
            />
          </div>
        </div>

        <div className="space-y-5 text-muted-foreground text-base leading-relaxed max-w-xl">
          <p>
            Where beauty meets precision with a signature touch of luxury. Ultimate Blend Ladies Beauty Salon is a sanctuary for expert hair, beauty, nail, and lash services. Whether you visit our salon in Deira or enjoy the convenience of a home appointment, our experienced team creates beautiful, long lasting results tailored to your style.
          </p>
        </div>

        <button
          onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
          className="mt-8 px-8 py-4 bg-[#9F3F5C] text-white font-display text-sm tracking-[0.06em] hover:bg-[#8E3852] transition-colors"
        >
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
              Where beauty meets precision with a signature touch of luxury. Ultimate Blend Ladies Beauty Salon is a sanctuary for expert hair, beauty, nail, and lash services. Whether you visit our salon in Deira or enjoy the convenience of a home appointment, our experienced team creates beautiful, long-lasting results tailored to your style.
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
            className="mt-8 px-8 py-4 bg-[#9F3F5C] text-white font-display text-sm tracking-[0.06em] hover:bg-[#8E3852] transition-colors"
          >
            Book a Visit
          </button>
        </div>

        <div className="w-full md:max-w-lg md:justify-self-end">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <video
              ref={desktopVideoRef}
              src={aboutImageSrc}
              preload="none"
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