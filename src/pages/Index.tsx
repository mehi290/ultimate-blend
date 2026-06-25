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
import { BASE_SCHEMA, buildFAQPageSchema } from "@/lib/seo-config";

interface SEOConfig {
  title: string;
  description: string;
  schema?: Record<string, unknown>;
}

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

  let seo = SEO_MAP[currentPath];

  if (!seo && currentPath.startsWith("/services/")) {
    const categoryRaw = currentPath.split("/").pop() || "";
    const category = categoryRaw
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    seo = {
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

  if (!seo) {
    seo = SEO_MAP["/"];
  }

  // Combine route schema and breadcrumbs into a single @graph schema
  let finalSchema: any = seo.schema;
  if (seo.schema) {
    const breadcrumbs = buildBreadcrumbsSchema(currentPath);
    if (seo.schema["@graph"] && Array.isArray(seo.schema["@graph"])) {
      finalSchema = {
        "@context": "https://schema.org",
        "@graph": [...seo.schema["@graph"], breadcrumbs]
      };
    } else {
      const routeSchema = { ...seo.schema };
      delete (routeSchema as any)["@context"];
      finalSchema = {
        "@context": "https://schema.org",
        "@graph": [routeSchema, breadcrumbs]
      };
    }
  }

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title={seo.title}
        description={seo.description}
        schema={finalSchema}
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

