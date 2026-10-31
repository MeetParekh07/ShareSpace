import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Share2 } from "lucide-react";
import Button from "../components/ui/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      `Demo mode: If an account exists for ${email}, password reset instructions would be sent.`,
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-brand-600">
        <Mail className="h-7 w-7" />
      </div>

      <p className="mt-7 text-sm font-semibold text-brand-600">
        Account recovery
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        Forgot password?
      </h1>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        Don't worry! Enter the email address associated with your account. We'll
        show you the next step.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="resetEmail"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email address
          </label>

          <input
            id="resetEmail"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            placeholder="you@example.com"
            required
            className="h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {message && (
          <p
            role="status"
            className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm leading-5 text-blue-700"
          >
            {message}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          Send reset instructions
        </Button>
      </form>

      <Link
        to="/login"
        className="mt-7 flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </Link>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Share2 className="h-4 w-4" />
        ShareSpace
      </div>
    </div>
  );
}

export default ForgotPassword;
