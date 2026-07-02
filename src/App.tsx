import { useEffect, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

// Main Landing Page (statically imported to prevent any landing page delay)
import Index from "./pages/Index.tsx";

// Lazy-loaded Pages (code-split to optimize initial JS bundle size)
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Booking = lazy(() => import("./pages/Booking.tsx"));
const BookingConfirm = lazy(() => import("./pages/BookingConfirm.tsx"));
const BookingCancel = lazy(() => import("./pages/BookingCancel.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));

// Lazy-loaded Admin Pages
const AdminLogin = lazy(() => import("./pages/admin/Login.tsx"));
const AdminBookings = lazy(() => import("./pages/admin/Bookings.tsx"));
const AdminServices = lazy(() => import("./pages/admin/Services.tsx"));
const AdminAvailability = lazy(() => import("./pages/admin/Availability.tsx"));
const AdminCustomers = lazy(() => import("./pages/admin/Customers.tsx"));
const AdminGallery = lazy(() => import("./pages/admin/Gallery.tsx"));
const AdminDashboardNew = lazy(() => import("./pages/AdminDashboard.tsx"));

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
      <Analytics />
      <BrowserRouter>
        <AnalyticsTracker />
        <Suspense fallback={
          <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#9F3F5C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            {/* Client Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/services" element={<Index />} />
            <Route path="/services/:category" element={<Index />} />
            <Route path="/testimonials" element={<Index />} />
            <Route path="/ourwork" element={<Index />} />
            <Route path="/contactus" element={<Index />} />
            <Route path="/salon-near-me" element={<Index />} />
            <Route path="/home-service-dubai" element={<Index />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<Index />} />
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
