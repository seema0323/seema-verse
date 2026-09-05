import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Sparkles, Clock, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#05050a] py-16 px-6 sm:px-10 md:px-16 z-10 text-zinc-400">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-1">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
              {PERSONAL_INFO.name.toUpperCase()}
            </h3>
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              {PERSONAL_INFO.title}
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-zinc-700">/</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-zinc-700">/</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              data-cursor="link"
              className="hover:text-purple-400 transition-colors"
            >
              Email
            </a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            data-cursor="button"
            className="self-start md:self-auto p-3 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors flex items-center gap-2 text-xs font-mono cursor-pointer"
            aria-label="Back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom row with location, time & creative statement */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>INDIA (IST) — {istTime || '12:00:00 PM'}</span>
          </div>

          {/* Animated creative line requested in prompt */}
          <div className="flex items-center gap-2 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Designed & built with curiosity.</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} Seema Yadav</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
