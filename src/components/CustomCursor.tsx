import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'button' | 'project' | 'link'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const trailRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    // Check touch screen capability
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();

    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Add to light trail
      trailRef.current.push({ x: e.clientX, y: e.clientY });
      if (trailRef.current.length > 5) {
        trailRef.current.shift();
      }

      // Check what is being hovered
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor]');
      if (interactive) {
        const type = interactive.getAttribute('data-cursor');
        if (type === 'project') setCursorType('project');
        else if (type === 'link') setCursorType('link');
        else if (type === 'button') setCursorType('button');
        else setCursorType('default');
        return;
      }

      if (target.closest('button') || target.closest('[role="button"]')) {
        setCursorType('button');
      } else if (target.closest('a')) {
        setCursorType('link');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing spring/lerp loop
  useEffect(() => {
    if (isTouchDevice) return;

    let animId: number;
    const lerp = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animId = requestAnimationFrame(lerp);
    };
    animId = requestAnimationFrame(lerp);

    return () => cancelAnimationFrame(animId);
  }, [position, isTouchDevice]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  const isSpecial = cursorType !== 'default';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Ambient cursor-following light trail / glow */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none opacity-25 blur-3xl transition-opacity duration-300"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          background:
            cursorType === 'project'
              ? 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)'
              : cursorType === 'link'
              ? 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Precision inner center dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_#06b6d4]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isSpecial ? 0 : 1,
        }}
      />

      {/* Trailing follower orb / badge */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ease-out font-mono font-bold text-[10px] tracking-wider uppercase backdrop-blur-md select-none ${
          cursorType === 'project'
            ? 'w-18 h-18 bg-purple-600/90 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-100 border border-white/20'
            : cursorType === 'link'
            ? 'w-18 h-18 bg-cyan-400/95 text-zinc-950 shadow-[0_0_25px_rgba(6,182,212,0.6)] scale-100 border border-white/30'
            : cursorType === 'button'
            ? 'w-10 h-10 border border-purple-400/60 bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-100'
            : 'w-7 h-7 border border-cyan-400/40 bg-cyan-400/5 scale-100'
        }`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
        }}
      >
        {cursorType === 'project' && <span>VIEW ↗</span>}
        {cursorType === 'link' && <span>OPEN ↗</span>}
      </div>
    </div>
  );
};
