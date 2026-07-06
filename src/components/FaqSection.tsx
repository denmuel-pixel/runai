import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { FAQItem } from "../types";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "What does my registration entry pass include?",
      answer: "Every entry pass includes full access to the race course, an integrated active timing chip, our official Aero-Weave technical race tee (valued at €45), an insulated matte hydration flask, drawstring storage pack, dynamic timing certificate, professional race photos, hydration/energy gel station access, and your physical premium finisher medal upon crossing the gate."
    },
    {
      id: "faq-2",
      question: "Where and when can I collect my physical Race Pack kit?",
      answer: "Physical kit collections take place on Friday, October 23, and Saturday, October 24, from 09:00 AM to 08:00 PM at the Concorde Arena Expo. Make sure to bring your downloadable digital ticket (sent instantly on registration) containing your unique barcode and a valid photo ID. Strictly no kit distribution is available on Sunday morning before starting flags."
    },
    {
      id: "faq-3",
      question: "Are there minimum age restrictions for the categories?",
      answer: "Yes, for safety and pacing constraints: the 3 KM Fun Run welcomes runners of 8 years and older (participants under 14 must be accompanied by a registered adult). The 5 KM Challenge requires runners to be at least 14 years old as it features faster corridors and steeper elevation gradients across Pont de l'Alma."
    },
    {
      id: "faq-4",
      question: "Will there be a secure baggage drop off on event day?",
      answer: "Yes, we provide fully secure baggage drop-off docks located in the Concorde Assembly Zone. Baggage drops open at 06:00 AM and close strictly at 06:45 AM. You must use the translucent drawstring pack provided inside your official race kit to stash items. Valuable electronic tech is stored at your own discretion."
    },
    {
      id: "faq-5",
      question: "Can I transfer my ticket or change categories after registration?",
      answer: "You can change your category or transfer registration details up to 14 days before the event (cutoff on October 11, 2026). Simply open your digital pass from your dashboard or email, click 'Modify Registration', select your new size or category, and settle the category fee difference if moving from 3K to 5K."
    }
  ];

  return (
    <section id="faq" className="relative py-24 px-6 md:px-12 bg-luxury-black overflow-hidden border-t border-white/5">
      {/* Decorative gradients */}
      <div className="absolute top-[40%] left-[-20%] w-[600px] h-[350px] bg-brand-orange/4 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-brand-lime tracking-widest font-black uppercase inline-flex items-center gap-1.5 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" /> INQUIRY ASSISTANCE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1.5">
            FREQUENT QUESTIONS
          </h2>
          <p className="max-w-md mx-auto text-white/50 text-sm font-sans mt-3.5 leading-relaxed">
            Need details on the starting blocks, pacing charts, or gear pick-up timings? Find quick responses to essential logistics.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white/5 border-white/15"
                    : "bg-transparent border-white/10 hover:border-white/20"
                }`}
              >
                {/* Trigger Row */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded ${isOpen ? "bg-brand-orange text-black font-bold" : "bg-white/5 text-white/40"}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-brand-orange" : ""}`} />
                </button>

                {/* Body Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm font-sans text-white/60 leading-relaxed border-t border-white/3">
                        <p className="border-l border-brand-orange pl-3.5">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
