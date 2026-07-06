import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, Flag, Radio, Users, Gift, Sparkles, Filter } from "lucide-react";
import { TimelineItem } from "../types";

export default function Timeline() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const timelineEvents: TimelineItem[] = [
    {
      time: "06:00 AM",
      title: "Muster Gates Open",
      category: "PREPARATION",
      description: "Arrival at Concorde Arena. Retrieve runner bib, drop off dynamic baggage at security docks, and access early hydration centers.",
      icon: "gate"
    },
    {
      time: "06:30 AM",
      title: "Live DJ Warmup Session",
      category: "ENTERTAINMENT",
      description: "High-bpm electronic synth set begins. Dynamic group stretch drills guided by veteran pacing coaches on the main stage.",
      icon: "music"
    },
    {
      time: "06:45 AM",
      title: "Grid Lineup & Briefing",
      category: "PREPARATION",
      description: "Assemble into designated pace corridors. Final tactical review of safety outposts, timing mats, and elite runner announcements.",
      icon: "briefing"
    },
    {
      time: "07:00 AM",
      title: "5K Challenge START",
      category: "RACE",
      description: "The main grid launches. High-precision RFID timing chips activated dynamically as runners cross the primary Start arch.",
      icon: "start"
    },
    {
      time: "07:15 AM",
      title: "3K Fun Run START",
      category: "RACE",
      description: "Urban pacing cohort starts. High energy, friendly pacing squads, and live camera tracking alongside the beautiful Seine.",
      icon: "start"
    },
    {
      time: "08:30 AM",
      title: "Recovery Docks Open",
      category: "RECOVERY",
      description: "Cross the Finish arch, claim medals, and access the recovery zone containing active cold mist plunge pools, and massage lounges.",
      icon: "recovery"
    },
    {
      time: "09:00 AM",
      title: "Podium Ceremony",
      category: "ENTERTAINMENT",
      description: "Celebrating the top pace makers. Handover of elite trophies, community leader awards, and final closing DJ set.",
      icon: "celebration"
    }
  ];

  const filterTags = ["ALL", "PREPARATION", "RACE", "RECOVERY", "ENTERTAINMENT"];

  const filteredEvents = activeFilter === "ALL" 
    ? timelineEvents 
    : timelineEvents.filter(e => e.category === activeFilter);

  return (
    <section id="timeline" className="relative py-24 px-6 md:px-12 bg-luxury-black overflow-hidden border-t border-white/5">
      {/* Decorative gradients */}
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-orange tracking-widest font-black uppercase">EVENT DAY SCHEDULE</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
              THE CHRONOLOGY
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-white/5 border border-white/10 p-1.5 rounded-lg self-start backdrop-blur-md">
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded font-mono text-[9px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeFilter === tag
                    ? "bg-brand-orange text-black font-black"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical central stem line */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-[1.5px] bg-white/15 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-2 bottom-2 w-[1.5px] bg-white/15 md:hidden" />

          {/* Interactive Events list */}
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((ev, index) => {
                const isEven = index % 2 === 0;
                
                // Icon select
                let EventIcon = Clock;
                if (ev.category === "RACE") EventIcon = Flag;
                else if (ev.category === "ENTERTAINMENT") EventIcon = Radio;
                else if (ev.category === "RECOVERY") EventIcon = Gift;
                else if (ev.category === "PREPARATION") EventIcon = Users;

                return (
                  <motion.div
                    key={ev.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex flex-col md:flex-row relative items-start ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Node Dot Indicator on vertical stem */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-luxury-black border-2 border-brand-orange -translate-x-1/2 flex items-center justify-center z-10">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-ping" />
                    </div>

                    {/* Timeline card */}
                    <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    }`}>
                      <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 group relative overflow-hidden backdrop-blur-md">
                        {/* Soft interior light highlights */}
                        <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />

                        {/* Top Time and Tag Row */}
                        <div className={`flex items-center gap-3 mb-3.5 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <span className="font-mono text-xs text-brand-orange font-black tracking-widest uppercase">
                            {ev.time}
                          </span>
                          <span className="font-mono text-[8px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 tracking-wider">
                            {ev.category}
                          </span>
                        </div>

                        {/* Event Title */}
                        <h4 className="font-display font-black text-lg md:text-xl text-white tracking-wide mb-2">
                          {ev.title}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-white/50 leading-relaxed font-sans">
                          {ev.description}
                        </p>

                        {/* Bottom visual connector details (only shown on card hover) */}
                        <div className={`mt-4 flex items-center gap-2 text-[10px] font-mono text-white/30 border-t border-white/5 pt-3 ${
                          isEven ? "md:justify-end" : "md:justify-start"
                        }`}>
                          <EventIcon className="w-3.5 h-3.5 text-brand-lime shrink-0" />
                          <span>TACTICAL SEGMENT MARKER</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
