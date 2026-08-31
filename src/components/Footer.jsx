import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Instagram, Youtube, Phone, Mail, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#080808] px-4 pt-16 pb-12 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Mohan Gym logo"
                className="h-11 w-11 rounded-full border border-white/20 object-cover"
              />
              <div>
                <p className="font-display text-base font-bold tracking-[0.2em] text-white">
                  MOHAN GYM
                </p>
                <p className="text-[9px] font-medium tracking-[0.28em] text-accent">
                  PERFORMANCE CLUB
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-xs leading-relaxed text-white/60">
              The premier strength, physique conditioning, and transformation sanctuary in Coimbatore. Built for athletes and individuals serious about lasting performance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:text-accent"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#youtube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:text-accent"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="tel:+919876543210"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#about" className="hover:text-accent transition">About Club</a></li>
              <li><a href="#features" className="hover:text-accent transition">Facilities & Gear</a></li>
              <li><a href="#services" className="hover:text-accent transition">Coaching Programs</a></li>
              <li><a href="#exercise" className="hover:text-accent transition">Workouts</a></li>
              <li><a href="#pricing" className="hover:text-accent transition">Membership Pricing</a></li>
              <li><a href="#trainers" className="hover:text-accent transition">Our Master Coaches</a></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
              PORTALS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><Link to="/membership" className="hover:text-accent transition">Join Membership</Link></li>
              <li><Link to="/login" className="hover:text-accent transition">Member Login</Link></li>
              <li><Link to="/register" className="hover:text-accent transition">Create Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-accent transition">Member Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-accent transition">Admin Management</Link></li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
              CLUB INFO
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>24 Cross Cut Rd, Gandhipuram, Coimbatore 641012</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>info@mohangym.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} MOHAN GYM Performance Club. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
