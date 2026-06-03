import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, Calendar as CalendarIcon, X, MessageSquare } from "lucide-react";

export default function BookingConfirm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get state parameters passed from Booking page
  const { serviceName, dateStr, timeStr, phone } = location.state || {
    serviceName: "Salon Service",
    dateStr: "04 Jun",
    timeStr: "10:30 AM",
    phone: "0503234327"
  };

  const salonWhatsappNumber = "971503234327"; // Salon contact number in international format

  // Create WhatsApp pre-filled message URL
  const messageText = `Hi Ultimate Blend! I just booked an appointment:
- Service: ${serviceName}
- Date: ${dateStr}
- Time: ${timeStr}
- Phone: ${phone}

Looking forward to my visit!`;
  const whatsappUrl = `https://wa.me/${salonWhatsappNumber}?text=${encodeURIComponent(messageText)}`;

  // Auto redirect to WhatsApp if the user completes booking (useful secondary action/redirect)
  useEffect(() => {
    // We can let user trigger this manually via button, or open in a new tab on page load
  }, []);

  const handleAddToCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ultimate Blend//Salon Booking//EN",
      "BEGIN:VEVENT",
      `SUMMARY:Ultimate Blend - ${serviceName}`,
      `DESCRIPTION:Appointment at Ultimate Blend Ladies Beauty Salon. Payment is done on-site.`,
      "LOCATION:Ultimate Blend Ladies Beauty Salon, Dubai",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "appointment.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
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

          {/* SMS Status Message */}
          <div className="w-full bg-[#D8BDCD] border border-pink-200/40 rounded-lg py-3 px-4 shadow-sm text-center">
            <p className="text-xs sm:text-sm text-gray-800 font-bold">
              A confirmation SMS has been sent to <span className="font-black">{phone}</span>.
            </p>
          </div>

          {/* WhatsApp Redirect Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-xl shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            Send Details to WhatsApp (Free)
          </a>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 w-full pt-2">
            <button
              onClick={handleAddToCalendar}
              className="flex items-center justify-center gap-2 py-3 bg-[#9F3F5C] hover:bg-[#8E3852] text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              Add to Calendar
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
