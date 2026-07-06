import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MapPin, Users, ArrowDown, ChevronRight } from "lucide-react";

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  // Target Event Date: October 25, 2026 07:00:00 UTC
  const EVENT_DATE = new Date("2026-10-25T07:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [registeredCount, setRegisteredCount] = useState(742);

  // Parallax Scroll Tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Countdown calculation
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = EVENT_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, "0"),
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    }, 1000);

    // Simulated urgency quota ticker (ticks up occasionally, simulating active signups)
    const quotaTicker = setInterval(() => {
      setRegisteredCount((prev) => {
        if (prev >= 988) {
          return prev; // Stop just below limit
        }
        // Occasional ticker up
        return Math.random() > 0.65 ? prev + 1 : prev;
      });
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(quotaTicker);
    };
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.querySelector("#categories");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-luxury-black flex flex-col justify-between overflow-hidden pt-24 pb-12 px-6 md:px-12"
    >
      {/* Background Parallax Image with Dark Overlay */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <img
          src="/src/assets/images/hero_runner_1783250209327.jpg"
          alt="Cinematic Athletic Runner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105"
        />
        {/* Immersive Theme Glowing Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/30 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-lime/20 rounded-full blur-[140px] pointer-events-none" />

        {/* Layered cinematic gradient overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-luxury-black via-luxury-black/60 to-luxury-black/40" />
        <div className="absolute inset-0 bg-linear-to-r from-luxury-black via-transparent to-luxury-black/30" />
        <div className="absolute inset-0 bg-radial from-transparent to-luxury-black/80" />
      </motion.div>

      {/* Grid Overlay Decoration */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-1" />

      {/* Hero Content Area */}
      <motion.div 
        style={{ y: textY, opacity: opacityFade }}
        className="relative z-10 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center items-start pt-12 md:pt-16"
      >
        {/* Top Campaign Tag - Immersive Skew Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6 px-4 py-1.5 bg-brand-orange text-black text-[11px] font-mono font-black uppercase tracking-wider w-fit skew-x-[-12deg] flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse inline-block" />
          <span className="inline-block skew-x-[12deg]">Cinematic Sports Experience • Registrations Closing Soon</span>
        </motion.div>

        {/* Epic Headings */}
        <div className="relative font-display tracking-tighter mb-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white leading-[0.85] uppercase"
          >
            PARI RUN <br />
            <span className="text-transparent font-black tracking-tighter mt-2 block" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.4)" }}>
              LIMITLESS FORCE
            </span>
          </motion.h1>
        </div>

        {/* Interactive Event Specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center gap-6 md:gap-10 text-white/80 font-mono text-xs md:text-sm mb-10 border-l-2 border-brand-orange pl-6"
        >
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-brand-orange" />
            <div>
              <p className="text-white font-bold tracking-wider">OCTOBER 25, 2026</p>
              <p className="text-white/40 text-[10px]">SUNDAY • 07:00 AM</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <div>
              <p className="text-white font-bold tracking-wider">PARIS, FRANCE</p>
              <p className="text-white/40 text-[10px]">PLACE DE LA CONCORDE</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-brand-lime" />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-black tracking-wider text-sm md:text-base">{registeredCount}</span>
                <span className="text-white/40 text-xs">/ 1,000</span>
              </div>
              <p className="text-white/40 text-[10px] tracking-wider uppercase">Runners Registered</p>
            </div>
          </div>
        </motion.div>

        {/* Action Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onRegisterClick}
            className="w-full sm:w-auto relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-4.5 font-display font-black text-xs md:text-sm tracking-widest uppercase cursor-pointer group transition-transform active:scale-95"
          >
            {/* Sliding backgrounds */}
            <div className="absolute inset-0 bg-brand-orange transition-transform duration-300 translate-y-0 group-hover:translate-y-full" />
            <div className="absolute inset-0 bg-white transition-transform duration-300 -translate-y-full group-hover:translate-y-0" />
            <span className="relative z-10 flex items-center gap-2 text-black font-black">
              SECURE YOUR PASS <ChevronRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform font-bold" />
            </span>
          </button>

          <button
            onClick={handleScrollDown}
            className="w-full sm:w-auto relative inline-flex items-center justify-center overflow-hidden rounded-sm px-8 py-4 bg-white/5 border border-white/10 font-display font-bold text-xs tracking-widest uppercase cursor-pointer group transition-transform active:scale-95"
          >
            {/* Sliding background */}
            <div className="absolute inset-0 bg-white/10 transition-transform duration-300 translate-y-full group-hover:translate-y-0" />
            <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
              EXPLORE RACE CATEGORIES
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Row (Countdown + Scroll Progress) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/10 pt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6"
      >
        {/* Countdown Visual Blocks */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/40 uppercase tracking-widest mr-2 self-center block">T-MINUS</span>
          <div className="flex gap-2">
            {[
              { label: "D", val: timeLeft.days },
              { label: "H", val: timeLeft.hours },
              { label: "M", val: timeLeft.minutes },
              { label: "S", val: timeLeft.seconds },
            ].map((unit, idx) => (
              <div key={unit.label} className="flex items-center">
                <div className="bg-luxury-card/90 backdrop-blur-md border border-white/5 rounded px-3.5 py-2 flex flex-col items-center justify-center min-w-[50px] shadow-md relative">
                  <span className="font-mono font-black text-lg sm:text-xl text-white tracking-widest">
                    {unit.val}
                  </span>
                  <span className="font-mono text-[9px] text-brand-orange font-bold">
                    {unit.label}
                  </span>
                </div>
                {idx < 3 && <span className="font-mono font-bold text-white/20 text-lg mx-1">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Quota Progress Meter */}
        <div className="flex-grow max-w-xs flex flex-col gap-1.5 md:mx-6">
          <div className="flex justify-between items-baseline font-mono text-[10px] text-white/50">
            <span>REGISTRATION QUOTA</span>
            <span className="text-white font-bold">{Math.round((registeredCount / 1000) * 100)}% FILLED</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(registeredCount / 1000) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-brand-orange to-brand-lime"
            />
          </div>
          <p className="font-mono text-[9px] text-white/30 text-right uppercase">ONLY {1000 - registeredCount} SPOTS LEFT</p>
        </div>

        {/* Floating Scroll Prompt */}
        <button
          onClick={handleScrollDown}
          className="flex items-center gap-2 group text-white/40 hover:text-brand-orange transition-colors font-mono text-xs tracking-widest uppercase self-start md:self-center"
        >
          SCROLL DOWN 
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-brand-orange group-hover:scale-110" />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}
