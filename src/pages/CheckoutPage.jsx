import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useGymData } from "../context/GymDataContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, login } = useAuth();
  const { plans, addons, processCheckoutPayment } = useGymData();

  const planIdParam = searchParams.get("plan") || "plan-premium";
  const addonsParam = searchParams.get("addons") || "";

  const selectedPlan = plans.find((p) => p.id === planIdParam) || plans[0];
  const selectedAddonIds = addonsParam ? addonsParam.split(",") : [];
  const selectedAddonsList = addons.filter((a) => selectedAddonIds.includes(a.id));

  const planPrice = Number(selectedPlan?.price || 0);
  const addonsTotal = selectedAddonsList.reduce((sum, a) => sum + Number(a.price), 0);
  const grandTotal = planPrice + addonsTotal;

  // Form & Payment States
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [guestName, setGuestName] = useState(user?.name || "Tharun");
  const [guestEmail, setGuestEmail] = useState(user?.email || "member@mohangym.com");
  const [guestPhone, setGuestPhone] = useState(user?.phone || "+91 98401 23456");

  const [upiId, setUpiId] = useState("mohan.gym@okaxis");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8821");
  const [cardExpiry, setCardExpiry] = useState("08/28");
  const [cardCvv, setCardCvv] = useState("•••");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setGuestName(user.name);
      setGuestEmail(user.email);
      setGuestPhone(user.phone || "+91 98401 23456");
    }
  }, [user]);

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    try {
      let activeUser = user;
      // If user isn't logged in, login or register dynamically
      if (!activeUser) {
        const loginRes = await login(guestEmail, "member123");
        if (loginRes.success) {
          activeUser = loginRes.user;
        } else {
          setError("Please login or provide a valid email.");
          setIsProcessing(false);
          return;
        }
      }

      // Simulate realistic payment gateway processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = await processCheckoutPayment({
        userId: activeUser.id,
        userName: guestName || activeUser.name,
        plan: selectedPlan,
        selectedAddons: selectedAddonsList,
        paymentMethod: paymentMethod === "UPI" ? "UPI / QR" : paymentMethod === "CARD" ? "Card (Visa/MC)" : paymentMethod === "NETBANKING" ? "NetBanking" : "Cash at Gym Desk"
      });

      setIsProcessing(false);

      // Redirect to Payment Success page
      navigate("/payment-success", {
        state: {
          payment: result.payment,
          membership: result.membership,
          plan: selectedPlan,
          addons: selectedAddonsList,
          total: grandTotal,
          memberName: guestName || activeUser.name
        }
      });
    } catch (err) {
      console.error("Payment error:", err);
      setError("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 bg-hero-radial" />
      <div className="fixed inset-x-0 top-1/4 -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-accent/[0.05] blur-[180px]" />

      <Navbar />

      <main className="pt-36 pb-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <div className="mb-10 text-center sm:text-left">
            <Link to="/membership" className="text-xs text-accent hover:underline inline-flex items-center gap-1 mb-2">
              ← Change Membership Plan / Add-ons
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Secure Membership Checkout
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-white/60">
              Review your order breakdown and complete payment to instantly activate your gym membership.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left 7 cols: Billing info & Payment Methods */}
            <div className="lg:col-span-7 space-y-8">
              {/* Member Details */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glass backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-accent" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    Member Details
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-white/50 mb-1.5">
                      Email Address (Invoice & Login)
                    </label>
                    <input
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-glass backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-4 w-4 text-accent" />
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    Select Payment Gateway / Method
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { id: "UPI", label: "UPI / QR", icon: QrCode },
                    { id: "CARD", label: "Debit/Credit", icon: CreditCard },
                    { id: "NETBANKING", label: "NetBanking", icon: Building2 },
                    { id: "CASH", label: "Pay at Gym", icon: Banknote }
                  ].map((m) => {
                    const isSelected = paymentMethod === m.id;
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                          isSelected
                            ? "border-accent bg-accent/15 text-white shadow-glow"
                            : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${isSelected ? "text-accent" : "text-white/40"}`} />
                        <span className="text-xs font-semibold">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Payment Detail Form */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                  {paymentMethod === "UPI" && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/70">Instant UPI Payment</span>
                        <span className="text-accent font-bold">GPay / PhonePe / Paytm</span>
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                      />
                      <p className="text-[10px] text-white/40">
                        Demo Mode: Instant auto-verification enabled. Click Complete Payment below.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "CARD" && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number"
                        className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                        />
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="CVV"
                          className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "NETBANKING" && (
                    <div className="text-xs text-white/70 space-y-2">
                      <p className="font-semibold text-white">Select Bank</p>
                      <select className="w-full rounded-xl border border-white/10 bg-black/80 px-4 py-2.5 text-xs text-white focus:border-accent focus:outline-none">
                        <option>HDFC Bank</option>
                        <option>State Bank of India (SBI)</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                        <option>Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}

                  {paymentMethod === "CASH" && (
                    <div className="text-xs text-white/70">
                      <p className="font-semibold text-accent mb-1">Pay at Front Desk</p>
                      <p className="text-[11px] leading-relaxed text-white/60">
                        Your membership will be pre-registered and activated immediately. You can hand over cash or scan our desk QR on your next visit.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Order Breakdown & Confirm Button */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl border border-white/15 bg-white/[0.04] p-7 shadow-panel backdrop-blur-2xl">
                <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-4">
                  Order Breakdown
                </h3>

                {/* Plan Row */}
                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-white text-sm">{selectedPlan?.name}</p>
                      <p className="text-white/50">Duration: {selectedPlan?.duration}</p>
                    </div>
                    <p className="font-display text-base font-bold text-white">₹{planPrice}</p>
                  </div>

                  {/* Addons List */}
                  {selectedAddonsList.length > 0 && (
                    <div className="space-y-2.5 border-t border-white/10 pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                        Add-ons Included
                      </p>
                      {selectedAddonsList.map((addon) => (
                        <div key={addon.id} className="flex justify-between text-white/80">
                          <span>{addon.name}</span>
                          <span className="font-semibold text-white">₹{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Taxes */}
                  <div className="flex justify-between text-white/50 border-t border-white/10 pt-3">
                    <span>GST (18% Included)</span>
                    <span>₹0 (Included)</span>
                  </div>

                  {/* Grand Total */}
                  <div className="border-t border-white/15 pt-5 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                        Total Payable
                      </p>
                      <p className="text-[10px] text-white/40">Instant digital activation</p>
                    </div>
                    <p className="font-display text-3xl font-bold text-accent">
                      ₹{grandTotal}
                    </p>
                  </div>
                </div>

                {/* Submit Payment CTA */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePayNow}
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-4 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-glow transition hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(214,255,62,0.45)] disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      PROCESSING PAYMENT...
                    </span>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>PAY ₹{grandTotal} & ACTIVATE</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-white/50">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  <span>256-Bit SSL Encrypted & PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
