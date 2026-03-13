
import React, { useEffect, useRef } from 'react';

const MatrixVideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on mobile — saves canvas RAF loop on small screens
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement || document.body;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    let animId: number;
    let visible = false;

    const draw = () => {
      if (!visible) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const opacity = Math.random() * 0.4 + 0.1;
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;

        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        drops[i] += 0.45;
      }

      animId = requestAnimationFrame(draw);
    };

    // Observe the wrapper div (parent of canvas, inside the absolute container)
    const sectionWrapper = parent.parentElement || parent;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          animId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0 }
    );
    observer.observe(sectionWrapper);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
    </div>
  );
};

export default MatrixVideoBackground;
