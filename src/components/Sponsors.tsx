import { motion } from "motion/react";
import { Zap, Shield, Compass, Star, Eye, Layers } from "lucide-react";

export default function Sponsors() {
  const brandLogos = [
    { name: "NIKE SPORTS", icon: Zap },
    { name: "GARMIN LOGIC", icon: Compass },
    { name: "OAKLEY SIGHT", icon: Eye },
    { name: "GATORADE FUEL", icon: Layers },
    { name: "RED BULL CORE", icon: Star },
    { name: "SPOTIFY RUN", icon: Shield },
  ];

  // Repeat twice for infinite seamless loop effect
  const doubledBrands = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <section className="relative py-16 bg-white/[0.01] overflow-hidden border-t border-b border-white/10">
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

      {/* Decorative vertical gradient mask borders for smooth fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="font-mono text-[9px] text-white/30 tracking-widest text-center uppercase font-bold">
          OFFICIAL ALLIED PARTNERS & BRANDS
        </p>
      </div>

      {/* Scrolling container */}
      <div className="w-full flex overflow-x-hidden relative">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          className="flex gap-16 whitespace-nowrap py-4 pr-16"
        >
          {doubledBrands.map((brand, idx) => {
            const IconComp = brand.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <div className="p-2.5 rounded bg-white/5 border border-white/10 flex items-center justify-center">
                  <IconComp className="w-5 h-5 text-brand-orange" />
                </div>
                <span className="font-display font-extrabold text-sm tracking-widest text-white">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
