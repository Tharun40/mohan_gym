export default function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.6rem] border border-white/12 bg-white/[0.08] px-5 py-4 shadow-panel shadow-edge backdrop-blur-3xl">
      <div className="text-[11px] font-semibold tracking-[0.24em] text-white/48">{label}</div>
      <div className="mt-2.5 font-display text-3xl font-semibold leading-none tracking-[-0.04em] text-accent">
        {value}
      </div>
    </div>
  );
}
