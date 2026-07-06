import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

interface ClickRipple {
  id: string;
  x: number;
  y: number;
}

export default function CursorLight() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null); // To change styling depending on context
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Motion values for the background glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Motion values for the interactive pointer dot (low lag)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Motion values for the cursor trailing ring (spring-dampened)
  const ringX = useMotionValue(0);
  const ringY = useMotionValue(0);

  // Spring configuration for high-fidelity interactive feels
  const glowSpringConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const cursorSpringConfig = { damping: 18, stiffness: 220, mass: 0.4 };

  const lightX = useSpring(glowX, glowSpringConfig);
  const lightY = useSpring(glowY, glowSpringConfig);

  const springRingX = useSpring(ringX, cursorSpringConfig);
  const springRingY = useSpring(ringY, cursorSpringConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 1024 || 
        navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        // Set background ambient glow coords (centered on a 400px glow)
        glowX.set(e.clientX - 200);
        glowY.set(e.clientY - 200);

        // Set exact custom cursor dot coords (centered on a 6px dot)
        dotX.set(e.clientX - 3);
        dotY.set(e.clientY - 3);

        // Set custom cursor trailing ring coords (centered on a 32px ring)
        ringX.set(e.clientX - 16);
        ringY.set(e.clientY - 16);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], .cursor-pointer, input, select, textarea");
      if (interactiveEl) {
        setIsHovered(true);
        // Identify special button hovers to change visual cues
        if (interactiveEl.classList.contains("bg-brand-lime") || interactiveEl.textContent?.includes("SELECT")) {
          setHoverType("lime");
        } else {
          setHoverType("orange");
        }
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        const newRipple: ClickRipple = {
          id: `${Date.now()}-${Math.random()}`,
          x: e.clientX,
          y: e.clientY,
        };
        setRipples((prev) => [...prev, newRipple].slice(-6));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleMouseClick);
    };
  }, [glowX, glowY, dotX, dotY, ringX, ringY]);

  // Clean up ripples when they finish animating
  const handleRippleComplete = (id: string) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-20%] w-[150%] aspect-square rounded-full bg-brand-orange/10 blur-[120px]" />
        <div className="absolute top-[40%] right-[-50%] w-[120%] aspect-square rounded-full bg-brand-lime/5 blur-[150px]" />
        <div className="absolute bottom-[15%] left-[-40%] w-[100%] aspect-square rounded-full bg-brand-orange/5 blur-[120px]" />
      </div>
    );
  }

  return (
    <>
      {/* 1. Moving Glow Lights Layer (Background) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          style={{
            x: lightX,
            y: lightY,
          }}
          className="absolute w-[400px] h-[400px] rounded-full bg-radial from-brand-orange/12 to-transparent blur-[80px]"
        />
        <motion.div
          style={{
            x: lightX,
            y: lightY,
          }}
          className="absolute w-[250px] h-[250px] rounded-full bg-radial from-brand-lime/8 to-transparent blur-[60px] translate-x-[80px] translate-y-[-50px]"
        />

        {/* Static ambient page pillars for depth */}
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full bg-brand-orange/4 blur-[160px]" />
        <div className="absolute top-[50%] right-[5%] w-[600px] h-[600px] rounded-full bg-brand-lime/3 blur-[180px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-brand-orange/3 blur-[140px]" />
      </div>

      {/* 2. Interactive Click Ripples (Foreground - z-50) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{
                position: "absolute",
                left: ripple.x,
                top: ripple.y,
                x: "-50%",
                y: "-50%",
                width: 6,
                height: 6,
                borderRadius: "50%",
                border: "2px solid #FF6B00",
                opacity: 0.8,
              }}
              animate={{
                width: 70,
                height: 70,
                opacity: 0,
                borderColor: "#C7FF00",
                borderWidth: "1px",
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onAnimationComplete={() => handleRippleComplete(ripple.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* 3. Interactive Custom Pointer Dot & Dampened Trail Ring (Foreground - z-50) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
        {/* Dampened Ring Trail */}
        <motion.div
          style={{
            x: springRingX,
            y: springRingY,
          }}
          animate={{
            scale: isHovered ? 1.6 : 1,
            backgroundColor: isHovered 
              ? (hoverType === "lime" ? "rgba(199, 255, 0, 0.12)" : "rgba(255, 107, 0, 0.12)") 
              : "rgba(255, 255, 255, 0)",
            borderColor: isHovered 
              ? (hoverType === "lime" ? "#C7FF00" : "#FF6B00") 
              : "rgba(255, 255, 255, 0.35)",
            borderWidth: isHovered ? "2px" : "1px",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="absolute w-8 h-8 rounded-full border border-white/35 flex items-center justify-center"
        >
          {/* Subtle central hover crosshairs */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              className="w-1.5 h-1.5 rounded-full bg-white"
            />
          )}
        </motion.div>

        {/* Precise Focus Dot */}
        <motion.div
          style={{
            x: dotX,
            y: dotY,
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered 
              ? (hoverType === "lime" ? "#C7FF00" : "#FF6B00") 
              : "#FF6B00",
          }}
          className="absolute w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(255,107,0,0.5)]"
        />
      </div>
    </>
  );
}

