import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GraduationCap, Cpu, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 3]);

  // Words to reveal word-by-word
  const introQuote = PERSONAL_INFO.bio.split(' ');

  const quoteWordVariants = {
    hidden: { opacity: 0, y: 15, filter: 'blur(4px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.15 + i * 0.025,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-28 px-6 sm:px-10 md:px-16 z-10 overflow-hidden"
    >
      {/* Connected line transition from Hero */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-purple-500/30" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            01 // IDENTITY & PHILOSOPHY
          </span>
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-transparent" />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Word-by-word Editorial Reveal */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05]"
            >
              BUILDING WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-300">
                CURIOSITY.
              </span>
            </motion.h2>

            {/* Word-by-word interactive statement container */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="p-6 rounded-3xl bg-[#090a16] border-l-2 border-cyan-400 border-y border-r border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              <p className="text-white text-base sm:text-lg leading-relaxed flex flex-wrap gap-x-1.5 gap-y-1 font-light">
                {introQuote.map((word, idx) => (
                  <motion.span
                    key={idx}
                    custom={idx}
                    variants={quoteWordVariants}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed font-light"
            >
              <p>
                My approach to software engineering pairs systematic problem-solving with creative frontend execution. As a 3rd-year Information Technology student at AKGEC, I treat code not merely as syntax, but as a medium for building reliable, human-centric software.
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Whether structuring state machines in modern React or analyzing edge cases in Data Structures, I maintain high standards of code clarity, performance, and responsive design.
              </p>
            </motion.div>

            {/* Quick Education & Core Focus pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              <div className="p-4 rounded-2xl bg-[#0b0c18] border border-white/10 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">ACADEMIC FOUNDATION</span>
                </div>
                <p className="text-sm font-bold text-white">{PERSONAL_INFO.education}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{PERSONAL_INFO.institution} • {PERSONAL_INFO.year}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0c18] border border-white/10 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider">PRIMARY DISCIPLINE</span>
                </div>
                <p className="text-sm font-bold text-white">Software & Frontend Engineering</p>
                <p className="text-xs text-zinc-400 mt-0.5">Modern React • DSA • Clean Architecture</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Architectural Developer Console & Engineering Philosophy (Profile photo is featured exclusively in Hero) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              style={{ y: imageY, rotateZ: imageRotate }}
              className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-tr from-cyan-500/20 via-purple-500/10 to-white/10 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a14]/95 border border-white/10 p-6 flex flex-col justify-between space-y-6">
                {/* Console header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="font-mono text-xs text-zinc-400">engineer.manifesto.ts</span>
                </div>

                {/* Code syntax & core ethos */}
                <div className="font-mono text-xs sm:text-[13px] space-y-3 leading-relaxed text-zinc-300 select-none">
                  <div className="text-zinc-500">// Engineering principles</div>
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-cyan-300">developer</span> = &#123;
                  </div>
                  <div className="pl-4 space-y-1">
                    <div>
                      <span className="text-zinc-400">name:</span>{' '}
                      <span className="text-emerald-300">'Seema Yadav'</span>,
                    </div>
                    <div>
                      <span className="text-zinc-400">institution:</span>{' '}
                      <span className="text-emerald-300">'AKGEC, Ghaziabad'</span>,
                    </div>
                    <div>
                      <span className="text-zinc-400">mindset:</span>{' '}
                      <span className="text-emerald-300">'Relentless Curiosity'</span>,
                    </div>
                    <div>
                      <span className="text-zinc-400">priorities:</span> [
                      <span className="text-amber-300">'Clean Code'</span>,{' '}
                      <span className="text-amber-300">'Performance'</span>,{' '}
                      <span className="text-amber-300">'UX'</span>],
                    </div>
                    <div>
                      <span className="text-zinc-400">athleticDiscipline:</span>{' '}
                      <span className="text-purple-300">'Kho-Kho State Level'</span>
                    </div>
                  </div>
                  <div>&#125;;</div>

                  <div className="pt-2 text-zinc-500">// Output commitment</div>
                  <div className="text-cyan-400">
                    developer.<span className="text-white">buildExperiences</span>();
                  </div>
                </div>

                {/* Bottom badge */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    B.Tech IT • 3rd Year
                  </span>
                  <span className="text-zinc-500">2023 — Present</span>
                </div>
              </div>

              {/* Decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
