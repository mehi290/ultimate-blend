import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/site/Sidebar";
import { Hero } from "@/components/site/Hero";
import { InfoBar } from "@/components/site/InfoBar";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { HomeServices } from "@/components/site/HomeServices";
import { Testimonials } from "@/components/site/Testimonials";
import { OurWork } from "@/components/site/OurWork";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";
import { FAQ } from "@/components/site/FAQ";

interface SEOConfig {
  title: string;
  description: string;
  schema?: Record<string, any>;
}

const BASE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Ultimate Blend Ladies Beauty Salon",
  "url": "https://www.ultimateblendladiessalon.com/",
  "image": "https://www.ultimateblendladiessalon.com/about%20image.png",
  "telephone": "+97155617 3486",
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

const SEO_MAP: Record<string, SEOConfig> = {
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
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you provide the hair extensions for boho, knotless, and Fulani braids?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Ultimate Blend Ladies Salon provides premium-quality extensions across various natural colors and lengths for all knotless, boho, and Fulani braiding packages."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a home service salon appointment in Dubai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book our professional home service beauty and braiding team directly through our website booking portal or by dropping us a message on WhatsApp."
          }
        }
      ]
    }
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

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const pathToIdMap: Record<string, string> = {
      "/about": "about",
      "/services": "services",
      "/testimonials": "testimonials",
      "/ourwork": "our-work",
      "/contactus": "contact",
      "/gallery": "our-work",
      "/deira": "contact",
      "/home-service-dubai": "home-services",
      "/salon-near-me": "services",
      "/faq": "faq",
    };

    let id = pathToIdMap[location.pathname];
    if (!id && location.pathname.startsWith("/services/")) {
      id = "services";
    }
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  const currentPath = location.pathname;
  let seo = SEO_MAP[currentPath];

  if (!seo && currentPath.startsWith("/services/")) {
    const category = currentPath.split("/").pop() || "";
    const cleanCategory = category.charAt(0).toUpperCase() + category.slice(1);
    seo = {
      title: `${cleanCategory} Services | Ultimate Blend Ladies Beauty Salon Dubai`,
      description: `Premium ${category} services in Deira, Dubai at Ultimate Blend Ladies Beauty Salon. Professional stylists, luxury treatments, and booking.`,
      schema: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${cleanCategory} Services | Ultimate Blend Ladies Beauty Salon`,
        "description": `Premium ladies ${category} services in Deira, Dubai.`,
        "mainEntity": BASE_SCHEMA
      }
    };
  }

  if (!seo) {
    seo = SEO_MAP["/"];
  }

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title={seo.title}
        description={seo.description}
        schema={seo.schema}
      />
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0">
        <Hero />
        <InfoBar />
        <About />
        <Services />
        <HomeServices />
        <Testimonials />
        <OurWork />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
};

export default Index;

