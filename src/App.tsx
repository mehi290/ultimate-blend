import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking/confirm" element={<BookingConfirm />} />
          <Route path="/booking/cancel" element={<BookingCancel />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
