import { useState, useEffect } from "react";
import CursorLight from "./components/CursorLight";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import RoutePreview from "./components/RoutePreview";
import RacePack from "./components/RacePack";
import MedalShowcase from "./components/MedalShowcase";
import Timeline from "./components/Timeline";
import Gallery from "./components/Gallery";
import Sponsors from "./components/Sponsors";
import FaqSection from "./components/FaqSection";
import RegistrationDrawer from "./components/RegistrationDrawer";
import Footer from "./components/Footer";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [preSelectedCat, setPreSelectedCat] = useState<string>("5k");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track page-level scroll progress for the top indicator bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openRegistration = (catId: string = "5k") => {
    setPreSelectedCat(catId);
    setIsRegisterOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-luxury-black text-white selection:bg-brand-orange selection:text-black antialiased overflow-x-hidden font-sans lg:cursor-none">
      
      {/* 1. Interactive Cursor Spotlight Light Layer */}
      <CursorLight />

      {/* Film grain noise overlay applied globally */}
      <div className="absolute inset-0 noise-overlay opacity-[0.02] pointer-events-none z-40" />

      {/* 2. Top-sticky Navigation with progress bar */}
      <Navbar 
        onRegisterClick={() => openRegistration("5k")} 
        scrollProgress={scrollProgress} 
      />

      {/* 3. Immersive Parallax Hero Section */}
      <Hero onRegisterClick={() => openRegistration("5k")} />

      {/* 4. Infinite-scrolling Sponsors Marquee */}
      <Sponsors />

      {/* 5. 3D Tilt Race Category Selection Bento Cards */}
      <Categories onSelectCategory={(catId) => openRegistration(catId)} />

      {/* 6. Interactive SVG Route Map Mapping with coordinates */}
      <RoutePreview />

      {/* 7. Race Pack gear details and interactive sizing utility */}
      <RacePack />

      {/* 8. Commemorative Finisher Medal 3D tilt showcase */}
      <MedalShowcase />

      {/* 9. Event Chronology Schedule with active categories */}
      <Timeline />

      {/* 10. Dynamic off-axis Bento Grid Photo Gallery */}
      <Gallery />

      {/* 11. FAQ Accordions */}
      <FaqSection />

      {/* 12. Editorial minimal Footer */}
      <Footer onRegisterClick={() => openRegistration("5k")} />

      {/* 13. Slide-out Ticketing & Checkout Drawer */}
      <RegistrationDrawer
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preSelectedCategory={preSelectedCat}
      />
    </div>
  );
}
