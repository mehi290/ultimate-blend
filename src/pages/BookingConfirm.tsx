import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, MessageCircle, X } from "lucide-react";
import { SEO } from "@/components/site/SEO";

export default function BookingConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get state parameters passed from Booking page
  const { serviceName, dateStr, timeStr, phone, customerName } = location.state || {
    serviceName: "Salon Service",
    dateStr: "04 Jun",
    timeStr: "10:30 AM",
    phone: "0503234327",
    customerName: "Client"
  };

  // Auto redirect to WhatsApp if the user completes booking (useful secondary action/redirect)
  useEffect(() => {
    // We can let user trigger this manually via button, or open in a new tab on page load
  }, []);

  const handleConfirmOnWhatsApp = () => {
    const nameToUse = customerName || location.state?.booking?.customer_name || "Client";
    const text = `Hi, I would like to confirm my booking:
- *Name:* ${nameToUse}
- *Service(s):* ${serviceName}
- *Date:* ${dateStr}
- *Time:* ${timeStr}
- *Phone:* ${phone}`;

    const whatsappUrl = `https://wa.me/971556173486?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
      <SEO 
        title="Booking Confirmed | Ultimate Blend Ladies Beauty Salon"
        description="Your appointment has been successfully booked! We look forward to welcoming you at Ultimate Blend Ladies Beauty Salon."
      />
      {/* Container Card */}
      <div className="bg-[#EAD0DC] w-full max-w-lg rounded-2xl shadow-xl overflow-hidden relative border border-pink-100/30">

        
        {/* Header section with X button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-pink-200/20">
          <span className="font-display font-black text-[#2D2D2D] text-base sm:text-lg tracking-[0.1em] uppercase">
            BOOKING CONFIRMED
          </span>
          <div className="flex items-center gap-3">
            <img 
              src="/ULTIMATE_LOGO-removebg-preview.png" 
              alt="Ultimate Blend Logo" 
              className="w-10 h-10 object-contain"
              onError={(e) => {
                // hide if missing
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <button 
              onClick={() => navigate("/")}
              className="p-1.5 bg-[#C894AB]/40 text-[#2D2D2D] hover:bg-[#C894AB]/60 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center space-y-6">
          
          {/* Green Check Indicator */}
          <div className="w-16 h-16 rounded-full bg-[#1AA768] flex items-center justify-center shadow-md">
            <Check className="w-10 h-10 text-white stroke-[3px]" />
          </div>

          <div className="space-y-3">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#2D2D2D] tracking-[0.05em] uppercase">
              CONGRATULATIONS!
            </h2>
            <p className="text-sm sm:text-base text-gray-800 leading-relaxed max-w-md mx-auto">
              Your appointment has been booked successfully for <span className="font-bold text-[#9F3F5C]">{dateStr}</span> at <span className="font-bold text-[#9F3F5C]">{timeStr}</span>.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 font-semibold">
              Thank you for choosing Ultimate Blend Ladies Beauty Salon
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 w-full pt-2">
            <button
              onClick={handleConfirmOnWhatsApp}
              className="flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-colors"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Confirm on WhatsApp
            </button>
            <button
              onClick={() => navigate("/")}
              className="py-3 border border-gray-400 bg-white/40 text-gray-800 hover:bg-white/60 text-xs sm:text-sm font-bold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
