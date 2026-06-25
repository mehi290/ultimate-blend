export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next (Next.js internals, if any)
     * - assets, images, etc. (static files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    '/((?!api|_next|static|assets|public|.*\\..*|ULTIMATE_LOGO-removebg-preview.png|og-image-v2.png|BingSiteAuth.xml).*)',
  ],
};

const SITE_URL = "https://www.ultimateblendladiessalon.com";
const OG_IMAGE = `${SITE_URL}/og-image-v2.png`;
const SITE_NAME = "Ultimate Blend Ladies Beauty Salon";

const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": SITE_NAME,
  "url": `${SITE_URL}/`,
  "image": OG_IMAGE,
  "telephone": "+971556173486",
  "priceRange": "$$",
  "video": [
    {
      "@type": "VideoObject",
      "name": "Ultimate Blend Ladies Beauty Salon Showcase",
      "description": "Experience premium hair braiding, nails, makeup, and facial services in Deira, Dubai.",
      "thumbnailUrl": "https://www.ultimateblendladiessalon.com/og-image-v2.png",
      "uploadDate": "2026-06-25T12:00:00+04:00",
      "contentUrl": "https://www.ultimateblendladiessalon.com/final%20hero%20ultimate%20compressed%20final.mp4"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2725",
    "longitude": "55.3125"
  },
  "hasMap": "https://maps.google.com/?q=City+Stay+Premium+Hotel+Building+-+Shop+4+-+4th+St+-+Naif+-+Deira+-+Dubai",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "City Stay Premium Hotel Building - Shop 4 - 4th St - Naif - Deira - Dubai",
    "addressLocality": "Dubai",
    "addressCountry": "AE"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "23:30"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/ultimateblendladiessalon/",
    "https://www.tiktok.com/@ultimateblendsalon1",
    "https://www.facebook.com/p/Ultimate-blend-Ladies-Beauty-Salon-Dubai-100046602049825/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "6"
  },
  "review": [
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
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "#faq",
      "#about",
      "#services"
    ]
  }
};

const FAQ_ITEMS = [
  {
    question: "Do you provide the hair extensions for boho, knotless, and Fulani braids?",
    answer: "Yes, we provide high quality human hair extensions in a variety of colors and lengths, for specialized styles like human hair boho braids."
  },
  {
    question: "How long do braids normally take to install?",
    answer: "Depending on the thickness, and length of the style (e.g., standard knotless vs. Fulani cornrows), installation generally takes between 3 to 6 hours. Our focus is always on precision, neat parting, and hair health."
  },
  {
    question: "How do I book a home service appointment in Dubai?",
    answer: "You can seamlessly book home services online on our website or by messaging on WhatsApp. Simply choose the 'Home Service' option of your preferred service, share your address, and our professional stylists will bring the salon experience to your doorstep."
  },
  {
    question: "Is there a minimum spend or travel fee for home services?",
    answer: "Our home services are available across most major residential districts in Dubai. Transport fee depends on your exact location."
  },
  {
    question: "Do you require a booking prior or accept walk-ins?",
    answer: "While we do accommodate walk-ins at our physical Dubai salon, we recommend prior booking to avoid waiting."
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer: "We understand plans change! We kindly ask that you modify or cancel your booking at least 6 hours in advance so we can open up the slot to other clients on our waitlist."
  },
  {
    question: "What is the best hair braiding salon in Dubai?",
    answer: "Ultimate Blend Ladies Beauty Salon is one of the top-rated hair braiding salons in Dubai. Our expert stylists specialize in knotless braids, boho braids, box braids, Fulani twists, cornrows, and more. We offer both salon visits in Deira and professional home services across Dubai."
  },
  {
    question: "How much do knotless braids cost in Dubai?",
    answer: "Prices for knotless braids at Ultimate Blend Ladies Beauty Salon vary by size (small, medium, or big), length, and hair density. Since the pricing varies, you can select your style on our booking page to view the details or message us on WhatsApp for a custom quote."
  },
  {
    question: "How much do boho braids cost in Dubai?",
    answer: "Boho braids at Ultimate Blend Ladies Beauty Salon are available in small, medium, and big sizes using either premium human hair or synthetic hair. Prices vary based on your chosen size, length, and hair type. Contact us on WhatsApp or book online for a personalized quote."
  },
  {
    question: "How long do boho braids last?",
    answer: "Boho braids typically last 4 to 8 weeks with proper care. To extend their lifespan, we recommend sleeping with a silk bonnet, moisturizing your scalp regularly, and avoiding excessive water exposure. Our stylists provide detailed aftercare tips at every appointment."
  },
  {
    question: "Can I get hair braiding done at home in Dubai?",
    answer: "Yes! Ultimate Blend Ladies Beauty Salon offers professional home braiding services across Dubai. Our experienced stylists come to your location with all the tools and premium hair extensions needed. Simply choose the 'Home Service' option when booking online or message us on WhatsApp with your address."
  },
  {
    question: "What types of braids do you offer in Dubai?",
    answer: "We offer a wide range of braiding styles including knotless braids, box braids, boho braids, goddess boho braids, Fulani twist braids, stitch braids, cornrows, extension cornrows, French curls, boho French curls, crochet braids, dreadlocks, and finger waves. All styles are available in small, medium, and big sizes."
  },
  {
    question: "What are the opening hours of Ultimate Blend salon?",
    answer: "Ultimate Blend Ladies Beauty Salon is open 7 days a week, Monday through Sunday, from 9:00 AM to 11:30 PM. We are located at City Stay Premium Hotel Building, Shop 4, 4th Street, Naif, Deira, Dubai."
  },
  {
    question: "Do you offer eyelash extensions at home in Dubai?",
    answer: "Yes, we offer professional eyelash extension services at home across Dubai. Choose from classic, hybrid, volume, or mega eyelash extensions. Our certified lash artists bring everything needed to your doorstep. Book online or contact us on WhatsApp."
  }
];

