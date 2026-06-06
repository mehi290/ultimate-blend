import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/site/Sidebar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { OurWork } from "@/components/site/OurWork";
import { Footer } from "@/components/site/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const pathToIdMap: Record<string, string> = {
      "/about": "about",
      "/services": "services",
      "/testimonials": "testimonials",
      "/ourwork": "our-work",
      "/contactus": "contact",
    };

    const id = pathToIdMap[location.pathname];
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        // Use a small timeout to ensure elements are rendered/loaded before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0">
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <OurWork />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
