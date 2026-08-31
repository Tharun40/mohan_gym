import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  CalendarCheck,
  Award,
  LogOut,
  Menu,
  X,
  Shield,
  User,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const adminNavLinks = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Membership Plans", href: "/admin/memberships", icon: CreditCard },
  { name: "Payments & Revenue", href: "/admin/payments", icon: Receipt },
  { name: "Attendance Desk", href: "/admin/attendance", icon: CalendarCheck },
  { name: "Trainers & Coaches", href: "/admin/trainers", icon: Award }
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#070707] font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-hero-radial opacity-60" />
      <div className="fixed -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent/[0.04] blur-[160px]" />

      {/* Desktop Admin Sidebar (Left) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/10 bg-[#0B0B0B]/90 p-6 backdrop-blur-2xl">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="Mohan Gym logo"
              className="h-10 w-10 rounded-full border border-white/20 object-cover transition-transform group-hover:scale-105"
            />
            <div>
              <p className="font-display text-sm font-bold tracking-[0.2em] text-white">
                MOHAN GYM
              </p>
              <p className="text-[9px] font-medium tracking-[0.25em] text-accent">
                ADMIN CONSOLE
              </p>
            </div>
          </Link>

          {/* Admin Profile Box */}
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-black shadow-glow">
                <Shield className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-white">{user?.name || "Mohan Raj"}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-bold text-accent">HEAD ADMINISTRATOR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Nav */}
          <nav className="mt-8 space-y-1.5">
            {adminNavLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider transition-all duration-200 ${
                    isActive
                      ? "border border-accent/40 bg-accent/15 text-accent shadow-glow"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="space-y-3 pt-6 border-t border-white/10">
          <Link
            to="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white/80 hover:border-white/30 hover:text-white transition"
          >
            <User className="h-3.5 w-3.5 text-accent" />
            <span>Switch to Member View</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-semibold text-white/50 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0A0A0A]/90 px-4 sm:px-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <span className="text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
              MOHAN GYM MANAGEMENT & ANALYTICS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-bold text-accent">
              <Shield className="h-3.5 w-3.5" />
              <span>ADMIN ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="h-full w-72 border-r border-white/10 bg-[#0D0D0D] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
                  <span className="font-display text-sm font-bold tracking-wider text-white">ADMIN CONSOLE</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {adminNavLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href);

                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold tracking-wider ${
                        isActive
                          ? "border border-accent bg-accent/15 text-accent"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-8 border-t border-white/10 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-xl py-2.5 text-xs text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sub-page Outlet */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
