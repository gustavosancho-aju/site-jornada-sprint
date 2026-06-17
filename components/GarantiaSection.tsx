import React from 'react';
import { Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface GarantiaSectionProps {
  onCheckout: () => void;
}

const GarantiaSection: React.FC<GarantiaSectionProps> = ({ onCheckout }) => {
  return (
    <section id="garantia" className="relative py-12 md:py-16 bg-black border-t border-brand-green/10">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="reveal relative bg-gradient-to-br from-brand-green/8 via-transparent to-transparent border-2 border-brand-green/30 rounded-[48px] p-10 md:p-16 text-center overflow-hidden shadow-[0_0_80px_rgba(34,197,94,0.1)] glow-pulse">

          {/* Top accent — premium glow line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-80 shadow-[0_0_20px_rgba(34,197,94,0.8)]" />

          <div className="relative z-10 flex flex-col items-center gap-7">

            {/* Shield — floating with glow */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-green/25 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-brand-green/10 border-2 border-brand-green/50 flex items-center justify-center float-slow shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <Shield className="w-12 h-12 text-brand-green matrix-glow" />
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-2">
                Risco <span className="text-brand-green">Zero</span>
              </h2>
              <p className="text-brand-green font-black uppercase tracking-widest text-sm">
                Garantia dupla — você não tem como perder
              </p>
            </div>

            {/* Body copy — double guarantee */}
            <div className="max-w-2xl w-full space-y-4 text-left">
              <div className="bg-black/50 border border-brand-green/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                  <p className="text-brand-green font-black uppercase tracking-widest text-xs">Garantia 1 — 7 dias, sem perguntas</p>
                </div>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  Entrou e não curtiu? Em até 7 dias você pede e devolvemos <strong className="text-white">100% do seu dinheiro</strong>. Sem formulário, sem pergunta, sem julgamento.
                </p>
              </div>

              <div className="bg-black/50 border border-brand-green/40 rounded-2xl p-5 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-brand-green shrink-0" />
                  <p className="text-brand-green font-black uppercase tracking-widest text-xs">Garantia 2 — resultado em 30 dias</p>
                </div>
                <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                  Faça as aulas e use sua mentoria: se em 30 dias você não tiver <strong className="text-white">sua primeira automação funcionando</strong>, eu trabalho 1:1 com você até montar — sem custo extra.
                </p>
              </div>

              <p className="text-2xl md:text-3xl font-black text-white leading-tight text-center pt-2">
                O risco é todo <span className="text-brand-green">meu.</span>
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onCheckout}
              className="flex items-center gap-3 bg-brand-green text-black font-black text-lg px-10 py-5 rounded-2xl hover:bg-brand-green/90 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:-translate-y-1 active:scale-95 group"
            >
              Quero Garantir Minha Vaga
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-slate-600 text-xs uppercase tracking-widest font-bold">
              Pagamento 100% seguro via InfinitePay
            </p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GarantiaSection;
