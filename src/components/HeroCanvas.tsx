import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  z: number;
}

interface HeroCanvasProps {
  isContactActive?: boolean;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ isContactActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contactRef = useRef(isContactActive);

  useEffect(() => {
    contactRef.current = isContactActive;
  }, [isContactActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isActive: false,
      radius: 150,
    };

    const colors = [
      'rgba(168, 85, 247, ', // purple
      'rgba(6, 182, 212, ',  // cyan
      'rgba(99, 102, 241, ', // indigo
      'rgba(244, 244, 245, ' // light silver
    ];

    const particleCount = window.innerWidth < 768 ? 45 : 100;
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = Math.random() * 2 + 1;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.35 * z,
          vy: (Math.random() - 0.5) * 0.35 * z,
          size: Math.random() * 1.6 + 0.6 * z,
          alpha: Math.random() * 0.5 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          z,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const inContact = contactRef.current;

      // Render subtle dynamic radial glow behind cursor
      if (mouse.isActive && !inContact) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          320
        );
        glowGradient.addColorStop(0, 'rgba(147, 51, 234, 0.08)');
        glowGradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
        glowGradient.addColorStop(1, 'rgba(5, 5, 8, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, width, height);
      }

      const targetGatherX = width / 2;
      const targetGatherY = height * 0.65;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (inContact) {
          // Particles gather toward center bottom
          const gdx = targetGatherX - p.x;
          const gdy = targetGatherY - p.y;
          p.x += gdx * 0.015;
          p.y += gdy * 0.015;
        } else {
          // Normal drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) p.y = height + 10;
          if (p.y > height + 10) p.y = -10;

          // Mouse gentle repulsion
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 2.5 * (p.z / 2);
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, inContact ? p.size * 1.3 : p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${inContact ? p.alpha * 1.4 : p.alpha})`;
        ctx.fill();

        // Connective lines
        if (p.z > 1.8) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            if (p2.z > 1.8) {
              const cdx = p.x - p2.x;
              const cdy = p.y - p2.y;
              const cDist = Math.sqrt(cdx * cdx + cdy * cdy);

              const maxLineDist = inContact ? 110 : 80;
              if (cDist < maxLineDist) {
                const lineAlpha = (1 - cDist / maxLineDist) * (inContact ? 0.25 : 0.14);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = inContact ? `rgba(6, 182, 212, ${lineAlpha})` : `rgba(168, 85, 247, ${lineAlpha})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${
        isContactActive ? 'opacity-90' : 'opacity-70'
      }`}
      aria-hidden="true"
    />
  );
};
