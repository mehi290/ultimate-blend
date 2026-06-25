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
  {
    question: "What is the best hair braiding salon in Dubai?",
    answer:
      "Ultimate Blend Ladies Beauty Salon is one of the top-rated hair braiding salons in Dubai. Our expert stylists specialize in knotless braids, boho braids, box braids, Fulani twists, cornrows, and more. We offer both salon visits in Deira and professional home services across Dubai.",
  },
  {
    question: "How much do knotless braids cost in Dubai?",
    answer:
      "Prices for knotless braids at Ultimate Blend Ladies Beauty Salon vary by size (small, medium, or big), length, and hair density. Since the pricing varies, you can select your style on our booking page to view the details or message us on WhatsApp for a custom quote.",
  },
  {
    question: "How much do boho braids cost in Dubai?",
    answer:
      "Boho braids at Ultimate Blend Ladies Beauty Salon are available in small, medium, and big sizes using either premium human hair or synthetic hair. Prices vary based on your chosen size, length, and hair type. Contact us on WhatsApp or book online for a personalized quote.",
  },
  {
    question: "How long do boho braids last?",
    answer:
      "Boho braids typically last 4 to 8 weeks with proper care. To extend their lifespan, we recommend sleeping with a silk bonnet, moisturizing your scalp regularly, and avoiding excessive water exposure. Our stylists provide detailed aftercare tips at every appointment.",
  },
  {
    question: "Can I get hair braiding done at home in Dubai?",
    answer:
      "Yes! Ultimate Blend Ladies Beauty Salon offers professional home braiding services across Dubai. Our experienced stylists come to your location with all the tools and premium hair extensions needed. Simply choose the 'Home Service' option when booking online or message us on WhatsApp with your address.",
  },
  {
    question: "What types of braids do you offer in Dubai?",
    answer:
      "We offer a wide range of braiding styles including knotless braids, box braids, boho braids, goddess boho braids, Fulani twist braids, stitch braids, cornrows, extension cornrows, French curls, boho French curls, crochet braids, dreadlocks, and finger waves. All styles are available in small, medium, and big sizes.",
  },
  {
    question: "What are the opening hours of Ultimate Blend salon?",
    answer:
      "Ultimate Blend Ladies Beauty Salon is open 7 days a week, Monday through Sunday, from 9:00 AM to 11:30 PM. We are located at City Stay Premium Hotel Building, Shop 4, 4th Street, Naif, Deira, Dubai.",
  },
  {
    question: "Do you offer eyelash extensions at home in Dubai?",
    answer:
      "Yes, we offer professional eyelash extension services at home across Dubai. Choose from classic, hybrid, volume, or mega eyelash extensions. Our certified lash artists bring everything needed to your doorstep. Book online or contact us on WhatsApp.",
  },
] as const;

export const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  telephone: "+971556173486",
  priceRange: "$$",
  geo: {
    "@type": "GeoCoordinates",
    "latitude": "25.2725",
    "longitude": "55.3125"
  },
  hasMap: "https://maps.google.com/?q=City+Stay+Premium+Hotel+Building+-+Shop+4+-+4th+St+-+Naif+-+Deira+-+Dubai",
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
  aggregateRating: {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6"
  },
  review: [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Bons Arte"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had my old braids removed, my hair washed, blow-dryed and re-braided. I have very thick, long hair. But the stylists made sure enough people were working on my hair at once that the process was the fastest I've had since moving to Dubai!! All of the staff were very welcoming and kind, I'm super happy with my braids and the service!! I will be back very soon."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Tonia Chris"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had an amazing experience at Ultimate Blend Salon! The atmosphere was warm and welcoming, and my knotless braids came out absolutely beautiful. A special shout out to Chioma she was so gentle, patient, and incredibly skilled."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Shereen Chambers"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had my hair braided by Ennie and I couldn't be happier! I booked a house call, and she arrived on time, was super friendly, and made me feel so comfortable. She worked quickly but with so much attention to detail, my braids look amazing and neat!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Tolu Sky"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had a great time making my hair, the customer service is top-notch and my hair was so beautiful. Great service at fair price."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Ojogri Akpevwe Avemaria"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I really loved my experience here. From the ambience to the customer service. The best I've had in Dubai. I hope to come again soon."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Deborah Mustafa"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "I had an amazing time at the salon. I went to make nails there and they give me the best customer service i've ever experienced since i came to dubai."
    }
  ],
  speakable: {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "#faq",
      "#about",
      "#services"
    ]
  }
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
