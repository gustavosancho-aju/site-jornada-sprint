import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { Mail, BarChart3, MessageCircle, Users, ArrowRight, Bot } from 'lucide-react';

interface AutomacaoSectionProps {
  onCheckout: () => void;
}

const casos = [
  {
    icon: Mail,
    title: 'E-mail no automático',
    desc: 'Triagem, respostas e sequências de follow-up que saem sozinhas — você para de perder oportunidade por demora.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios sem trabalho manual',
    desc: 'Seus relatórios gerados e enviados toda semana, prontos na sua mão, sem você abrir uma planilha.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp que atende por você',
    desc: 'Qualificação e respostas automáticas 24h por dia. O lead é atendido na hora, mesmo enquanto você dorme.',
  },
  {
    icon: Users,
    title: 'Captação de leads no piloto',
    desc: 'Captura, organiza e distribui os leads automaticamente — direto pro seu funil, sem cair na planilha esquecida.',
  },
];

const AutomacaoSection: React.FC<AutomacaoSectionProps> = ({ onCheckout }) => {
  return (
    <section id="automacao" className="relative py-16 md:py-24 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* ── Header ── */}
        <div className="reveal flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-black uppercase tracking-widest text-xs mb-6 badge-pulse">
            <Bot className="w-4 h-4" />
            O coração da Jornada
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter text-white">
            O que você vai <span className="text-brand-green">automatizar</span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg md:text-xl font-medium max-w-2xl text-center">
            Pare de fazer no braço o que a IA pode fazer por você. Você vai montar agentes e GPTs com ações que executam as tarefas repetitivas — <span className="text-white font-bold">sem precisar programar.</span>
          </p>
        </div>

        {/* ── Grid de casos ── */}
        <div className="grid sm:grid-cols-2 gap-5 stagger-children">
          {casos.map((caso, i) => {
            const Icon = caso.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} card-3d-hover card-highlight bg-white/5 backdrop-blur-md border border-white/10 p-7 md:p-8 rounded-3xl flex items-start gap-5 hover:border-brand-green/40 transition-all duration-300 group`}
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-brand-green" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight group-hover:text-brand-green transition-colors">
                    {caso.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-base font-medium">{caso.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Closing line + CTA ── */}
        <div className="reveal mt-12 text-center">
          <p className="text-white font-black text-xl md:text-2xl italic mb-8 max-w-3xl mx-auto leading-snug">
            "Cada hora que você gasta numa tarefa repetitiva é uma hora que a IA poderia estar trabalhando por você."
          </p>
          <button
            onClick={onCheckout}
            className="inline-flex items-center gap-3 bg-brand-green text-black font-black text-lg px-10 py-5 rounded-2xl hover:bg-brand-green/90 transition-all shadow-[0_0_30px_rgba(34,197,94,0.35)] hover:-translate-y-1 active:scale-95 group"
          >
            Quero automatizar meu negócio
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default AutomacaoSection;
