
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CheckCircle,
  Clock,
  Repeat,
  MapPin,
  CalendarDays,
  Search,
  Check,
  X,
  Eye,
  ArrowRight,
  Inbox,
} from "lucide-react";

import { ownerRequests } from "../data/ownerData";
import { useAppContext } from "../context/AppContext";

const statusStyles = {
  available: "bg-green-100 text-green-700",
  borrowed: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const formatDate = (date) => {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// Statistics Card
function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>

        <div className={`rounded-lg p-2 ${color}`}>
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function OwnerDashboard() {
  // Shared resources from AppContext
  const { resources } = useAppContext();

  // Local state for borrowing requests
  const [requests, setRequests] = useState(ownerRequests);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    return {
      total: resources.length,

      available: resources.filter(
        (resource) => resource.status === "available"
      ).length,

      pending: requests.filter(
        (request) => request.status === "pending"
      ).length,

      borrowed: resources.filter(
        (resource) => resource.status === "borrowed"
      ).length,
    };
  }, [requests, resources]);

  // Search resources
  const filteredResources = resources.filter((resource) =>
    `${resource.name} ${resource.category} ${resource.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Search and filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesSearch = `
      ${request.resourceName}
      ${request.borrowerName}
      ${request.borrowerEmail}
    `
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || request.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  // Approve or reject request
  const updateRequestStatus = (requestId, newStatus) => {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: newStatus }
          : request
      )
    );
  };

  const filters = ["all", "pending", "approved", "rejected"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              OWNER PANEL
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Owner Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your shared resources and borrowing requests.
            </p>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Explore Resources
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Statistics */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Overview
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Resources"
              value={stats.total}
              icon={Package}
              color="bg-indigo-100 text-indigo-600"
            />

            <StatCard
              title="Available Resources"
              value={stats.available}
              icon={CheckCircle}
              color="bg-green-100 text-green-600"
            />

            <StatCard
              title="Pending Requests"
              value={stats.pending}
              icon={Clock}
              color="bg-amber-100 text-amber-600"
            />

            <StatCard
              title="Currently Borrowed"
              value={stats.borrowed}
              icon={Repeat}
              color="bg-blue-100 text-blue-600"
            />
          </div>
        </section>

        {/* My Resources */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                My Resources
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Resources you have listed on ShareSpace.
              </p>
            </div>

            <Link
              to="/owner/resources"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Manage Resources →
            </Link>
          </div>

          {/* Resource Search */}
          <div className="relative mb-5">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search resources and requests..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="rounded-xl border border-gray-200 p-4 transition hover:border-indigo-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {resource.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {resource.category}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusStyles[resource.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {resource.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <MapPin size={15} />
                    {resource.location}
                  </p>

                  <p>
                    Condition:{" "}
                    <span className="font-medium text-gray-700">
                      {resource.condition}
                    </span>
                  </p>

                  <p>
                    Copies:{" "}
                    <span className="font-medium text-gray-700">
                      {resource.totalCopies}
                    </span>
                  </p>
                </div>

                <div className="mt-4 border-t border-gray-100 pt-3">
                  <Link
                    to={`/resources/${resource.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    <Eye size={16} />
                    View Resource
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <p className="py-8 text-center text-gray-500">
              No resources found.
            </p>
          )}
        </section>

        {/* Borrowing Requests */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Borrowing Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review and respond to requests from borrowers.
            </p>
          </div>

          {/* Request Filters */}
          <div className="mb-5 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Request Cards */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="rounded-xl border border-gray-200 p-4 sm:p-5"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-xs font-medium text-gray-400">
                      {request.id}
                    </p>

                    <h3 className="mt-1 font-semibold text-gray-900">
                      {request.resourceName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      Requested by {request.borrowerName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {request.borrowerEmail}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusStyles[request.status] ||
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-gray-500 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />

                    {formatDate(request.startDate)} –{" "}
                    {formatDate(request.endDate)}
                  </p>

                  <p className="flex items-start gap-2">
                    <Inbox size={16} className="mt-0.5 shrink-0" />
                    {request.purpose}
                  </p>
                </div>

                {/* Approve / Reject */}
                {request.status === "pending" && (
                  <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        updateRequestStatus(request.id, "approved")
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                      <Check size={16} />
                      Approve
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateRequestStatus(request.id, "rejected")
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredRequests.length === 0 && (
            <div className="py-10 text-center">
              <Inbox
                size={35}
                className="mx-auto text-gray-300"
              />

              <p className="mt-3 font-medium text-gray-700">
                No requests found
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default OwnerDashboard;
