import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { UserCheck, Clock, Target, Sparkles } from 'lucide-react';

interface MentoriaSectionProps {
  onCheckout: () => void;
}

const MentoriaSection: React.FC<MentoriaSectionProps> = ({ onCheckout }) => {
  return (
    <section id="mentoria" className="relative py-20 md:py-28 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs badge-pulse">
              <Sparkles className="w-4 h-4" />
              Bônus exclusivo
            </div>

            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
              Sessão <span className="text-brand-green">individual</span><br />
              gravada
            </h2>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              Você não vai ficar sozinho. Ao entrar na Jornada Sprint, ganha
              <strong className="text-white"> 1 hora de mentoria individual</strong> para
              tirar seu projeto de IA do papel — com direcionamento personalizado,
              no seu contexto, no seu ritmo.
            </p>

            <div className="space-y-4">
              {[
                { icon: UserCheck, text: 'Sessão 1:1 — sessão individual gravada' },
                { icon: Target, text: 'Foco no SEU projeto — não é aula genérica' },
                { icon: Clock, text: '1 hora completa de direcionamento prático' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-green" />
                  </div>
                  <p className="text-white font-bold">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual highlight card */}
          <div className="flex justify-center">
            <div className="relative bg-black/60 border-2 border-brand-green/40 rounded-[40px] p-10 text-center max-w-sm shadow-[0_0_60px_rgba(34,197,94,0.15)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-green text-black text-sm font-black px-6 py-2 rounded-full shadow-lg uppercase">
                Incluído na Jornada
              </div>

              <div className="w-24 h-24 rounded-full bg-brand-green/10 border-2 border-brand-green/30 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-12 h-12 text-brand-green" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">Mentoria 1:1</h3>
              <p className="text-brand-green font-black text-3xl mb-2">1 HORA</p>
              <p className="text-slate-400 text-sm">Sessão individual gravada</p>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-slate-600 text-xs uppercase tracking-widest font-bold mb-1">Se fosse cobrada separadamente</p>
                <p className="text-slate-500 text-xl font-black line-through">R$ 497,00</p>
                <p className="text-brand-green font-black text-lg mt-1">Incluída GRÁTIS</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MentoriaSection;
