import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { Award, TrendingUp, Quote, Users, Calendar, Star } from 'lucide-react';

const stats = [
  { value: '8+', label: 'anos de vendas & IA' },
  { value: '+200', label: 'profissionais transformados' },
  { value: '3ª', label: 'turma — sprint 003' },
  { value: 'R$1M+', label: 'em sistemas criados com IA' },
];

const AutoridadeSection: React.FC = () => {
  return (
    <section id="autoridade" className="relative py-24 md:py-32 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* Header */}
        <div className="reveal text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6 badge-pulse">
            <Award className="w-4 h-4" />
            Quem vai te guiar
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
            Por trás da <span className="text-brand-green">Jornada Sprint</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Photo + Stats */}
          <div className="reveal-left flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-green/15 blur-[80px] rounded-full" />
              <div className="relative z-10 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-brand-green/30 shadow-[0_0_50px_rgba(34,197,94,0.25)] float-slow">
                <img
                  src="/gustavo-sancho.png"
                  alt="Gustavo Sancho — Especialista em IA para Resultados"
                  className="w-full h-full object-cover object-top scale-110"
                  loading="lazy"
                  decoding="async"
                  width="288"
                  height="288"
                />
              </div>
              {/* Floating badge — now with glow */}
              <div className="absolute -bottom-3 -right-3 bg-brand-green text-black px-4 py-2 rounded-full font-black text-sm shadow-lg z-20 shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                Sprint 003 ✦
              </div>
            </div>

            {/* Stats grid — 3D premium */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs stagger-children">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`reveal card-3d-hover card-highlight glass-card rounded-2xl p-4 text-center hover:border-brand-green/40 transition-colors duration-300 reveal-delay-${i + 1}`}
                >
                  <div className="text-brand-green text-2xl font-black stat-glow">{stat.value}</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wide mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Story */}
          <div className="reveal-right space-y-7">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-1">Gustavo Sancho</h3>
              <p className="text-brand-green font-bold uppercase tracking-widest text-sm">
                Vendedor apaixonado por resultado. Especialista em IA.
              </p>
            </div>

            {/* Story — Brené Brown vulnerability arc */}
            <div className="relative pl-6 border-l-2 border-brand-green/30 space-y-5">
              <Quote className="absolute -left-4 -top-2 w-7 h-7 text-brand-green/40 fill-brand-green/10" />

              <p className="text-slate-200 text-lg leading-relaxed font-medium">
                "Comecei minha trajetória como vendedor — obcecado com resultado, com performance, com ajudar pessoas a chegarem mais longe. E foi exatamente essa obsessão que me levou até a IA."
              </p>
              <p className="text-slate-400 leading-relaxed">
                Enquanto a maioria testava IA "para ver o que acontecia", eu fui fundo: testei, errei, aprendi — e construí sistemas reais. Já gerei <strong className="text-white">mais de R$1 milhão em sistemas criados com IA</strong>. A liberdade financeira que sempre busquei chegou junto com o domínio das ferramentas certas.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Mais de 200 profissionais já passaram pela Jornada Sprint. Não são apenas "alunos" — são pessoas que decidiram estar do lado certo da maior mudança da história do trabalho.
              </p>
            </div>

            {/* Differentiator */}
            <div className="bg-black/50 border border-brand-green/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-white font-black">O que me diferencia: </span>
                  não sou professor de tecnologia genérico. Sou vendedor que usa IA para gerar resultado real — e ensino exatamente o que funciona na prática, com as mesmas ferramentas que uso todos os dias para criar sistemas que já geraram mais de R$1 milhão.
                </p>
              </div>
            </div>

            {/* Social proof quote */}
            <div className="bg-brand-green/10 border border-brand-green/20 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green flex items-center justify-center text-black font-black text-sm shrink-0">L</div>
                <div>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "Hoje realmente foi um divisor de águas. E olhe que já trabalho com IA ein?! Parabéns Sancho!"
                  </p>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Luiz — Mentorado Sprint 002</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AutoridadeSection;
