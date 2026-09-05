import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Project } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroCanvas } from './components/HeroCanvas';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { AchievementSection } from './components/AchievementSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Smooth Lenis Scrolling setup
  useEffect(() => {
    let lenisInstance: Lenis | null = null;

    try {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.6,
        infinite: false,
      });

      let reqId: number;
      const raf = (time: number) => {
        lenisInstance?.raf(time);
        reqId = requestAnimationFrame(raf);
      };
      reqId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(reqId);
        lenisInstance?.destroy();
      };
    } catch (err) {
      console.warn('Lenis smooth scrolling fallback initialized:', err);
    }
  }, []);

  // Section Observer for active navigation tracking
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'achievement', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-80px 0px -40% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoading]);

  const isContactActive = activeSection === 'contact';

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#f1f1f6] overflow-x-hidden selection:bg-purple-600/30 selection:text-cyan-300">
      {/* Subtle Film Grain Cinematic Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Cinematic Loading Experience */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Precision Cursor with Light Trail & View Badges (Desktop Only) */}
      <CustomCursor />

      {/* Floating Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Background Interactive Ambient Particle Field */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <HeroCanvas isContactActive={isContactActive} />
      </div>

      {/* Main Narrative Page Content: Exactly 6 Core Sections */}
      <main className="relative z-10">
        {/* 01. Hero - Letter-by-letter reveal, distortion, mask entrance, scroll separation */}
        <HeroSection />

        {/* 02. About - Word-by-word reveal, 3D depth, dynamic clipping */}
        <AboutSection />

        {/* 03. Selected Projects - Pinned Scrolling Cinematic Gallery */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 04. Skills - Kinetic Floating Words Typography */}
        <SkillsSection />

        {/* 05. Achievement - Kho-Kho State Level Distinction with line-drawing trophy animation */}
        <AchievementSection />

        {/* 06. Contact - “LET’S BUILD SOMETHING GREAT.” Monumental Sequential Reveal */}
        <ContactSection />
      </main>

      {/* Fullscreen Animated Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
