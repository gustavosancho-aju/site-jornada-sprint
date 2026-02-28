
import React, { useEffect, useRef } from 'react';

const MatrixVideoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Tenta pegar o elemento pai para dimensionamento, fallback para window se necessário
    const parent = canvas.parentElement || document.body;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    // Caracteres do efeito Matrix
    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Inicializa as gotas em posições aleatórias acima da tela
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      // Fundo preto com transparência (trail effect)
      // Ajustado para 0.05 para um rastro suave, mas não muito longo
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Cor Verde Matrix Suave
        // Opacidade aleatória para dar profundidade e sensação de "cintilação"
        const opacity = Math.random() * 0.4 + 0.1; 
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`; 
        
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia a gota randomicamente para não ficar um padrão repetitivo
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0;
        }
        
        // Velocidade suave (menor que 1 fica mais lento/cinematográfico)
        drops[i] += 0.45;
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
    <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-80"
      />
      {/* Gradiente sutil para garantir legibilidade do conteúdo sobre o efeito */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
    </div>
  );
};

export default MatrixVideoBackground;
