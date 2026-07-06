import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Flame } from "lucide-react";

interface NavbarProps {
  onRegisterClick: () => void;
  scrollProgress: number;
}

export default function Navbar({ onRegisterClick, scrollProgress }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "CATEGORIES", href: "#categories" },
    { name: "ROUTE MAP", href: "#route-map" },
    { name: "RACE PACK", href: "#race-pack" },
    { name: "MEDAL", href: "#medal" },
    { name: "TIMELINE", href: "#timeline" },
    { name: "GALLERY", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-luxury-black/80 backdrop-blur-md border-b border-white/5 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative w-8 h-8 rounded bg-brand-orange flex items-center justify-center overflow-hidden">
              <Flame className="w-5 h-5 text-black font-bold group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-brand-lime opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Flame className="w-5 h-5 text-black font-bold" />
              </div>
            </div>
            <span className="font-display font-extrabold tracking-widest text-lg md:text-xl text-white">
              PARI<span className="text-brand-orange group-hover:text-brand-lime transition-colors duration-300">RUN</span>
              <span className="text-xs font-mono font-medium ml-1.5 opacity-60 tracking-normal align-super text-stroke group-hover:text-stroke-active">2026</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 font-display text-xs font-semibold tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative text-white/70 hover:text-white transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-orange transition-all duration-300 group-hover:w-full" />
                <span className="absolute bottom-0 right-0 w-0 h-[2px] bg-brand-lime transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Button & Mobile Trigger */}
          <div className="flex items-center gap-4">
            {/* Quota indicator from Immersive Theme */}
            <div className="hidden md:flex px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></div>
              <span className="text-[10px] font-mono tracking-tight text-white/80">QUOTA: 928 / 1,000 LEFT</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRegisterClick}
              className="relative hidden sm:inline-flex items-center justify-center overflow-hidden rounded-sm px-6 py-2.5 group cursor-pointer z-10"
            >
              {/* Core colors & slide effects */}
              <div className="absolute inset-0 bg-brand-orange transition-transform duration-300 translate-y-0 group-hover:translate-y-full" />
              <div className="absolute inset-0 bg-brand-lime transition-transform duration-300 -translate-y-full group-hover:translate-y-0" />
              
              {/* Button text */}
              <span className="relative font-display font-black text-xs tracking-widest text-black">
                REGISTER NOW
              </span>

              {/* Glowing hover state borders */}
              <div className="absolute -inset-1 rounded opacity-0 group-hover:opacity-100 bg-brand-orange/20 blur-md transition-opacity duration-500 -z-10" />
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white hover:text-brand-orange transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-white/5">
          <motion.div
            style={{ scaleX: scrollProgress }}
            className="h-full bg-linear-to-r from-brand-orange to-brand-lime origin-left"
          />
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 w-full h-screen bg-luxury-black/98 z-45 flex flex-col justify-center px-8 md:px-16"
          >
            {/* Grid overlay backgrounds */}
            <div className="absolute inset-0 noise-overlay pointer-events-none" />
            
            <div className="flex flex-col gap-8 font-display text-2xl md:text-4xl font-extrabold tracking-widest text-left max-w-lg">
              {navLinks.map((link, index) => (
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={link.name}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="group inline-flex items-center gap-4 text-white/60 hover:text-white transition-colors"
                  >
                    <span className="text-xs font-mono font-bold text-brand-orange opacity-60">0{index + 1}</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6 border-t border-white/10 mt-4"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onRegisterClick();
                  }}
                  className="w-full bg-brand-orange text-black font-display font-black text-sm tracking-widest py-4 rounded text-center hover:bg-brand-lime transition-colors duration-300"
                >
                  REGISTER NOW
                </button>
              </motion.div>
            </div>

            {/* Mobile Footer Decor */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-[10px] font-mono text-white/30 tracking-wider">
              <span>PARI RUN 2026 © ALL RIGHTS RESERVED</span>
              <span>OCTOBER 25, 2026 / PARIS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
