import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Shield, Cloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isCloud = isSupabaseConfigured();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || "Failed to sign in. Please verify your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-600 selection:text-white">
      {/* Top Bar Navigation */}
      <header className="py-5 px-6 md:px-10 max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Website</span>
        </Link>

        {/* Database Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 bg-white shadow-2xs text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Cloud className="w-3.5 h-3.5 text-emerald-600" />
          <span>Supabase Auth Live</span>
        </div>
      </header>

      {/* Main Login Presentation */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-4 shadow-sm hover:bg-slate-800 transition-colors">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Admin Portal
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Sign in with your verified administrative credentials
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 sm:p-8">
            {errorMessage && (
              <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200/80 text-red-700 text-xs font-medium leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="text-xs font-medium text-slate-700 block mb-1.5"
                >
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="admin-email"
                    type="email"
                    required
                    placeholder="admin@suhrid.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 pl-9 pr-3 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="admin-password"
                  className="text-xs font-medium text-slate-700 block mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 pl-9 pr-10 rounded-lg border-slate-300 text-sm focus:border-emerald-500 focus:ring-emerald-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm shadow-xs transition-colors gap-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Verifying with Supabase...</span>
                    </div>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <Shield className="w-3 h-3 text-slate-400" />
                Protected by Supabase Authentication (SSL Encrypted)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Chirosuhrid Social Welfare Society • All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
