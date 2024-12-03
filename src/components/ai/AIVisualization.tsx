import React, { useEffect, useRef } from 'react';
import { useAI } from './AIContext';

export function AIVisualization() {
  const { isLoading } = useAI();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1
    }));

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.vx * (isLoading ? 2 : 1);
        particle.y += particle.vy * (isLoading ? 2 : 1);

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = isLoading ? '#7c3aed' : '#6b7280';
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = isLoading ? 'rgba(124, 58, 237, 0.1)' : 'rgba(107, 114, 128, 0.1)';
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [isLoading]);

  return (
    <div className="relative w-full h-32 mb-6 overflow-hidden rounded-lg bg-gradient-to-r from-purple-900/50 to-indigo-900/50 flex items-center justify-center group">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      <div className="relative flex flex-col items-center gap-3 z-10">
        <div 
          className={`
            w-12 h-12 rounded-full 
            bg-gradient-to-r from-purple-500 to-indigo-500 
            flex items-center justify-center shadow-lg 
            shadow-purple-500/20 transition-all duration-300 
            group-hover:scale-110
            ${isLoading ? 'animate-pulse' : ''}
          `}
          role="presentation"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 flex items-center justify-center">
              <div className={`w-2 ${isLoading ? 'animate-pulse' : ''}`}>
                <svg className="w-full" viewBox="0 0 20 20">
                  <path
                    className={`
                      fill-purple-300/90 transition-all duration-300
                      ${isLoading ? 'animate-[wave_2s_ease-in-out_infinite]' : 'scale-75 opacity-75'}
                    `}
                    d="M10 2a1 1 0 011 1v14a1 1 0 11-2 0V3a1 1 0 011-1zm4 0a1 1 0 011 1v14a1 1 0 11-2 0V3a1 1 0 011-1zM6 2a1 1 0 011 1v14a1 1 0 11-2 0V3a1 1 0 011-1z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5 h-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`
                w-0.5 bg-purple-400/80
                transform origin-bottom transition-all duration-300
                ${isLoading ? 'animate-[waveform_1.2s_ease-in-out_infinite]' : 'h-1 opacity-50'}
                group-hover:opacity-100
              `}
              style={{
                height: isLoading ? '16px' : '4px',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}