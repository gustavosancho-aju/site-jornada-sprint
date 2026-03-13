import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';

// ─────────────────────────────────────────────────────────────
// 🔧 CONFIGURAÇÃO — Cole aqui a URL da sua cena do Spline
//    Exemplo: https://prod.spline.design/XXXXXXXXXXXXXXXX/scene.splinecode
// ─────────────────────────────────────────────────────────────
const SPLINE_SCENE_URL = 'https://prod.spline.design/COLE-SUA-URL-AQUI/scene.splinecode';

// ─────────────────────────────────────────────────────────────
// Skeleton de loading — exibido enquanto a cena 3D carrega
// ─────────────────────────────────────────────────────────────
const SplineSkeleton: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative flex flex-col items-center gap-6">
      {/* Blocos animados simulando a cena carregando */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-lg bg-brand-green/20 border border-brand-green/30 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3 text-brand-green/60">
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
        <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
        <span className="text-xs font-black uppercase tracking-widest ml-2">Carregando cena 3D...</span>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Placeholder — exibido quando a URL ainda não foi configurada
// ─────────────────────────────────────────────────────────────
const SplinePlaceholder: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="text-center space-y-6 p-8">
      {/* Simulação visual de personagem com blocos */}
      <div className="relative mx-auto w-48 h-48">
        {/* "Personagem" central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-green/30 border-2 border-brand-green animate-pulse flex items-center justify-center">
            <span className="text-3xl">🤖</span>
          </div>
        </div>
        {/* Blocos ao redor flutuando */}
        {[
          { top: '0%', left: '50%', delay: '0s', label: '⬡' },
          { top: '30%', left: '0%', delay: '0.3s', label: '⬡' },
          { top: '30%', left: '85%', delay: '0.6s', label: '⬡' },
          { top: '75%', left: '10%', delay: '0.9s', label: '⬡' },
          { top: '75%', left: '75%', delay: '0.4s', label: '⬡' },
          { top: '95%', left: '45%', delay: '0.7s', label: '⬡' },
        ].map((bloco, i) => (
          <div
            key={i}
            className="absolute w-8 h-8 rounded-lg bg-brand-green/20 border border-brand-green/50 text-brand-green text-center flex items-center justify-center text-xs font-bold animate-bounce"
            style={{ top: bloco.top, left: bloco.left, animationDelay: bloco.delay, transform: 'translate(-50%, -50%)' }}
          >
            {bloco.label}
          </div>
        ))}
        {/* Linhas de conexão simuladas via gradiente */}
        <div className="absolute inset-0 rounded-full border border-brand-green/10 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-4 rounded-full border border-brand-green/5 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }} />
      </div>

      <div className="space-y-2">
        <p className="text-brand-green font-black text-sm uppercase tracking-[0.3em]">
          Cena Spline 3D
        </p>
        <p className="text-slate-600 text-xs max-w-xs">
          Configure a URL em <code className="text-brand-green/60">components/SplineScene.tsx</code> após criar sua cena em{' '}
          <a href="https://spline.design" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-green transition-colors">
            spline.design
          </a>
        </p>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// Seção principal — wrapper visual completo
// ─────────────────────────────────────────────────────────────
const SplineScene: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isPlaceholder = SPLINE_SCENE_URL.includes('COLE-SUA-URL-AQUI');

  return (
    <section className="relative py-0 overflow-hidden bg-black border-t border-brand-green/10">
      {/* Barra de destaque superior */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />

      {/* Ambient glow de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Label flutuante */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-black uppercase tracking-widest whitespace-nowrap">
            <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
            Inteligência Artificial em Ação
          </div>
        </div>

        {/* Container 3D */}
        <div className="relative w-full" style={{ height: '500px' }}>
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
                    transition: 'opacity 0.8s ease',
                  }}
                />
              </Suspense>
            </>
          )}
        </div>
      </div>

      {/* Barra inferior */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
    </section>
  );
};

export default SplineScene;
