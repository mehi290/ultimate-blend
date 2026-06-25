export const SITE_URL = "https://www.ultimateblendladiessalon.com";
export const OG_IMAGE = `${SITE_URL}/og-image-v2.png`;
export const SITE_NAME = "Ultimate Blend Ladies Beauty Salon";

export const FAQ_ITEMS = [
  {
    question: "Do you provide the hair extensions for boho, knotless, and Fulani braids?",
    answer:
      "Yes, we provide high quality human hair extensions in a variety of colors and lengths, for specialized styles like human hair boho braids.",
  },
  {
    question: "How long do braids normally take to install?",
    answer:
      "Depending on the thickness, and length of the style (e.g., standard knotless vs. Fulani cornrows), installation generally takes between 3 to 6 hours. Our focus is always on precision, neat parting, and hair health.",
  },
  {
    question: "How do I book a home service appointment in Dubai?",
    answer:
      "You can seamlessly book home services online on our website or by messaging on WhatsApp. Simply choose the 'Home Service' option of your preferred service, share your address, and our professional stylists will bring the salon experience to your doorstep.",
  },
  {
    question: "Is there a minimum spend or travel fee for home services?",
    answer:
      "Our home services are available across most major residential districts in Dubai. Transport fee depends on your exact location.",
  },
  {
    question: "Do you require a booking prior or accept walk-ins?",
    answer:
      "While we do accommodate walk-ins at our physical Dubai salon, we recommend prior booking to avoid waiting.",
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer:
      "We understand plans change! We kindly ask that you modify or cancel your booking at least 6 hours in advance so we can open up the slot to other clients on our waitlist.",
  },
] as const;

export const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  telephone: "+97155617 3486",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "City Stay Premium Hotel Building - Shop 4 - 4th St - Naif - Deira - Dubai",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:30",
    },
  ],
  sameAs: [
    "https://www.instagram.com/ultimateblendladiessalon/",
    "https://www.tiktok.com/@ultimateblendsalon1",
    "https://www.facebook.com/p/Ultimate-blend-Ladies-Beauty-Salon-Dubai-100046602049825/",
  ],
};

export function buildFAQPageSchema() {
  const salonSchema = { ...BASE_SCHEMA };
  delete (salonSchema as { "@context"?: string })["@context"];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      salonSchema,
    ],
  };
}
