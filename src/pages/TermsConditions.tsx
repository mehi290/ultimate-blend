import { useEffect } from "react";
import { Sidebar } from "@/components/site/Sidebar";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title="Terms & Conditions | Ultimate Blend Ladies Beauty Salon Dubai"
        description="Read the terms and conditions for booking appointments and using the services of Ultimate Blend Ladies Beauty Salon."
      />
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0 bg-[#FAF6F8]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h1 className="font-editorial text-4xl md:text-5xl text-[#9F3F5C] mb-8 border-b border-pink-200/40 pb-4">
            Terms & Conditions
          </h1>
          <div className="prose prose-pink max-w-none text-[#4A4A4A] space-y-6 leading-relaxed text-sm md:text-base">
            <p className="italic text-gray-500">Last Updated: June 25, 2026</p>
            <p>
              Welcome to Ultimate Blend Ladies Beauty Salon Dubai! These terms and conditions outline the rules and regulations for the use of our booking services and website.
            </p>
            <p>
              By accessing this website, we assume you accept these terms and conditions. Do not continue to use Ultimate Blend Ladies Beauty Salon if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">1. Booking & Scheduling</h2>
            <p>
              We offer convenient online booking and WhatsApp booking for both physical salon visits and premium home beauty services in Dubai.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Appointments are subject to availability of our qualified hair, nail, and makeup artists.</li>
              <li>Please provide accurate location details (including villa/apartment number, building name, and Google Maps pin) when booking a Home Service appointment.</li>
              <li>Stylist assignments are subject to shift schedules and booking capacity.</li>
            </ul>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">2. Cancellation & Rescheduling Policy</h2>
            <p>
              We value your time and our stylists' time. If you need to modify, reschedule, or cancel your appointment:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Please notify us or modify your appointment **at least 6 hours in advance** of your scheduled time.</li>
              <li>Late cancellations or repeated no-shows may limit your ability to book future appointments online.</li>
            </ul>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">3. Pricing & Payments</h2>
            <p>
              Our service prices are detailed in the booking portal or will be provided upon custom quote requests.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For standard salon treatments with specific pricing, the listed amount is due upon service completion.</li>
              <li>For complex styles (like customized boho braids, specific box braid sizes, and length modifications) where pricing varies, styles will be charged based on customized details. We recommend requesting a quote via WhatsApp prior to the appointment.</li>
              <li>Travel charges for home services may vary based on your exact district or community location in Dubai.</li>
            </ul>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">4. Customer Conduct & Health</h2>
            <p>
              For the safety and comfort of our staff and other clients, we request respectful behavior at all times. Please inform your stylist before your appointment if you have sensitive skin, scalp conditions, hair damage, or allergies to specific hair or cosmetic products.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">5. Disclaimer</h2>
            <p>
              Ultimate Blend Ladies Beauty Salon reserves the right to decline styling services that may cause severe damage to a customer's hair or scalp. We are not liable for allergies or hair issues arising from undeclared conditions or improper customer aftercare.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Contact Information</h2>
            <p>
              If you have any queries regarding any of our terms, please contact us:
              <br />
              <strong>Phone / WhatsApp:</strong> +971 55 617 3486
              <br />
              <strong>Address:</strong> City Stay Premium Hotel Building - Shop 4 - 4th St - Naif - Deira - Dubai
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default TermsConditions;
