import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";
import { getWhatsAppUrl, GENERAL_ENQUIRY_MESSAGE } from "../utils/whatsapp";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Facilities", href: "#facilities" },
  { name: "Trainers", href: "#trainers" },
  { name: "Membership", href: "#membership" },
  { name: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      className="fixed inset-x-0 top-5 z-50 w-full px-4 sm:px-6 lg:px-8"
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
          <div className="hidden items-center gap-4 lg:gap-5 xl:gap-8 lg:flex">
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

          {/* Desktop Right CTA - Single Primary JOIN NOW CTA */}
          <div className="hidden items-center gap-3 sm:flex">
            <a
              href={getWhatsAppUrl(GENERAL_ENQUIRY_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-accent bg-accent px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] text-black shadow-glow transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(214,255,62,0.4)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
            >
              JOIN NOW
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
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
                <a
                  href={getWhatsAppUrl(GENERAL_ENQUIRY_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-accent py-3 text-xs font-bold tracking-widest text-black shadow-glow focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  JOIN NOW
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
