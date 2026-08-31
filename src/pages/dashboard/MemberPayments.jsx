import { useState } from "react";
import { Receipt, Download, ShieldCheck, CheckCircle2, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useGymData } from "../../context/GymDataContext";

export default function MemberPayments() {
  const { user } = useAuth();
  const { payments } = useGymData();

  const userPayments = payments.filter((p) => p.userId === user?.id || p.userName === user?.name);
  const displayPayments = userPayments.length > 0 ? userPayments : [
    {
      id: "PAY-2026-8901",
      planName: "Premium Plan",
      addonsSummary: "Admission Fee (₹300), Diet Chart (₹300)",
      amount: 2099,
      status: "Successful",
      paymentMethod: "UPI / Google Pay",
      date: "2026-02-12"
    }
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Payment History & Invoices
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          All your club subscription transactions and downloadable billing receipts.
        </p>
      </div>

      {/* Payment Table / Card list */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-glass backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-white/40">
                <th className="pb-4 pl-2">Transaction ID</th>
                <th className="pb-4">Plan & Add-ons</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right pr-2">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayPayments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-4 pl-2 font-mono font-bold text-white">{p.id}</td>
                  <td className="py-4">
                    <p className="font-bold text-white">{p.planName}</p>
                    <p className="text-[11px] text-white/50">{p.addonsSummary || "No Add-ons"}</p>
                  </td>
                  <td className="py-4 text-white/70">{p.paymentMethod || "UPI"}</td>
                  <td className="py-4 text-white/70">{p.date}</td>
                  <td className="py-4 font-display font-bold text-accent text-sm">₹{p.amount}</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button
                      type="button"
                      onClick={() => setSelectedInvoice(p)}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white hover:border-accent hover:text-accent transition cursor-pointer"
                    >
                      <Download className="h-3 w-3" />
                      <span>Invoice</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal Preview */}
      {selectedInvoice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedInvoice(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-white/20 bg-[#0E0E0E] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <h3 className="font-display text-base font-bold text-white">MOHAN GYM TAX INVOICE</h3>
              </div>
              <span className="font-mono text-xs text-white/50">{selectedInvoice.id}</span>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-white/40">Billed To</p>
                  <p className="font-bold text-white mt-0.5">{user?.name || "Tharun"}</p>
                  <p className="text-white/60">{user?.email || "member@mohangym.com"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-white/40">Issued By</p>
                  <p className="font-bold text-white mt-0.5">Mohan Gym Performance Club</p>
                  <p className="text-white/60">GSTIN: 33AAAAA0000A1Z5</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{selectedInvoice.planName}</span>
                  <span>₹{selectedInvoice.amount}</span>
                </div>
                <p className="text-[11px] text-white/50">{selectedInvoice.addonsSummary}</p>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-3 text-sm font-bold">
                <span className="text-white">Total Amount Paid</span>
                <span className="text-accent font-display text-base">₹{selectedInvoice.amount}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/5"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="rounded-xl bg-accent px-4 py-2 text-xs font-bold text-black shadow-glow"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
