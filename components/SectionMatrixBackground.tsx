
import React, { useEffect, useRef } from 'react';

const SectionMatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      // Fundo verde translúcido para rastro (trail)
      // Usando a cor da marca com opacidade ajustada para suavidade
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Texto PRETO para contraste nas seções verdes
        // Opacidade reduzida (0.15 a 0.35) para ser bem sutil e não brigar com o conteúdo
        const opacity = Math.random() * 0.2 + 0.15; 
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        // Velocidade reduzida para 0.35 (efeito câmera lenta)
        drops[i] += 0.35;
      }
      requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    
    const animId = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-70"
    />
  );
};

export default SectionMatrixBackground;
