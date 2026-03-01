import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import SectionMatrixBackground from './SectionMatrixBackground';
import { CheckCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// 🔧 Cole aqui a URL da sua cena do Spline após criá-la
//    https://spline.design → Publish → Copy Link
// ─────────────────────────────────────────────────────────────
const SPLINE_SCENE_URL = 'https://prod.spline.design/COLE-SUA-URL-AQUI/scene.splinecode';

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

// ─── Placeholder visual enquanto a URL não está configurada ───
const SplinePlaceholder: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative flex flex-col items-center gap-8">
      {/* Personagem central com blocos flutuando */}
      <div className="relative w-52 h-52">
        {/* Personagem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-brand-green/20 border-2 border-brand-green shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center animate-pulse">
            <span className="text-4xl">🤖</span>
          </div>
        </div>
        {/* Órbita externa */}
        <div
          className="absolute inset-0 rounded-full border border-brand-green/20"
          style={{ animation: 'spin 10s linear infinite' }}
        />
        {/* Órbita interna */}
        <div
          className="absolute inset-8 rounded-full border border-brand-green/10"
          style={{ animation: 'spin 6s linear infinite reverse' }}
        />
        {/* Blocos flutuando ao redor */}
        {[
          { top: '-8%', left: '50%', delay: '0s', char: '◈', size: 'w-9 h-9' },
          { top: '25%', left: '-5%', delay: '0.4s', char: '⬡', size: 'w-8 h-8' },
          { top: '25%', left: '88%', delay: '0.8s', char: '◇', size: 'w-8 h-8' },
          { top: '75%', left: '5%', delay: '1.2s', char: '⬢', size: 'w-7 h-7' },
          { top: '75%', left: '82%', delay: '0.6s', char: '◈', size: 'w-7 h-7' },
          { top: '100%', left: '45%', delay: '1s', char: '◇', size: 'w-9 h-9' },
        ].map((bloco, i) => (
          <div
            key={i}
            className={`absolute ${bloco.size} rounded-xl bg-black border border-brand-green/40 text-brand-green flex items-center justify-center text-sm font-bold shadow-[0_0_12px_rgba(34,197,94,0.2)]`}
            style={{
              top: bloco.top,
              left: bloco.left,
              transform: 'translate(-50%, -50%)',
              animation: `bounce 2s ease-in-out ${bloco.delay} infinite`,
            }}
          >
            {bloco.char}
          </div>
        ))}
      </div>

      <div className="text-center space-y-1">
        <p className="text-brand-green font-black text-xs uppercase tracking-[0.4em]">
          Animação 3D · Spline
        </p>
        <p className="text-slate-700 text-[11px] max-w-[220px] leading-relaxed">
          Configure a URL no arquivo{' '}
          <code className="text-brand-green/70">ParaQuemESection.tsx</code>
        </p>
      </div>
    </div>
  </div>
);

// ─── Skeleton de loading ───
const SplineSkeleton: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center gap-3">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-brand-green rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      />
    ))}
  </div>
);

// ─── Componente principal ───
const ParaQuemESection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isPlaceholder = SPLINE_SCENE_URL.includes('COLE-SUA-URL-AQUI');

  return (
    <section id="para-quem-e" className="relative py-20 md:py-32 bg-brand-green overflow-hidden">
      <SectionMatrixBackground />

      <div className="container mx-auto max-w-5xl px-4 relative z-10">

        {/* ── Headline ── */}
        <div className="reveal text-center mb-10">
          <h2 className="font-heading text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter text-black">
            Esta Jornada{' '}
            <span className="relative inline-block mx-2">
              <span className="absolute inset-0 bg-black transform -skew-x-12 shadow-[0_0_20px_rgba(0,0,0,0.3)]" />
              <span className="relative text-brand-green px-4 py-1">É</span>
            </span>{' '}
            Para Você Que...
          </h2>
        </div>

        {/* ── Janela 3D Spline — "IA em Ação" ── */}
        <div className="reveal mb-12 relative">
          {/* Container da cena */}
          <div
            className="relative w-full rounded-3xl overflow-hidden border border-black/40 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,0,0,0.2)]"
            style={{ height: '420px' }}
          >
            {/* Fundo escuro da cena 3D — contrasta com a seção verde */}
            <div className="absolute inset-0 bg-[#050a05]" />

            {/* Glow verde sutil no fundo */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(34,197,94,0.08) 0%, transparent 70%)',
              }}
            />

            {/* Badge "IA em Ação" */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-brand-green/40 text-brand-green text-[11px] font-black uppercase tracking-[0.25em]">
              <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
              IA Construindo em Tempo Real
            </div>

            {/* Badge canto direito */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green/60 text-[10px] font-black uppercase tracking-widest">
              3D Interativo
            </div>

            {/* Linha de energia superior */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/60 to-transparent z-10" />

            {/* Cena Spline ou Placeholder */}
            {isPlaceholder ? (
              <SplinePlaceholder />
            ) : (
              <>
                {!isLoaded && <SplineSkeleton />}
                <Suspense fallback={<SplineSkeleton />}>
                  <Spline
                    scene={SPLINE_SCENE_URL}
                    onLoad={() => setIsLoaded(true)}
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: isLoaded ? 1 : 0,
                      transition: 'opacity 1s ease',
                    }}
                  />
                </Suspense>
              </>
            )}

            {/* Linha de energia inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent z-10" />

            {/* Gradiente de fade nas laterais */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#050a05] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#050a05] to-transparent pointer-events-none z-10" />
          </div>

          {/* Reflexo/sombra embaixo */}
          <div
            className="absolute -bottom-4 left-8 right-8 h-8 rounded-b-3xl pointer-events-none"
            style={{
              background: 'rgba(0,0,0,0.35)',
              filter: 'blur(12px)',
            }}
          />
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
