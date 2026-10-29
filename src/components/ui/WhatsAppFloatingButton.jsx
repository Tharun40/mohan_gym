import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { getWhatsAppUrl, GENERAL_ENQUIRY_MESSAGE, WHATSAPP_DISPLAY } from "../../utils/whatsapp";

export default function WhatsAppFloatingButton() {
  return (
    <motion.aside
      aria-label="Gym enquiry on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center"
    >
      <a
        href={getWhatsAppUrl(GENERAL_ENQUIRY_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Mohan Gym on WhatsApp at ${WHATSAPP_DISPLAY}`}
        className="group relative flex items-center gap-2.5 rounded-full border border-accent/60 bg-[#0d0d0d]/90 py-2.5 pl-3 pr-4 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(214,255,62,0.25)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-[0_10px_40px_rgba(214,255,62,0.4)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black font-bold shadow-glow">
          <MessageSquare className="h-4 w-4" />
        </span>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[9px] font-bold tracking-[0.2em] text-accent uppercase">
            WhatsApp
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            Enquire Now
          </span>
        </div>
      </a>
    </motion.aside>
  );
}
