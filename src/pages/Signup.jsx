import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  LockKeyhole,
  HandHelping,
  PackagePlus,
  ArrowRight,
  Share2,
} from "lucide-react";

import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [role, setRole] = useState("borrower");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName").trim();
    const email = formData.get("email").trim();
    const password = formData.get("password");

    try {
      const { data, error } = await signUp({
        full_name: fullName,
        email,
        password,
        role,
      });

      if (error) throw error;

      // Clear signup fields
      form.reset();
      setRole("borrower");
      setShowPassword(false);

      if (data.session) {
        setMessage("Account created successfully! Redirecting...");

        // Give the authentication context time to update
        setTimeout(() => {
          navigate(
            role === "owner" ? "/owner/dashboard" : "/borrower/dashboard",
            { replace: true },
          );
        }, 500);
      } else {
        setMessage("Account created! Please verify your email, then log in.");

        setTimeout(() => {
          navigate("/login", {
            replace: true,
            state: {
              email,
              message:
                "Account created successfully! Please verify your email before logging in.",
            },
          });
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
          <Share2 className="h-7 w-7" />
        </div>

        <p className="mt-4 text-sm font-semibold text-brand-600">
          Join our community
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Create your account
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Start sharing and borrowing resources with your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Full name
          </label>

          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
              minLength={2}
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signupEmail"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="signupEmail"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>

        {/* Role selection */}
        <div>
          <label className="mb-3 block text-sm font-medium text-slate-700">
            How do you want to use ShareSpace?
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setRole("borrower")}
              aria-pressed={role === "borrower"}
              className={`rounded-xl border p-4 text-left transition ${
                role === "borrower"
                  ? "border-brand-600 bg-indigo-50 ring-2 ring-brand-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <HandHelping
                  className={`h-7 w-7 ${role === "borrower" ? "text-brand-600" : "text-slate-500"}`}
                />
                <span
                  className={`h-4 w-4 rounded-full border-2 ${role === "borrower" ? "border-brand-600 bg-brand-600 ring-2 ring-white" : "border-slate-300"}`}
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">Borrower</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Discover and borrow resources from others.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setRole("owner")}
              aria-pressed={role === "owner"}
              className={`rounded-xl border p-4 text-left transition ${
                role === "owner"
                  ? "border-brand-600 bg-indigo-50 ring-2 ring-brand-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <PackagePlus
                  className={`h-7 w-7 ${role === "owner" ? "text-brand-600" : "text-slate-500"}`}
                />
                <span
                  className={`h-4 w-4 rounded-full border-2 ${role === "owner" ? "border-brand-600 bg-brand-600 ring-2 ring-white" : "border-slate-300"}`}
                />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">Owner</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                List your resources and manage requests.
              </p>
            </button>
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="signupPassword"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              id="signupPassword"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              minLength={6}
              className="h-12 w-full rounded-lg border border-slate-300 pl-11 pr-12 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
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

          <p className="mt-2 text-xs text-slate-400">
            Use at least 6 characters.
          </p>
        </div>

        {message && (
          <p
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm leading-5 text-green-700"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-5 text-red-700"
          >
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

export default Signup;
