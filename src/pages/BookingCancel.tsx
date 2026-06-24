import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AlertCircle, CheckCircle2, ChevronLeft } from "lucide-react";
import { SEO } from "@/components/site/SEO";

export default function BookingCancel() {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setStatus("idle");

    try {
      // 1. Fetch booking to verify it exists and is not already cancelled/completed
      const { data: booking, error: fetchErr } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("id", bookingId.trim())
        .maybeSingle();

      if (fetchErr) throw fetchErr;
      if (!booking) {
        setErrorMsg("Booking ID not found. Please double-check your appointment number.");
        setStatus("error");
        setLoading(false);
        return;
      }

      if (booking.status === "Cancelled") {
        setErrorMsg("This booking has already been cancelled.");
        setStatus("error");
        setLoading(false);
        return;
      }

      if (booking.status === "Completed") {
        setErrorMsg("Completed appointments cannot be cancelled.");
        setStatus("error");
        setLoading(false);
        return;
      }

      // 2. Perform cancel transition
      const { error: updateErr } = await supabase
        .from("bookings")
        .update({ status: "Cancelled" })
        .eq("id", bookingId.trim());

      if (updateErr) throw updateErr;

      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("An error occurred while canceling. Please contact the salon directly.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#2D2D2D] font-sans pb-12">
      <SEO 
        title="Booking Canceled | Ultimate Blend Ladies Beauty Salon"
        description="Your appointment booking has been canceled. Please contact us if you need to reschedule."
        robots="noindex, nofollow"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Booking Canceled | Ultimate Blend Ladies Beauty Salon",
        }}
      />
      <header className="bg-[#9F3F5C] text-white py-6 px-4 text-center relative shadow-sm">

        <button 
          onClick={() => navigate("/")}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-white/90 hover:text-white text-xs font-semibold uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4" /> Home
        </button>
        <h1 className="font-display text-lg sm:text-2xl font-bold tracking-wide uppercase">
          Cancel Appointment
        </h1>
        <p className="text-xs text-[#FFE6F1] mt-1 font-medium">Ultimate Blend Ladies Beauty Salon</p>
      </header>

      <main className="max-w-md mx-auto mt-12 px-4">
        <div className="bg-white border border-pink-100/50 rounded-2xl p-6 shadow-sm space-y-6">
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            If you need to cancel your appointment, please enter your Booking Reference ID below. You can find this in your confirmation details.
          </p>

          {status === "success" ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-gray-800">Booking Cancelled</h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Your appointment has been successfully cancelled. We hope to serve you again in the future!
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 px-6 py-2 bg-[#9F3F5C] text-white text-xs font-bold rounded-lg"
              >
                Back to Homepage
              </button>
            </div>
          ) : (
            <form onSubmit={handleCancel} className="space-y-4">
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                  Booking Reference ID
                </label>
                <input
                  type="text"
                  required
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  placeholder="e.g. d3300998-0a51-4b10-8168-fd4b37e55685"
                  className="w-full px-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all text-center"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow transition-colors"
              >
                {loading ? "Processing..." : "Cancel Appointment"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