function buildFAQPageSchema() {
  const salonSchema = { ...BASE_SCHEMA };
  delete (salonSchema as any)["@context"];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      salonSchema
    ]
  };
}

const SEO_MAP: Record<string, { title: string; description: string; schema: any }> = {
  "/": {
    title: "Ultimate Blend Ladies Beauty Salon | Best Hair & Braiding Salon in Dubai",
    description: "Welcome to Ultimate Blend Ladies Beauty Salon in Dubai. We offer premium hair braiding, hairdressing, nails, makeup, and skincare services.",
    schema: BASE_SCHEMA
  },
  "/about": {
    title: "About Us | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Learn more about Ultimate Blend Ladies Beauty Salon, our expert stylists, and our mission to provide the best beauty experience in Dubai.",
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Us - Ultimate Blend Ladies Beauty Salon",
      "description": "Learn about our hairdressers and specialists in Deira, Dubai.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/services": {
    title: "Beauty Services in Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Explore our wide range of professional beauty services in Dubai, including hair braiding, makeup, nails, and signature skincare treatments.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Services | Ultimate Blend Ladies Beauty Salon",
      "description": "Premium ladies beauty services, hair styling, extensions, and nail care.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/testimonials": {
    title: "Client Reviews & Testimonials | Ultimate Blend Ladies Beauty Salon",
    description: "See what our happy clients say about our hairdressing, hair braiding, and nails services in Dubai. Read reviews and testimonials.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Reviews | Ultimate Blend Ladies Beauty Salon",
      "description": "Customer reviews and testimonials for Ultimate Blend Ladies Beauty Salon.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/ourwork": {
    title: "Gallery & Portfolio | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Browse our portfolio of gorgeous hair braids, makeup, nails, and transformations at Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Gallery | Ultimate Blend Ladies Beauty Salon",
      "description": "Photos of haircuts, hair braids, and acrylic nails created by our beauty artists.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/contactus": {
    title: "Contact & Location in Deira, Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Find our salon in Naif, Deira, Dubai. Contact us to book an appointment or get directions to Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us - Ultimate Blend Ladies Beauty Salon",
      "description": "Get in touch or visit our salon location in Naif, Deira, Dubai.",
      "mainEntity": BASE_SCHEMA
    }
  },
  "/home-service-dubai": {
    title: "Premium Home Beauty Services in Dubai | Ultimate Blend Ladies Beauty Salon",
    description: "Enjoy luxury beauty services in the comfort of your home. We offer home hairdressing, braiding, nails, and makeup across Dubai.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Home Beauty Services",
      "provider": BASE_SCHEMA,
      "areaServed": "Dubai"
    }
  },
  "/salon-near-me": {
    title: "Beauty Salon Near Me in Deira, Dubai | Ultimate Blend Ladies Salon",
    description: "Looking for a top-rated ladies beauty salon near you in Deira, Dubai? Visit Ultimate Blend Ladies Beauty Salon for professional hair and nail care.",
    schema: BASE_SCHEMA
  },
  "/faq": {
    title: "Best Hair Braiding in Deira | Ultimate Blend Ladies Salon Dubai",
    description: "Looking for the best hair braiding in Deira? Ultimate Blend Ladies Salon offers flawless knotless braids, Fulani cornrows, boho braids, and convenient premium home services across Dubai. Book your appointment online today!",
    schema: buildFAQPageSchema()
  },
  "/privacy-policy": {
    title: "Privacy Policy | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Read the Privacy Policy of Ultimate Blend Ladies Beauty Salon to learn how we collect, use, and protect your personal information.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy | Ultimate Blend Ladies Beauty Salon"
    }
  },
  "/terms-conditions": {
    title: "Terms & Conditions | Ultimate Blend Ladies Beauty Salon Dubai",
    description: "Read the terms and conditions for booking appointments and using the services of Ultimate Blend Ladies Beauty Salon.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms and Conditions | Ultimate Blend Ladies Beauty Salon"
    }
  }
};

