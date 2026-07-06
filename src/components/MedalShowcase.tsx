import React, { useState } from "react";
import { motion } from "motion/react";
import { Award, Compass, Eye, ShieldAlert, Sparkles, Trophy } from "lucide-react";

export default function MedalShowcase() {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const medalSpecs = [
    { title: "MATERIAL INTEGRITY", desc: "Aircraft-grade matte anodized composite alloy. Anti-oxidation matte-black coating." },
    { title: "PRECISION ENGRAVING", desc: "Dual laser-etched geometric lines reflecting glowing neon orange and neon lime." },
    { title: "REINFORCED LANYARD", desc: "High-density heavy ribbed woven lanyard ribbon with custom safety quick-release." },
    { title: "LEADERBOARD CLASP", desc: "Embedded micro magnetic socket. Designed for customizable category pins." },
  ];

  return (
    <section id="medal" className="relative py-24 px-6 md:px-12 bg-luxury-grey overflow-hidden border-t border-white/5">
      {/* Visual glowing ring behind */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-orange/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-lime tracking-widest font-black uppercase">COMMEMORATIVE HONORS</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
              THE FINISHER REWARD
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-sm font-sans leading-relaxed">
            Proof of your limitless energy. All finishers crossing the Concorde Arena Gate receive the custom-engineered PARI RUN 2026 industrial metal medal.
          </p>
        </div>

        {/* Core Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Medal interactive tilt graphic (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{ perspective: 1200 }}
              className="relative w-full max-w-[380px] aspect-square rounded-2xl cursor-pointer group"
            >
              {/* Floating ambient shadow under card */}
              <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-brand-orange/20 to-brand-lime/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Main Tilt Card Canvas Container */}
              <motion.div
                animate={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="w-full h-full glass-panel border border-white/10 rounded-2xl p-5 overflow-hidden relative shadow-2xl"
              >
                {/* Film grain noise */}
                <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

                {/* Laser light reflection layer on hover */}
                {isHovered && (
                  <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-tr from-transparent via-white/8 to-transparent opacity-60 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                )}

                {/* Main Render Image */}
                <img
                  src="/src/assets/images/finisher_medal_1783250234675.jpg"
                  alt="Official Finisher Medal Premium Design"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />

                {/* Hover overlay sparkles / specs */}
                <div className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 font-mono text-[9px] text-white">
                  <Trophy className="w-3 h-3 text-brand-orange animate-bounce" />
                  <span>CRAFTED IN PARIS</span>
                </div>

                <div className="absolute bottom-8 right-8 flex items-center gap-1.5 px-3 py-1 bg-brand-lime/10 backdrop-blur-md rounded border border-brand-lime/20 font-mono text-[9px] text-brand-lime font-bold">
                  <Sparkles className="w-3 h-3 text-brand-lime" />
                  <span>TAP & ROTATE TO INSPECT</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Technical Spec List (Cols 7-12) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="font-mono text-xs text-brand-orange font-black tracking-widest uppercase block mb-1">INDUSTRIAL DESIGN SPECS</span>
              <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight mb-4">
                A SYMBOL OF RESILIENCE
              </h3>
              <p className="text-white/60 text-sm font-sans leading-relaxed">
                We designed the 2026 Finisher Medal not as conventional runner souvenir, but as structural art piece. Merging raw industrial metal with neon light accents to symbolize the lightning energy of runners.
              </p>
            </div>

            {/* Spec list */}
            <div className="grid sm:grid-cols-2 gap-6">
              {medalSpecs.map((spec, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:border-white/20 transition-colors backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Award className="w-4 h-4 text-brand-orange shrink-0" />
                    <h4 className="font-mono text-[10px] text-white/50 font-bold uppercase tracking-widest">{spec.title}</h4>
                  </div>
                  <p className="text-xs text-white/70 font-sans leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Coordinates decor banner */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 text-white/50 rounded">
                  <Compass className="w-4.5 h-4.5 text-brand-lime" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-white/40 block">LATERAL ENGRAVING</span>
                  <span className="text-xs font-mono font-bold text-white uppercase">PLACE DE LA CONCORDE GRID</span>
                </div>
              </div>
              <span className="font-mono text-xs text-brand-lime font-black tracking-widest">48.8656° N, 2.3212° E</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
