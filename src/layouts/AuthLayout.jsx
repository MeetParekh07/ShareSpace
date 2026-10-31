import { Link, Outlet } from "react-router-dom";
import { Share2 } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-slate-900"
          >
            <Share2 className="h-6 w-6 text-brand-600" />
            <span className="text-lg">ShareSpace</span>
          </Link>

          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-brand-600"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <Outlet />
      </main>

      <footer className="py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} ShareSpace. Built for the community.
      </footer>
    </div>
  );
}

export default AuthLayout;
