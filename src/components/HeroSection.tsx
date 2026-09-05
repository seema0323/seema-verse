import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { ParticleName } from './ParticleName';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll linked transformations for cinematic separation & dissolve
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const nameScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const portraitParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const firstName = 'SEEMA';
  const lastName = 'YADAV';

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-6 sm:px-10 md:px-16 overflow-hidden z-10"
    >
      {/* Top micro status bar */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-2"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono text-zinc-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-wide">AVAILABLE FOR SOFTWARE & FRONTEND ROLES</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>B.Tech IT • 3rd Year • AKGEC</span>
        </motion.div>
      </motion.div>

      {/* Main Hero Body */}
      <motion.div
        style={{ opacity: heroOpacity, scale: nameScale }}
        className="w-full max-w-6xl mx-auto my-auto py-6 sm:py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Letter-by-letter Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-[1.5px] w-8 bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-400 font-semibold uppercase">
                ASPIRING SOFTWARE DEVELOPER
              </p>
            </motion.div>

            {/* Monumental Name Formed from Tiny Glowing Particle Circles */}
            <div className="relative select-none">
              <ParticleName firstName={firstName} lastName={lastName} />

              {/* Ambient radial lighting */}
              <div className="absolute -top-10 -left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute top-1/2 -right-10 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
            </div>

            {/* Supporting Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="max-w-xl text-base sm:text-lg text-zinc-300 font-light leading-relaxed"
            >
              “I build interactive digital experiences and continuously grow through software development and problem solving.”
            </motion.p>

            {/* Action Buttons with Magnetic Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <MagneticButton onClick={() => scrollTo('projects')} strength={0.3} dataCursor="button">
                <div className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>EXPLORE WORK</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </MagneticButton>

              <MagneticButton onClick={() => scrollTo('contact')} strength={0.3} dataCursor="button">
                <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>LET'S CONNECT</span>
                </div>
              </MagneticButton>

              {/* Social Channels with Magnetic hover */}
              <div className="flex items-center gap-2 pl-2">
                <MagneticButton href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" ariaLabel="GitHub" strength={0.4} dataCursor="link">
                  <div className="p-2.5 rounded-full text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                </MagneticButton>

                <MagneticButton href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" ariaLabel="LinkedIn" strength={0.4} dataCursor="link">
                  <div className="p-2.5 rounded-full text-zinc-400 hover:text-cyan-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                </MagneticButton>

                <MagneticButton href={`mailto:${PERSONAL_INFO.email}`} ariaLabel="Send Email" strength={0.4} dataCursor="link">
                  <div className="p-2.5 rounded-full text-zinc-400 hover:text-purple-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Mask-Reveal Profile Portrait with Parallax */}
          <motion.div
            style={{ y: portraitParallax }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0% round 24px)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)' }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
                transition: 'transform 0.2s ease-out',
              }}
              className="relative w-72 sm:w-80 md:w-88 aspect-[4/5] rounded-3xl p-2 bg-gradient-to-b from-white/15 via-purple-500/10 to-cyan-500/15 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] group"
            >
              {/* Corner crosshairs */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-purple-400" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-purple-400" />

              {/* Inner Photo Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0c0d1b]">
                <img
                  src={imgError ? PERSONAL_INFO.avatarFallback : PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  className={`w-full h-full object-cover object-center filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ${
                    imgLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-transparent to-transparent opacity-80" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 inset-x-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-white text-xs tracking-wide">
                      SEEMA YADAV
                    </p>
                    <p className="text-[10px] font-mono text-cyan-400">
                      B.Tech IT • 3rd Year
                    </p>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AKGEC</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom status bar with beautiful "SCROLL TO EXPLORE" indicator */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="w-full max-w-6xl mx-auto pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400"
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
          <span>SOFTWARE ARCHITECTURE • MODERN FRONTEND • ALGORITHMIC REASONING</span>
        </div>

        {/* Cinematic Scroll To Explore indicator */}
        <button
          onClick={() => scrollTo('about')}
          className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group"
        >
          <span className="tracking-widest text-[11px] font-semibold uppercase">SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-cyan-400/40 flex items-start justify-center p-1 group-hover:border-cyan-400 transition-colors">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#06b6d4]"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
