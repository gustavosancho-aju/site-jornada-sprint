
import React, { useEffect, useRef } from 'react';

const MatrixGlitterBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      // Fundo preto com transparência para criar o rastro (trail effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Configuração da fonte
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Cor do texto Matrix - Verde Suave (#22c55e é o brand-green) com opacidade
        // Varia a opacidade levemente para dar profundidade
        const opacity = Math.random() * 0.5 + 0.1; 
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`; 
        
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a gota aleatoriamente após sair da tela
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5; // Velocidade da chuva
      }

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      // Ajusta o array de drops se a tela aumentar
      if (newColumns > drops.length) {
          for(let i = drops.length; i < newColumns; i++) drops.push(Math.random() * -100);
      }
    };

    window.addEventListener('resize', handleResize);
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#000000' }}
    />
  );
};

export default MatrixGlitterBackground;
