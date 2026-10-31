import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Clock3,
  CheckCircle2,
  History,
  MapPin,
  CalendarDays,
  ArrowRight,
  Search,
  ClipboardList,
  RotateCcw,
} from "lucide-react";

import { borrowerBookings, bookingStatuses } from "../data/bookings";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
  approved: "bg-blue-50 text-blue-700 border border-blue-200/60",
  borrowed: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
  completed: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200/60",
};

const statusLabels = {
  pending: "Pending",
  approved: "Approved",
  borrowed: "Borrowed",
  completed: "Completed",
  rejected: "Rejected",
};

const stats = [
  {
    label: "Total requests",
    key: "total",
    icon: ClipboardList,
    color: "bg-indigo-50 text-indigo-600 ring-4 ring-indigo-50/50",
  },
  {
    label: "Pending requests",
    key: "pending",
    icon: Clock3,
    color: "bg-amber-50 text-amber-600 ring-4 ring-amber-50/50",
  },
  {
    label: "Currently borrowing",
    key: "borrowed",
    icon: Package,
    color: "bg-blue-50 text-blue-600 ring-4 ring-blue-50/50",
  },
  {
    label: "Completed",
    key: "completed",
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50",
  },
];

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BorrowerDashboard() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const counts = useMemo(
    () => ({
      total: borrowerBookings.length,
      pending: borrowerBookings.filter((b) => b.status === "pending").length,
      borrowed: borrowerBookings.filter((b) => b.status === "borrowed").length,
      completed: borrowerBookings.filter((b) => b.status === "completed").length,
    }),
    []
  );

  const filteredBookings = useMemo(() => {
    let result = [...borrowerBookings];

    if (activeFilter !== "all") {
      result = result.filter((booking) => booking.status === activeFilter);
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((booking) =>
        [
          booking.resourceName,
          booking.category,
          booking.owner,
          booking.location,
          booking.id,
        ].some((value) => value.toLowerCase().includes(query))
      );
    }

    return result.sort(
      (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt)
    );
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-slate-100/50 pb-16 pt-4 sm:pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Heading Banner */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-5 py-8 text-white shadow-xl sm:px-10 sm:py-10">
          <div className="absolute -right-10 -top-10 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-100 backdrop-blur-md">
              Borrower workspace
            </span>

            <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight sm:text-4xl">
              My Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-xs sm:text-base leading-relaxed text-indigo-100">
              Track your borrowing requests, manage active community resources,
              and review your borrowing history seamlessly.
            </p>

            <div className="mt-5 sm:mt-6">
              <Link
                to="/explore"
                className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg shadow-black/5 transition-all hover:bg-indigo-50 active:scale-95"
              >
                Explore resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.key}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className={`rounded-xl p-2.5 sm:p-3 transition-transform group-hover:scale-110 ${stat.color}`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {counts[stat.key]}
                  </span>
                </div>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </section>

        {/* Booking Section */}
        <section className="mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                My bookings
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
                View and track all your active or past borrowing activity.
              </p>
            </div>

            <span className="self-start sm:self-auto rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
              {filteredBookings.length} results found
            </span>
          </div>

          {/* Search Bar */}
          <div className="mt-5 sm:mt-6 flex items-center gap-2.5 rounded-xl sm:rounded-2xl border border-slate-200/85 bg-white px-3.5 sm:px-4 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search resource, owner, location, or ID..."
              className="h-12 sm:h-14 w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Status Filters */}
          <div className="mt-4 sm:mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {bookingStatuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setActiveFilter(status)}
                className={`shrink-0 rounded-xl px-3.5 sm:px-4.5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold capitalize transition-all ${
                  activeFilter === status
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-600/20"
                    : "border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {status === "all" ? "All bookings" : statusLabels[status]}
              </button>
            ))}
          </div>

          {/* Booking Cards List */}
          {filteredBookings.length > 0 ? (
            <div className="mt-5 sm:mt-6 space-y-4">
              {filteredBookings.map((booking) => (
                <article
                  key={booking.id}
                  className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        ID: {booking.id}
                      </span>

                      <h3 className="mt-2 text-base sm:text-xl font-bold text-slate-900">
                        {booking.resourceName}
                      </h3>

                      <p className="mt-0.5 text-xs sm:text-sm font-medium text-indigo-600">
                        {booking.category}
                      </p>
                    </div>

                    <span
                      className={`self-start sm:self-auto rounded-full px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </div>

                  {/* Mobile-optimized single-column stacking grid */}
                  <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4 rounded-xl bg-slate-50/70 p-3.5 sm:p-4 border border-slate-100 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">Resource owner</p>
                      <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-slate-800">
                        {booking.owner}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">Location</p>
                      <p className="mt-0.5 sm:mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800">
                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">{booking.location}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">Borrowing period</p>
                      <p className="mt-0.5 sm:mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-800">
                        <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">{formatDate(booking.startDate)} – {formatDate(booking.endDate)}</span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">Requested on</p>
                      <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-bold text-slate-800">
                        {formatDate(booking.requestedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 sm:mt-4 rounded-xl border border-slate-100 bg-white p-3.5 sm:p-4">
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      Borrowing purpose
                    </p>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {booking.purpose}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <Link
                      to={`/resources/${booking.resourceId}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-800"
                    >
                      View resource details
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <div>
                      {booking.status === "borrowed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700">
                          <Package className="h-4 w-4" />
                          Currently with you
                        </span>
                      )}

                      {booking.status === "completed" && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          <History className="h-4 w-4" />
                          Successfully returned
                        </span>
                      )}

                      {booking.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                          <Clock3 className="h-4 w-4" />
                          Waiting for owner approval
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                <Package className="h-7 w-7" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                No matching bookings found
              </h3>

              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                Try modifying your search query or select a different booking status filter tab.
              </p>

              <button
                type="button"
                onClick={() => {
                  search("");
                  setActiveFilter("all");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
              >
                <RotateCcw className="h-4 w-4" />
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default BorrowerDashboard;