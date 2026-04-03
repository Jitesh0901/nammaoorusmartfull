import { motion } from "framer-motion";

export default function BrandsStrip() {
  const brands = [
    "Aquaguard",
    "LUMINOUS",
    "V-Guard",
    "Havells",
    "Exide",
    "Livguard",
  ];

  // We use 4 sets so it easily covers ultra-wide screens, ensuring no blank spaces wait to scroll in.
  const marqueeItems = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="bg-slate-900 py-10 overflow-hidden relative">
      <div className="max-w-full">
        <div className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
          Authorized Dealers
        </div>
        
        {/* Gradient overlays to fade out the edges beautifully */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

        <div className="overflow-hidden w-full flex">
          <motion.div
            className="flex gap-12 sm:gap-24 w-max pr-12 sm:pr-24 will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {marqueeItems.map((brand, index) => (
              <span
                key={index}
                className="text-white font-bold text-lg md:text-2xl opacity-60 whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
