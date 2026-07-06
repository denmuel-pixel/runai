import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Map as MapIcon, 
  Flag, 
  Compass, 
  Waves, 
  Heart, 
  Trophy, 
  MapPin, 
  Eye, 
  Info,
  ExternalLink
} from "lucide-react";
import { Checkpoint } from "../types";

// Import pre-generated static dark-mode Paris map images
// @ts-ignore
import parisMap3k from "../assets/images/paris_map_3k_1783274339432.jpg";
// @ts-ignore
import parisMap5k from "../assets/images/paris_map_5k_1783274352561.jpg";

interface StaticCheckpoint extends Omit<Checkpoint, 'x' | 'y'> {
  left: string; // percentage for positioning on static image
  top: string;  // percentage for positioning on static image
}

const checkpoints3k: StaticCheckpoint[] = [
  { id: 1, name: "Place de la Concorde", km: 0.0, description: "Assemble point, race bib check, pre-run warmup zone, and starting grid.", left: "18%", top: "25%" },
  { id: 2, name: "Seine Riverfront Walk", km: 1.0, description: "Scenic pathway alongside the river Seine. Fast paving, light breeze, hydration station 1.", left: "38%", top: "48%" },
  { id: 3, name: "Pont des Invalides", km: 1.5, description: "3 KM Turnaround mark. Live DJ sound setup and high-energy encouragement zone.", left: "52%", top: "58%" },
  { id: 4, name: "Grand Palais vista", km: 2.2, description: "Pristine historical backdrop, photo outpost, and cheering spectators zone.", left: "68%", top: "42%" },
  { id: 5, name: "Concorde Finish Arch", km: 3.0, description: "Cross the final gate, claim your premium 3K finisher medal and dynamic energy pack.", left: "82%", top: "25%" },
];

const checkpoints5k: StaticCheckpoint[] = [
  { id: 1, name: "Place de la Concorde", km: 0.0, description: "Primary muster point, baggage counter, and 5K Elite Starting Grid.", left: "15%", top: "35%" },
  { id: 2, name: "Seine Pathway East", km: 1.2, description: "Rapid flats with hydration station 1, ambient mist coolers, and medical tent.", left: "28%", top: "46%" },
  { id: 3, name: "Pont de l'Alma", km: 2.5, description: "Steep elevation climb, live percussion band, high intensity motivation zone.", left: "45%", top: "58%" },
  { id: 4, name: "Eiffel Tower Vista", km: 3.2, description: "5 KM Turnaround spot. Iconic viewing point with professional event photographers.", left: "60%", top: "72%" },
  { id: 5, name: "Musée d'Orsay Trail", km: 4.2, description: "Scenic cobblestone segment, energy gel distribution, and hydration station 2.", left: "75%", top: "50%" },
  { id: 6, name: "Concorde Arena Gate", km: 5.0, description: "The Grand Finish. Red carpet track, physical leaderboard, and recovery massage zone.", left: "88%", top: "35%" },
];

