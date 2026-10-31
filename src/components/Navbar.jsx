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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-extrabold text-slate-900 group"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:scale-105">
            <Share2 className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">
            {appName || "ShareSpace"}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex">
          {dashboardLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-sm font-bold text-indigo-600 transition"
                    : "text-sm font-medium text-slate-600 transition hover:text-slate-900"
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
              <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
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
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-bold text-slate-700 hover:text-indigo-600"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-indigo-600 px-4.5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-700"
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
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-lg md:hidden">
          <ul className="space-y-2">
            {dashboardLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-bold ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-slate-100 pt-4">
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
