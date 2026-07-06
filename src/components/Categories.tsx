import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, Trophy, ShieldAlert, CheckCircle2, ChevronRight, Activity } from "lucide-react";
import { RaceCategory } from "../types";

interface CategoriesProps {
  onSelectCategory: (catId: string) => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Card perspective mouse tilt values
  const [tiltValues, setTiltValues] = useState<{ [key: string]: { x: number; y: number } }>({
    "3k": { x: 0, y: 0 },
    "5k": { x: 0, y: 0 },
  });

  const categories = [
    {
      id: "3k",
      name: "3 KM FUN RUN",
      subtitle: "Novice Route",
      level: "LEVEL: BEGINNER",
      distance: "3 KM",
      tagline: "Unleash your light in a fast-paced urban run designed for enthusiasts, communities, and casual pacers.",
      price: "€35",
      color: "border-brand-lime text-brand-lime",
      glowColor: "rgba(199, 255, 0, 0.15)",
      startTime: "07:15 AM",
      elevation: "+12m",
      features: [
        "Premium Dri-FIT Campaign Tee",
        "Magnetic Race Bib with active RFID Timing",
        "Collectible 3K Finishers Medal",
        "Digital Certificate & Pro Event Photos",
        "Water & Energy Gel Stations",
      ],
      specs: [
        { label: "MINIMUM AGE", value: "8 Years" },
        { label: "PACER RATIO", value: "1 : 50" },
        { label: "TIME LIMIT", value: "60 Mins" },
      ]
    },
    {
      id: "5k",
      name: "5 KM CHALLENGE",
      subtitle: "Pro Circuit",
      level: "LEVEL: ADVANCED",
      distance: "5 KM",
      tagline: "The main arena. Push past limits in a hyper-focused, competitive, and timed high-intensity challenge.",
      price: "€45",
      color: "border-brand-orange text-brand-orange",
      glowColor: "rgba(255, 107, 0, 0.15)",
      startTime: "07:00 AM",
      elevation: "+45m",
      features: [
        "Exclusive Gold-Stitch Dri-FIT Tee",
        "Sleek Active RFID Timing Race Bib",
        "High-Precision Metal 5K Finishers Medal",
        "Dynamic Post-Run Speed Analysis",
        "Full Access to Recovery Lounge",
      ],
      specs: [
        { label: "MINIMUM AGE", value: "14 Years" },
        { label: "PACER RATIO", value: "1 : 25" },
        { label: "TIME LIMIT", value: "90 Mins" },
      ]
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Relative coordinates
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate normalized rotation (-15deg to 15deg)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;

    setTiltValues((prev) => ({
      ...prev,
      [cardId]: { x: rotateX, y: rotateY },
    }));
  };

  const handleMouseLeave = (cardId: string) => {
    setHoveredCard(null);
    setTiltValues((prev) => ({
      ...prev,
      [cardId]: { x: 0, y: 0 },
    }));
  };

  return (
    <section id="categories" className="relative py-24 px-6 md:px-12 bg-luxury-black overflow-hidden border-t border-white/5">
      {/* Visual background pillars */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-orange tracking-widest font-black uppercase">CHOOSE YOUR FOCUS</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
              THE DISCIPLINES
            </h2>
          </div>
          <p className="max-w-md text-white/50 text-sm font-sans leading-relaxed">
            Select your challenge level. Whether paced for speed or community, enjoy pristine timing chips, luxury athletic apparel, and unique finish medals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {categories.map((cat, index) => {
            const isHovered = hoveredCard === cat.id;
            const tilt = tiltValues[cat.id] || { x: 0, y: 0 };

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                onMouseMove={(e) => handleMouseMove(e, cat.id)}
                onMouseEnter={() => setHoveredCard(cat.id)}
                onMouseLeave={() => handleMouseLeave(cat.id)}
                style={{
                  perspective: 1000,
                }}
                className="relative"
              >
                {/* Neon Aura Glow Underlay */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 blur-2xl -z-10"
                  style={{
                    backgroundColor: cat.glowColor,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Main Card */}
                <motion.div
                  animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                    scale: isHovered ? 1.01 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  className="w-full glass-panel border border-white/10 rounded-2xl p-8 md:p-10 relative overflow-hidden h-full flex flex-col justify-between cursor-pointer"
                  onClick={() => onSelectCategory(cat.id)}
                >
                  {/* Subtle Grid Pattern inside Card */}
                  <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

                  {/* Top Header Row */}
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded border ${cat.id === "3k" ? "border-brand-lime bg-brand-lime/5 text-brand-lime" : "border-brand-orange bg-brand-orange/5 text-brand-orange"}`}>
                          {cat.id === "3k" ? <Zap className="w-5 h-5" /> : <Trophy className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">DISCIPLINE</span>
                          <span className={`font-mono text-[10px] font-bold ${cat.id === "3k" ? "text-brand-lime" : "text-brand-orange"} tracking-wider`}>{cat.level}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-3xl font-black text-white">{cat.price}</span>
                        <p className="text-[10px] font-mono text-white/40 uppercase">ENTRY PASS</p>
                      </div>
                    </div>

                    {/* Big bold category name */}
                    <div className="mb-4">
                      <h3 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight leading-none uppercase">
                        {cat.name}
                      </h3>
                      <span className={`inline-block font-mono text-xs uppercase tracking-widest mt-1.5 ${cat.id === "3k" ? "text-brand-lime" : "text-brand-orange"}`}>
                        {cat.subtitle}
                      </span>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-8 font-sans">
                      {cat.tagline}
                    </p>

                    {/* Distance & Spec Highlights (Bento blocks) */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                      <div className="bg-white/3 border border-white/5 rounded-lg p-3 text-center">
                        <span className="font-mono text-[9px] text-white/40 block uppercase">DISTANCE</span>
                        <span className={`font-mono text-lg font-black block ${cat.id === "3k" ? "text-brand-lime text-glow-lime" : "text-brand-orange text-glow-orange"}`}>
                          {cat.distance}
                        </span>
                      </div>
                      <div className="bg-white/3 border border-white/5 rounded-lg p-3 text-center">
                        <span className="font-mono text-[9px] text-white/40 block uppercase">START TIME</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white block mt-1">
                          {cat.startTime}
                        </span>
                      </div>
                      <div className="bg-white/3 border border-white/5 rounded-lg p-3 text-center">
                        <span className="font-mono text-[9px] text-white/40 block uppercase">ELEVATION</span>
                        <span className="font-mono text-xs sm:text-sm font-bold text-white block mt-1">
                          {cat.elevation}
                        </span>
                      </div>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3.5 mb-10">
                      <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">PASS PRIVILEGES</span>
                      {cat.features.map((feat, index) => (
                        <div key={index} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${cat.id === "3k" ? "text-brand-lime" : "text-brand-orange"}`} />
                          <span className="text-white/80 text-xs md:text-sm font-sans">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card bottom: Technical Specs & Action */}
                  <div className="border-t border-white/5 pt-6 mt-auto">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      {cat.specs.map((s) => (
                        <div key={s.label}>
                          <span className="text-[9px] font-mono text-white/30 block uppercase">{s.label}</span>
                          <span className="text-xs font-mono font-bold text-white">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Active Magnetic Trigger Area with slide transition */}
                    <div
                      className="w-full py-4 px-6 rounded-sm font-display font-black text-xs tracking-widest text-black flex items-center justify-between uppercase transition-all duration-300 relative overflow-hidden group"
                    >
                      {/* Sliding background layer */}
                      <div className={`absolute inset-0 transition-transform duration-300 translate-y-0 group-hover:translate-y-full ${cat.id === "3k" ? "bg-brand-lime" : "bg-brand-orange"}`} />
                      <div className="absolute inset-0 bg-white transition-transform duration-300 -translate-y-full group-hover:translate-y-0" />
                      
                      <span className="relative z-10">SELECT THIS CATEGORY</span>
                      <ChevronRight className="w-4.5 h-4.5 relative z-10 group-hover:translate-x-1.5 transition-transform duration-300 font-bold" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
