import React from 'react';
import SectionMatrixBackground from './SectionMatrixBackground';
import { CheckCircle } from 'lucide-react';

const qualifications = [
  {
    text: 'Quer gerar mais resultado com IA, mas ainda não sabe por onde começar',
    sublabel: 'mesmo que nunca tenha usado nenhuma ferramenta de IA antes',
  },
  {
    text: 'Sente que a IA pode transformar sua carreira — mas ainda não colocou em prática',
    sublabel: 'e está pronto para parar de só ouvir falar e realmente fazer acontecer',
  },
  {
    text: 'Quer criar uma operação mais inteligente, com menos esforço e mais resultado',
    sublabel: 'processos automáticos que trabalham por você enquanto você foca no que importa',
  },
  {
    text: 'Está cansado de depender de agência, editor ou desenvolvedor',
    sublabel: 'para ter presença digital, sistemas e conteúdo profissional',
  },
  {
    text: 'Quer ser a referência em IA no seu mercado ou área de atuação',
    sublabel: 'enquanto a concorrência ainda está aprendendo o básico',
  },
  {
    text: 'Está disposto a dedicar 12 meses para dominar IA de verdade',
    sublabel: 'não apenas aprender — implementar, gerar resultado e alcançar liberdade financeira',
  },
];

const ParaQuemESection: React.FC = () => {
  return (
    <section id="para-quem-e" className="relative py-20 md:py-32 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">

        {/* ── Headline ── */}
        <div className="reveal text-center mb-14">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-tight tracking-tighter text-black">
            Esta Jornada{' '}
            <span className="relative inline-block mx-2">
              <span className="absolute inset-0 bg-black transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
              <span className="relative text-brand-green px-4 py-1">É</span>
            </span>{' '}
            Para Você Que...
          </h2>
        </div>

        {/* ── Grid de qualificações ── */}
        <div className="grid md:grid-cols-2 gap-4 stagger-children">
          {qualifications.map((item, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} card-3d-hover card-highlight bg-black/90 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex items-start gap-4 hover:border-brand-green/40 transition-all duration-300 group`}
            >
              <CheckCircle className="w-6 h-6 text-brand-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-white font-bold leading-snug">{item.text}</p>
                <p className="text-slate-500 text-sm mt-1 font-medium">{item.sublabel}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quote final ── */}
        <div className="reveal mt-12 text-center">
          <div className="inline-block bg-black/20 border border-black/30 rounded-2xl px-8 py-5">
            <p className="text-black font-black text-xl italic">
              "Se você se viu em pelo menos 3 pontos acima — você está no lugar certo."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ParaQuemESection;
