import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const resize = () => {
      try {
        canvas.width = window.innerWidth || 1200;
        canvas.height = window.innerHeight || 800;
      } catch {
        // Fallback silently if window measurement fails
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['rgba(244, 170, 186, 0.6)', 'rgba(232, 160, 191, 0.5)', 'rgba(255, 200, 210, 0.4)'];

    const createParticle = (): Particle => ({
      x: Math.random() * (canvas.width || 1200),
      y: -20,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 1.5 + 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });

    try {
      for (let i = 0; i < 30; i++) {
        const p = createParticle();
        p.y = Math.random() * (canvas.height || 800);
        particles.push(p);
      }
    } catch {
      // Catch initialization errors silently
    }

    const drawPetal = (p: Particle) => {
      try {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } catch {
        // Ignore draw errors
      }
    };

    const animate = () => {
      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
          p.x += p.speedX + Math.sin(p.y * 0.01) * 0.5;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
            particles[i] = createParticle();
          }

          drawPetal(p);
        });
      } catch {
        // Ignore loop errors
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
