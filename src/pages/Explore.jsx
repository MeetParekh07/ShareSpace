import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Package,
  Camera,
  Laptop,
  Drill,
  BookOpen,
  Microscope,
  Dumbbell,
  ArrowRight,
  X,
  Clock3,
  RotateCcw,
} from "lucide-react";

import {
  resources,
  categories,
  locations,
} from "../data/resources";

const categoryIcons = {
  Electronics: Laptop,
  Photography: Camera,
  "Tools & Equipment": Drill,
  "Study Materials": BookOpen,
  "Lab Equipment": Microscope,
  Sports: Dumbbell,
};

const categoryColors = {
  Electronics: "bg-blue-50 text-blue-600 border border-blue-200/60",
  Photography: "bg-purple-50 text-purple-600 border border-purple-200/60",
  "Tools & Equipment": "bg-orange-50 text-orange-600 border border-orange-200/60",
  "Study Materials": "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
  "Lab Equipment": "bg-cyan-50 text-cyan-600 border border-cyan-200/60",
  Sports: "bg-rose-50 text-rose-600 border border-rose-200/60",
};

function Explore() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Apply all selected filters to the resource list.
  const filteredResources = useMemo(() => {
    let result = [...resources];

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((resource) =>
        [
          resource.name,
          resource.description,
          resource.category,
          resource.owner,
          resource.location,
        ].some((value) => value.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "All Categories") {
      result = result.filter(
        (resource) => resource.category === selectedCategory
      );
    }

    if (selectedLocation !== "All Locations") {
      result = result.filter(
        (resource) => resource.location === selectedLocation
      );
    }

    if (availableOnly) {
      result = result.filter(
        (resource) => resource.availability === "Available"
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, selectedCategory, selectedLocation, availableOnly, sortBy]);

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedCategory !== "All Categories" ||
    selectedLocation !== "All Locations" ||
    availableOnly;

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setAvailableOnly(false);
    setSortBy("newest");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-slate-100/50 pb-16">
      {/* Page Heading & Search Banner */}
      <section className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-bold text-indigo-700">
              <Package className="h-4 w-4" />
              Community marketplace
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Explore resources
            </h1>

            <p className="mt-3 leading-relaxed text-slate-500 text-base">
              Find useful equipment, tools, and materials shared by
              schools, labs, and community members around you.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/85 bg-white px-4 shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cameras, laptops, tools, study materials..."
                className="h-14 w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                aria-label="Search resources"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Content */}
      <section className="mx-auto max-w-7xl px-5 py-9 md:px-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* Filters Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal className="h-5 w-5 text-indigo-600" />
                <h2 className="font-bold text-slate-900">Filters</h2>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-indigo-600 transition hover:text-indigo-800"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="my-5 border-t border-slate-100" />

            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Category
              </label>

              <select
                id="category"
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="my-5 border-t border-slate-100" />

            {/* Location Filter */}
            <div>
              <label
                htmlFor="location"
                className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-slate-500"
              >
                Location
              </label>

              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500" />

                <select
                  id="location"
                  value={selectedLocation}
                  onChange={(event) =>
                    setSelectedLocation(event.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="my-5 border-t border-slate-100" />

            {/* Availability Filter */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Availability
              </h3>

              <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(event) =>
                    setAvailableOnly(event.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                Available resources only
              </label>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
              >
                <RotateCcw className="h-4 w-4" />
                Reset filters
              </button>
            )}
          </aside>

          {/* Resource Results Area */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Available resources
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredResources.length} of {resources.length} resources
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-slate-500"
                >
                  Sort by:
                </label>

                <select
                  id="sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="newest">Default (Newest)</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {search.trim() && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700">
                    Search: {search}
                  </span>
                )}

                {selectedCategory !== "All Categories" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700">
                    {selectedCategory}
                  </span>
                )}

                {selectedLocation !== "All Locations" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-700">
                    {selectedLocation}
                  </span>
                )}

                {availableOnly && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700">
                    Available only
                  </span>
                )}
              </div>
            )}

            {/* Resource Cards Grid */}
            {filteredResources.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((resource) => {
                  const Icon = categoryIcons[resource.category] || Package;
                  const iconColor =
                    categoryColors[resource.category] ||
                    "bg-indigo-50 text-indigo-600 border border-indigo-200/60";

                  const isAvailable =
                    resource.availability === "Available";

                  return (
                    <article
                      key={resource.id}
                      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
                    >
                      <div>
                        {/* Visual Header Area */}
                        <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-slate-100/80 via-indigo-50/40 to-indigo-100/50">
                          <div className={`rounded-2xl p-5 shadow-sm transition-transform duration-300 group-hover:scale-110 ${iconColor}`}>
                            <Icon className="h-12 w-12" strokeWidth={1.8} />
                          </div>

                          <span
                            className={`absolute right-3.5 top-3.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-xs ${
                              isAvailable
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : "bg-amber-50 text-amber-700 border border-amber-200/60"
                            }`}
                          >
                            {resource.availability}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="p-5">
                          <span className="inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                            {resource.category}
                          </span>

                          <h3 className="mt-2.5 line-clamp-1 text-lg font-bold text-slate-900">
                            {resource.name}
                          </h3>

                          <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-relaxed text-slate-500">
                            {resource.description}
                          </p>

                          <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">
                            <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
                              <Package className="h-4 w-4 shrink-0 text-indigo-500" />
                              <span className="truncate">Shared by {resource.owner}</span>
                            </p>

                            <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
                              <MapPin className="h-4 w-4 shrink-0 text-indigo-500" />
                              <span className="truncate">{resource.location}</span>
                            </p>

                            <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
                              <Clock3 className="h-4 w-4 shrink-0 text-indigo-500" />
                              <span>Up to {resource.maxBorrowDays} days borrowing</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <Link
                          to={`/resources/${resource.id}`}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white hover:border-indigo-600 active:scale-95"
                        >
                          View details
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* Empty State */
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-inner">
                  <Search className="h-8 w-8" />
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-900">
                  No resources found
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                  We couldn't find any community resources matching your filters.
                  Try modifying your search query or clearing your active filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;