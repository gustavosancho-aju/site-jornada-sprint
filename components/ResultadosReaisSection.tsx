import React from 'react';
import SectionMatrixBackground from './SectionMatrixBackground';
import { TrendingUp, Quote } from 'lucide-react';

const casos = [
  {
    initial: 'T',
    name: 'Tamiles Bortoletto',
    role: 'Sprint 002',
    resultado: 'Criou assistente de IA para LinkedIn em minutos',
    detalhe: '"Dediquei alguns minutos para interagir com os assistentes e é surreal demais! Esse é pronto, rápido, em minutos falei de mim e ele ajustou a linguagem! Sensacional demais!"',
    impacto: 'Presença digital profissional — sem agência, sem custo',
  },
  {
    initial: 'L',
    name: 'Luiz',
    role: 'Sprint 002',
    resultado: 'Divisor de águas mesmo já trabalhando com IA',
    detalhe: '"Hoje realmente foi um divisor de águas. E olhe que já trabalho com IA! Parabéns Sancho!"',
    impacto: 'Novo nível de domínio — mesmo pra quem já usava IA',
  },
  {
    initial: 'F',
    name: 'Fernanda Albuquerque',
    role: 'Sprint 001',
    resultado: 'Muito aprendizado além do esperado',
    detalhe: '"Encontro riquíssimo de conteúdo. Parabéns @Gustavo Sancho por ser esse profissional incrível e por dividir seu conteúdo conosco."',
    impacto: 'Método que supera todas as expectativas',
  },
];

const ResultadosReaisSection: React.FC = () => {
  return (
    <section id="resultados" className="relative py-24 md:py-32 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        <div className="reveal flex flex-col items-center text-center mb-14">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter text-black">
            Resultados{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
              <span className="relative text-brand-green px-4 py-1">Reais</span>
            </span>
          </h2>
          <p className="text-black/70 mt-6 text-lg md:text-xl font-medium max-w-2xl text-center">
            Não são histórias inventadas. São feedbacks reais de profissionais que passaram pela Jornada Sprint.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {casos.map((caso, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} card-3d-hover card-highlight bg-black/90 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col gap-5 hover:border-brand-green/40 transition-all duration-300 group`}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-green flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  {caso.initial}
                </div>
                <div>
                  <p className="text-white font-bold group-hover:text-brand-green transition-colors">{caso.name}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">{caso.role}</p>
                </div>
              </div>

              {/* Result tag */}
              <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-brand-green" />
                  <span className="text-brand-green text-xs font-black uppercase tracking-widest">Resultado</span>
                </div>
                <p className="text-white font-bold text-sm leading-snug">{caso.resultado}</p>
              </div>

              {/* Quote */}
              <div className="flex gap-2 items-start flex-1">
                <Quote className="w-4 h-4 text-brand-green/40 fill-brand-green/10 shrink-0 mt-0.5" />
                <p className="text-slate-400 text-sm leading-relaxed italic">{caso.detalhe}</p>
              </div>

              {/* Footer */}
              <div className="border-t border-white/5 pt-4">
                <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">{caso.impacto}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResultadosReaisSection;
