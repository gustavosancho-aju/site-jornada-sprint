import React from 'react';
import MatrixVideoBackground from './MatrixVideoBackground';
import { Plus } from 'lucide-react';

const jornadas = [
  { number: '00', title: 'Do Zero com IA', image: '/cards/jornada-00-zero.webp' },
  { number: '01', title: 'Assistentes de IA', image: '/cards/jornada-01-assistentes.webp' },
  { number: '02', title: 'Navegadores de IA', image: '/cards/jornada-02-navegadores.webp' },
  { number: '03', title: 'Vídeos com IA', image: '/cards/jornada-03-videos.webp' },
  { number: '04', title: 'Especialistas com IA', image: '/cards/jornada-04-especialistas.webp' },
  { number: '05', title: 'Criando Sites com IA', image: '/cards/jornada-05-sites.webp' },
  { number: '06', title: 'Imagens com IA', image: '/cards/jornada-06-imagens.webp' },
  { number: '07', title: 'Sistemas com IA', image: '/cards/jornada-07-sistemas.webp' },
  { number: '★', title: 'Atendimento Sprint', image: '/cards/atendimento-sprint.webp' },
];

const CurriculoSection: React.FC = () => {
  return (
    <section id="curriculo" className="relative py-24 md:py-32 overflow-hidden border-t border-brand-green/10">
      <MatrixVideoBackground />
      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        <div className="reveal flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-bold uppercase tracking-widest text-xs mb-6 badge-pulse">
            O que você vai dominar
          </div>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-tight">
            8 Imersões.<br />
            <span className="text-brand-green">8 Transformações.</span>
          </h2>
          <p className="text-slate-400 mt-6 text-lg md:text-xl max-w-2xl text-center">
            Cada jornada entrega um resultado concreto. Você não sai com teoria — sai com algo funcionando.
          </p>
        </div>

        {/* Card Grid — 5 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {jornadas.map((jornada, i) => (
            <div
              key={i}
              className="reveal group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-brand-green/40 transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            >
              <img
                src={jornada.image}
                alt={`Jornada ${jornada.number}: ${jornada.title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Number badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-brand-green text-xs font-black px-2 py-1 rounded-lg border border-brand-green/20">
                {jornada.number}
              </div>
            </div>
          ))}

          {/* Mystery Card — "Uma nova aula, todo mês" */}
          <div className="reveal group relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-dashed border-brand-green/30 hover:border-brand-green/60 transition-all duration-300 hover:-translate-y-2 bg-brand-green/5 flex flex-col items-center justify-center cursor-default shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-brand-green" />
            </div>
            <p className="text-brand-green font-black text-center text-sm uppercase tracking-wider px-4 leading-tight">
              Uma nova aula,<br />todo mês
            </p>
            <p className="text-slate-600 text-xs font-bold mt-2 uppercase tracking-widest">
              Lives ao vivo
            </p>
          </div>
        </div>

        <p className="text-center text-slate-600 font-bold text-sm uppercase tracking-widest mt-10">
          Tudo em 12 meses de acesso total — no seu ritmo, quando quiser
        </p>

      </div>
    </section>
  );
};

export default CurriculoSection;
