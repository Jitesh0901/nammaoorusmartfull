import { motion, AnimatePresence } from "framer-motion";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .spin-root {
    font-family: 'Inter', sans-serif;
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(240, 240, 255, 0.75) 40%,
      rgba(220, 220, 255, 0.28) 70%,
      rgba(200, 210, 255, 0.06) 100%
    );
    backdrop-filter: blur(32px) saturate(180%);
    -webkit-backdrop-filter: blur(32px) saturate(180%);
    overflow: hidden;
    user-select: none;
  }

  /* ── Spinner scene ── */
  .spin-scene {
    position: relative;
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Rings ── */
  .spin-ring {
    position: absolute;
    border-radius: 50%;
    border: 2.5px solid transparent;
  }

  /* Outer ring — teal/cyan dashes */
  .spin-ring-1 {
    width: 160px;
    height: 160px;
    border-top-color: #06b6d4;
    border-right-color: rgba(6,182,212,0.3);
    border-bottom-color: transparent;
    border-left-color: rgba(6,182,212,0.15);
    animation: spinCW 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
    box-shadow: 0 0 0 0 transparent;
    filter: drop-shadow(0 0 6px rgba(6,182,212,0.55));
  }

  /* Middle ring — indigo, opposite direction */
  .spin-ring-2 {
    width: 116px;
    height: 116px;
    border-top-color: transparent;
    border-right-color: rgba(99,102,241,0.35);
    border-bottom-color: #6366f1;
    border-left-color: rgba(99,102,241,0.18);
    animation: spinCCW 2.2s cubic-bezier(0.4,0,0.2,1) infinite;
    filter: drop-shadow(0 0 5px rgba(99,102,241,0.50));
  }

  /* Inner ring — violet/purple, fast */
  .spin-ring-3 {
    width: 72px;
    height: 72px;
    border-top-color: #a855f7;
    border-right-color: transparent;
    border-bottom-color: rgba(168,85,247,0.20);
    border-left-color: rgba(168,85,247,0.40);
    animation: spinCW 1.1s linear infinite;
    filter: drop-shadow(0 0 4px rgba(168,85,247,0.60));
  }

  @keyframes spinCW  { to { transform: rotate(360deg);  } }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }

  /* ── Center dot ── */
  .spin-center {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #818cf8 0%, #06b6d4 100%);
    box-shadow:
      0 0 18px 6px rgba(99,102,241,0.40),
      0 0 36px 10px rgba(6,182,212,0.18);
    animation: centerPulse 2s ease-in-out infinite;
  }
  @keyframes centerPulse {
    0%,100% { transform: scale(1);    opacity: 1;   }
    50%      { transform: scale(0.78); opacity: 0.7; }
  }

  /* ── Rotating tick marks on outer ring ── */
  .spin-tick-wrap {
    position: absolute;
    width: 160px;
    height: 160px;
    animation: spinCW 1.6s cubic-bezier(0.4,0,0.2,1) infinite;
  }

  /* ── Brand ── */
  .spin-brand {
    text-align: center;
    margin-top: 36px;
  }
  .spin-brand h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.025em;
    background: linear-gradient(135deg, #3730a3 0%, #6366f1 50%, #0891b2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .spin-brand p {
    margin: 6px 0 0;
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(6,182,212,0.60);
  }

  /* ── Status ── */
  .spin-status {
    margin-top: 24px;
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: rgba(55, 65, 120, 0.55);
  }
  .spin-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: conic-gradient(#6366f1, #06b6d4, #6366f1);
    animation: spinCW 1s linear infinite;
  }
`;

export default function LoadingScreen({ visible }) {
  return (
    <>
      <style>{STYLES}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="spin-loader"
            className="spin-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* Spinner scene */}
            <motion.div
              className="spin-scene"
              initial={{ opacity: 0, scale: 0.80 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              {/* Outer ring */}
              <div className="spin-ring spin-ring-1" />
              {/* Middle ring */}
              <div className="spin-ring spin-ring-2" />
              {/* Inner ring */}
              <div className="spin-ring spin-ring-3" />
              {/* Center dot */}
              <div className="spin-center" />
            </motion.div>

            {/* Brand */}
            <motion.div
              className="spin-brand"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55, ease: "easeOut" }}
            >
              <h1>Namma Ooru</h1>
              <p>Smart Solutions</p>
            </motion.div>

            {/* Status */}
            <motion.div
              className="spin-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <span className="spin-status-dot" />
              Getting things ready…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
