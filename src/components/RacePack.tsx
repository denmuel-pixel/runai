import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Package, ShieldCheck, Ruler, ChevronDown, Check, Sparkles } from "lucide-react";

export default function RacePack() {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [activeItem, setActiveItem] = useState<number>(0);

  const packItems = [
    {
      id: 0,
      title: "Aero-Weave Tech Tee",
      category: "APPAREL",
      description: "Crafted with lightweight, high-performance micro-knit fibers. Features advanced moisture-wicking technology, mesh ventilation zones on the back, and reflective high-visibility neon safety decals.",
      specs: ["100% Recycled Polyester", "Anti-chafing flatlock seams", "Antibacterial odor control", "Reflective neon orange trail prints"]
    },
    {
      id: 1,
      title: "Active RFID Timing Bib",
      category: "TACTICAL",
      description: "Your official passport to the Paris circuit. Integrates a lightweight ultra-high frequency timing capsule for real-time speed monitoring, split checkpoints logging, and dynamic leaderboard sync.",
      specs: ["Waterproof tearproof composite paper", "Integrated passive UHF timing chip", "Customizable runner tag", "Four safety speed clips included"]
    },
    {
      id: 2,
      title: "Insulated Matte Flask",
      category: "HYDRATION",
      description: "Keep hydrated during peak elevation phases. Built with double-wall food grade stainless steel, keeping water freezing-cold up to 24 hours. Minimalist matte black profile with neon strap.",
      specs: ["BPA-free food-grade stainless steel", "Double-wall vacuum insulation", "Leakproof quick-snap tactical loop", "500ml volumetric capacity"]
    },
    {
      id: 3,
      title: "Ripstop Drawstring Pack",
      category: "UTILITY",
      description: "Ultra-compact athletic satchel to stash post-run apparel, snacks, and personal tech. Waterproof coated zippers keep items completely dry even in torrential heavy mist conditions.",
      specs: ["420D Coated ripstop nylon", "Separate secure zippered key pocket", "Reinforced mesh shoulder cushions", "12-liter storage capacity"]
    }
  ];

  const sizingChart: { [key: string]: { chest: string; length: string; shoulder: string } } = {
    "XS": { chest: "90 cm", length: "66 cm", shoulder: "40 cm" },
    "S": { chest: "96 cm", length: "68 cm", shoulder: "42 cm" },
    "M": { chest: "102 cm", length: "70 cm", shoulder: "44 cm" },
    "L": { chest: "108 cm", length: "72 cm", shoulder: "46 cm" },
    "XL": { chest: "114 cm", length: "74 cm", shoulder: "48 cm" },
    "XXL": { chest: "120 cm", length: "76 cm", shoulder: "50 cm" },
  };

  return (
    <section id="race-pack" className="relative py-24 px-6 md:px-12 bg-luxury-black overflow-hidden border-t border-white/5">
      {/* Decorative grids */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-lime/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-orange tracking-widest font-black uppercase">ATHLETIC EQUIPMENT</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
              THE RACING KIT
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-sm font-sans leading-relaxed">
            Every registration unlocks the custom-designed technical race pack. Engineered in collaboration with elite sports designers for maximum breathability, safety, and timing accuracy.
          </p>
        </div>

        {/* Contents Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Tech Spec Selector (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-2">TECHNICAL BREAKDOWN</span>
            
            {packItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item.id)}
                  className={`border rounded-xl p-5 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? "bg-white/5 border-white/15"
                      : "bg-transparent border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold ${
                        isActive ? "bg-brand-orange/15 text-brand-orange border border-brand-orange/30" : "bg-white/5 text-white/40 border border-transparent"
                      }`}>
                        {item.category}
                      </span>
                      <h4 className="font-display font-extrabold text-sm md:text-base text-white tracking-wide">
                        {item.title}
                      </h4>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-300 ${isActive ? "rotate-180 text-brand-orange" : ""}`} />
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-xs text-white/60 font-sans leading-relaxed mt-3.5 mb-4 border-l border-white/10 pl-3">
                          {item.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-2 mt-2">
                          {item.specs.map((spec, sidx) => (
                            <div key={sidx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-brand-lime shrink-0" />
                              <span className="text-[11px] font-sans text-white/80">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Interactive Image Showcase (Cols 6-12) */}
          <div className="lg:col-span-7 grid md:grid-cols-12 gap-8 items-center bg-luxury-grey/40 border border-white/5 rounded-2xl p-6 sm:p-8 relative">
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-brand-orange/10 border border-brand-orange/20 rounded text-[9px] font-mono text-brand-orange font-bold">
              <Sparkles className="w-3 h-3 text-brand-orange animate-pulse" />
              OFFICIAL GEAR RENDER
            </div>

            {/* The 3D-Tilt Image Frame (Cols 1-7) */}
            <div className="md:col-span-7 relative group flex justify-center">
              <motion.div
                whileHover={{ rotateY: 8, rotateX: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full max-w-[340px] aspect-square rounded-xl overflow-hidden border border-white/10 shadow-2xl relative"
              >
                <img
                  src="/src/assets/images/race_pack_kit_1783250222618.jpg"
                  alt="Official Race Pack Kit Showcase"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual glass overlay bar */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 glass-panel rounded-lg flex items-center justify-between border border-white/10">
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block">KIT VALUE</span>
                    <span className="text-xs font-mono font-bold text-white">EST. VALUE €95</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono text-brand-lime block">MATERIAL</span>
                    <span className="text-xs font-mono font-bold text-white">RECYCLED AERO</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sizing Interactive Helper (Cols 8-12) */}
            <div className="md:col-span-5 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="w-4 h-4 text-brand-lime" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">SHIRT SIZE HELPER</span>
              </div>

              <p className="text-[11px] font-sans text-white/50 leading-relaxed mb-4">
                Select a size to check the precision athletic fit chest, length, and shoulder parameters before submitting.
              </p>

              {/* Sizes row */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.keys(sizingChart).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 rounded font-mono text-xs font-bold border transition-all duration-300 cursor-pointer ${
                      selectedSize === size
                        ? "bg-brand-lime text-black border-brand-lime font-black"
                        : "bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Specs display cards */}
              <div className="bg-white/3 border border-white/5 rounded-lg p-3.5 space-y-2.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white/40">CHEST CIRCUMFERENCE</span>
                  <span className="text-white font-bold">{sizingChart[selectedSize].chest}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/5 pt-2.5">
                  <span className="text-white/40">VERTICAL SHIRT LENGTH</span>
                  <span className="text-white font-bold">{sizingChart[selectedSize].length}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-t border-white/5 pt-2.5">
                  <span className="text-white/40">SHOULDER WIDTH</span>
                  <span className="text-white font-bold">{sizingChart[selectedSize].shoulder}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mt-4 text-[10px] font-mono text-white/30">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-lime shrink-0" />
                <span>Athletic fit is true-to-size. Unisex cut.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
