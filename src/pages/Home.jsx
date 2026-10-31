import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Clock3,
  Users,
  Laptop,
  Camera,
  Drill,
  Projector,
  BookOpen,
  Handshake,
  PackagePlus,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, count: "12 resources" },
  { name: "Photography", icon: Camera, count: "8 resources" },
  { name: "Tools & Equipment", icon: Drill, count: "15 resources" },
  { name: "Study Materials", icon: BookOpen, count: "10 resources" },
];

const resources = [
  {
    id: 1,
    name: "Professional Camera",
    category: "Photography",
    location: "Ahmedabad",
    owner: "Community Media Lab",
    icon: Camera,
    color: "bg-purple-100 text-purple-600",
    availability: "Available",
  },
  {
    id: 2,
    name: "Projector",
    category: "Electronics",
    location: "Ahmedabad",
    owner: "Innovation Center",
    icon: Projector,
    color: "bg-blue-100 text-blue-600",
    availability: "Available",
  },
  {
    id: 3,
    name: "Power Drill Kit",
    category: "Tools & Equipment",
    location: "Gandhinagar",
    owner: "Maker Space",
    icon: Drill,
    color: "bg-orange-100 text-orange-600",
    availability: "Available",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover resources",
    description:
      "Explore equipment, tools, and spaces shared by people and organizations around you.",
    icon: Search,
  },
  {
    number: "02",
    title: "Request to borrow",
    description:
      "Choose a resource, select your dates, and send a borrowing request to its owner.",
    icon: Handshake,
  },
  {
    number: "03",
    title: "Share and return",
    description:
      "Collect the resource, use it responsibly, and return it in good condition.",
    icon: CheckCircle2,
  },
];

const benefits = [
  {
    title: "Save money",
    description:
      "Borrow items when you need them instead of buying everything yourself.",
    icon: ShieldCheck,
  },
  {
    title: "Reduce waste",
    description:
      "Make better use of existing resources and avoid unnecessary purchases.",
    icon: Clock3,
  },
  {
    title: "Build community",
    description:
      "Connect people and organizations through sharing and collaboration.",
    icon: Users,
  },
];

function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-brand-700 shadow-sm">
              <Handshake className="h-4 w-4" />
              Sharing makes communities stronger
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Don't buy it.
              <span className="block text-brand-600">Share it instead.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Discover useful resources shared by your community. Borrow what
              you need, share what you have, and make better use of everything.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/explore"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-brand-600 px-6 font-semibold text-white shadow-md transition hover:bg-brand-700"
              >
                Explore resources
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/signup"
                className="inline-flex h-12 items-center rounded-lg border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Start sharing
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Community driven
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Easy borrowing
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-indigo-200/50 blur-3xl" />
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-blue-200/50 blur-3xl" />

            <div className="relative rounded-3xl border border-white bg-white p-5 shadow-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Community marketplace
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Find what you need
                  </h2>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3 text-brand-600">
                  <PackagePlus className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-purple-50 p-5">
                  <Camera className="h-9 w-9 text-purple-600" />
                  <p className="mt-5 font-semibold text-slate-800">Camera</p>
                  <p className="mt-1 text-xs text-slate-500">Photography</p>
                </div>

                <div className="rounded-2xl bg-blue-50 p-5">
                  <Laptop className="h-9 w-9 text-blue-600" />
                  <p className="mt-5 font-semibold text-slate-800">Laptop</p>
                  <p className="mt-1 text-xs text-slate-500">Electronics</p>
                </div>

                <div className="rounded-2xl bg-orange-50 p-5">
                  <Drill className="h-9 w-9 text-orange-600" />
                  <p className="mt-5 font-semibold text-slate-800">Tool kit</p>
                  <p className="mt-1 text-xs text-slate-500">Equipment</p>
                </div>

                <div className="rounded-2xl bg-green-50 p-5">
                  <BookOpen className="h-9 w-9 text-green-600" />
                  <p className="mt-5 font-semibold text-slate-800">Books</p>
                  <p className="mt-1 text-xs text-slate-500">Education</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Sharing made simple
                  </p>
                  <p className="text-xs text-slate-500">
                    Discover. Borrow. Return.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-16 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Explore categories
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              What are you looking for?
            </h2>
            <p className="mt-3 text-slate-500">
              Find resources across different categories.
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                to="/explore"
                key={category.name}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">{category.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured resources */}
      <section className="bg-slate-50 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
                Community resources
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Discover what you can borrow
              </h2>
              <p className="mt-3 text-slate-500">
                Useful resources shared by the community.
              </p>
            </div>

            <Link
              to="/explore"
              className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Explore all resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50">
                    <div className={`rounded-3xl p-7 ${resource.color}`}>
                      <Icon className="h-16 w-16" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-brand-700">
                        {resource.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        {resource.availability}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      {resource.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Shared by {resource.owner}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {resource.location}
                    </p>

                    <Link
                      to={`/resources/${resource.id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600"
                    >
                      View details <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-14 md:py-16 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Simple process
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            How ShareSpace works
          </h2>
          <p className="mt-3 text-slate-500">
            Start sharing and borrowing in just three simple steps.
          </p>
        </div>

        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="text-center">
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-indigo-50/70 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Why ShareSpace?
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Sharing is better for everyone
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-indigo-100 bg-white p-7"
                >
                  <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-brand-600">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="px-5 py-12 md:py-14 md:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-brand-600 px-6 py-10 text-center text-white shadow-lg sm:px-12 md:py-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have something worth sharing?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-indigo-100">
            Make your unused resources useful to someone else. Join the
            community and start sharing today.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-white px-8 text-base font-bold text-brand-700 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-indigo-50 hover:shadow-xl"
          >
            Join ShareSpace
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
