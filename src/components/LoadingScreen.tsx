import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400; // 1.4s smooth load

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 450);
        }, 200);
      }
    };

    const req = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(req);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#050509] text-white selection:bg-purple-600/30"
        >
          {/* Top telemetry */}
          <div className="flex items-center justify-between text-xs tracking-widest text-zinc-500 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              SYSTEM.ACTIVE
            </span>
            <span>01 / 01</span>
          </div>

          {/* Center Identity */}
          <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                SEEMA YADAV
              </h1>
              <p className="mt-2 text-xs md:text-sm font-mono tracking-widest text-cyan-400 uppercase">
                ASPIRING SOFTWARE DEVELOPER
              </p>
            </motion.div>

            {/* Subtle progress indicator */}
            <div className="w-48 md:w-64 h-[2px] bg-zinc-800 relative rounded-full overflow-hidden mt-6">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Bottom status text */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="tracking-wider text-zinc-400">
              INITIALIZING EXPERIENCE...
            </span>
            <span className="tabular-nums font-semibold text-cyan-400">
              {progress.toString().padStart(3, '0')}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
