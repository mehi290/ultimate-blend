import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { SEO } from "@/components/site/SEO";
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Clock, 
  Users, 
  Image, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Authenticate Admin Session
  useEffect(() => {
    async function checkAuth() {
      const mockSession = localStorage.getItem("ub_admin_session");
      if (mockSession === "mock-session-active") {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("ub_admin_session");
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Bookings", path: "/admin/bookings", icon: Calendar },
    { label: "Services", path: "/admin/services", icon: Scissors },
    { label: "Availability", path: "/admin/availability", icon: Clock },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Gallery", path: "/admin/gallery", icon: Image },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#9F3F5C] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800">
      <SEO
        title="Admin | Ultimate Blend Ladies Beauty Salon"
        description="Admin dashboard for Ultimate Blend Ladies Beauty Salon."
        robots="noindex, nofollow"
      />
      
      {/* Mobile Top Bar */}
      <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-[#9F3F5C] tracking-wider uppercase text-sm">
            UB SALON ADMIN
          </span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen sticky top-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <img 
            src="/ULTIMATE_LOGO-removebg-preview.png" 
            alt="Logo" 
            className="w-10 h-10 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="font-display font-black text-sm tracking-widest text-[#9F3F5C] uppercase">
              Ultimate Blend
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">CRM Dashboard</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                  active
                    ? "bg-pink-50 text-[#9F3F5C]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full min-h-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
