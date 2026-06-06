import { Calendar } from "lucide-react";

export const HomeServices = () => {
  return (
    <section id="home-services" className="bg-[#FAF6F8] py-20 md:py-28 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Text column */}
        <div className="space-y-6">
          <h2 className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-tight normal-case leading-tight">
            Beauty at Your door front
          </h2>
          
          <div className="space-y-4 text-[#4A4A4A] text-base md:text-lg leading-relaxed max-w-xl">
            <p className="font-semibold text-[#8F3E59]">
              Enjoy professional salon services in the comfort of your home.
            </p>
            <p className="italic">
              Busy schedule? No problem.
            </p>
            <p className="text-[#666666] text-base">
              Our experienced stylists provide professional hair, beauty, nail, and lash services across Dubai, bringing the salon experience directly to you.
            </p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
            className="mt-4 px-8 py-4 bg-[#9F3F5C] text-white font-display text-xs sm:text-sm tracking-[0.06em] hover:bg-[#8E3852] transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            BOOK YOUR HOME APPOINTMENT
          </button>
        </div>

        {/* Video column */}
        <div className="w-full md:max-w-lg md:justify-self-end">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl border border-pink-100/20">
            <video
              src="/home%20service%20knotless.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Home service knotless braids"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
