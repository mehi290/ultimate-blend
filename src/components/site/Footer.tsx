import { Instagram, Facebook, MapPin, Phone, Clock, MessageCircle } from "lucide-react";

const Tiktok = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="bg-foreground text-background py-16 md:py-28 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 mb-16 items-start">
          <div>
            <p className="font-display text-xs opacity-60 mb-5">Find Us</p>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-8 md:mb-10 max-w-4xl">
              Visit Ultimate Blend Ladies Beauty Salon Dubai
            </h2>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 opacity-70" />
                <p className="font-editorial text-xl leading-snug">
                  City Stay Premium Hotel Building - Shop 4 - 4th St - Naif - Deira - Dubai
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 opacity-70" />
                <p className="font-editorial text-xl leading-snug">+97155617 3486</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-1 opacity-70" />
                <p className="font-editorial text-xl leading-snug">Mon-Sun 9:00 AM - 11:30 PM</p>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-1 opacity-70" />
                <p className="font-editorial text-xl leading-snug">Mobile: +97155617 3486</p>
              </div>
            </div>

            <button
              onClick={() => window.dispatchEvent(new Event("open-booking-flow"))}
              className="px-8 min-h-12 bg-primary text-primary-foreground font-display text-xs hover:opacity-90 transition-opacity"
            >
              Get Directions
            </button>
          </div>

          <div className="w-full">
            <iframe
              title="Ultimate Blend Ladies Beauty Salon Dubai map"
              src="https://www.google.com/maps?q=City+Stay+Premium+Hotel+Building+-+Shop+4+-+4th+St+-+Naif+-+Deira+-+Dubai&output=embed"
              className="w-full h-[340px] md:h-[380px] border border-background/20"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-6 pt-8 border-t border-background/15">
          <p className="font-display text-xs opacity-60">
            © 2026 Ultimate Blend Ladies Beauty Salon Dubai. All rights reserved.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/ultimateblendladiessalon/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 border border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@ultimateblendsalon1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 border border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
            >
              <Tiktok className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/p/Ultimate-blend-Ladies-Beauty-Salon-Dubai-100046602049825/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 border border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};