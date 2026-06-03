import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-[#FDF8FA] flex items-center justify-center p-4">
      <div className="bg-white border border-pink-100/50 w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <img 
            src="/ULTIMATE_LOGO-removebg-preview.png" 
            alt="Logo" 
            className="w-16 h-16 mx-auto object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <h1 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#9F3F5C]">
            Admin Control Center
          </h1>
          <p className="text-xs text-gray-400 font-semibold">Ultimate Blend Ladies Beauty Salon</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ultimateblend.com"
                className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-pink-100/70 rounded-xl bg-pink-50/10 focus:border-[#9F3F5C] focus:bg-white outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#9F3F5C] hover:bg-[#8E3852] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[10px] text-gray-400 italic">
            Default credentials for local preview: <span className="font-bold text-gray-500">admin@ultimateblend.com</span> / <span className="font-bold text-gray-500">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
