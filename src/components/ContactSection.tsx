import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, Copy, Check, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

interface ContactSectionProps {
  onInView?: (inView: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
      const body = encodeURIComponent(
        `Hi Seema,\n\n${formState.message}\n\nBest regards,\n${formState.name} (${formState.email})`
      );
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  const titleLine1 = "LET'S BUILD";
  const titleLine2 = "SOMETHING GREAT.";

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        delay: 0.2 + i * 0.03,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="contact" className="relative py-32 px-6 sm:px-10 md:px-16 z-10 overflow-hidden">
      {/* Background darkening shroud */}
      <div className="absolute inset-0 bg-[#030306]/90 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-400 tracking-widest">05 //</span>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">DIRECT TRANSMISSION</span>
        </div>

        {/* Monumental Typography with Letter-by-Letter Sequential Reveal */}
        <div className="space-y-2 select-none">
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[0.95]">
            <div className="flex flex-wrap overflow-hidden pb-1">
              {titleLine1.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-sky-200 to-cyan-400 mt-1">
              {titleLine2.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index + titleLine1.length}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-zinc-300 text-base sm:text-lg max-w-xl font-light pt-2"
          >
            Whether you have a software engineering role, frontend project, or simply want to connect with an ambitious developer, my inbox is always open.
          </motion.p>
        </div>

        {/* Contact Grid: Interactive Channels & Direct Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Column: Direct Links with Staggered Entrance & Magnetic Buttons */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-mono text-xs font-semibold text-zinc-400 tracking-wider uppercase mb-3">
              PRIMARY CHANNELS
            </h3>

            {/* Email Card with Copy Trigger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl bg-[#090a16] border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-zinc-400">DIRECT EMAIL</p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 transition-colors font-mono"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <MagneticButton onClick={copyEmail} strength={0.3} dataCursor="button">
                <button
                  type="button"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </MagneticButton>
            </motion.div>

            {/* GitHub Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="p-5 rounded-2xl bg-[#090a16] border border-white/10 flex items-center justify-between group hover:border-purple-500/40 transition-all block"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-400">GITHUB REPOSITORIES</p>
                    <p className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors font-mono">
                      github.com/seema0323
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="p-5 rounded-2xl bg-[#090a16] border border-white/10 flex items-center justify-between group hover:border-cyan-500/40 transition-all block"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-zinc-400">PROFESSIONAL NETWORK</p>
                    <p className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors font-mono">
                      linkedin.com/in/seema-yadav
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Direct Message Transmission Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-6 rounded-3xl bg-[#090a16] border border-white/10 p-6 sm:p-8 shadow-2xl relative"
          >
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>DIRECT DISPATCH</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">ENCRYPTED PROTOCOL</span>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="font-display font-bold text-xl text-white">Transmission Prepared</h4>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                  Your mail client has been opened to send this message directly to Seema Yadav.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-mono text-cyan-400 hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-zinc-400 mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-zinc-400 mb-1.5">
                    YOUR EMAIL
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-zinc-400 mb-1.5">
                    MESSAGE / PROJECT SCOPE
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Hello Seema, I'd like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <MagneticButton strength={0.25} dataCursor="button">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-zinc-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH MESSAGE'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
