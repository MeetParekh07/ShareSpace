import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Share2, Menu, X } from "lucide-react";
import { navLinks } from "../data/navLinks";
import { useAppContext } from "../context/AppContext";

function Navbar() {
  const { appName } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-extrabold text-slate-900 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:scale-105">
            <Share2 className="h-5 w-5" />
          </div>
          <span className="text-lg tracking-tight">ShareSpace</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
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

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-bold text-slate-700 transition hover:text-indigo-600"
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-indigo-600 px-4.5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95"
          >
            Sign up
          </Link>
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

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-lg md:hidden animate-in slide-in-from-top duration-200">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;