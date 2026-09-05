import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award } from 'lucide-react';
import { ACHIEVEMENT_ITEM } from '../data/portfolioData';

export const AchievementSection: React.FC = () => {
  return (
    <section id="achievement" className="relative py-28 px-6 sm:px-10 md:px-16 z-10">
      <div className="w-full max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-amber-400 tracking-widest">04 //</span>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">HONORS & ATHLETIC DISCIPLINE</span>
        </div>

        {/* Premium Award Moment Card with Line-Drawing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-b from-[#161208] via-[#0e0f1a] to-[#080912] border border-amber-500/25 p-8 sm:p-12 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.7)]"
        >
          {/* Subtle warm amber radial light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Animated Trophy SVG with line-drawing pathLength */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-amber-500/15 via-amber-400/5 to-purple-600/10 border border-amber-400/30 flex items-center justify-center p-6 shadow-[0_0_40px_rgba(245,158,11,0.2)] group hover:scale-105 transition-transform duration-500">
                {/* SVG Line-drawn Trophy */}
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  {/* Outer Cup Rim */}
                  <motion.path
                    d="M25 24 H75 V42 C75 55 64 66 50 66 C36 66 25 55 25 42 Z"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                  {/* Handles */}
                  <motion.path
                    d="M25 30 C15 30 12 45 25 48"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  <motion.path
                    d="M75 30 C85 30 88 45 75 48"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  {/* Stem & Base */}
                  <motion.path
                    d="M50 66 V78 M35 78 H65 M30 84 H70"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                  />
                  {/* Star Emblem inside cup */}
                  <motion.circle
                    cx="50"
                    cy="40"
                    r="5"
                    fill="#fef08a"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  />
                </svg>

                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-400 text-zinc-950 shadow-lg">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <span className="mt-4 inline-block px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs tracking-wider uppercase font-semibold">
                STATE LEVEL
              </span>
            </div>

            {/* Award Narrative */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>OFFICIAL STATE ATHLETIC COMPETITION</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {ACHIEVEMENT_ITEM.title}
              </h3>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {ACHIEVEMENT_ITEM.description}
              </p>

              {/* Attributes transferred to software engineering */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {ACHIEVEMENT_ITEM.attributes.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center hover:border-amber-400/30 transition-colors"
                  >
                    <span className="text-xs font-mono text-zinc-300 block">{attr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
