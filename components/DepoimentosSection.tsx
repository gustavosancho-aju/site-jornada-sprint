import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Quote } from 'lucide-react';

const MatrixVideoBackground = React.lazy(() => import('./MatrixVideoBackground'));

const testimonials = [
  {
    name: "Marinilza Palhares",
    role: "Mentorada Sprint 001",
    text: "Primeiro quero agradecer a aula maravilhosa que tive hj, realmente não estava esperando tanto, não só tirei dúvidas como aprendi muito. Valeu demais a mentoria 🙏"
  },
  {
    name: "Kiraz Consultora",
    role: "Mentorada Sprint 001",
    text: "Ah eu também quero agradecer. Muitas anotações, muito aprendizado e já vou colocar tudo em prática. Foi ótimo Gustavo! ☺️ 👏"
  },
  {
    name: "Fernanda Albuquerque",
    role: "Mentorada Sprint 001",
    text: "Gente, encontro riquíssimo de conteúdo. Parabéns @Gustavo Sancho por ser esse profissional incrível e por dividir seu conteúdo conosco. 👊"
  },
  {
    name: "Raphael Calabria",
    role: "Mentorado Sprint 001",
    text: "Craque! Agradeço a Gustavo pela mentoria e por abrir minha mente para outros projetos! Obrigado!! Em frente. Parabéns! 👏"
  },
  {
    name: "Luiz",
    role: "Mentorado Sprint 002",
    text: "Hoje realmente foi um divisor de águas. E olhe que já trabalho com IA ein?! Parabéns Sancho! 🙏"
  },
  {
    name: "Tamiles Bortoletto",
    role: "Mentorada Sprint 002",
    text: "Feedback: SURREALLLLLLLL 🚀🚀🚀🚀🚀🚀🚀🚀 Dediquei alguns minutos para interagir com os assistentes e é surreal demais demais demais !!!! Com tudo que vc já ensinou eu fiquei procrastinando em como iniciar meu assistente de Linkedin ! Esse é pronto, rápido, em minutos falei de mim e ele ajustou a linguagem ! Sensacional demais !!!!!"
  }
];

const DepoimentosSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      const singleSetWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let rafId: number;
    let lastTime = 0;
    const INTERVAL_MS = 30;

    const tick = (now: number) => {
      if (now - lastTime >= INTERVAL_MS) {
        if (scrollRef.current && !isPausedRef.current) {
          scrollRef.current.scrollLeft += 1;
          const singleSetWidth = scrollRef.current.scrollWidth / 3;
          if (scrollRef.current.scrollLeft >= singleSetWidth * 2) {
            scrollRef.current.scrollLeft = singleSetWidth;
          }
        }
        lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const manualScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    setIsPaused(true);
    const container = scrollRef.current;
    const cardWidth = 482;
    const singleSetWidth = container.scrollWidth / 3;

    if (direction === 'left') {
      if (container.scrollLeft <= 50) {
        container.scrollLeft = singleSetWidth * 2;
      }
      container.scrollTo({
        left: container.scrollLeft - cardWidth,
        behavior: 'smooth'
      });
    } else {
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 50)) {
        container.scrollLeft = singleSetWidth;
      }
      container.scrollTo({
        left: container.scrollLeft + cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="depoimentos" className="relative border-t border-brand-green/10 py-24 md:py-32 overflow-hidden overflow-x-hidden">
      <React.Suspense fallback={null}>
        <MatrixVideoBackground />
      </React.Suspense>
      <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-black/90 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-black/90 to-transparent z-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
        <div className="reveal inline-block relative">
          <div className="absolute inset-0 bg-brand-green/10 blur-[40px] rounded-full"></div>
          <h2 className="relative z-10 font-heading text-4xl md:text-6xl font-black text-white px-8 py-2 uppercase tracking-tighter">
            Quando a IA vira <span className="text-brand-green">resultado real</span>
          </h2>
        </div>
        <p className="reveal text-slate-400 mt-6 text-xl max-w-2xl !mx-auto font-medium">Essas pessoas chegaram com as mesmas dúvidas que você tem agora. Leia o que mudou.</p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => manualScroll('left')}
            className="p-4 bg-black/60 border border-white/10 rounded-full text-brand-green hover:bg-brand-green hover:text-black transition-all shadow-xl active:scale-90"
            title="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-3 px-8 py-4 bg-brand-green/5 border border-brand-green/30 rounded-full text-brand-green font-black hover:bg-brand-green/20 transition-all uppercase text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(34,197,94,0.1)] active:scale-95"
          >
            {isPaused ? <><Play className="w-5 h-5 fill-current" /> Retomar</> : <><Pause className="w-5 h-5 fill-current" /> Pausar leitura</>}
          </button>
          <button
            onClick={() => manualScroll('right')}
            className="p-4 bg-black/60 border border-white/10 rounded-full text-brand-green hover:bg-brand-green hover:text-black transition-all shadow-xl active:scale-90"
            title="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex w-full py-10 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing relative z-20"
        style={{ touchAction: 'pan-x' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex gap-8 px-4 w-max">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[320px] md:w-[450px] bg-black/50 border border-white/10 p-8 rounded-[32px] backdrop-blur-md hover:border-brand-green/40 transition-all duration-500 hover:-translate-y-2 group shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">{t.name.charAt(0)}</div>
                <div>
                  <p className="font-bold text-white text-lg group-hover:text-brand-green transition-colors">{t.name}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.role}</p>
                </div>
                <Quote className="w-8 h-8 text-slate-700 ml-auto opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-slate-300 text-lg leading-relaxed font-medium italic">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepoimentosSection;
