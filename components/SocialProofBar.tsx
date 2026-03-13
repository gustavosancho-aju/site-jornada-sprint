import React, { useEffect, useState, useRef } from 'react';
import { Star, Shield, Zap } from 'lucide-react';

const SocialProofBar: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const target = 200;
    const step = target / (1500 / 50);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, [isVisible]);

  const initials = ['M', 'K', 'F', 'R', 'L', 'T'];

  return (
    <div ref={ref} className="bg-brand-green py-4 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10 flex-wrap">

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {initials.map((initial, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-black border-2 border-brand-green flex items-center justify-center text-brand-green text-xs font-black">
                {initial}
              </div>
            ))}
          </div>
          <span className="text-black font-black text-sm">
            <span className="text-xl font-black">+{count}</span> profissionais transformados
          </span>
        </div>

        <div className="hidden sm:block w-px h-5 bg-black/20" />

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className="w-4 h-4 fill-black text-black" />
          ))}
          <span className="text-black font-bold text-sm ml-1">Sprint 003 — Vagas Abertas</span>
        </div>

        <div className="hidden sm:block w-px h-5 bg-black/20" />

        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-black" />
          <span className="text-black font-bold text-sm">Garantia de 7 dias</span>
        </div>

        <div className="hidden sm:block w-px h-5 bg-black/20" />

        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 fill-black text-black" />
          <span className="text-black font-bold text-sm">100% dos alunos recomendam</span>
        </div>

      </div>
    </div>
  );
};

export default SocialProofBar;
