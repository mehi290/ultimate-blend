import { Sidebar } from "@/components/site/Sidebar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { OurWork } from "@/components/site/OurWork";
import { Footer } from "@/components/site/Footer";

const Index = () => {
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
