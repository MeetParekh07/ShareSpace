
import { Link } from "react-router-dom";
import { Share2,  ArrowUpRight } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavigation = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const linkStyle =
    "text-sm text-slate-500 transition hover:text-indigo-600";

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-6 sm:px-8">

        {/* Main Footer */}
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-start">

          {/* Brand */}
          <div className="max-w-sm">
            <Link
              to="/"
              onClick={handleNavigation}
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <Share2 size={20} />
              </div>

              <span className="text-xl font-bold text-slate-900">
                Share<span className="text-indigo-600">Space</span>
              </span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Don't buy it. Share it instead.
              Share resources, save money, and build stronger communities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                onClick={handleNavigation}
                className={linkStyle}
              >
                Home
              </Link>

              <Link
                to="/explore"
                onClick={handleNavigation}
                className={linkStyle}
              >
                Explore Resources
              </Link>

              <a
                href="https://github.com/MeetParekh07/ShareSpace"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkStyle} inline-flex items-center gap-1`}
              >
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-5 text-center sm:flex-row">
          <p className="text-xs text-slate-500">
            © {currentYear} ShareSpace. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Built for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
