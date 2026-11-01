import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Share2, Menu, X, UserCircle } from "lucide-react";
import { navLinks } from "../data/navLinks";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { appName } = useAppContext();
  const { user, profile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const dashboardLinks = navLinks.filter((link) => {
    if (link.path === "/borrower/dashboard") {
      return profile?.role === "borrower";
    }
    if (link.path === "/owner/dashboard") {
      return profile?.role === "owner";
    }
    return true;
  });

  async function handleLogout() {
    const { error } = await signOut();

    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    setIsOpen(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3 font-extrabold text-slate-950"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20 transition group-hover:-rotate-3 group-hover:scale-105">
            <Share2 className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">
            {appName || "ShareSpace"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 p-1.5 md:flex">
          {dashboardLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-sm ring-1 ring-slate-200/70 transition"
                    : "rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950 hover:shadow-sm"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-3 py-2 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {profile?.full_name || user.email}
                  </p>
                  <p className="text-xs font-medium capitalize text-indigo-600">
                    {profile?.role || "Member"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-indigo-700"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-4 shadow-xl shadow-slate-900/5 md:hidden">
          <ul className="space-y-1.5">
            {dashboardLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-bold ${
                      isActive
                        ? "bg-indigo-50 font-bold text-indigo-700 ring-1 ring-inset ring-indigo-100"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-slate-100 pt-5">
            {user ? (
              <div className="space-y-3">
                <p className="px-2 text-sm font-semibold text-slate-700">
                  {profile?.full_name || user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
