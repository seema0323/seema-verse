import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { ProjectArt } from './ProjectArt';
import { X, ExternalLink, Github, CheckCircle2, Layers, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl -z-10 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0d0e1b] border border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 sm:p-8 md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              data-cursor="button"
              className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-3 pr-12">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-cyan-400 border border-cyan-500/20">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono text-zinc-400 uppercase">
                  {project.category}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-light">
                {project.tagline}
              </p>
            </div>

            {/* Visual Art Preview Banner */}
            <div className="my-6 rounded-2xl overflow-hidden border border-white/10">
              <ProjectArt id={project.id} themeColor={project.themeColor} />
            </div>

            {/* Comprehensive Overview */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white flex items-center gap-2 mb-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Overview & Architecture</span>
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Key Engineering Highlights</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div>
                <h3 className="font-display font-semibold text-base sm:text-lg text-white flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Technologies & Tools</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-200 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions: Live Demo & GitHub */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-semibold text-zinc-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                  >
                    <span>LAUNCH LIVE APP</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>VIEW SOURCE CODE</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full font-mono text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close View
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
