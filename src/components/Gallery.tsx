import { useState } from "react";
import { motion } from "motion/react";
import { Image, Camera, Flame, Heart, Compass } from "lucide-react";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const galleryItems = [
    {
      id: 1,
      title: "SPEED OF LIGHT",
      category: "ACTION",
      imgUrl: "/src/assets/images/hero_runner_1783250209327.jpg",
      cols: "md:col-span-8",
      rows: "h-[300px] md:h-[420px]"
    },
    {
      id: 2,
      title: "TACTICAL ESSENTIALS",
      category: "GEAR",
      imgUrl: "/src/assets/images/race_pack_kit_1783250222618.jpg",
      cols: "md:col-span-4",
      rows: "h-[300px]"
    },
    {
      id: 3,
      title: "PARIS SPEEDWAY",
      category: "LOCATION",
      imgUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
      cols: "md:col-span-4",
      rows: "h-[250px] md:h-[300px]"
    },
    {
      id: 4,
      title: "HONOR & GRIT",
      category: "GEAR",
      imgUrl: "/src/assets/images/finisher_medal_1783250234675.jpg",
      cols: "md:col-span-4",
      rows: "h-[300px]"
    },
    {
      id: 5,
      title: "BEYOND GRAVITY",
      category: "ACTION",
      imgUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
      cols: "md:col-span-4",
      rows: "h-[300px]"
    },
    {
      id: 6,
      title: "COMMUNITY HEARTBEAT",
      category: "COMMUNITY",
      imgUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop",
      cols: "md:col-span-8",
      rows: "h-[250px] md:h-[350px]"
    }
  ];

  const tabs = ["ALL", "ACTION", "GEAR", "LOCATION", "COMMUNITY"];

  const filteredItems = activeTab === "ALL" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeTab);

  return (
    <section id="gallery" className="relative py-24 px-6 md:px-12 bg-luxury-grey overflow-hidden border-t border-white/5">
      {/* Decorative background grids */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-brand-lime/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-brand-lime tracking-widest font-black uppercase">CAMPAIGN CAPTURES</span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
              THE SCENOGRAPHY
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-1.5 bg-white/5 border border-white/10 p-1.5 rounded-lg self-start backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-mono text-[9px] md:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "bg-brand-orange text-black font-black"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid md:grid-cols-12 gap-6 items-start">
          {filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`${item.cols} group overflow-hidden rounded-2xl bg-luxury-black/60 border border-white/10 relative cursor-pointer`}
              >
                {/* Image */}
                <div className={`relative w-full ${item.rows} overflow-hidden`}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Overlay shadow on card hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-luxury-black via-luxury-black/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300" />
                  
                  {/* Glowing light bars on card corner */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/55 backdrop-blur-md rounded border border-white/10 text-[9px] font-mono text-white/60">
                    <Camera className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    <span>0{item.id} / {item.category}</span>
                  </div>

                  {/* Content details absolute bottom */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="font-mono text-[9px] text-brand-lime font-black tracking-widest uppercase block mb-1">PARI RUN 2026</span>
                      <h4 className="font-display font-extrabold text-lg md:text-xl text-white tracking-wide uppercase">
                        {item.title}
                      </h4>
                    </div>
                    
                    <div className="p-2.5 rounded-full bg-white/5 text-white/50 border border-white/10 group-hover:bg-brand-lime group-hover:text-black group-hover:border-transparent transition-all duration-300">
                      <Flame className="w-4.5 h-4.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
