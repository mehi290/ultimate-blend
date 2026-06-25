import { useEffect } from "react";
import { Sidebar } from "@/components/site/Sidebar";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-svh bg-background text-foreground overflow-x-clip">
      <SEO 
        title="Privacy Policy | Ultimate Blend Ladies Beauty Salon Dubai"
        description="Read the Privacy Policy of Ultimate Blend Ladies Beauty Salon to learn how we collect, use, and protect your personal information."
      />
      <Sidebar />
      <main className="md:pl-[88px] pt-14 md:pt-0 bg-[#FAF6F8]">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <h1 className="font-editorial text-4xl md:text-5xl text-[#9F3F5C] mb-8 border-b border-pink-200/40 pb-4">
            Privacy Policy
          </h1>
          <div className="prose prose-pink max-w-none text-[#4A4A4A] space-y-6 leading-relaxed text-sm md:text-base">
            <p className="italic text-gray-500">Last Updated: June 25, 2026</p>
            <p>
              At Ultimate Blend Ladies Beauty Salon Dubai, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ultimate Blend Ladies Beauty Salon and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Information We Collect</h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p>
              When you book an appointment, we collect information such as your name, email address, phone number, physical address (for home services), and appointment notes.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, operate, and maintain our website and salon booking systems</li>
              <li>Improve, personalize, and expand our website and services</li>
              <li>Understand and analyze how you use our website</li>
              <li>Schedule bookings and allocate stylists for your services</li>
              <li>Communicate with you (either directly or through our messaging partners, including WhatsApp notifications) for booking confirmations, reminders, and customer service</li>
              <li>Send you text messages or notifications about promotions and updates (if subscribed)</li>
              <li>Detect and prevent fraud</li>
            </ul>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Log Files</h2>
            <p>
              Ultimate Blend Ladies Beauty Salon follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Third-Party Privacy Policies</h2>
            <p>
              Ultimate Blend Ladies Beauty Salon's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">CCPA & GDPR Data Protection Rights</h2>
            <p>We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
            </ul>

            <h2 className="font-editorial text-2xl text-[#8F3E59] mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
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

export default PrivacyPolicy;
