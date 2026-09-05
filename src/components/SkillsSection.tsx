import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SkillItem {
  id: string;
  name: string;
  category: 'frontend' | 'core-cs' | 'tooling';
  categoryLabel: string;
  color: string;
  glowColor: string;
  badge: string;
  floatingDelay: number;
  floatingDuration: number;
}

const ALL_SKILLS: SkillItem[] = [
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Frontend Engineering',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.35)',
    badge: 'Component State & Hooks',
    floatingDelay: 0,
    floatingDuration: 4.2,
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'core-cs',
    categoryLabel: 'Algorithmic Foundation',
    color: '#a855f7',
    glowColor: 'rgba(168,85,247,0.35)',
    badge: 'Problem Solving & Rigor',
    floatingDelay: 0.4,
    floatingDuration: 4.8,
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Core Language',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.35)',
    badge: 'Async, DOM & APIs',
    floatingDelay: 0.8,
    floatingDuration: 3.9,
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'core-cs',
    categoryLabel: 'System Language',
    color: '#c084fc',
    glowColor: 'rgba(192,132,252,0.35)',
    badge: 'Memory & Speed',
    floatingDelay: 0.3,
    floatingDuration: 4.5,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Modern Styling',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.3)',
    badge: 'Utility-First Systems',
    floatingDelay: 1.1,
    floatingDuration: 4.1,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'core-cs',
    categoryLabel: 'Enterprise Language',
    color: '#e879f9',
    glowColor: 'rgba(232,121,249,0.35)',
    badge: 'OOP & Robust Logic',
    floatingDelay: 0.6,
    floatingDuration: 4.6,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tooling',
    categoryLabel: 'Version Control',
    color: '#94a3b8',
    glowColor: 'rgba(148,163,184,0.35)',
    badge: 'Collaboration & Branching',
    floatingDelay: 1.3,
    floatingDuration: 3.8,
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'core-cs',
    categoryLabel: 'Software Architecture',
    color: '#c084fc',
    glowColor: 'rgba(192,132,252,0.35)',
    badge: 'Inheritance & Modularity',
    floatingDelay: 0.2,
    floatingDuration: 4.7,
  },
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'frontend',
    categoryLabel: 'Web Standards',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.3)',
    badge: 'Semantic & Accessible UI',
    floatingDelay: 1.5,
    floatingDuration: 4.3,
  },
  {
    id: 'rest-api',
    name: 'REST APIs & Fetch',
    category: 'tooling',
    categoryLabel: 'Data Integration',
    color: '#10b981',
    glowColor: 'rgba(16,185,129,0.35)',
    badge: 'Endpoints & JSON Data',
    floatingDelay: 0.5,
    floatingDuration: 4.4,
  },
  {
    id: 'responsive',
    name: 'Responsive Web Design',
    category: 'frontend',
    categoryLabel: 'UX Engineering',
    color: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.35)',
    badge: 'Fluid Mobile-to-Desktop',
    floatingDelay: 0.9,
    floatingDuration: 4.9,
  },
  {
    id: 'vite',
    name: 'Vite & Bundling',
    category: 'tooling',
    categoryLabel: 'Build Tooling',
    color: '#8b5cf6',
    glowColor: 'rgba(139,92,246,0.35)',
    badge: 'High-Speed HMR & Builds',
    floatingDelay: 1.2,
    floatingDuration: 4.0,
  },
  {
    id: 'component-ui',
    name: 'Component Architecture',
    category: 'frontend',
    categoryLabel: 'Design Systems',
    color: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.35)',
    badge: 'Reusable & Scalable Units',
    floatingDelay: 0.7,
    floatingDuration: 4.5,
  },
  {
    id: 'figma',
    name: 'Figma to Code',
    category: 'tooling',
    categoryLabel: 'Design Handoff',
    color: '#f472b6',
    glowColor: 'rgba(244,114,182,0.35)',
    badge: 'Pixel-Accurate Fidelity',
    floatingDelay: 1.4,
    floatingDuration: 4.1,
  },
];

type CategoryFilter = 'all' | 'frontend' | 'core-cs' | 'tooling';

interface MagneticSkillCardProps {
  skill: SkillItem;
  isActiveCategory: boolean;
  index: number;
}

