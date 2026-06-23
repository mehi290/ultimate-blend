import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Pages
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Booking from "./pages/Booking.tsx";
import BookingConfirm from "./pages/BookingConfirm.tsx";
import BookingCancel from "./pages/BookingCancel.tsx";

// Admin Pages
import AdminLogin from "./pages/admin/Login.tsx";
import AdminDashboard from "./pages/admin/Dashboard.tsx";
import AdminBookings from "./pages/admin/Bookings.tsx";
import AdminServices from "./pages/admin/Services.tsx";
import AdminAvailability from "./pages/admin/Availability.tsx";
import AdminCustomers from "./pages/admin/Customers.tsx";
import AdminGallery from "./pages/admin/Gallery.tsx";
import AdminDashboardNew from "./pages/AdminDashboard.tsx";

import { AnalyticsTracker } from "@/components/site/AnalyticsTracker";

const ChatRedirect = () => {
  useEffect(() => {
    window.location.replace("https://wa.me/971556173486");
  }, []);
  return (
    <div className="min-h-screen bg-[#FDF8FA] flex items-center justify-center">
      <p className="text-[#9F3F5C] font-semibold">Redirecting you to WhatsApp...</p>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SpeedInsights />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<Index />} />
          <Route path="/services" element={<Index />} />
          <Route path="/services/:category" element={<Index />} />
          <Route path="/testimonials" element={<Index />} />
          <Route path="/ourwork" element={<Index />} />
          <Route path="/contactus" element={<Index />} />
          <Route path="/deira" element={<Index />} />
          <Route path="/salon-near-me" element={<Index />} />
          <Route path="/home-service-dubai" element={<Index />} />
          <Route path="/terms-conditions" element={<Index />} />
          <Route path="/privacy-policy" element={<Index />} />
          <Route path="/faq" element={<Index />} />
          <Route path="/gallery" element={<Index />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/booking/cancel" element={<BookingCancel />} />

          <Route path="/chat" element={<ChatRedirect />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardNew />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboardNew />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/availability" element={<AdminAvailability />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
