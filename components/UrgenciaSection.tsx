import React from 'react';
import SectionMatrixBackground from './SectionMatrixBackground';
import { Zap, ArrowRight } from 'lucide-react';

interface UrgenciaSectionProps {
  onCheckout: () => void;
}

const UrgenciaSection: React.FC<UrgenciaSectionProps> = ({ onCheckout }) => {
  return (
    <section id="urgencia" className="relative py-12 md:py-16 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />
      <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-black/30 text-black font-bold uppercase tracking-widest text-xs mb-8">
          <Zap className="w-4 h-4 fill-black" />
          Acesso imediato · Garantia de resultado
        </div>

        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-tight mb-4">
          A IA não vai esperar você
        </h2>

        <p className="text-black/60 text-lg md:text-xl font-medium mb-10">
          Mais de R$ 2.494 em valor por R$ 497 — comece hoje, sem risco.
        </p>

        {/* Price block — with animated border */}
        <div className="reveal animated-border bg-black/20 rounded-3xl p-6 md:p-8 mb-10 max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-black/60 font-bold">Valor total:</span>
            <span className="text-black/40 font-black text-xl line-through">R$ 2.494,00</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black font-black text-lg">Agora:</span>
            <div className="text-right">
              <div className="text-black font-black text-3xl md:text-4xl">R$ 497,00</div>
              <div className="text-black/50 text-sm font-bold">ou 12x de R$ 49,70</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCheckout}
          className="btn-shine inline-flex items-center gap-3 bg-black text-brand-green font-black text-xl px-12 py-6 rounded-2xl hover:bg-black/80 transition-all shadow-[0_0_40px_rgba(0,0,0,0.4),0_0_20px_rgba(34,197,94,0.15)] hover:-translate-y-1 active:scale-95 group mb-6"
        >
          <Zap className="w-7 h-7 fill-brand-green group-hover:scale-125 transition-transform" />
          Quero Garantir Minha Vaga
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default UrgenciaSection;
