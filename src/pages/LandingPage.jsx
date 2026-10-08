import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ProgramSection from "../components/ProgramSection";
import TrainersSection from "../components/TrainersSection";
import PricingSection from "../components/PricingSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import FinalCTASection from "../components/FinalCTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas font-body text-white antialiased selection:bg-accent selection:text-black">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 -z-10 bg-hero-radial" />
      <div className="fixed inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-white/5 via-white/[0.02] to-transparent" />
      <div className="fixed inset-x-0 top-[18rem] -z-10 mx-auto h-[32rem] max-w-6xl rounded-full bg-accent/[0.05] blur-[180px]" />
      <div className="fixed inset-x-0 bottom-[-8rem] -z-10 mx-auto h-[24rem] max-w-5xl rounded-full bg-white/[0.04] blur-[180px]" />

      <Navbar />

      <main className="relative">
        <Hero />
        <Features />
        <ProgramSection />
        <TrainersSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
