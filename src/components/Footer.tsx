import { Flame, Instagram, Twitter, Youtube, Compass } from "lucide-react";

interface FooterProps {
  onRegisterClick: () => void;
}

export default function Footer({ onRegisterClick }: FooterProps) {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-luxury-black border-t border-white/10 pt-20 pb-12 px-6 md:px-12 overflow-hidden">
      {/* Decorative grids */}
      <div className="absolute inset-0 noise-overlay opacity-20 pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[300px] bg-brand-orange/4 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Massive Editorial Headline */}
        <div className="border-b border-white/10 pb-16 mb-16">
          <div className="font-display tracking-tighter text-left">
            <span className="font-mono text-xs text-brand-orange font-black tracking-widest uppercase block mb-3">OCTOBER 25, 2026 / PARIS</span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-none uppercase">
              BECOME THE
            </h2>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-stroke uppercase mt-1">
              LIGHTNING LOOP
            </h2>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
          
          {/* Logo & Manifesto (Col 1-4) */}
          <div className="col-span-2 lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center">
                <Flame className="w-5 h-5 text-black font-bold" />
              </div>
              <span className="font-display font-extrabold tracking-widest text-lg text-white">
                PARI<span className="text-brand-orange">RUN</span>
                <span className="text-xs font-mono font-medium ml-1.5 opacity-60 tracking-normal align-super text-stroke">2026</span>
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-sans">
              An interactive urban sports campaign and timed race staging. Pushing human kinetics beyond default boundaries inside the heart of Paris, France.
            </p>
          </div>

          {/* Navigation Column (Col 5-6) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-brand-orange font-black tracking-widest uppercase">EXPLORE</h4>
            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <button onClick={() => handleScrollTo("#categories")} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">CATEGORIES</button>
              <button onClick={() => handleScrollTo("#route-map")} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">ROUTE MAP</button>
              <button onClick={() => handleScrollTo("#race-pack")} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">RACE KIT</button>
              <button onClick={() => handleScrollTo("#medal")} className="text-white/60 hover:text-white hover:translate-x-1 transition-all text-left">THE MEDAL</button>
            </div>
          </div>

          {/* Socials Column (Col 7-8) */}
          <div className="col-span-1 lg:col-span-2 space-y-4">
            <h4 className="font-mono text-[10px] text-brand-orange font-black tracking-widest uppercase">SOCIALS</h4>
            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all">
                <Instagram className="w-3.5 h-3.5" /> INSTAGRAM
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all">
                <Twitter className="w-3.5 h-3.5" /> TWITTER
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all">
                <Youtube className="w-3.5 h-3.5" /> YOUTUBE
              </a>
              <a href="https://strava.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white hover:translate-x-1 transition-all">
                <Compass className="w-3.5 h-3.5" /> STRAVA ATHLETE
              </a>
            </div>
          </div>

          {/* Action Call Column (Col 9-12) */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <h4 className="font-mono text-[10px] text-brand-lime font-black tracking-widest uppercase">GET YOUR CORRAL</h4>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              Limited to exactly 1,000 active runners. Settle your entry pass before September cutoff to guarantee your name print on the timing bib.
            </p>
            <button
              onClick={onRegisterClick}
              className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-3 text-black font-display font-black text-xs tracking-widest uppercase rounded w-full text-center cursor-pointer"
            >
              {/* Double sliding background panels */}
              <div className="absolute inset-0 bg-brand-orange transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-[-100%]" />
              <div className="absolute inset-0 bg-brand-lime translate-y-[100%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-300">REGISTER FOR PARI RUN</span>
            </button>
          </div>

        </div>

        {/* Legal & Stamp bottom row */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/40">
          <span>PARI RUN 2026 OFFICIAL EVENT. ALL RIGHTS SECURED © COPYRIGHT 2026.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY CODE</a>
            <span className="text-white/10">•</span>
            <a href="#terms" className="hover:text-white transition-colors">TERMS OF ATHLETICS</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
