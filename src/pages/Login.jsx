import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  Share2,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim();
    const password = formData.get("password");

    try {
      const { data, error } = await signIn({ email, password });

      if (error) throw error;

      setMessage("Login successful!");

      // Navigate based on the user's profile role.
      const { data: profile, error: profileError } = await (
        await import("../lib/supabase")
      ).supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      navigate(
        profile?.role === "owner" ? "/owner/dashboard" : "/borrower/dashboard",
        { replace: true },
      );
    } catch (error) {
      setMessage(error.message || "Unable to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-indigo-600 to-violet-700 p-10 text-white md:flex">
        <div>
          <div className="inline-flex rounded-xl bg-white/15 p-3">
            <Share2 className="h-7 w-7" />
          </div>
          <h1 className="mt-10 text-4xl font-bold leading-tight">
            Welcome back to a community that shares.
          </h1>
          <p className="mt-5 leading-7 text-indigo-100">
            Access your account to discover resources, manage requests, and make
            sharing easier.
          </p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5">
          <p className="text-lg font-semibold">Share more. Waste less.</p>
          <p className="mt-2 text-sm text-indigo-100">
            Together, we can make better use of the resources around us.
          </p>
        </div>
      </div>

      <div className="p-7 sm:p-10">
        <div className="mb-8 md:hidden">
          <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-brand-600">
            <Share2 className="h-6 w-6" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-brand-600">Welcome back</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Sign in to ShareSpace
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your account details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                minLength={6}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-12 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm leading-5 text-blue-700"
            >
              {message}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}{" "}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
