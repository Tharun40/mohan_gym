import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CreditCard,
  Receipt,
  CalendarCheck,
  Dumbbell,
  Utensils,
  LogOut,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useGymData } from "../../context/GymDataContext";
import logo from "../../assets/logo.png";

const memberNavLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "My Membership", href: "/dashboard/membership", icon: CreditCard },
  { name: "Payments", href: "/dashboard/payments", icon: Receipt },
  { name: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
  { name: "Workout Plan", href: "/dashboard/workout", icon: Dumbbell },
  { name: "Diet Blueprint", href: "/dashboard/diet", icon: Utensils }
];

export default function MemberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { memberships } = useGymData();
  const navigate = useNavigate();
  const location = useLocation();

  const userMembership = memberships.find((m) => m.userId === user?.id && m.status === "active") || memberships.find((m) => m.userId === user?.id);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#070707] font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Background radial glow */}
      <div className="fixed inset-0 -z-10 bg-hero-radial opacity-60" />
      <div className="fixed -top-40 right-0 -z-10 h-96 w-96 rounded-full bg-accent/[0.04] blur-[160px]" />

      {/* Desktop Sidebar (Left) */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-white/10 bg-[#0B0B0B]/80 p-6 backdrop-blur-2xl">
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
                MEMBER PORTAL
              </p>
            </div>
          </Link>

          {/* Member Quick Badge */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-sm font-bold text-black shadow-glow">
                {user?.name ? user.name.charAt(0).toUpperCase() : "M"}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold text-white">{user?.name || "Tharun"}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-semibold text-accent">
                    {userMembership?.status === "active" ? "ACTIVE MEMBER" : "MEMBER"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1.5">
            {memberNavLinks.map((item) => {
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
          {isAdmin && (
            <Link
              to="/admin"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent/10 py-2.5 text-xs font-bold text-accent hover:bg-accent hover:text-black transition"
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Switch to Admin</span>
            </Link>
          )}

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

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0A0A0A]/90 px-4 sm:px-8 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="hidden sm:block">
              <span className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase">
                MOHAN GYM FITNESS MANAGEMENT
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/membership"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-[11px] font-bold text-accent hover:bg-accent hover:text-black transition shadow-glow"
            >
              <Sparkles className="h-3 w-3" />
              <span>Renew / Upgrade</span>
            </Link>

            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <div className="h-6 w-6 rounded-full bg-accent text-[10px] font-bold text-black flex items-center justify-center">
                {user?.name ? user.name.charAt(0).toUpperCase() : "M"}
              </div>
              <span className="text-xs font-semibold text-white/90 hidden sm:inline">
                {user?.name || "Tharun"}
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
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
                  <span className="font-display text-sm font-bold tracking-wider text-white">MOHAN GYM</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white/60">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {memberNavLinks.map((item) => {
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

        {/* Sub-page Outlet View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