export default function RoutePreview() {
  const [activeCategory, setActiveCategory] = useState<"3k" | "5k">("5k");
  const [hoveredCheckpoint, setHoveredCheckpoint] = useState<number | null>(null);

  const currentCheckpoints = activeCategory === "3k" ? checkpoints3k : checkpoints5k;
  const currentMapImage = activeCategory === "3k" ? parisMap3k : parisMap5k;
  const activeThemeColor = activeCategory === "3k" ? "border-brand-lime text-brand-lime" : "border-brand-orange text-brand-orange";

  return (
    <section id="route-map" className="relative py-24 px-6 md:px-12 bg-luxury-grey overflow-hidden border-t border-white/10">
      {/* Decorative background effects */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-brand-lime tracking-widest font-black uppercase">ROUTE MAP</span>
          <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1 mb-4 uppercase">
            THE URBAN STAGE
          </h2>
          <p className="text-sm text-white/50 leading-relaxed font-sans">
            Explore the high-performance racing routes cutting through the heart of Paris. Select a circuit below to view landmark checkpoints and route details.
          </p>
        </div>

        {/* High visibility circuit switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          {/* 3K Switcher Button */}
          <button
            onClick={() => {
              setActiveCategory("3k");
              setHoveredCheckpoint(null);
            }}
            className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
              activeCategory === "3k"
                ? "bg-brand-lime border-brand-lime text-black shadow-lg shadow-brand-lime/10"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-60">Circuit Alpha</span>
              {activeCategory === "3k" && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
            </div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase relative z-10">
              3K FUN RUN
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1 relative z-10">
              Novice Route • Beginner
            </span>
          </button>

          {/* 5K Switcher Button */}
          <button
            onClick={() => {
              setActiveCategory("5k");
              setHoveredCheckpoint(null);
            }}
            className={`group relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
              activeCategory === "5k"
                ? "bg-brand-orange border-brand-orange text-black shadow-lg shadow-brand-orange/10"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-60">Circuit Omega</span>
              {activeCategory === "5k" && <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
            </div>
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight uppercase relative z-10">
              5K CHALLENGE
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1 relative z-10">
              Pro Circuit • Advanced
            </span>
          </button>
        </div>

        {/* Dynamic Route Container */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Static Google Map Visualizer Container (Cols 1-8) */}
          <div className="lg:col-span-8 bg-luxury-black/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative min-h-[450px] sm:min-h-[520px]">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 z-10">
              <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase">
                PARIS OFFICIAL SATELLITE PATHWAY
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>STATIC GOOGLE MAP ACTIVE</span>
              </div>
            </div>

            {/* Main Map Stage containing the static map image with overlaid hotspots */}
            <div className="relative w-full flex-grow flex items-center justify-center min-h-[300px] rounded-xl overflow-hidden group/map select-none">
              
              {/* The Static Google Map Visual Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentMapImage}
                    alt={`Paris ${activeCategory} route map`}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  {/* Smooth dark overlay to match app aesthetics */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Interactive Overlaid Checkpoint Hotspots positioned relative to the map */}
              <div className="absolute inset-0 z-10">
                {currentCheckpoints.map((cp) => {
                  const isHovered = hoveredCheckpoint === cp.id;
                  return (
                    <div
                      key={cp.id}
                      style={{ left: cp.left, top: cp.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                      onMouseEnter={() => setHoveredCheckpoint(cp.id)}
                      onMouseLeave={() => setHoveredCheckpoint(null)}
                    >
                      {/* Pulse Ring */}
                      <div 
                        className={`absolute w-12 h-12 -left-6 -top-6 rounded-full transition-all duration-300 scale-100 ${
                          activeCategory === "3k" ? "bg-brand-lime/20" : "bg-brand-orange/20"
                        } ${isHovered ? "scale-130 animate-pulse bg-opacity-40" : "opacity-0 group-hover/map:opacity-100"}`}
                      />
                      {/* Core Glowing Dot */}
                      <div 
                        className={`relative w-5 h-5 rounded-full border border-black/80 flex items-center justify-center transition-all duration-300 font-mono text-[8px] font-black text-black ${
                          activeCategory === "3k" 
                            ? "bg-brand-lime shadow-[0_0_12px_rgba(199,255,0,0.8)]" 
                            : "bg-brand-orange shadow-[0_0_12px_rgba(255,107,0,0.8)]"
                        } ${isHovered ? "scale-125" : ""}`}
                      >
                        {cp.km === 0 ? "S" : cp.km === 3 || cp.km === 5 ? "F" : Math.floor(cp.km)}
                      </div>

                      {/* Tooltip Label */}
                      <div 
                        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-black/95 border border-white/15 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold text-white whitespace-nowrap shadow-2xl transition-all duration-300 pointer-events-none ${
                          isHovered 
                            ? "opacity-100 translate-y-0 scale-100" 
                            : "opacity-0 translate-y-2 scale-95"
                        }`}
                      >
                        {cp.name} ({cp.km === 0 ? "START" : `${cp.km}k`})
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Decorative Compass watermark */}
              <div className="absolute bottom-4 right-4 pointer-events-none opacity-30 font-mono text-[8px] text-white flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                <Compass className="w-3.5 h-3.5 text-white animate-spin-slow" />
                <span>N 48° 51' • E 2° 19'</span>
              </div>
            </div>

            {/* Live Legend */}
            <div className="flex flex-wrap gap-4 justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/10 pt-4 mt-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" /> PARIS CENTRIC COORDINATES
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> ACCURATE MILESTONES
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" /> TOTAL FINISHERS ESTIMATE: 5000+
              </span>
            </div>
          </div>

          {/* Landmarks Detail List (Cols 9-12) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-luxury-black/40 border border-white/10 rounded-2xl p-6 overflow-hidden">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapIcon className="w-4.5 h-4.5 text-brand-orange" />
                <span className="font-mono text-xs font-black tracking-widest text-white">ROUTE LANDMARKS</span>
              </div>

              {/* Landmarks vertical stack */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto no-scrollbar pr-1">
                {currentCheckpoints.map((cp) => {
                  const isHovered = hoveredCheckpoint === cp.id;
                  
                  // Pick appropriate icon based on landmark type
                  let IconComponent = MapPin;
                  if (cp.km === 0.0) IconComponent = Flag;
                  else if (cp.km === 3.0 || cp.km === 5.0) IconComponent = Trophy;
                  else if (cp.name.includes("River")) IconComponent = Waves;
                  else if (cp.name.includes("Alma") || cp.name.includes("Invalides")) IconComponent = Compass;
                  else if (cp.name.includes("Tower") || cp.name.includes("Palais")) IconComponent = Eye;
                  else if (cp.name.includes("Orsay") || cp.name.includes("vista")) IconComponent = Heart;

                  return (
                    <div
                      key={cp.id}
                      onMouseEnter={() => setHoveredCheckpoint(cp.id)}
                      onMouseLeave={() => setHoveredCheckpoint(null)}
                      className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered
                          ? "bg-white/5 border-white/15 translate-x-1"
                          : "bg-transparent border-transparent"
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded h-fit ${isHovered ? (activeCategory === "3k" ? "bg-brand-lime text-black" : "bg-brand-orange text-black") : "bg-white/5 text-white/50"}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <h4 className={`text-xs font-display font-extrabold tracking-wide ${isHovered ? "text-white" : "text-white/80"}`}>
                              {cp.name}
                            </h4>
                            <span className="font-mono text-[9px] text-brand-orange font-bold">
                              {cp.km === 0.0 ? "START" : `${cp.km} KM`}
                            </span>
                          </div>
                          <p className="text-[11px] font-sans text-white/40 leading-relaxed mt-1">
                            {cp.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* High contrast immersive banner from theme */}
            <div className="bg-brand-lime rounded-xl p-4 mt-4 flex items-center justify-between overflow-hidden shadow-lg shadow-brand-lime/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand-lime font-black" />
                </div>
                <div className="text-black">
                  <p className="text-[9px] font-mono font-bold uppercase tracking-tight opacity-70">ROUTE PREVIEW</p>
                  <p className="text-xs font-display font-black uppercase tracking-tighter">Champs-Élysées Circuit</p>
                </div>
              </div>
              <button className="bg-black hover:bg-neutral-900 transition-colors text-white px-4 py-2 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer">
                ACTIVE
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
