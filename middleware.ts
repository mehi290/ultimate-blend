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
  "telephone": "+971556173486", // Updated to clean standard format
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
  ]
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
  }
];

function buildFAQPageSchema() {
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
      { ...BASE_SCHEMA }
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
  "/gallery": {
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
  "/deira": {
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
          "serviceType": category,
          "provider": BASE_SCHEMA,
          "areaServed": "Dubai"
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

    // Replace the static JSON-LD script block
    const schemaScriptStr = `<script id="static-schema" type="application/ld+json">${JSON.stringify(configObj.schema)}</script>`;
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
