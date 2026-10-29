export default function CTAButton({ children, className = "", variant = "solid" }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[12px] font-semibold tracking-[0.22em] transition duration-500 ease-out";

  const variants = {
    solid:
      "border border-accent/90 bg-accent text-black shadow-glow hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_42px_rgba(214,255,62,0.38)]",
    outline:
      "border border-white/18 bg-white/[0.03] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-glow",
  };

  return <button className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</button>;
}
