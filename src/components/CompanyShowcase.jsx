import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Battery, 
  ShieldCheck, 
  Home, 
  Wind, 
  ChevronRight,
  Droplets,
  Thermometer
} from "lucide-react";

// Import AI-generated showcase images
import showcaseSolar from "../assets/images/showcase_solar.webp";
import showcaseUps from "../assets/images/showcase_ups.webp";
import showcaseWater from "../assets/images/showcase_water.webp";
import showcaseHeater from "../assets/images/showcase_heater.webp";
import showcaseCctv from "../assets/images/showcase_cctv.webp";
import showcaseVacuum from "../assets/images/showcase_vacuum.webp";

const SLIDES = [
  {
    id: "01",
    title: "SOLAR POWER SOLUTIONS",
    headline: "PREMIUM PHOTOVOLTAIC SOLAR PANELS",
    icon: <Sun className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseSolar,
    desc: "INDIA'S LEADING ROOFTOP SOLAR INFRASTRUCTURE"
  },
  {
    id: "02",
    title: "ENERGY STORAGE",
    headline: "HIGH-CAPACITY UPS & BATTERY SYSTEMS",
    icon: <Battery className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseUps,
    desc: "#1 DEPENDABLE POWER BACKUPS"
  },
  {
    id: "03",
    title: "WATER RESOURCES",
    headline: "PURE AQUA SOLUTIONS | AQUA GUARD",
    icon: <Droplets className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseWater,
    desc: "PURE & SAFE DRINKING WATER FILTRATION"
  },
  {
    id: "04",
    title: "THERMAL ENERGY",
    headline: "ADVANCED SOLAR WATER HEATERS",
    icon: <Thermometer className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseHeater,
    desc: "ZERO-COST HEATING SYSTEMS"
  },
  {
    id: "05",
    title: "SMART SECURITY",
    headline: "INTELLIGENT CCTV SURVEILLANCE",
    icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseCctv,
    desc: "ENVISAGING A SAFER TOMORROW"
  },
  {
    id: "06",
    title: "HOME AUTOMATION",
    headline: "INTELLIGENT ROBOTIC VACUUM CLEANERS",
    icon: <Wind className="w-6 h-6 md:w-8 md:h-8" />,
    image: showcaseVacuum,
    desc: "EXPERIENCE EFFORTLESS SMART CLEANING"
  }
];

export default function CompanyShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-white flex items-center">
      {/* Background Images with AnimatePresence for crossfade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIdx}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* No overlays - showing the direct image as requested */}
          <img
            src={SLIDES[activeIdx].image}
            alt={SLIDES[activeIdx].headline}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content (Center) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          key={`headline-${activeIdx}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-yellow-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {SLIDES[activeIdx].title}
          </span>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none max-w-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
            {SLIDES[activeIdx].headline}
          </h2>
          <div className="pt-8 flex flex-col items-center gap-4">
             <div className="h-1 w-20 bg-yellow-400 shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
             <p className="text-white font-bold tracking-widest text-xs md:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] lg:bg-black/20 lg:backdrop-blur-sm lg:px-4 lg:py-1 lg:rounded-full">
                {SLIDES[activeIdx].desc}
             </p>
          </div>
        </motion.div>
      </div>

      {/* Left Vertical Navigation Menu */}
      <div className="absolute left-0 top-0 h-full z-30 hidden lg:flex flex-col justify-center border-r border-white/10 px-8">
        <div className="space-y-8">
          {SLIDES.map((slide, idx) => (
            <motion.button
              key={slide.id}
              onClick={() => setActiveIdx(idx)}
              className="flex items-center group relative text-left"
              initial={false}
            >
              <div className="flex items-center gap-4 min-w-[160px]">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-black transition-all ${idx === activeIdx ? "text-yellow-400" : "text-white/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>
                      {slide.id}
                    </span>
                    {idx === activeIdx && (
                      <motion.div 
                        className="h-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                        layoutId="activeTabLine"
                        initial={{ width: 0 }}
                        animate={{ width: 30 }}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`transition-all ${idx === activeIdx ? "text-yellow-400" : "text-white/60 group-hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"}`}>
                      {slide.icon}
                    </div>
                    <span className={`text-[11px] font-black tracking-widest uppercase transition-all whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] ${idx === activeIdx ? "text-white" : "text-white/60 group-hover:text-white"}`}>
                      {slide.title.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Indicators (Bottom) */}
      <div className="absolute bottom-10 inset-x-0 z-30 flex justify-center lg:hidden gap-4">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`h-1.5 transition-all rounded-full ${idx === activeIdx ? "w-10 bg-yellow-400" : "w-5 bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