const buildBreadcrumbsSchema = (pathname: string) => {
  const parts = pathname.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.ultimateblendladiessalon.com/"
    }
  ];

  let pathAccumulator = "";
  parts.forEach((part, index) => {
    pathAccumulator += `/${part}`;
    let name = part.charAt(0).toUpperCase() + part.slice(1);
    if (part === "ourwork") name = "Our Work";
    if (part === "contactus") name = "Contact Us";
    if (part === "home-service-dubai") name = "Home Services";
    if (part === "salon-near-me") name = "Salon Near Me";
    if (part === "terms-conditions") name = "Terms & Conditions";
    if (part === "privacy-policy") name = "Privacy Policy";
    if (part === "faq") name = "FAQs";

    if (part === "services") {
      name = "Services";
    } else if (parts[index - 1] === "services") {
      name = part
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    items.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `https://www.ultimateblendladiessalon.com${pathAccumulator}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
  };
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Edge cases pass-through
  if (
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/assets')
  ) {
    return;
  }

  try {
    const response = await fetch(new URL('/index.html', request.url));
    if (!response.ok) return response;

    let html = await response.text();

    // Map path to metadata config
    let configObj = SEO_MAP[pathname] || SEO_MAP["/"];

    // Handle dynamic service category routes like /services/knotless-braids
    if (!SEO_MAP[pathname] && pathname.startsWith('/services/')) {
      const categoryRaw = pathname.split('/').pop() || "";
      const category = categoryRaw
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      configObj = {
        title: `${category} Services | Ultimate Blend Ladies Beauty Salon Dubai`,
        description: `Premium ${category} services in Deira, Dubai at Ultimate Blend Ladies Beauty Salon. Professional stylists, luxury treatments, and booking.`,
        schema: {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `${category} Services - Ultimate Blend Ladies Beauty Salon`,
          "serviceType": category,
          "provider": BASE_SCHEMA,
          "areaServed": "Dubai",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "AED",
            "description": `Custom quotes and pricing options available for ${category} services.`
          }
        }
      };
    }

    // Rewrite standard tags in HTML
    html = html.replace(/<title>[^]*?<\/title>/, `<title>${configObj.title}</title>`);
    html = html.replace(/<meta name="description" content="[^]*?"\s*\/?>/, `<meta name="description" content="${configObj.description}" />`);
    html = html.replace(/<link rel="canonical" href="[^]*?"\s*\/?>/, `<link rel="canonical" href="${SITE_URL}${pathname}" />`);

    // OG Tags
    html = html.replace(/<meta property="og:title" content="[^]*?"\s*\/?>/, `<meta property="og:title" content="${configObj.title}" />`);
    html = html.replace(/<meta property="og:description" content="[^]*?"\s*\/?>/, `<meta property="og:description" content="${configObj.description}" />`);
    html = html.replace(/<meta property="og:url" content="[^]*?"\s*\/?>/, `<meta property="og:url" content="${SITE_URL}${pathname}" />`);

    // Twitter Tags
    html = html.replace(/<meta name="twitter:title" content="[^]*?"\s*\/?>/, `<meta name="twitter:title" content="${configObj.title}" />`);
    html = html.replace(/<meta name="twitter:description" content="[^]*?"\s*\/?>/, `<meta name="twitter:description" content="${configObj.description}" />`);

    // Combine route schema and breadcrumbs into a single @graph schema
    let finalSchema: any = configObj.schema;
    if (configObj.schema) {
      const breadcrumbs = buildBreadcrumbsSchema(pathname);
      if (configObj.schema["@graph"] && Array.isArray(configObj.schema["@graph"])) {
        finalSchema = {
          "@context": "https://schema.org",
          "@graph": [...configObj.schema["@graph"], breadcrumbs]
        };
      } else {
        const routeSchema = { ...configObj.schema };
        delete routeSchema["@context"];
        finalSchema = {
          "@context": "https://schema.org",
          "@graph": [routeSchema, breadcrumbs]
        };
      }
    }

    // Replace the static JSON-LD script block
    const schemaScriptStr = `<script id="static-schema" type="application/ld+json">${JSON.stringify(finalSchema)}</script>`;
    html = html.replace(/<script id="static-schema" type="application\/ld\+json">[^]*?<\/script>/, schemaScriptStr);

    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Middleware SEO injection error:', err);
    return;
  }
}
