import React from 'react';
import SectionMatrixBackground from './SectionMatrixBackground';
import { LogIn, GraduationCap, Rocket, ArrowRight } from 'lucide-react';

interface ComoFuncionaSectionProps {
  onCheckout: () => void;
}

const passos = [
  {
    n: '01',
    icon: LogIn,
    title: 'Entre e acesse na hora',
    desc: 'Garantiu a vaga, liberou tudo. Acesso imediato às 8 imersões, às lives e aos bônus — por 12 meses. Você começa hoje, do absoluto zero.',
  },
  {
    n: '02',
    icon: GraduationCap,
    title: 'Aprenda e implemente junto',
    desc: 'Você não só assiste: monta seus assistentes e automações ao vivo, no seu ritmo, com suporte e um grupo de profissionais do seu lado.',
  },
  {
    n: '03',
    icon: Rocket,
    title: 'Automatize e ganhe tempo',
    desc: 'Coloca a IA pra trabalhar por você e usa sua mentoria 1:1 para destravar o projeto que mais importa pro seu resultado.',
  },
];

const ComoFuncionaSection: React.FC<ComoFuncionaSectionProps> = ({ onCheckout }) => {
  return (
    <section id="como-funciona" className="relative py-12 md:py-16 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* ── Header ── */}
        <div className="reveal flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-black/30 text-black font-black uppercase tracking-widest text-xs mb-6">
            Simples assim
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter text-black">
            Como funciona{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-black transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
              <span className="relative text-brand-green px-4 py-1">na prática</span>
            </span>
          </h2>
          <p className="text-black/80 mt-6 text-lg md:text-xl font-bold max-w-2xl text-center">
            Do clique ao primeiro resultado — sem complicação, no seu tempo.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {passos.map((passo, i) => {
            const Icon = passo.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} card-3d-hover card-highlight bg-black/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col gap-4 hover:border-brand-green/40 transition-all duration-300 group relative`}
              >
                <span className="absolute top-6 right-7 text-6xl font-black text-brand-green/10 select-none leading-none">{passo.n}</span>
                <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-brand-green" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-brand-green transition-colors">
                  {passo.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-base font-medium">{passo.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="reveal mt-12 text-center">
          <button
            onClick={onCheckout}
            className="inline-flex items-center gap-3 bg-black text-brand-green font-black text-lg px-10 py-5 rounded-2xl hover:bg-black/80 transition-all shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 group"
          >
            Quero começar agora
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ComoFuncionaSection;
