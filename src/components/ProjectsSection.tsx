import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SELECTED_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectArt } from './ProjectArt';
import { ExternalLink, Github, ArrowUpRight, CheckCircle2, Sparkles, Eye } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, total, onSelect }) => {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseTilt({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isOdd = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full rounded-3xl bg-[#090a16]/95 border border-white/10 hover:border-white/25 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden"
      style={{
        boxShadow: isHovered ? `0 25px 65px -15px ${project.themeColor}30` : undefined,
      }}
    >
      {/* Dynamic ambient background glow matching project theme */}
      <div
        className="absolute -inset-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${project.themeColor}20 0%, transparent 70%)`,
        }}
      />

      {/* Large subtle watermark number */}
      <div
        className={`absolute top-4 ${
          isOdd ? 'left-6' : 'right-6'
        } text-7xl sm:text-8xl md:text-9xl font-display font-extrabold text-white/[0.02] select-none pointer-events-none transition-opacity group-hover:text-white/[0.04] duration-500`}
      >
        {project.number}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Visual Art Stage with Parallax Tilt */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onSelect(project)}
          className={`relative min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] cursor-pointer overflow-hidden border-b lg:border-b-0 ${
            isOdd
              ? 'lg:col-span-7 lg:order-2 lg:border-l border-white/10'
              : 'lg:col-span-7 lg:order-1 lg:border-r border-white/10'
          }`}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            style={{
              transform: `rotateY(${mouseTilt.x}deg) rotateX(${mouseTilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full h-full transform group-hover:scale-[1.02] transition-transform duration-700"
          >
            <ProjectArt id={project.id} themeColor={project.themeColor} />
          </motion.div>

          {/* Project Index Pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-lg">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: project.themeColor }}
              />
              <span>
                {project.number} / 0{total}
              </span>
            </span>
          </div>

          {/* Category Pill */}
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono text-zinc-300 shadow-lg">
              {project.category}
            </span>
          </div>

          {/* Hover Explore Indicator */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="px-5 py-2.5 rounded-full bg-white text-zinc-950 font-mono text-xs font-bold tracking-wider shadow-[0_0_25px_rgba(255,255,255,0.4)] flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-zinc-950" />
              <span>EXPLORE DETAILS</span>
            </span>
          </div>
        </div>

        {/* Narrative & Specifications Column */}
        <div
          className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 ${
            isOdd ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5 lg:order-2'
          }`}
        >
          <div className="space-y-4">
            {/* Tagline & Title */}
            <div>
              <span
                className="text-xs font-mono tracking-wider font-semibold uppercase block mb-1"
                style={{ color: project.themeColor }}
              >
                {project.tagline}
              </span>
              <h3
                onClick={() => onSelect(project)}
                className="font-display text-2xl sm:text-3xl font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer leading-snug"
              >
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              {project.description}
            </p>

            {/* Key Highlights */}
            <div className="space-y-2 pt-1">
              {project.highlights.map((highlight, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                >
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: project.themeColor }}
                  />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack & Action Buttons */}
          <div className="space-y-5 pt-4 border-t border-white/[0.08]">
            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 px-4 sm:px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 px-4 sm:px-5 py-2.5 rounded-full transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>SOURCE CODE</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => onSelect(project)}
                data-cursor="button"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 hover:text-cyan-200 py-2.5 px-2 transition-colors cursor-pointer ml-auto"
              >
                <span>EXPAND SPECS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL WORKS', count: SELECTED_PROJECTS.length },
    {
      id: 'AI & Educational Tech',
      label: 'AI & EDUTECH',
      count: SELECTED_PROJECTS.filter((p) => p.category === 'AI & Educational Tech').length,
    },
    {
      id: 'Academic Management',
      label: 'ACADEMIC',
      count: SELECTED_PROJECTS.filter((p) => p.category === 'Academic Management').length,
    },
    {
      id: 'Travel & Exploration',
      label: 'TRAVEL',
      count: SELECTED_PROJECTS.filter((p) => p.category === 'Travel & Exploration').length,
    },
    {
      id: 'Hospitality & E-Commerce',
      label: 'HOSPITALITY',
      count: SELECTED_PROJECTS.filter((p) => p.category === 'Hospitality & E-Commerce').length,
    },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? SELECTED_PROJECTS
      : SELECTED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-28 lg:py-32 px-6 sm:px-10 md:px-16 z-10 overflow-hidden"
    >
      {/* Top Connected Line Transition from About Section */}
      <div className="w-full max-w-6xl mx-auto mb-10 sm:mb-12">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-purple-500/30" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            PORTFOLIO // SECTION 02
          </span>
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-purple-500/30 to-cyan-500/30" />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Section Header & Interactive Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 tracking-widest">02 //</span>
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                FEATURED ARCHITECTURE & APPLICATIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              SELECTED{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-400">
                WORKS.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-light">
              Full-stack and frontend applications built with scalable component architectures,
              adaptive AI logic, and responsive user interfaces.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#090a16]/80 p-1.5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-400 to-sky-300 text-zinc-950 font-bold shadow-[0_0_14px_rgba(6,182,212,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={SELECTED_PROJECTS.length}
                onSelect={onSelectProject}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Section Counter & Navigation Anchor */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              DISPLAYING {filteredProjects.length} OF {SELECTED_PROJECTS.length} PRODUCTION APPS
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span>READY FOR DEPLOYMENT & CODE REVIEW</span>
            <span className="text-cyan-400 font-bold">● ACTIVE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

