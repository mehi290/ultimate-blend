import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const FAQ = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const faqs = [
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

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 2);

  return (
    <section id="faq" className="py-12 md:py-16 px-6 md:px-16 bg-[#FDF8FA]">
      <div className="max-w-4xl mx-auto">
        
        {/* Uppercase Header matching your screenshot styling */}
        <div className="mb-10 text-left">
          <h2 className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-[0.05em] uppercase">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Flat Accordion layout (all items closed by default) */}
        <div className="space-y-2">
          {displayedFaqs.map((item, idx) => (
            <details
              key={idx}
              className="group bg-white border border-pink-100/30 rounded-lg overflow-hidden shadow-sm transition-all duration-200"
            >
              <summary className="flex items-center justify-between p-4 md:p-5 text-xs md:text-sm font-semibold text-[#2D2D2D] cursor-pointer hover:bg-pink-50/10 list-none select-none [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{item.question}</span>
                <span className="w-5 h-5 flex items-center justify-center text-gray-400 group-open:rotate-180 transition-transform duration-200">
                  <svg
                    className="w-3.5 h-3.5 text-[#9F3F5C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </summary>
              <div className="px-4 pb-4 md:px-5 md:pb-5 text-[11px] md:text-xs text-gray-600 border-t border-pink-50/30 pt-3 leading-relaxed bg-[#FDF8FA]/10">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        {/* See More / See Less Toggle Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#9F3F5C] hover:text-[#8E3852] underline transition-colors focus:outline-none"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>

        {/* Compact CTA */}
        <div className="mt-12 text-center border-t border-pink-100/50 pt-8">
          <p className="text-xs text-gray-500 mb-4">Ready to transform your look?</p>
          <button
            onClick={() => navigate("/booking")}
            className="px-8 py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] text-white font-display text-xs font-bold tracking-[0.1em] uppercase transition-all duration-200"
          >
            Book Your Braiding Appointment Now
          </button>
        </div>
      </div>
    </section>
  );
};
