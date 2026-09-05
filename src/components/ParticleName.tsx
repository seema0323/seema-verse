import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  glowColor: string;
  alpha: number;
  targetAlpha: number;
  delay: number; // in seconds
  duration: number; // in seconds
  phase: number;
  offsetX: number;
  offsetY: number;
}

interface ParticleNameProps {
  firstName?: string;
  lastName?: string;
  className?: string;
}

export const ParticleName: React.FC<ParticleNameProps> = ({
  firstName = 'SEEMA',
  lastName = 'YADAV',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const textFillOpacityRef = useRef<number>(0);
  const targetTextFillOpacityRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const [dimensions, setDimensions] = useState({
    width: 600,
    height: 220,
    fontSize: 88,
    lineHeight: 94,
  });

  // Calculate particles from offscreen canvas
  const initParticles = useCallback(
    (width: number, height: number, fontSize: number, lineHeight: number) => {
      if (width <= 0 || height <= 0) return;

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      offscreen.width = width;
      offscreen.height = height;

      offCtx.clearRect(0, 0, width, height);
      offCtx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`;
      offCtx.textBaseline = 'top';
      offCtx.fillStyle = '#ffffff';

      // Draw "SEEMA"
      offCtx.fillText(firstName, 0, 6);

      // Draw "YADAV"
      offCtx.fillText(lastName, 0, 6 + lineHeight);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const pixels = imgData.data;

      const newParticles: Particle[] = [];
      // Dynamic step: 4px provides high density (~1,500 particles) for crystal-clear letters
      const step = width < 480 ? 3 : 4;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 120) {
            const isFirstWord = y < 6 + lineHeight * 0.9;

            let color = '#ffffff';
            let glowColor = 'rgba(255, 255, 255, 0.5)';

            if (isFirstWord) {
              const r = Math.random();
              if (r < 0.45) {
                color = '#ffffff';
                glowColor = 'rgba(255, 255, 255, 0.8)';
              } else if (r < 0.75) {
                color = '#e0f2fe';
                glowColor = 'rgba(56, 189, 248, 0.7)';
              } else {
                color = '#38bdf8';
                glowColor = 'rgba(6, 182, 212, 0.8)';
              }
            } else {
              // Second word (YADAV) with subtle cyber lavender & neon cyan
              const r = Math.random();
              if (r < 0.35) {
                color = '#f5f3ff';
                glowColor = 'rgba(245, 243, 255, 0.8)';
              } else if (r < 0.7) {
                color = '#c084fc';
                glowColor = 'rgba(192, 132, 252, 0.8)';
              } else {
                color = '#22d3ee';
                glowColor = 'rgba(34, 211, 238, 0.8)';
              }
            }

            // Scatter origin: distributed broadly around the hero space
            const angle = Math.random() * Math.PI * 2;
            const distance = 90 + Math.random() * (Math.max(width, height) * 0.8);
            const originX = width / 2 + Math.cos(angle) * distance + (Math.random() - 0.5) * 80;
            const originY = height / 2 + Math.sin(angle) * distance + (Math.random() - 0.5) * 80;

            // Wave delay from left to right + random dispersion
            const progressRatio = x / width;
            const delay = 0.15 + progressRatio * 0.65 + Math.random() * 0.35;
            const duration = 1.35 + Math.random() * 0.45;

            newParticles.push({
              x: originX,
              y: originY,
              originX,
              originY,
              targetX: x,
              targetY: y,
              radius: Math.random() * 0.85 + 1.25, // 1.25px to 2.1px glowing circles
              color,
              glowColor,
              alpha: 0,
              targetAlpha: 0.92 + Math.random() * 0.08,
              delay,
              duration,
              phase: Math.random() * Math.PI * 2,
              offsetX: 0,
              offsetY: 0,
            });
          }
        }
      }

      particlesRef.current = newParticles;
      startTimeRef.current = null;
      textFillOpacityRef.current = 0;
      targetTextFillOpacityRef.current = 0;
    },
    [firstName, lastName]
  );

  // Measure container and initialize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(300, Math.floor(rect.width));

      // Calculate fluid typography size
      const targetFontSize = Math.min(94, Math.max(44, Math.floor(w / 3.45)));
      const lineHeight = Math.floor(targetFontSize * 1.04);
      const h = Math.floor(targetFontSize * 0.95 + lineHeight + 18);

      setDimensions({
        width: w,
        height: h,
        fontSize: targetFontSize,
        lineHeight,
      });

      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }

      initParticles(w, h, targetFontSize, lineHeight);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        handleResize();
      });
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [initParticles]);

  // Re-trigger dissolve & reform sequence
  const handleRevisitReform = useCallback(() => {
    if (particlesRef.current.length > 0) {
      targetTextFillOpacityRef.current = 0;
      textFillOpacityRef.current = 0;

      particlesRef.current.forEach((p) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 80;
        p.originX = p.targetX + Math.cos(angle) * dist;
        p.originY = p.targetY + Math.sin(angle) * dist;
        p.delay = Math.random() * 0.35;
        p.duration = 1.1 + Math.random() * 0.4;
      });

      startTimeRef.current = null;
    }
  }, []);

  // Scroll revisit listener: soft reform when scrolling back to hero
  useEffect(() => {
    let hasScrolledAway = false;
    const handleScroll = () => {
      if (window.scrollY > 450) {
        hasScrolledAway = true;
      } else if (window.scrollY < 40 && hasScrolledAway) {
        hasScrolledAway = false;
        handleRevisitReform();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleRevisitReform]);

  // Main 60fps canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = (time: number) => {
      if (!isRunning) return;

      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }

      const elapsed = (time - startTimeRef.current) / 1000;
      const particles = particlesRef.current;
      const { width, height, fontSize, lineHeight } = dimensions;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      let allSettled = true;

      // 1. Draw subtle base typography fill with gradient glow when formed for crisp legibility
      if (textFillOpacityRef.current > 0.01) {
        // Glow pass
        ctx.save();
        ctx.globalAlpha = textFillOpacityRef.current * 0.75;
        ctx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`;
        ctx.textBaseline = 'top';

        // SEEMA glow aura (cyan)
        ctx.shadowColor = 'rgba(6, 182, 212, 0.55)';
        ctx.shadowBlur = Math.floor(fontSize * 0.28);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(firstName, 0, 6);

        // YADAV glow aura (purple to cyan)
        ctx.shadowColor = 'rgba(168, 85, 247, 0.65)';
        ctx.shadowBlur = Math.floor(fontSize * 0.32);
        const textGlowGradient = ctx.createLinearGradient(0, 0, width * 0.8, 0);
        textGlowGradient.addColorStop(0, '#ffffff');
        textGlowGradient.addColorStop(0.5, '#c084fc');
        textGlowGradient.addColorStop(1, '#06b6d4');
        ctx.fillStyle = textGlowGradient;
        ctx.fillText(lastName, 0, 6 + lineHeight);
        ctx.restore();

        // Razor-sharp high-contrast foreground pass
        ctx.save();
        ctx.globalAlpha = textFillOpacityRef.current;
        ctx.font = `700 ${fontSize}px "Space Grotesk", sans-serif`;
        ctx.textBaseline = 'top';

        // SEEMA in solid crisp white
        ctx.fillStyle = '#ffffff';
        ctx.fillText(firstName, 0, 6);

        // YADAV in smooth radiant gradient (white -> purple -> cyan)
        const textGradient = ctx.createLinearGradient(0, 0, width * 0.82, 0);
        textGradient.addColorStop(0, '#ffffff');
        textGradient.addColorStop(0.38, '#e9d5ff');
        textGradient.addColorStop(0.68, '#c084fc');
        textGradient.addColorStop(1, '#06b6d4');
        ctx.fillStyle = textGradient;
        ctx.fillText(lastName, 0, 6 + lineHeight);
        ctx.restore();
      }

      // 2. Animate and draw each glowing particle circle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (elapsed < p.delay) {
          allSettled = false;
          p.x = p.originX;
          p.y = p.originY;
          p.alpha = Math.min(0.35, (elapsed / p.delay) * 0.3);
        } else {
          const t = Math.min(1, (elapsed - p.delay) / p.duration);
          if (t < 1) {
            allSettled = false;
          }

          // Smooth cubic ease-out
          const ease = 1 - Math.pow(1 - t, 3);
          const currentBaseX = p.originX + (p.targetX - p.originX) * ease;
          const currentBaseY = p.originY + (p.targetY - p.originY) * ease;

          p.alpha = p.targetAlpha * ease;

          // Interactive mouse repulsion
          if (mouse.active) {
            const dx = currentBaseX + p.offsetX - mouse.x;
            const dy = currentBaseY + p.offsetY - mouse.y;
            const dist = Math.hypot(dx, dy);
            const maxDistance = 85;

            if (dist < maxDistance && dist > 0) {
              const force = (1 - dist / maxDistance) * 18;
              const angle = Math.atan2(dy, dx);
              p.offsetX += Math.cos(angle) * force * 0.22;
              p.offsetY += Math.sin(angle) * force * 0.22;
            }
          }

          // Spring damping back to original letter positions
          p.offsetX *= 0.88;
          p.offsetY *= 0.88;

          // Subtle organic breathing oscillation after forming
          const breatheAmp = ease * 0.75;
          const breatheX = Math.cos(time * 0.0018 + p.phase) * breatheAmp;
          const breatheY = Math.sin(time * 0.0022 + p.phase) * breatheAmp;

          p.x = currentBaseX + p.offsetX + breatheX;
          p.y = currentBaseY + p.offsetY + breatheY;
        }

        // Draw particle circle with soft glow
        if (p.alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.glowColor;
          ctx.shadowBlur = p.radius * 2.8;
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // When particles have formed, smoothly fade in the high-contrast text fill
      if (allSettled && elapsed > 2.0) {
        targetTextFillOpacityRef.current = 0.92;
      }

      // Smooth lerp for text fill opacity
      if (textFillOpacityRef.current !== targetTextFillOpacityRef.current) {
        textFillOpacityRef.current +=
          (targetTextFillOpacityRef.current - textFillOpacityRef.current) * 0.06;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, firstName, lastName]);

  // Mouse event listeners
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = {
      x: -9999,
      y: -9999,
      active: false,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleRevisitReform}
      className={`relative select-none cursor-default ${className}`}
      aria-label={`${firstName} ${lastName}`}
      data-cursor="text"
    >
      {/* Accessible semantic heading for screen readers & SEO */}
      <h1 className="sr-only">
        {firstName} {lastName} — Aspiring Software Developer
      </h1>

      {/* Ambient background glow aura matching portfolio cyan & purple */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl pointer-events-none -z-10 rounded-3xl" />

      {/* Dynamic Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="block"
      />
    </div>
  );
};
