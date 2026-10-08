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
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><a href="#home" className="hover:text-accent transition">Home</a></li>
              <li><a href="#about" className="hover:text-accent transition">About Mohan Gym</a></li>
              <li><a href="#programs" className="hover:text-accent transition">Programs</a></li>
              <li><a href="#facilities" className="hover:text-accent transition">Facilities & Features</a></li>
              <li><a href="#trainers" className="hover:text-accent transition">Trainers</a></li>
              <li><a href="#membership" className="hover:text-accent transition">Membership Plans</a></li>
              <li><a href="#contact" className="hover:text-accent transition">Contact & Location</a></li>
            </ul>
          </div>

          {/* Operating Hours & Access */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
              CLUB HOURS
            </h4>
            <div className="space-y-2.5 text-xs text-white/70">
              <div>
                <p className="text-white/40 text-[10px] uppercase font-semibold">Mon – Fri</p>
                <p className="font-medium text-white">05:30 AM – 10:00 PM</p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase font-semibold">Saturday</p>
                <p className="font-medium text-white">05:30 AM – 09:30 PM</p>
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase font-semibold">Sunday</p>
                <p className="font-medium text-accent">06:00 AM – 01:00 PM</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <Link to="/login" className="inline-block text-[11px] text-white/40 hover:text-accent transition">
                  Member Login →
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-4">
              CLUB LOCATION
            </h4>
            <ul className="space-y-3 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>24 Cross Cut Rd, Gandhipuram, Coimbatore 641012</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+919876543210" className="hover:text-accent transition">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:info@mohangym.com" className="hover:text-accent transition">info@mohangym.com</a>
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
