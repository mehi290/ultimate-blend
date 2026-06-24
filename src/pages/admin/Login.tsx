import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { SEO } from "@/components/site/SEO";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Check if user is trying to preview with mock credentials
        if (email === "admin@ultimateblend.com" && password === "admin123") {
          localStorage.setItem("ub_admin_session", "mock-session-active");
          navigate("/admin/dashboard");
          return;
        }
        throw error;
      }

      navigate("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Invalid login credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-white flex items-center justify-center p-4 font-sans">
      <SEO
        title="Admin Login | Ultimate Blend Ladies Beauty Salon"
        description="Admin login for Ultimate Blend Ladies Beauty Salon."
        robots="noindex, nofollow"
      />
      <div className="bg-[#18181C] border border-[#2D2D35] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#9F3F5C]" />
        
        <div className="text-center space-y-2">
          <img 
            src="/ULTIMATE_LOGO-removebg-preview.png" 
            alt="Logo" 
            className="w-16 h-16 mx-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
            Admin Control Center
          </h1>
          <p className="text-xs text-gray-400 font-semibold">Ultimate Blend Ladies Beauty Salon</p>
        </div>

        {errorMsg && (
          <div className="bg-red-950/60 border border-red-900 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ultimateblend.com"
                className="w-full pl-10 pr-4 py-3 border border-[#2E2E38] bg-[#222228] text-white rounded-xl focus:border-[#9F3F5C] outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-[#2E2E38] bg-[#222228] text-white rounded-xl focus:border-[#9F3F5C] outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow transition-colors uppercase tracking-wider font-display"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] text-gray-500 italic">
            Default credentials for local preview: <span className="font-bold text-gray-400">admin@ultimateblend.com</span> / <span className="font-bold text-gray-400">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
