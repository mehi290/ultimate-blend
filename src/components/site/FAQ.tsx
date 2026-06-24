import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FAQ_ITEMS } from "@/lib/seo-config";

export const FAQ = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const displayedFaqs = showAll ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 2);

  return (
    <section id="faq" className="py-12 md:py-16 px-6 md:px-16 bg-[#FDF8FA]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-left">
          <h2 className="font-display font-black text-[#9F3F5C] text-2xl md:text-4xl tracking-[0.05em] uppercase">
            Frequently Asked Questions
          </h2>
        </div>

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

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-semibold text-[#9F3F5C] hover:text-[#8E3852] underline transition-colors focus:outline-none"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>

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
