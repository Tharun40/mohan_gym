import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, Shield, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Services", href: "#services" },
  { name: "Exercise", href: "#exercise" },
  { name: "Pricing", href: "#pricing" },
  { name: "Trainers", href: "#trainers" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed left-1/2 top-5 z-50 w-full -translate-x-1/2 px-4 sm:px-6 lg:px-8"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-7xl">
        <nav className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-6 sm:py-3">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <img
              src={logo}
              alt="Mohan Gym logo"
              className="h-10 w-10 rounded-full border border-white/20 object-cover transition-transform duration-300 group-hover:scale-[1.05] sm:h-11 sm:w-11"
            />
            <div className="flex flex-col justify-center leading-none">
              <p className="font-display text-sm font-bold tracking-[0.2em] text-white sm:text-base">
                MOHAN GYM
              </p>
              <p className="mt-0.5 text-[9px] font-medium tracking-[0.28em] text-accent/90">
                PERFORMANCE CLUB
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-[13px] font-semibold tracking-[0.16em] text-white/70 transition duration-300 hover:text-accent cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden items-center gap-3 sm:flex">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold tracking-wider text-accent transition-all hover:bg-accent hover:text-black shadow-glow"
                >
                  {isAdmin ? <Shield className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  {isAdmin ? "ADMIN PORTAL" : "MEMBER DASHBOARD"}
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-white backdrop-blur-xl transition duration-300 hover:border-accent/40 hover:text-accent hover:shadow-glow"
                >
                  LOG IN
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] text-black shadow-glow transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)]"
                >
                  JOIN NOW
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated && (
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-[10px] font-bold text-accent sm:hidden"
              >
                {isAdmin ? "Admin" : "Dashboard"}
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:text-accent focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-white/15 bg-[#0e0e0e]/95 p-6 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between border-b border-white/5 pb-2 text-sm font-semibold tracking-wider text-white/80 transition hover:text-accent"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-4 w-4 text-white/40" />
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2.5">
                {isAuthenticated ? (
                  <Link
                    to={isAdmin ? "/admin" : "/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-xs font-bold tracking-widest text-black shadow-glow"
                  >
                    {isAdmin ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    {isAdmin ? "OPEN ADMIN PORTAL" : "OPEN MEMBER DASHBOARD"}
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 py-3 text-xs font-bold tracking-widest text-white"
                    >
                      LOG IN
                    </Link>
                    <Link
                      to="/membership"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center rounded-xl bg-accent py-3 text-xs font-bold tracking-widest text-black shadow-glow"
                    >
                      CHOOSE MEMBERSHIP
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