const MagneticSkillCard: React.FC<MagneticSkillCardProps> = ({
  skill,
  isActiveCategory,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Magnetic pull distance
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    setOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      animate={{
        opacity: isActiveCategory ? 1 : 0.35,
        scale: isActiveCategory ? 1 : 0.95,
      }}
      className="relative"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: skill.floatingDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: skill.floatingDelay,
        }}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0px)`,
          transition: isHovered
            ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)'
            : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group relative p-4 sm:p-5 rounded-2xl bg-[#0a0a14]/80 border transition-all duration-300 cursor-default select-none backdrop-blur-xl ${
          isHovered
            ? 'border-white/30 shadow-[0_12px_35px_rgba(0,0,0,0.6)] z-20 scale-[1.03]'
            : 'border-white/[0.08] hover:border-white/20'
        }`}
      >
        {/* Ambient glow bloom on hover */}
        <div
          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg -z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${skill.glowColor} 0%, transparent 70%)`,
          }}
        />

        <div className="flex flex-col space-y-2.5">
          {/* Top category label & dot indicator */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span className="tracking-wider uppercase group-hover:text-zinc-300 transition-colors">
              {skill.categoryLabel}
            </span>
            <span
              className="w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: skill.color,
                boxShadow: isHovered ? `0 0 10px ${skill.color}` : 'none',
              }}
            />
          </div>

          {/* Skill primary name */}
          <h3
            className="font-display font-bold text-base sm:text-lg tracking-tight transition-colors duration-200"
            style={{
              color: isHovered ? '#ffffff' : '#e4e4e7',
              textShadow: isHovered ? `0 0 15px ${skill.color}60` : 'none',
            }}
          >
            {skill.name}
          </h3>

          {/* Micro-badge reveal */}
          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
              {skill.badge}
            </span>
            <span
              className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: skill.color }}
            >
              ACTIVE
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SkillsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [mouseCanvasPos, setMouseCanvasPos] = useState({ x: 0, y: 0 });

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMouseCanvasPos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  const filteredSkills = ALL_SKILLS.filter((skill) => {
    if (activeFilter === 'all') return true;
    return skill.category === activeFilter;
  });

  const filterTabs: { id: CategoryFilter; label: string; count: number }[] = [
    { id: 'all', label: 'ALL CAPABILITIES', count: ALL_SKILLS.length },
    {
      id: 'frontend',
      label: 'FRONTEND ENGINEERING',
      count: ALL_SKILLS.filter((s) => s.category === 'frontend').length,
    },
    {
      id: 'core-cs',
      label: 'CORE CS & LOGIC',
      count: ALL_SKILLS.filter((s) => s.category === 'core-cs').length,
    },
    {
      id: 'tooling',
      label: 'WORKFLOW & TOOLS',
      count: ALL_SKILLS.filter((s) => s.category === 'tooling').length,
    },
  ];

  return (
    <section
      id="skills"
      onMouseMove={handleContainerMouseMove}
      className="relative py-32 px-6 sm:px-10 md:px-16 z-10 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 tracking-widest">03 //</span>
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                EXPERTISE & CRAFT
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-300 to-cyan-400">CAPABILITIES.</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl leading-relaxed">
              Engineered with practical proficiency across modern React component architecture, algorithmic problem solving, and responsive web systems.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#090a16]/90 border border-white/10 backdrop-blur-xl self-start lg:self-auto">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  data-cursor="button"
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="skillFilterIndicator"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/60 to-cyan-500/60 border border-white/15 -z-10 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-zinc-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Floating Skills Canvas Grid */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#070812]/70 border border-white/[0.08] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Subtle responsive background glow halos */}
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl pointer-events-none transition-transform duration-700"
            style={{
              transform: `translate(${mouseCanvasPos.x * 1.5}px, ${mouseCanvasPos.y * 1.5}px)`,
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none transition-transform duration-700"
            style={{
              transform: `translate(${-mouseCanvasPos.x * 1.5}px, ${-mouseCanvasPos.y * 1.5}px)`,
            }}
          />

          {/* Grid of magnetic interactive skill modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 relative z-10">
            {ALL_SKILLS.map((skill, index) => {
              const isMatch = activeFilter === 'all' || skill.category === activeFilter;
              return (
                <MagneticSkillCard
                  key={skill.id}
                  skill={skill}
                  isActiveCategory={isMatch}
                  index={index}
                />
              );
            })}
          </div>
        </div>

        {/* Ambient technical footer line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATHLETIC DISCIPLINE × ALGORITHMIC PRECISION</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <span>ZERO CHARTS</span>
            <span>•</span>
            <span className="text-zinc-400">PURE PRACTICAL PROFICIENCY</span>
          </div>
        </div>
      </div>
    </section>
  );
};
