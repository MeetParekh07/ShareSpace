
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Package,
  CalendarDays,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Camera,
  Laptop,
  Drill,
  BookOpen,
  Microscope,
  Dumbbell,
  Info,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

const categoryIcons = {
  Electronics: Laptop,
  Photography: Camera,
  "Tools & Equipment": Drill,
  "Study Materials": BookOpen,
  "Lab Equipment": Microscope,
  Sports: Dumbbell,
};

const categoryColors = {
  Electronics: "bg-blue-100 text-blue-600",
  Photography: "bg-purple-100 text-purple-600",
  "Tools & Equipment": "bg-orange-100 text-orange-600",
  "Study Materials": "bg-green-100 text-green-600",
  "Lab Equipment": "bg-cyan-100 text-cyan-600",
  Sports: "bg-rose-100 text-rose-600",
};

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function ResourceDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch resource from Supabase
  useEffect(() => {
    async function fetchResource() {
      setLoading(true);
      setFetchError("");

      const { data, error: resourceError } = await supabase
        .from("resources")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (resourceError) {
        console.error("Resource fetch error:", resourceError);
        setFetchError("Unable to load this resource. Please try again.");
        setResource(null);
      } else if (!data) {
        setResource(null);
      } else {
        setResource({
          ...data,
          maxBorrowDays: Number(data.max_borrow_days || 5),
          totalCopies: Number(data.total_copies || 0),
          availability:
            data.is_active && Number(data.total_copies) > 0
              ? "Available"
              : "Unavailable",
          owner: "Community member",
        });
      }

      setLoading(false);
    }

    fetchResource();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm font-medium text-slate-500">
          Loading resource details...
        </p>
      </div>
    );
  }

  // Fetch error
  if (fetchError) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-slate-300" />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-slate-500">{fetchError}</p>

        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  // Resource not found
  if (!resource) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center">
        <Package className="mx-auto h-12 w-12 text-slate-300" />

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Resource not found
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          This resource may have been removed or the link is incorrect.
        </p>

        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>
    );
  }

  const Icon = categoryIcons[resource.category] || Package;

  const iconColor =
    categoryColors[resource.category] || "bg-indigo-100 text-indigo-600";

  const isAvailable = resource.availability === "Available";

  // Submit borrow request to Supabase
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!user) {
      setError("Please log in to submit a borrow request.");
      return;
    }

    if (!isAvailable) {
      setError("This resource is currently not available.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select both borrowing and return dates.");
      return;
    }

    const start = new Date(`${startDate}T00:00:00`);
    const end = new Date(`${endDate}T00:00:00`);

    if (end < start) {
      setError("Return date cannot be before the borrowing date.");
      return;
    }

    const borrowingDays =
      Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    if (borrowingDays > resource.maxBorrowDays) {
      setError(
        `You can borrow this resource for a maximum of ${resource.maxBorrowDays} days.`
      );
      return;
    }

    if (!purpose.trim()) {
      setError("Please tell us why you need this resource.");
      return;
    }

    setSubmitting(true);

    try {
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert([
          {
            resource_id: resource.id,
            borrower_id: user.id,
            start_date: startDate,
            end_date: endDate,
            purpose: purpose.trim(),
            status: "pending",
          },
        ]);

      if (bookingError) {
        console.error("Booking error:", bookingError);
        setError(bookingError.message);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected booking error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function resetRequest() {
    setStartDate("");
    setEndDate("");
    setPurpose("");
    setError("");
    setSubmitted(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

        {/* Back navigation */}
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-brand-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to resources
        </Link>

        {/* Page heading */}
        <div className="mt-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {resource.category}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {resource.availability}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {resource.name}
          </h1>

          <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="h-4 w-4" />
            {resource.location}
          </p>
        </div>

        {/* Main content */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_390px]">

          {/* Left: Resource information */}
          <div className="space-y-6">

            {/* Resource image */}
            <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-indigo-50 sm:min-h-96">
              {resource.image_url ? (
                <img
                  src={resource.image_url}
                  alt={resource.name}
                  className="h-full max-h-96 w-full object-cover"
                />
              ) : (
                <div className={`rounded-3xl p-10 ${iconColor}`}>
                  <Icon className="h-24 w-24" strokeWidth={1.5} />
                </div>
              )}
            </div>

            {/* Description */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                About this resource
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {resource.description}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <ShieldCheck className="h-5 w-5 text-brand-600" />
                    <span className="text-xs font-medium">Condition</span>
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {resource.condition || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock3 className="h-5 w-5 text-brand-600" />
                    <span className="text-xs font-medium">
                      Maximum duration
                    </span>
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {resource.maxBorrowDays} days
                  </p>
                </div>
              </div>
            </section>

            {/* Owner information */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Shared by
              </h2>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-brand-700">
                  <Package className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {resource.owner}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Community resource provider
                  </p>
                </div>
              </div>
            </section>

            {/* Borrowing rules */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-brand-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  Borrowing guidelines
                </h2>
              </div>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Wait for the owner to approve your request.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Collect the resource only after approval.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Return it on or before the selected return date.
                </li>

                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  Keep the resource in good condition.
                </li>
              </ul>
            </section>
          </div>

          {/* Right: Borrow request form */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              {submitted ? (
                <div className="py-5 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-slate-900">
                    Request submitted!
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your borrowing request for{" "}
                    <strong>{resource.name}</strong> has been saved
                    successfully. The owner can now review your request.
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-sm">
                    <p className="text-slate-500">Borrowing period</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {startDate} to {endDate}
                    </p>
                  </div>

                  <Button
                    className="mt-6 w-full"
                    onClick={resetRequest}
                    variant="outline"
                  >
                    Make another request
                  </Button>

                  <Link
                    to="/explore"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    Explore more resources
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-semibold text-brand-600">
                      Borrow this resource
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      Send a request
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Choose your dates and explain why you need this resource.
                    </p>
                  </div>

                  {!isAvailable ? (
                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-sm font-semibold text-amber-800">
                        Currently unavailable
                      </p>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        This resource is currently unavailable. Please check
                        back later.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">

                      {/* Start date */}
                      <div>
                        <label
                          htmlFor="startDate"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Borrowing date
                        </label>

                        <div className="relative">
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="startDate"
                            type="date"
                            min={getToday()}
                            value={startDate}
                            onChange={(event) => {
                              setStartDate(event.target.value);
                              setError("");

                              if (
                                endDate &&
                                event.target.value &&
                                endDate < event.target.value
                              ) {
                                setEndDate("");
                              }
                            }}
                            required
                            className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                          />
                        </div>
                      </div>

                      {/* End date */}
                      <div>
                        <label
                          htmlFor="endDate"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Return date
                        </label>

                        <div className="relative">
                          <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                          <input
                            id="endDate"
                            type="date"
                            min={startDate || getToday()}
                            value={endDate}
                            onChange={(event) => {
                              setEndDate(event.target.value);
                              setError("");
                            }}
                            required
                            className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                          />
                        </div>

                        <p className="mt-2 text-xs text-slate-400">
                          Maximum {resource.maxBorrowDays} calendar days,
                          including the borrowing date.
                        </p>
                      </div>

                      {/* Purpose */}
                      <div>
                        <label
                          htmlFor="purpose"
                          className="mb-2 block text-sm font-medium text-slate-700"
                        >
                          Why do you need this resource?
                        </label>

                        <textarea
                          id="purpose"
                          rows={4}
                          value={purpose}
                          onChange={(event) => {
                            setPurpose(event.target.value);
                            setError("");
                          }}
                          placeholder="Explain how you plan to use it..."
                          required
                          maxLength={300}
                          className="w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />

                        <p className="mt-1 text-right text-xs text-slate-400">
                          {purpose.length}/300
                        </p>
                      </div>

                      {/* Error message */}
                      {error && (
                        <p
                          role="alert"
                          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        >
                          {error}
                        </p>
                      )}

                      {/* Submit button */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Request to borrow"}
                        {!submitting && (
                          <ArrowRight className="h-4 w-4" />
                        )}
                      </Button>

                      <p className="text-center text-xs leading-5 text-slate-400">
                        Sending a request does not guarantee approval.
                        The resource owner must approve it first.
                      </p>
                    </form>
                  )}
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ResourceDetails;
